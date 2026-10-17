import urllib.request
import re

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
req = urllib.request.Request('https://www.instagram.com/reel/DaaZJRrTn1K/embed/', headers=headers)
with urllib.request.urlopen(req) as resp:
    html = resp.read().decode('utf-8', errors='ignore')

# Unescape \/
unescaped = html.replace('\\/', '/')

# Search for any scontent or cdn urls
cdn_urls = re.findall(r'https://[^"\'\s<>]+cdninstagram\.com[^"\'\s<>]+', unescaped)
print('CDN URLs found:', len(cdn_urls))
for u in cdn_urls[:10]:
    print('CDN:', u[:120])

# Check if there is an mp4 anywhere in unescaped
mp4_urls = [u for u in cdn_urls if '.mp4' in u]
print('MP4 URLs:', len(mp4_urls))
if mp4_urls:
    print('MP4 url:', mp4_urls[0])

# Check for video_url or video in text
video_indices = [m.start() for m in re.finditer(r'video', unescaped, re.IGNORECASE)]
print('Occurrences of video:', len(video_indices))
for idx in video_indices[:5]:
    start = max(0, idx - 50)
    end = min(len(unescaped), idx + 150)
    print('SNIPPET:', unescaped[start:end])
