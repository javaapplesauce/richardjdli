# Research Page Assets Guide

## Overview
The research page now includes institution logos and research action photos. Placeholder files have been created for you to replace with actual images.

## Folder Structure
```
public/
├── logos/
│   ├── microsoft.svg (placeholder)
│   ├── columbia.svg (placeholder)
│   ├── caltech.svg (placeholder)
│   └── uw-medicine.svg (placeholder)
└── research-photos/
    ├── microsoft-action.svg (placeholder)
    ├── columbia-action.svg (placeholder)
    ├── caltech-action.svg (placeholder)
    └── uw-medicine-action.svg (placeholder)
```

## How to Replace Placeholders

### Institution Logos
1. **Download official logos:**
   - Microsoft: https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks
   - Columbia: https://visualidentity.columbia.edu/
   - Caltech: https://identity.caltech.edu/
   - UW Medicine: https://www.washington.edu/brand/

2. **Recommended specs:**
   - Format: PNG or SVG with transparent background
   - Size: 200x200px minimum (will be displayed at 80-96px)
   - Keep aspect ratio square or near-square for best results

3. **Replace files:**
   - Save as `microsoft.png`, `columbia.png`, `caltech.png`, `uw-medicine.png`
   - Or keep as `.svg` files (preferred for crisp rendering)
   - If using PNG, update the file extensions in `src/app/research/page.tsx`

### Research Action Photos
1. **Select photos showing you:**
   - Working in the lab
   - Presenting research
   - Collaborating with team members
   - Using research equipment
   - At conferences or research events

2. **Recommended specs:**
   - Format: JPG or PNG
   - Aspect ratio: 16:9 or 2:1 (will be cropped to fit header)
   - Size: 1200px width minimum
   - Resolution: High quality for web (72-150 DPI)

3. **Replace files:**
   - Save as `microsoft-action.jpg`, `columbia-action.jpg`, etc.
   - Update file extensions in `src/app/research/page.tsx` if needed
   - Photos will display with a gradient overlay, so don't worry about text contrast

## File Path Reference
Current paths in `src/app/research/page.tsx`:
```typescript
logo: '/logos/microsoft.svg'
photo: '/research-photos/microsoft-action.svg'
```

## Tips
- **Logos**: Use official brand colors and logos to maintain professional appearance
- **Photos**: Choose photos with good composition where you're clearly visible
- **Consistency**: Try to maintain similar photo styles across all institutions
- **Optimization**: Compress images before adding (use tools like TinyPNG or ImageOptim)
- **Next.js Image**: The site uses Next.js Image component for automatic optimization

## Testing
After replacing files:
1. Run `npm run dev` locally
2. Navigate to `/research` page
3. Verify logos appear in circular buttons
4. Check each institution's photo displays correctly
5. Test hover/click interactions still work

## Need Help?
If images don't appear:
- Check file names match exactly (case-sensitive)
- Verify files are in correct folders under `public/`
- Clear browser cache and refresh
- Check browser console for 404 errors
