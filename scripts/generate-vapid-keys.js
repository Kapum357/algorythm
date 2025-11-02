// Script para generar llaves VAPID para notificaciones push
const webpush = require('web-push');
const fs = require('fs');
const path = require('path');

console.log('Generando llaves VAPID para notificaciones push...\n');

// Generar llaves VAPID
const vapidKeys = webpush.generateVAPIDKeys();

console.log('✅ Llaves VAPID generadas exitosamente!\n');
console.log('Copia estas llaves en tu archivo .env.local:\n');
console.log('─'.repeat(70));
console.log(`NEXT_PUBLIC_VAPID_PUBLIC_KEY=${vapidKeys.publicKey}`);
console.log(`VAPID_PRIVATE_KEY=${vapidKeys.privateKey}`);
console.log(`VAPID_EMAIL=mailto:admin@dir-soacha.org`);
console.log('─'.repeat(70));
console.log('\n⚠️  IMPORTANTE:');
console.log('   - La clave privada NUNCA debe compartirse o subirse a Git');
console.log('   - La clave pública puede ser pública');
console.log('   - Guarda estas llaves de forma segura');
console.log('   - Si pierdes las llaves, deberás regenerarlas y los usuarios');
console.log('     tendrán que volver a suscribirse\n');

// Intentar escribir en .env.local si no existe
const envPath = path.join(__dirname, '..', '.env.local');
const envExamplePath = path.join(__dirname, '..', '.env.local.example');

try {
  // Si no existe .env.local, crearlo
  if (!fs.existsSync(envPath)) {
    const envContent = `# Ollama AI Configuration
OLLAMA_API_KEY=your_api_key_here
OLLAMA_HOST=https://ollama.com
NEXT_PUBLIC_OLLAMA_MODEL=gpt-oss:120b-cloud

# Push Notifications Configuration (VAPID Keys)
NEXT_PUBLIC_VAPID_PUBLIC_KEY=${vapidKeys.publicKey}
VAPID_PRIVATE_KEY=${vapidKeys.privateKey}
VAPID_EMAIL=mailto:admin@dir-soacha.org
`;
    
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Archivo .env.local creado con las llaves VAPID\n');
  } else {
    console.log('ℹ️  El archivo .env.local ya existe.');
    console.log('   Por favor, añade manualmente las llaves VAPID mostradas arriba.\n');
  }

  // Crear o actualizar .env.local.example
  const exampleContent = `# Ollama AI Configuration
OLLAMA_API_KEY=your_api_key_here
OLLAMA_HOST=https://ollama.com
NEXT_PUBLIC_OLLAMA_MODEL=gpt-oss:120b-cloud

# Push Notifications Configuration (VAPID Keys)
# Run: npm run generate-vapid-keys to generate your own keys
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_public_vapid_key_here
VAPID_PRIVATE_KEY=your_private_vapid_key_here
VAPID_EMAIL=mailto:admin@dir-soacha.org
`;
  
  fs.writeFileSync(envExamplePath, exampleContent);
  console.log('✅ Archivo .env.local.example actualizado\n');

} catch (error) {
  console.error('❌ Error al crear archivos .env:', error.message);
  console.log('   Por favor, crea el archivo .env.local manualmente.\n');
}

console.log('🚀 Próximos pasos:');
console.log('   1. Verifica que .env.local tenga las llaves VAPID');
console.log('   2. Reinicia el servidor de desarrollo: npm run dev');
console.log('   3. Ve a http://localhost:3000/alerts');
console.log('   4. Haz clic en "Activar Notificaciones"');
console.log('   5. Prueba el sistema reportando una alerta\n');
