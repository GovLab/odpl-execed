const fs = require('fs');
const path = require('path');

// Directus API configuration
const API_URL = 'https://directus.thegovlab.com/odpl_course';

async function downloadExecedData() {
  try {
    console.log('Fetching Executive Education data from Directus API...');
    
    // Download faculty data
    const responseFaculty = await fetch(`${API_URL}/items/faculty?fields=*.*`);
    if (!responseFaculty.ok) {
      throw new Error(`HTTP error! status: ${responseFaculty.status}`);
    }
    const dataFaculty = await responseFaculty.json();
    
    // Download alumni data
    const responseAlumni = await fetch(`${API_URL}/items/alumni?fields=*.*`);
    if (!responseAlumni.ok) {
      throw new Error(`HTTP error! status: ${responseAlumni.status}`);
    }
    const dataAlumni = await responseAlumni.json();
    
    // Download FAQ data
    const responseFaq = await fetch(`${API_URL}/items/faq?fields=*.*`);
    if (!responseFaq.ok) {
      throw new Error(`HTTP error! status: ${responseFaq.status}`);
    }
    const dataFaq = await responseFaq.json();
    
    // Ensure data directory exists
    const dataDir = path.join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // Save all data
    fs.writeFileSync(path.join(dataDir, 'faculty.json'), JSON.stringify(dataFaculty, null, 2));
    fs.writeFileSync(path.join(dataDir, 'alumni.json'), JSON.stringify(dataAlumni, null, 2));
    fs.writeFileSync(path.join(dataDir, 'faq.json'), JSON.stringify(dataFaq, null, 2));
    
    console.log(`✅ Downloaded faculty data: ${dataFaculty.data.length} items`);
    console.log(`✅ Downloaded alumni data: ${dataAlumni.data.length} items`);
    console.log(`✅ Downloaded FAQ data: ${dataFaq.data.length} items`);
    console.log(`📁 Data saved to: ${dataDir}`);
    
    // Log some details about the data
    if (dataFaculty.data.length > 0) {
      console.log(`\n👥 Faculty Data Summary:`);
      dataFaculty.data.forEach((faculty, index) => {
        console.log(`${index + 1}. ${faculty.name || 'Unnamed'}`);
        if (faculty.headshot && faculty.headshot.data) {
          console.log(`   Headshot: ${faculty.headshot.data.thumbnails[3].url}`);
        }
      });
    }
    
    if (dataAlumni.data.length > 0) {
      console.log(`\n🎓 Alumni Data Summary:`);
      dataAlumni.data.forEach((alumni, index) => {
        console.log(`${index + 1}. ${alumni.first_name || ''} ${alumni.last_name || 'Unnamed'}`);
        if (alumni.headshot && alumni.headshot.data) {
          console.log(`   Headshot: ${alumni.headshot.data.thumbnails[3].url}`);
        }
      });
    }
    
    if (dataFaq.data.length > 0) {
      console.log(`\n❓ FAQ Data Summary:`);
      dataFaq.data.forEach((faq, index) => {
        console.log(`${index + 1}. ${faq.question || 'No question'}`);
      });
    }
    
    return { dataFaculty, dataAlumni, dataFaq };
    
  } catch (error) {
    console.error('❌ Error downloading Executive Education data:', error);
    throw error;
  }
}

// Run the download
downloadExecedData(); 