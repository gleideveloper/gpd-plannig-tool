import { Template } from "@/dominio/modelos/Template";
import * as fs from 'fs';
import * as path from 'path';

async function templateInsertions() {
  const directoryPath = path.join(__dirname, 'templates');

  try {
    const files = fs.readdirSync(directoryPath);

    const jsonFiles = files.filter(file => path.extname(file).toLowerCase() === '.json');

    for (const file of jsonFiles) {
      const filePath = path.join(directoryPath, file);
      const rawData = fs.readFileSync(filePath, 'utf8');

      const templateData = JSON.parse(rawData);
      templateData.peak_ammount = JSON.stringify(templateData.peak_ammount);
      await Template.create(templateData);
    }
  } catch (error) {
    console.error('Error inserting templates:', error);
  }
}

export { templateInsertions };