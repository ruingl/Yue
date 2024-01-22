const { execSync } = require('child_process');
const axios = require('axios');
const fs = require('fs');

async function checkForUpdates() {
  try {
    // Fetch latest release information from GitHub
    const { data: releases } = await axios.get('https://api.github.com/repos/ruingl/Yue/releases');

    // Extract the latest release tag
    const latestRelease = releases[0];
    const latestVersion = latestRelease.tag_name;

    // Read the current version from version.json
    const currentVersion = JSON.parse(fs.readFileSync('version.json', 'utf8')).version;

    // Compare versions
    if (compareVersions(latestVersion, currentVersion) > 0) {
      // Log the update
      console.log(`Update available: v${currentVersion} -> v${latestVersion}`);

      // Perform the update logic (git pull)
      execSync('git pull origin ' + latestVersion, { stdio: 'inherit' });

      console.log('Update complete.');
    } else {
      console.log('No updates available.');
    }
  } catch (error) {
    console.error('Error checking for updates:', error);
  }
}

// Helper function to compare version strings
function compareVersions(a, b) {
  const partsA = a.split('.').map(Number);
  const partsB = b.split('.').map(Number);

  for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
    const partA = partsA[i] || 0;
    const partB = partsB[i] || 0;

    if (partA !== partB) {
      return partA - partB;
    }
  }

  return 0;
}

// Call the function to check for updates
checkForUpdates();