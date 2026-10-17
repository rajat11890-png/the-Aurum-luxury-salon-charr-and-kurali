import urllib.request
import re

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
req = urllib.request.Request('https://www.instagram.com/reel/DaaZJRrTn1K/embed/', headers=headers)
with urllib.request.urlopen(req) as resp:
    html = resp.read().decode('utf-8', errors='ignore')

idx = html.find('GraphVideo')
if idx != -1:
    print('Around GraphVideo:', html[max(0, idx - 200):min(len(html), idx + 1000)])
else:
    print('Not found')
