"""Test different mermaid.ink encoding methods"""
import requests
import json
import zlib
import base64

diagram = """graph TD
    A[Start] --> B[End]"""

# Method 1: Try different compression wbits
for wbits in [-15, 15, zlib.MAX_WBITS]:
    try:
        payload = json.dumps({"code": diagram})
        c = zlib.compressobj(9, zlib.DEFLATED, wbits)
        compressed = c.compress(payload.encode()) + c.flush()
        encoded = base64.urlsafe_b64encode(compressed).decode().rstrip('=')
        url = f"https://mermaid.ink/img/{encoded}"
        resp = requests.get(url, timeout=15)
        print(f"wbits={wbits}: status={resp.status_code}, size={len(resp.content)}, type={resp.headers.get('content-type','?')}")
        if resp.status_code == 200:
            with open(f'test_wbits_{wbits}.png', 'wb') as f:
                f.write(resp.content)
            print(f"  SUCCESS!")
            break
    except Exception as e:
        print(f"wbits={wbits}: error={e}")

# Method 2: Try using the /syntax endpoint first
print("\n--- Checking API ---")
r = requests.get("https://mermaid.ink/", timeout=10)
print(f"Root: {r.status_code}")

# Method 3: Try POST approach
print("\n--- POST approach ---")
code_encoded = base64.b64encode(diagram.encode()).decode()
r2 = requests.post("https://mermaid.ink/img",
                   json={"code": diagram},
                   headers={"Content-Type": "application/json"},
                   timeout=15)
print(f"POST img: {r2.status_code}, size={len(r2.content)}, type={r2.headers.get('content-type','?')}")
