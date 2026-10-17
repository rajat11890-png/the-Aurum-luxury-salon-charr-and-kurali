import urllib.request
import os

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
req = urllib.request.Request('https://www.instagram.com/reel/DaaZJRrTn1K/embed/', headers=headers)
with urllib.request.urlopen(req) as resp:
    html = resp.read().decode('utf-8', errors='ignore')

print('Status: 200, Length:', len(html))
idx = html.find('.mp4')
print('Index of .mp4:', idx)
if idx != -1:
    http_idx = html.rfind('https', 0, idx)
    quote_idx = html.find('"', idx)
    raw_url = html[http_idx:quote_idx]

    clean_url = ''
    i = 0
    while i < len(raw_url):
        if raw_url[i] == '\\' and i + 1 < len(raw_url) and raw_url[i+1] == '/':
            clean_url += '/'
            i += 2
        elif raw_url[i] == '\\':
            i += 1
        else:
            clean_url += raw_url[i]
            i += 1

    print('Clean URL:', clean_url[:120])
    os.makedirs('src/assets/video', exist_ok=True)
    out_file = 'src/assets/video/aurum_nails_reel.mp4'
    v_req = urllib.request.Request(clean_url, headers=headers)
    with urllib.request.urlopen(v_req) as v_resp, open(out_file, 'wb') as f:
        f.write(v_resp.read())

    file_size = os.path.getsize(out_file)
    print(f'Successfully downloaded {out_file}, size: {file_size} bytes')
else:
    print('No MP4 found')
