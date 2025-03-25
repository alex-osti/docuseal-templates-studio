# MakerToo Landing Page Implementation Guide

## Kadence Pro Setup

1. **Header**:
   - Use Kadence Header Builder
   - Set logo text to "MakerToo" with gradient text class
   - Add primary menu with items: Solutions, Open Source, About
   - Add gradient button for Contact

2. **Hero Section**:
   - Add Row Layout block (50/50 split)
   - Left column: Paste hero text HTML from templates file
   - Right column: Paste circle animation HTML
   - Enable "Stack on Mobile" in row settings

3. **Value Cards**:
   - Add Row Layout block (3 columns)
   - Each column: Paste card HTML from templates file
   - Set gap between columns to 1.5rem

4. **Footer**:
   - Use Kadence Footer Builder
   - Add gradient text logo
   - Simple navigation links
   - Copyright text

## WPCodeBox Implementation

1. Create new CSS snippet:
   - Paste contents of makertoo-wpcodebox-snippet.css
   - Set to load globally

2. Create new HTML snippet for each section:
   - Hero section
   - Value cards
   - Footer (if needed)

## Additional Notes

- For icons: Use Kadence's icon block with gradient background
- For mobile: All sections should stack naturally
- Test on different screen sizes