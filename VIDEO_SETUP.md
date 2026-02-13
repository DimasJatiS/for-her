# Add a Short Video (Internal / No Code Changes)

This project will load a fixed video path:

- File location: `public/video/our-video.mp4`
- URL in the app: `/video/our-video.mp4`

## Steps

1) Put your video file at:

`public/video/our-video.mp4`

2) Commit + push (so Vercel redeploys):

```bash
git add -A
git commit -m "Add short video"
git push
```

## Important Notes (size limits)

- Keep it short and reasonably small.
- GitHub blocks files around ~100MB unless you use Git LFS.
- If you need a larger/higher-quality video later, best option is hosting it on Vercel Blob / Cloudinary / S3 — but for now, this internal approach works great for short clips.
