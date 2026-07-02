"""Export MySQL database to SQL file for sharing."""
from app.core.config import get_settings
from app.core.database import engine, Base
from sqlalchemy import text, inspect
import os

settings = get_settings()

# Only run if MySQL
if not settings.DATABASE_URL.startswith("mysql"):
    print("This script only exports MySQL. Current DB:", settings.DATABASE_URL.split("://")[0])
    exit(1)

OUTPUT = "book_system_export.sql"

inspector = inspect(engine)
table_names = inspector.get_table_names()

with open(OUTPUT, "w", encoding="utf-8") as f:
    f.write("-- Book System Database Export\n")
    f.write("-- Generated for testing/sharing purposes\n\n")
    f.write("SET NAMES utf8mb4;\n")
    f.write("SET FOREIGN_KEY_CHECKS = 0;\n\n")

    with engine.connect() as conn:
        for table in table_names:
            f.write(f"-- Table: {table}\n")

            # CREATE TABLE
            create_sql = conn.execute(
                text(f"SHOW CREATE TABLE `{table}`")
            ).fetchone()[1]
            f.write(f"DROP TABLE IF EXISTS `{table}`;\n")
            f.write(f"{create_sql};\n\n")

            # INSERT data
            rows = conn.execute(text(f"SELECT * FROM `{table}`")).fetchall()
            if rows:
                cols = [c[0] for c in conn.execute(text(f"SHOW COLUMNS FROM `{table}`")).fetchall()]
                col_list = ", ".join(f"`{c}`" for c in cols)
                f.write(f"INSERT INTO `{table}` ({col_list}) VALUES\n")
                value_lines = []
                for row in rows:
                    vals = []
                    for v in row:
                        if v is None:
                            vals.append("NULL")
                        elif isinstance(v, (int, float)):
                            vals.append(str(v))
                        elif isinstance(v, bytes):
                            vals.append(f"0x{v.hex()}")
                        else:
                            escaped = str(v).replace("\\", "\\\\").replace("'", "\\'")
                            vals.append(f"'{escaped}'")
                    value_lines.append(f"({', '.join(vals)})")
                f.write(",\n".join(value_lines))
                f.write(";\n\n")
            else:
                f.write(f"-- (no data in `{table}`)\n\n")

    f.write("SET FOREIGN_KEY_CHECKS = 1;\n")

print(f"Exported {len(table_names)} tables to {OUTPUT}")
print(f"   File size: {os.path.getsize(OUTPUT)} bytes")
