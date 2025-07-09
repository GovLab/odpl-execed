const fs = require('fs');
const path = require('path');

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

function extractImageUrlsFromData(data) {
  const images = [];
  
  // Extract from faculty headshots
  if (data.data && Array.isArray(data.data)) {
    data.data.forEach(item => {
      if (item.headshot && item.headshot.filename_disk && item.headshot.data && item.headshot.data.full_url) {
        images.push({
          url: item.headshot.data.full_url,
          filename: item.headshot.filename_disk,
          name: item.name
        });
      }
    });
  }
  
  return images;
}

async function purgeOldImages() {
  const imgDir = path.join(__dirname, 'img');
  if (fs.existsSync(imgDir)) {
    const files = fs.readdirSync(imgDir);
    if (files.length > 0) {
      console.log(`🗑️  Purging ${files.length} old files/directories...`);
      files.forEach(file => {
        const filePath = path.join(imgDir, file);
        try {
          if (fs.statSync(filePath).isDirectory()) {
            // Recursively delete directory
            fs.rmSync(filePath, { recursive: true, force: true });
            console.log(`🗑️  Deleted directory: ${file}`);
          } else {
            fs.unlinkSync(filePath);
            console.log(`🗑️  Deleted file: ${file}`);
          }
        } catch (error) {
          console.log(`⚠️  Could not delete ${file}: ${error.message}`);
        }
      });
    }
  }
}

async function downloadAllImages() {
  try {
    console.log(`📥 Checking for images to download...`);
    
    // Purge old images first
    await purgeOldImages();
    
    // Ensure img directory exists
    const imgDir = path.join(__dirname, 'img');
    if (!fs.existsSync(imgDir)) {
      fs.mkdirSync(imgDir, { recursive: true });
    }
    
    let allImages = [];
    let successCount = 0;
    let failCount = 0;
    
    // Read faculty data and extract headshot URLs
    const dataPathFaculty = path.join(__dirname, 'data', 'faculty.json');
    if (fs.existsSync(dataPathFaculty)) {
      const dataFaculty = JSON.parse(fs.readFileSync(dataPathFaculty, 'utf8'));
      const facultyImages = extractImageUrlsFromData(dataFaculty);
      allImages = allImages.concat(facultyImages);
    }
    
    // Read alumni data and extract headshot URLs
    const dataPathAlumni = path.join(__dirname, 'data', 'alumni.json');
    if (fs.existsSync(dataPathAlumni)) {
      const dataAlumni = JSON.parse(fs.readFileSync(dataPathAlumni, 'utf8'));
      const alumniImages = extractImageUrlsFromData(dataAlumni);
      allImages = allImages.concat(alumniImages);
    }
    
    console.log(`📋 Found ${allImages.length} unique images to download`);
    
    // Download each image
    for (const image of allImages) {
      const success = await downloadImage(image.url, image.filename);
      if (success) {
        successCount++;
      } else {
        failCount++;
      }
    }
    
    // Update the data files to use local image URLs
    await updateDataWithLocalImageUrls();
    
    console.log(`\n📊 Download Summary:`);
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Failed: ${failCount}`);
    console.log(`📁 Images saved to: ${imgDir}`);
    
  } catch (error) {
    console.error('❌ Error downloading images:', error);
  }
}

async function updateDataWithLocalImageUrls() {
  try {
    console.log(`📝 Updating data with local image URLs...`);
    
    // Update faculty data
    const dataPathFaculty = path.join(__dirname, 'data', 'faculty.json');
    if (fs.existsSync(dataPathFaculty)) {
      let dataFaculty = JSON.parse(fs.readFileSync(dataPathFaculty, 'utf8'));
      
      dataFaculty.data.forEach(item => {
        if (item.headshot && item.headshot.filename_disk) {
          item.headshot.local_url = `img/${item.headshot.filename_disk}`;
        }
      });
      
      fs.writeFileSync(dataPathFaculty, JSON.stringify(dataFaculty, null, 2));
      console.log(`✅ Updated faculty data with local image URLs`);
    }
    
    // Update alumni data
    const dataPathAlumni = path.join(__dirname, 'data', 'alumni.json');
    if (fs.existsSync(dataPathAlumni)) {
      let dataAlumni = JSON.parse(fs.readFileSync(dataPathAlumni, 'utf8'));
      
      dataAlumni.data.forEach(item => {
        if (item.headshot && item.headshot.filename_disk) {
          item.headshot.local_url = `img/${item.headshot.filename_disk}`;
        }
      });
      
      fs.writeFileSync(dataPathAlumni, JSON.stringify(dataAlumni, null, 2));
      console.log(`✅ Updated alumni data with local image URLs`);
    }
    
  } catch (error) {
    console.error('❌ Error updating data with local URLs:', error);
  }
}

// Run the download
downloadAllImages(); 