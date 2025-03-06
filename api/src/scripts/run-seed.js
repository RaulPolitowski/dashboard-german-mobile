// Script para executar a inserção de dados
const { exec } = require('child_process');
const path = require('path');

// Caminho para o script seed-data.js
const seedScript = path.join(__dirname, 'seed-data.js');

console.log('Iniciando a inserção de dados no banco de dados...');
console.log(`Executando script: ${seedScript}`);

// Executa o script seed-data.js
const child = exec(`node "${seedScript}"`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Erro ao executar o script: ${error.message}`);
    return;
  }
  
  if (stderr) {
    console.error(`Erro no script: ${stderr}`);
    return;
  }
  
  console.log(`Saída do script:\n${stdout}`);
  console.log('Inserção de dados concluída com sucesso!');
});

// Exibe a saída em tempo real
child.stdout.on('data', (data) => {
  console.log(data.toString());
});

child.stderr.on('data', (data) => {
  console.error(data.toString());
});
