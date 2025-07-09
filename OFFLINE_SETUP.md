# ODPL Executive Education - Offline Setup

This document explains how to set up the ODPL Executive Education project to work offline by downloading all data and images locally.

## Prerequisites

- Node.js (version 14 or higher)
- Internet connection (for initial data download)

## Setup Steps

### 1. Download Executive Education Data

First, download all the data from the Directus API:

```bash
node download-execed-data.js
```

This will:
- Fetch faculty data, alumni data, and FAQ data from the Directus API
- Save the data to `data/faculty.json`, `data/alumni.json`, and `data/faq.json`
- Display a summary of downloaded content

### 2. Download Images

Download all images referenced in the data:

```bash
node download-images.js
```

This will:
- Extract headshot URLs from faculty and alumni data
- Download all images to the `img/` directory
- Update the data to use local image URLs
- Display a summary of successful/failed downloads

### 3. Verify Offline Setup

After running both scripts, you should have:

- `data/faculty.json` - Contains faculty information with local image URLs
- `data/alumni.json` - Contains alumni information with local image URLs
- `data/faq.json` - Contains FAQ data
- `img/` directory - Contains all downloaded images
- Updated HTML and JavaScript files that load from local files instead of API

### 4. Test the Offline Version

Open `index.html`, `faculty.html`, or `alumni.html` in a web browser. The sites should now work completely offline, loading all data and images from local sources.

## File Structure After Setup

```
odpl-execed/
├── data/
│   ├── faculty.json       # Downloaded faculty data (with local image URLs)
│   ├── alumni.json        # Downloaded alumni data (with local image URLs)
│   └── faq.json          # Downloaded FAQ data
├── img/
│   ├── [faculty-headshots]  # Faculty profile images
│   ├── [alumni-headshots]   # Alumni profile images
│   └── [static-images]      # Static site images
├── css/
├── js/
│   └── odpl-course.js    # Updated to load local data
├── index.html            # Updated to use local images
├── faculty.html          # Updated to use local images
├── alumni.html           # Updated to use local images
├── download-execed-data.js # Script to download data
├── download-images.js    # Script to download images
└── OFFLINE_SETUP.md      # This file
```

## Troubleshooting

### Data Not Loading
- Ensure the data download script completed successfully
- Check that all JSON files exist in the `data/` directory
- Open browser developer tools to check for JavaScript errors

### Images Not Loading
- Ensure the image download script completed successfully
- Check that image files exist in the `img/` directory
- Verify that the local URLs in the data are correct

### Script Errors
- Make sure you have Node.js installed
- Ensure you have an internet connection for the initial download
- Check that the Directus API is accessible

## Updating Data

To update the offline data with new content from the API:

1. Run `node download-execed-data.js` to get updated data
2. Run `node download-images.js` to get any new images
3. The sites will automatically use the updated local files

## Notes

- The sites now work completely offline after the initial setup
- All external API dependencies have been removed
- Images are served locally instead of from the Directus CDN
- The sites maintain the same functionality as the online version
- Faculty and alumni data are still sorted alphabetically
- All Vue.js functionality is preserved
- Multiple HTML pages (index, faculty, alumni) all work offline 