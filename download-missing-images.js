const fs = require('fs');
const path = require('path');

// List of missing images that are referenced in HTML files
const missingImages = [
  {
    filename: 'govlab-logo-white.png',
    url: 'https://course.opendatapolicylab.org/img/govlab-logo-white.png'
  },
  {
    filename: 'open-data-policy-lab-logo-horizontal-white.svg',
    url: 'https://course.opendatapolicylab.org/img/open-data-policy-lab-logo-horizontal-white.svg'
  },
  {
    filename: 'ds-logo.png',
    url: 'https://course.opendatapolicylab.org/img/ds-logo.png'
  },
  {
    filename: 'christine.png',
    url: 'https://course.opendatapolicylab.org/img/christine.png'
  },
  {
    filename: 'learning-cohort.png',
    url: 'https://course.opendatapolicylab.org/img/learning-cohort.png'
  },
  {
    filename: 'jorge.jpeg',
    url: 'https://course.opendatapolicylab.org/img/jorge.jpeg'
  },
  {
    filename: 'process2.jpg',
    url: 'https://course.opendatapolicylab.org/img/process2.jpg'
  },
  {
    filename: 'juliana.jpg',
    url: 'https://course.opendatapolicylab.org/img/juliana.jpg'
  },
  {
    filename: 'eva.jpg',
    url: 'https://course.opendatapolicylab.org/img/eva.jpg'
  },
  {
    filename: 'unicef-2.png',
    url: 'https://course.opendatapolicylab.org/img/unicef-2.png'
  },
  {
    filename: 'IA-Graphic01-Color-LRG.png',
    url: 'https://course.opendatapolicylab.org/img/IA-Graphic01-Color-LRG.png'
  },
  {
    filename: 'The-Data-Tank_White-On-Black.jpg',
    url: 'https://course.opendatapolicylab.org/img/The-Data-Tank_White-On-Black.jpg'
  },
  {
    filename: 'cc-logo.png',
    url: 'https://course.opendatapolicylab.org/img/cc-logo.png'
  },
  {
    filename: 'hero.jpeg',
    url: 'https://course.opendatapolicylab.org/img/hero.jpeg'
  },
  {
    filename: 'og-graph.png',
    url: 'https://course.opendatapolicylab.org/img/og-graph.png'
  },
  {
    filename: 'covid-logo-color.png',
    url: 'https://course.opendatapolicylab.org/img/covid-logo-color.png'
  },
  {
    filename: 'default-thumb.png',
    url: 'https://course.opendatapolicylab.org/img/default-thumb.png'
  },
  {
    filename: 'default-thumb-2.png',
    url: 'https://course.opendatapolicylab.org/img/default-thumb-2.png'
  },
  {
    filename: 'default-thumb-3.png',
    url: 'https://course.opendatapolicylab.org/img/default-thumb-3.png'
  },
  {
    filename: 'default-thumb-4.png',
    url: 'https://course.opendatapolicylab.org/img/default-thumb-4.png'
  }
];

async function downloadImage(url, filename) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const buffer = await response.arrayBuffer();
    const filePath = path.join(__dirname, 'img', filename);
    
    fs.writeFileSync(filePath, Buffer.from(buffer));
    console.log(`✅ Downloaded: ${filename}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to download ${filename}:`, error.message);
    return false;
  }
}

async function downloadMissingImages() {
  try {
    console.log(`📥 Downloading missing images...`);
    
    // Ensure img directory exists
    const imgDir = path.join(__dirname, 'img');
    if (!fs.existsSync(imgDir)) {
      fs.mkdirSync(imgDir, { recursive: true });
    }
    
    let successCount = 0;
    let failCount = 0;
    
    // Download each missing image
    for (const image of missingImages) {
      const success = await downloadImage(image.url, image.filename);
      if (success) {
        successCount++;
      } else {
        failCount++;
      }
    }
    
    console.log(`\n📊 Download Summary:`);
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Failed: ${failCount}`);
    console.log(`📁 Images saved to: ${imgDir}`);
    
  } catch (error) {
    console.error('❌ Error downloading images:', error);
  }
}

// Run the download
downloadMissingImages(); 