# ACWR • sRPE Dashboard App

Dashboard para controle de carga de treinamento usando ACWR (Acute:Chronic Workload Ratio) e sRPE (session Rating of Perceived Exertion).

## 🔐 Configuração Segura do Firebase

### ⚠️ IMPORTANTE: Proteção de Credenciais

Para proteger suas credenciais do Firebase, siga estes passos:

1. **Copie o arquivo de exemplo:**
   ```bash
   cp config.example.js config.js
   ```

2. **Edite o arquivo `config.js`** e substitua as credenciais de exemplo pelas suas credenciais reais do Firebase.

3. **NUNCA compartilhe o arquivo `config.js`** - ele já está no `.gitignore` para não ser enviado ao repositório.

### 🔧 Como obter as credenciais do Firebase:

1. Acesse o [Console do Firebase](https://console.firebase.google.com/)
2. Selecione seu projeto
3. Vá em **Configurações do Projeto** (ícone de engrenagem)
4. Na aba **Geral**, role até "Seus aplicativos"
5. Clique em **Configuração do SDK**
6. Copie o objeto de configuração para o arquivo `config.js`

### 📁 Estrutura de arquivos:

```
├── Index.html          # Aplicação principal
├── config.js           # 🔒 Credenciais do Firebase (NÃO compartilhar)
├── config.example.js   # 📋 Exemplo de configuração
├── .gitignore          # Lista de arquivos ignorados pelo Git
└── README.md           # Este arquivo
```

## 🚀 Como usar:

1. Configure o Firebase seguindo os passos acima
2. Abra o `Index.html` no navegador
3. Faça login com Google ou crie uma conta com email/senha
4. Comece a registrar suas sessões de treino

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
