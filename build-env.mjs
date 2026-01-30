# Archivo de configuración de build
# Importa variables de entorno y genera environment.prod.ts

import fs from 'fs';
import path from 'path';

const envFile = '.env.local';
const envVars = {};

if (fs.existsSync(envFile)) {
  const content = fs.readFileSync(envFile, 'utf-8');
  content.split('\n').forEach((line) => {
    if (line && !line.startsWith('#')) {
      const [key, value] = line.split('=');
      if (key && value) {
        envVars[key.trim()] = value.trim();
      }
    }
  });
}

const environmentContent = `export const environment = {
  apiUrl: {
    blog: '${envVars.BLOG_API_URL || 'https://francog-backend.onrender.com/blog'}',
  },
  contact: {
    formSubmitEndpoint: 'https://formsubmit.co/ajax',
    destinationEmail: '${envVars.CONTACT_EMAIL || 'gonzalez.francodavid77@gmail.com'}',
  },
};
`;

const outputPath = path.join('src', 'environments', 'environment.prod.ts');
fs.writeFileSync(outputPath, environmentContent);

console.log('✓ environment.prod.ts generado con variables de entorno');
