# 🐍 Backend Python - ACWR • sRPE Dashboard

## 🚀 Como Executar

### 1. **Instalar Dependências**

```bash
cd backend
pip install -r requirements.txt
```

### 2. **Executar o Servidor**

```bash
python app.py
```

O servidor estará disponível em: `http://localhost:5000`

### 3. **Verificar se está Funcionando**

Acesse: `http://localhost:5000/api/health`

Deve retornar:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T12:00:00",
  "firebase": "connected"
}
```

## 🔐 Segurança

- ✅ Credenciais do Firebase Admin SDK protegidas no backend
- ✅ Autenticação via token JWT
- ✅ Verificação de autorização por usuário
- ✅ CORS configurado para o frontend

## 📡 Endpoints da API

### Autenticação
- `POST /api/auth/verify` - Verificar token do Firebase

### Sessões
- `GET /api/sessions/<user_id>` - Buscar sessões do usuário
- `POST /api/sessions/<user_id>` - Salvar sessões do usuário
- `DELETE /api/sessions/<user_id>/<session_id>` - Deletar sessão

### Saúde
- `GET /api/health` - Verificar status do servidor

## 🔧 Configuração

### Variáveis de Ambiente (opcional)
```bash
export PORT=5000
export FLASK_ENV=development
```

### Arquivo de Credenciais
O arquivo `app-controle-de-carga-d7aab-firebase-adminsdk-fbsvc-5ce0f69631.json` deve estar no diretório pai.

## 🚀 Deploy

### Heroku
```bash
heroku create acwr-srpe-backend
git push heroku main
```

### Railway
```bash
railway login
railway init
railway up
```

### Vercel
```bash
vercel --prod
```

## 📝 Logs

Para ver logs detalhados:
```bash
python app.py
```

## 🆘 Solução de Problemas

### Erro: "Firebase credentials not found"
- Verifique se o arquivo de credenciais está no local correto
- Confirme se o caminho no `app.py` está correto

### Erro: "CORS policy"
- O CORS já está configurado para permitir o frontend
- Verifique se a URL do frontend está correta

### Erro: "Port already in use"
- Mude a porta no `app.py` ou mate o processo na porta 5000
