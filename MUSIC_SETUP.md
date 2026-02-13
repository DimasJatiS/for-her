# Music Setup Guide

## Required File

Place your background music here:
- **Path**: `public/audio/background-music.mp3`
- **Format**: MP3 (best browser support)

## Music Selection Tips

### Best Types of Music

✅ **Recommended:**
- Instrumental/ambient tracks
- Lo-fi romantic beats
- Piano instrumentals
- Acoustic guitar
- Soft orchestral
- Chillhop/relaxing beats

❌ **Avoid:**
- Heavy vocals (distracting from reading)
- Loud/aggressive music
- Songs with sad lyrics
- Music with sudden volume changes
- Tracks shorter than 2 minutes

### Suggested Artists/Tracks

**Instrumental:**
- Yiruma - "River Flows in You"
- Ludovico Einaudi - "Nuvole Bianche"
- Max Richter - "On The Nature of Daylight"

**Lo-fi/Chill:**
- Jinsang - "Affection"
- Idealism - "Both of Us"
- Philanthrope - "Lonely"

**Acoustic:**
- Sungha Jung - acoustic covers
- Jon Schmidt - "Love Story Meets Viva La Vida"

## File Specifications

### Audio Quality
- **Format**: MP3
- **Bitrate**: 128-192 kbps (good quality, reasonable size)
- **Sample rate**: 44.1 kHz
- **Channels**: Stereo

### File Size
- **Target**: 3-5 MB
- **Maximum**: 8 MB
- Larger files = longer loading time

### Duration
- **Recommended**: 3-5 minutes
- The music loops automatically
- Shorter tracks loop more often (can be distracting)

## How to Get & Convert Music

### Option 1: YouTube to MP3

**Using Online Converter:**
1. Find instrumental version on YouTube
2. Go to [ytmp3.cc](https://ytmp3.cc) or similar
3. Paste YouTube URL
4. Download as MP3

**Legal note**: Only use royalty-free music or music you own rights to!

### Option 2: Use Royalty-Free Music

**Free sources:**
- [Pixabay Music](https://pixabay.com/music/)
- [Free Music Archive](https://freemusicarchive.org/)
- [YouTube Audio Library](https://studio.youtube.com/channel/UC/music)
- [Incompetech](https://incompetech.com/) (by Kevin MacLeod)

**Paid (but high quality):**
- Epidemic Sound
- Artlist
- Musicbed

### Option 3: Convert Existing Audio

If you have audio in other formats:

```bash
# Using FFmpeg (Mac/Linux/Windows)
ffmpeg -i input.wav -b:a 192k -ac 2 background-music.mp3

# Reduce file size
ffmpeg -i input.mp3 -b:a 128k output.mp3
```

## Volume Adjustment

The music plays at 30% volume by default (in `lib/constants.ts`):

```typescript
export const MUSIC_CONFIG = {
  volume: 0.3, // 0.0 to 1.0
  fadeInDuration: 2000,
  loop: true,
};
```

To adjust:
- Lower number (e.g., 0.2) = quieter
- Higher number (e.g., 0.5) = louder
- Don't go above 0.7 (too loud)

## Testing

After adding music:

1. Place file: `public/audio/background-music.mp3`
2. Restart dev server: `npm run dev`
3. Open site
4. Click "Tap to Begin"
5. Music should start with fade-in
6. Use mute button (top-right) to toggle

## Troubleshooting

**Music not playing?**
- Check file path is exact: `public/audio/background-music.mp3`
- Verify file format is MP3 (not M4A, WAV, etc.)
- Check browser console for errors
- Try a different browser
- Some browsers block autoplay - user interaction (button click) is required

**Music sounds choppy?**
- File might be too large
- Try reducing bitrate to 128kbps
- Check your internet connection (if deployed)

**Music too quiet/loud?**
- Adjust `volume` in `lib/constants.ts`
- Or normalize audio before converting

## Browser Compatibility

Music works on:
- ✅ Chrome (desktop & mobile)
- ✅ Safari (desktop & mobile)
- ✅ Firefox
- ✅ Edge
- ⚠️ iOS Safari requires user interaction first (handled by "Tap to Begin" button)

## Recommendations

**My top picks for romantic instrumental:**
1. **Yiruma - Kiss The Rain** (piano, beautiful)
2. **Ludovico Einaudi - Una Mattina** (emotional)
3. **Thomas Bergersen - Love & Loss** (cinematic)
4. **Brian Crain - Butterfly Waltz** (delicate)

**Where to download these:**
- Search on Pixabay Music (royalty-free versions)
- YouTube Audio Library
- Or purchase from artist's site

## Final Checklist

- [ ] File is MP3 format
- [ ] File is under 8MB
- [ ] File is placed in `public/audio/background-music.mp3`
- [ ] Track is 3-5 minutes long
- [ ] Music is instrumental or very soft vocals
- [ ] Music loops smoothly (no awkward ending)
- [ ] Tested on desktop browser
- [ ] Tested on mobile device

---

**Pro tip**: Choose music that matches the emotion you want to convey. Soft and slow = romantic. Upbeat = playful. Let the music guide the mood!
