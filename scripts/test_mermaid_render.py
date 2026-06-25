"""Test mermaid.ink API rendering"""
import requests
import json
import zlib
import base64

# Simple test diagram
code = """graph LR
    A[Hello] --> B[World]"""

payload = json.dumps({"code": code})
c = zlib.compressobj(9, zlib.DEFLATED, -15)
compressed = c.compress(payload.encode()) + c.flush()
encoded = base64.urlsafe_b64encode(compressed).decode().rstrip('=')
url = f"https://mermaid.ink/img/{encoded}"

print(f"URL: {url[:100]}...")
resp = requests.get(url, timeout=20)
print(f"Status: {resp.status_code}")
print(f"Content-Type: {resp.headers.get('content-type')}")
print(f"Size: {len(resp.content)} bytes")

if resp.status_code == 200:
    out = 'test_mermaid_output.png'
    with open(out, 'wb') as f:
        f.write(resp.content)
    print(f"Saved to: {out}")
else:
    print(f"Response: {resp.text[:200]}")
