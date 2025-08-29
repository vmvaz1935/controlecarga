#!/usr/bin/env node

/**
 * Script de verificação de segurança
 * Verifica se há credenciais do Firebase expostas no código
 */

const fs = require('fs');
const path = require('path');

// Padrões para detectar credenciais do Firebase
const FIREBASE_PATTERNS = [
  /"apiKey":\s*"[^"]*"/g,
  /"authDomain":\s*"[^"]*"/g,
  /"projectId":\s*"[^"]*"/g,
  /"storageBucket":\s*"[^"]*"/g,
  /"messagingSenderId":\s*"[^"]*"/g,
  /"appId":\s*"[^"]*"/g,
  /"measurementId":\s*"[^"]*"/g
];

// Arquivos que devem ser verificados
const FILES_TO_CHECK = [
  'Index.html',
  '*.js',
  '*.html',
  '*.css'
];

// Arquivos que devem ser ignorados
const IGNORE_FILES = [
  'config.js',
  'node_modules',
  '.git',
  'security-check.js'
];

function shouldIgnoreFile(filename) {
  return IGNORE_FILES.some(pattern => filename.includes(pattern));
}

function checkFile(filepath) {
  try {
    const content = fs.readFileSync(filepath, 'utf8');
    const issues = [];
    
    FIREBASE_PATTERNS.forEach((pattern, index) => {
      const matches = content.match(pattern);
      if (matches) {
        issues.push({
          pattern: pattern.toString(),
          matches: matches.length,
          file: filepath
        });
      }
    });
    
    return issues;
  } catch (error) {
    console.error(`Erro ao ler arquivo ${filepath}:`, error.message);
    return [];
  }
}

function scanDirectory(dir = '.') {
  const allIssues = [];
  
  function scanRecursive(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (shouldIgnoreFile(item)) {
        continue;
      }
      
      if (stat.isDirectory()) {
        scanRecursive(fullPath);
      } else if (stat.isFile()) {
        const issues = checkFile(fullPath);
        allIssues.push(...issues);
      }
    }
  }
  
  scanRecursive(dir);
  return allIssues;
}

// Executar verificação
console.log('🔍 Verificando segurança do projeto...\n');

const issues = scanDirectory('.');

if (issues.length === 0) {
  console.log('✅ Nenhuma credencial exposta encontrada!');
  console.log('✅ Seu projeto está seguro.');
} else {
  console.log('⚠️  ATENÇÃO: Credenciais do Firebase encontradas nos seguintes arquivos:\n');
  
  issues.forEach(issue => {
    console.log(`📁 ${issue.file}`);
    console.log(`   Padrão: ${issue.pattern}`);
    console.log(`   Encontrado: ${issue.matches} vez(es)\n`);
  });
  
  console.log('🔒 Recomendações:');
  console.log('   1. Mova as credenciais para o arquivo config.js');
  console.log('   2. Certifique-se de que config.js está no .gitignore');
  console.log('   3. Use config.example.js como template');
}

console.log('\n📋 Verificação concluída!');
