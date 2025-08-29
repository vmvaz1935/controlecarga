# 🔧 Configuração do Firebase Console

## ❌ Problema: Popup do Google não abre

Se o popup do Google não está abrindo, siga estes passos para configurar o Firebase Console:

## 🔧 Passos para Configurar

### 1. **Acessar Firebase Console**

1. Vá para [Firebase Console](https://console.firebase.google.com/)
2. Selecione seu projeto: `app-controle-de-carga-d7aab`

### 2. **Configurar Authentication**

1. No menu lateral, clique em **Authentication**
2. Vá para a aba **Sign-in method**
3. Clique em **Google** na lista de provedores
4. Clique em **Editar** (ícone de lápis)

### 3. **Habilitar Google Sign-in**

1. **Ativar** o toggle "Habilitar"
2. **Nome do projeto público**: `ACWR • sRPE Dashboard`
3. **Email de suporte**: Seu email
4. Clique em **Salvar**

### 4. **Configurar Domínios Autorizados**

1. Na aba **Settings** (Configurações)
2. Role até **Authorized domains** (Domínios autorizados)
3. Clique em **Add domain** (Adicionar domínio)
4. Adicione os domínios:
   - `localhost`
   - `127.0.0.1`
   - `vmvaz1935.github.io` (se usar GitHub Pages)

### 5. **Verificar Configuração do Projeto**

1. Vá para **Project settings** (Configurações do projeto)
2. Na aba **General**
3. Verifique se o **Project ID** está correto: `app-controle-de-carga-d7aab`

## 🚀 URLs Importantes

- **Firebase Console**: https://console.firebase.google.com/project/app-controle-de-carga-d7aab
- **Authentication**: https://console.firebase.google.com/project/app-controle-de-carga-d7aab/authentication
- **Project Settings**: https://console.firebase.google.com/project/app-controle-de-carga-d7aab/settings/general

## 🔍 Verificação

Após configurar, teste:

1. **Local**: Abra `index.html` no navegador
2. **Online**: Acesse a aplicação online
3. Clique em **Google** para fazer login
4. O popup deve abrir normalmente

## 🆘 Solução de Problemas

### Erro: "auth/unauthorized-domain"
- Adicione o domínio em **Authorized domains**
- Aguarde alguns minutos para propagar

### Erro: "auth/operation-not-allowed"
- Verifique se o Google está **habilitado** em Sign-in methods

### Erro: "auth/popup-blocked"
- Permita popups no navegador
- Tente em modo incógnito
- Use redirecionamento como fallback

### Erro: "auth/network-request-failed"
- Verifique sua conexão com a internet
- Tente novamente em alguns minutos

## 📱 Teste em Diferentes Ambientes

### Local
```
http://localhost:5000
http://127.0.0.1:5000
```

### GitHub Pages
```
https://vmvaz1935.github.io/controlecarga/
```

### Outros
```
file:///path/to/index.html
```

## ✅ Checklist

- [ ] Google Sign-in habilitado
- [ ] Domínios autorizados configurados
- [ ] Projeto ID correto
- [ ] Testado localmente
- [ ] Testado online

---

**Após configurar, o login Google deve funcionar perfeitamente!** 🚀
