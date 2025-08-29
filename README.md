# ACWR • sRPE Dashboard App

[![Deploy to GitHub Pages](https://github.com/vmvaz1935/controlecarga/actions/workflows/deploy.yml/badge.svg)](https://github.com/vmvaz1935/controlecarga/actions/workflows/deploy.yml)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-blue?style=flat&logo=github)](https://vmvaz1935.github.io/controlecarga/)

Dashboard moderno e intuitivo para controle de carga de treinamento usando ACWR (Acute:Chronic Workload Ratio) e sRPE (session Rating of Perceived Exertion).

## 🚀 Demo Online

**Acesse a aplicação:** [https://vmvaz1935.github.io/controlecarga/](https://vmvaz1935.github.io/controlecarga/)

## ✨ Características

- 🎨 **Design Moderno**: Interface elegante com gradientes e animações
- 📱 **Responsivo**: Funciona perfeitamente em desktop e mobile
- 🔒 **Seguro**: Credenciais do Firebase protegidas
- ⚡ **Rápido**: Carregamento instantâneo e feedback visual
- ☁️ **Sincronizado**: Dados salvos no Firebase Cloud
- 📊 **Analítico**: Gráficos e métricas em tempo real
- 🎯 **Intuitivo**: UX otimizada com atalhos de teclado

## 🔐 Configuração do Firebase

### ✅ Configuração Automática

O Firebase já está configurado automaticamente! As credenciais estão protegidas no backend e não são visíveis na interface.

**Arquivos protegidos:**
- `config.js` - Configuração do cliente Firebase
- `app-controle-de-carga-d7aab-firebase-adminsdk-fbsvc-5ce0f69631.json` - Service Account (backend)

### 🔒 Segurança Implementada

- ✅ Credenciais no backend (não visíveis na interface)
- ✅ Arquivos sensíveis no `.gitignore`
- ✅ Conexão automática ao carregar a página
- ✅ Autenticação obrigatória para acesso aos dados

### 📁 Estrutura de arquivos:

```
├── index.html          # Aplicação principal
├── config.js           # 🔒 Configuração Firebase (automática)
├── config.example.js   # 📋 Exemplo de configuração
├── .gitignore          # Lista de arquivos ignorados pelo Git
└── README.md           # Este arquivo
```

## 🚀 Como usar:

### 🌐 **Online (Recomendado)**
1. Acesse [https://vmvaz1935.github.io/controlecarga/](https://vmvaz1935.github.io/controlecarga/)
2. Configure o Firebase seguindo os passos abaixo
3. Faça login com Google ou crie uma conta com email/senha
4. Comece a registrar suas sessões de treino

### 💻 **Local**
1. Clone o repositório: `git clone https://github.com/vmvaz1935/controlecarga.git`
2. Configure o Firebase seguindo os passos abaixo
3. Abra o `Index.html` no navegador
4. Faça login e comece a usar

## 🔒 Segurança:

- ✅ Credenciais do Firebase em arquivo separado
- ✅ Arquivo `config.js` no `.gitignore`
- ✅ Regras do Firestore configuradas para segurança por usuário
- ✅ Autenticação obrigatória para acesso aos dados

## 📊 Funcionalidades:

- 📈 Cálculo automático de ACWR
- 📅 Visualização mensal de carga
- ☁️ Sincronização com Firebase
- 📤 Exportação para CSV
- 📥 Importação de dados
- 🔄 Auto-sync opcional

## 🛡️ Regras do Firestore (já configuradas):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/sessions/{docId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

Estas regras garantem que cada usuário só acesse seus próprios dados.

## 🎮 Atalhos de Teclado

- **Ctrl/Cmd + Enter**: Adicionar sessão
- **Ctrl/Cmd + S**: Salvar no cloud
- **Ctrl/Cmd + L**: Carregar do cloud
- **Escape**: Limpar formulário

## 📱 Compatibilidade

- ✅ Chrome, Firefox, Safari, Edge
- ✅ iOS Safari, Chrome Mobile
- ✅ Android Chrome, Firefox
- ✅ PWA ready (Progressive Web App)

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- Firebase pela infraestrutura
- Chart.js pelos gráficos
- Tailwind CSS pelo design
- Comunidade open source
