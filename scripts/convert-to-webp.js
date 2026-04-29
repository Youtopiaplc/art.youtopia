import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const inputDir = './public/images';
const outputDir = './public/images';

async function convertToWebP() {
  const files = await fs.readdir(inputDir);
  const imageFiles = files.filter(f => /\.(jpg|jpeg|png|JPG|PNG)$/i.test(f));
  
  for (const file of imageFiles) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
    
    try {
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);
      console.log(`✅ Converted: ${file} → ${path.basename(outputPath)}`);
    } catch (err) {
      console.error(`❌ Failed: ${file}`, err.message);
    }
  }
  
  console.log(' All images converted to WebP!');
}

convertToWebP();