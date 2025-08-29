# 🔍 Debug do Login Google

## ❌ Problema: Popup do Google não aparece

### 🔧 Solução Implementada

O sistema agora tem múltiplas camadas de proteção e debug:

1. **Verificação de Inicialização**
2. **Logs Detalhados**
3. **Fallback Automático**
4. **Tratamento de Erros Específicos**

### 📋 Como Debugar

#### 1. **Abrir Console do Navegador**
- Pressione `F12` ou `Ctrl+Shift+I`
- Vá para a aba `Console`

#### 2. **Verificar Logs**
Quando clicar no botão Google, você verá:
```
Tentando login com popup...
```

Se der erro:
```
Erro no popup: auth/popup-blocked
Tentando login com redirect...
```

#### 3. **Códigos de Erro Comuns**

| Código | Significado | Solução |
|--------|-------------|---------|
| `auth/popup-blocked` | Popup bloqueado pelo navegador | Permitir popups ou usar redirect |
| `auth/unauthorized-domain` | Domínio não autorizado | Adicionar domínio no Firebase Console |
| `auth/operation-not-allowed` | Google Sign-in desabilitado | Habilitar no Firebase Console |
| `auth/network-request-failed` | Problema de rede | Verificar conexão |
| `auth/too-many-requests` | Muitas tentativas | Aguardar alguns minutos |

### 🛠️ Configuração do Firebase Console

#### 1. **Habilitar Google Sign-in**
1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Selecione seu projeto
3. Authentication → Sign-in method
4. Clique em Google → Editar
5. **Habilitar** o toggle
6. Salvar

#### 2. **Adicionar Domínios Autorizados**
1. Authentication → Settings
2. **Authorized domains**
3. Adicionar:
   - `localhost`
   - `127.0.0.1`
   - `vmvaz1935.github.io`

### 🌐 Teste em Diferentes Ambientes

#### **Local**
```
http://localhost:5000
http://127.0.0.1:5000
```

#### **GitHub Pages**
```
https://vmvaz1935.github.io/controlecarga/
```

### 🔍 Verificações Manuais

#### 1. **Verificar Configuração**
```javascript
// No console do navegador
console.log(FIREBASE_CONFIG);
console.log(fb.auth);
```

#### 2. **Testar Provider**
```javascript
// No console do navegador
const provider = new firebase.auth.GoogleAuthProvider();
console.log(provider);
```

#### 3. **Verificar Domínio**
```javascript
// No console do navegador
console.log(window.location.hostname);
```

### 🚨 Problemas Específicos

#### **Popup Bloqueado**
- **Solução**: Permitir popups para o domínio
- **Alternativa**: Usar modo incógnito
- **Fallback**: Redirect automático

#### **Domínio Não Autorizado**
- **Erro**: `auth/unauthorized-domain`
- **Solução**: Adicionar domínio no Firebase Console
- **Aguardar**: 5-10 minutos para propagar

#### **Google Sign-in Desabilitado**
- **Erro**: `auth/operation-not-allowed`
- **Solução**: Habilitar no Firebase Console

### 📱 Teste em Diferentes Navegadores

1. **Chrome**: Mais compatível
2. **Firefox**: Pode ter restrições
3. **Safari**: Restrições de popup
4. **Edge**: Geralmente funciona bem

### 🔄 Reset de Cache

Se ainda não funcionar:
1. **Limpar cache**: `Ctrl+Shift+Delete`
2. **Modo incógnito**: Testar sem extensões
3. **Aguardar**: 5 minutos para propagar mudanças

### 📞 Suporte

Se o problema persistir:
1. Verificar logs no console
2. Identificar código de erro específico
3. Seguir solução correspondente
4. Testar em modo incógnito

---

**O sistema agora tem debug completo e fallback automático!** 🚀
