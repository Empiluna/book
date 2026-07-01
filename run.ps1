param(
    [switch]$UseSqlite,
    [switch]$WithInfra,
    [switch]$SkipInstall,
    [int]$Port = 8000,
    [int]$MySqlWaitSeconds = 120
)

$ErrorActionPreference = "Stop"

function Info($Message) {
    Write-Host "[book] $Message" -ForegroundColor Cyan
}

function Warn($Message) {
    Write-Host "[book] $Message" -ForegroundColor Yellow
}

function Test-Port($HostName, $PortNumber) {
    try {
        $client = [System.Net.Sockets.TcpClient]::new()
        $task = $client.ConnectAsync($HostName, $PortNumber)
        if (-not $task.Wait(1200)) {
            $client.Close()
            return $false
        }
        $client.Close()
        return $true
    } catch {
        return $false
    }
}

function Wait-Port($HostName, $PortNumber, $Seconds) {
    $deadline = (Get-Date).AddSeconds($Seconds)
    while ((Get-Date) -lt $deadline) {
        if (Test-Port $HostName $PortNumber) {
            return $true
        }
        Start-Sleep -Seconds 1
    }
    return $false
}

function Test-MySqlReady($PythonExe) {
    $probe = "import pymysql; conn=pymysql.connect(host='127.0.0.1', port=3306, user='root', password='root123456', database='book_system', connect_timeout=2); cur=conn.cursor(); cur.execute('SELECT 1'); conn.close()"
    & $PythonExe -c $probe *> $null
    return $LASTEXITCODE -eq 0
}

function Wait-MySqlReady($PythonExe, $Seconds) {
    $deadline = (Get-Date).AddSeconds($Seconds)
    while ((Get-Date) -lt $deadline) {
        if (Test-MySqlReady $PythonExe) {
            return $true
        }
        Start-Sleep -Seconds 2
    }
    return $false
}

function Test-Command($Name) {
    return $null -ne (Get-Command $Name -ErrorAction SilentlyContinue)
}

function Test-DockerReady {
    if (-not (Test-Command "docker")) {
        return $false
    }

    docker info *> $null
    return $LASTEXITCODE -eq 0
}

$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $Root

Info "Project: $Root"

if (-not (Test-Path ".venv\Scripts\python.exe")) {
    Info "Creating Python virtual environment..."
    python -m venv .venv
}

$Python = Join-Path $Root ".venv\Scripts\python.exe"

if (-not $SkipInstall) {
    Info "Installing Python dependencies..."
    & $Python -m pip install -r requirements.txt
}

$env:SEED_ON_STARTUP = "true"
$env:CORS_ORIGINS = "*"

if ($UseSqlite) {
    $env:DATABASE_URL = "sqlite:///./book_system.db"
    Warn "Using SQLite for local demo: book_system.db"
} else {
    $env:DATABASE_URL = "mysql+pymysql://root:root123456@localhost:3306/book_system?charset=utf8mb4"

    if (-not (Test-Port "127.0.0.1" 3306)) {
        Info "MySQL is not listening on 3306. Trying to start Docker service..."

        if (-not (Test-DockerReady)) {
            throw "Docker Desktop is not running. Start Docker Desktop first, then run .\run.ps1 again. For local preview without MySQL, run: .\run.ps1 -UseSqlite"
        }

        $services = @("mysql")
        if ($WithInfra) {
            $services = @("mysql", "neo4j", "redis", "elasticsearch")
        }

        docker compose up -d @services
        if ($LASTEXITCODE -ne 0) {
            throw "Docker service failed to start. Check Docker Desktop, or run: .\run.ps1 -UseSqlite"
        }

    }

    Info "Waiting for MySQL SQL readiness..."
    if (-not (Wait-MySqlReady $Python $MySqlWaitSeconds)) {
        throw "MySQL did not become ready for SQL queries. Check with: docker compose logs mysql. For local preview, run: .\run.ps1 -UseSqlite"
    }

    Info "Using MySQL: book_system"
}

if (Test-Port "127.0.0.1" $Port) {
    throw "Port $Port is already in use. Stop the old service or run with another port, for example: .\run.ps1 -Port 8001"
}

Info "Starting backend..."
Info "Frontend: http://localhost:$Port/"
Info "Admin:    http://localhost:$Port/admin"
Info "Docs:     http://localhost:$Port/docs"

& $Python -m uvicorn app.main:app --host 0.0.0.0 --port $Port --reload
