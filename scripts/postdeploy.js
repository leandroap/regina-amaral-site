const fs = require('fs');
const path = require('path');

// Carregar variáveis do .env
const envPath = path.join(__dirname, '..', '.env');
if (!fs.existsSync(envPath)) {
  console.error('Arquivo .env não encontrado!');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length > 0) {
    envVars[key] = valueParts.join('=').trim();
  }
});

// Caminho do arquivo firebase-init.js
const firebaseInitPath = path.join(__dirname, '..', 'public', 'firebase-init.js');
let content = fs.readFileSync(firebaseInitPath, 'utf8');

// Restaurar placeholders usando valores do .env
const replacements = {
  [envVars.VITE_FIREBASE_API_KEY]: '__FIREBASE_API_KEY__',
  [envVars.VITE_FIREBASE_AUTH_DOMAIN]: '__FIREBASE_AUTH_DOMAIN__',
  [envVars.VITE_FIREBASE_PROJECT_ID]: '__FIREBASE_PROJECT_ID__',
  [envVars.VITE_FIREBASE_STORAGE_BUCKET]: '__FIREBASE_STORAGE_BUCKET__',
  [envVars.VITE_FIREBASE_MESSAGING_SENDER_ID]: '__FIREBASE_MESSAGING_SENDER_ID__',
  [envVars.VITE_FIREBASE_APP_ID]: '__FIREBASE_APP_ID__',
  [envVars.VITE_FIREBASE_MEASUREMENT_ID]: '__FIREBASE_MEASUREMENT_ID__',
};

for (const [value, placeholder] of Object.entries(replacements)) {
  if (!value) {
    console.error(`Variável não encontrada para placeholder: ${placeholder}`);
    process.exit(1);
  }
  content = content.replace(value, placeholder);
}

// Escrever arquivo com placeholders
fs.writeFileSync(firebaseInitPath, content, 'utf8');
console.log('✓ firebase-init.js restaurado com placeholders');
