# 🚀 Guia para Configurar o Repositório no GitHub

## 📋 Passos para Criar o Repositório

### 1. Criar Repositório no GitHub

1. Acesse [GitHub.com](https://github.com) e faça login
2. Clique no botão **"New"** ou **"+"** no canto superior direito
3. Selecione **"New repository"**
4. Preencha os dados:
   - **Repository name**: `controlecarga` (ou o nome que preferir)
   - **Description**: `ACWR • sRPE Dashboard - Controle inteligente de carga de treinamento`
   - **Visibility**: Public (recomendado) ou Private
   - **Initialize with**: NÃO marque nenhuma opção (já temos os arquivos)
5. Clique em **"Create repository"**

### 2. Configurar o Remote (se necessário)

Se o repositório não existir, execute:

```bash
# Remover remote atual (se existir)
git remote remove origin

# Adicionar novo remote (substitua SEU_USUARIO pelo seu username do GitHub)
git remote add origin https://github.com/SEU_USUARIO/controlecarga.git

# Fazer push
git push -u origin main
```

### 3. Ativar GitHub Pages

1. No repositório criado, vá em **Settings**
2. Role até **Pages** no menu lateral
3. Em **Source**, selecione **"Deploy from a branch"**
4. Em **Branch**, selecione **"gh-pages"** e **"/ (root)"**
5. Clique em **Save**

### 4. Configurar GitHub Actions (Opcional)

O workflow já está configurado no arquivo `.github/workflows/deploy.yml`. Ele será ativado automaticamente quando você fizer push.

## 🔧 Comandos para Executar

```bash
# Verificar status atual
git status

# Verificar remote configurado
git remote -v

# Se precisar alterar o remote
git remote set-url origin https://github.com/SEU_USUARIO/controlecarga.git

# Fazer push das mudanças
git push origin main
```

## 🌐 URLs Importantes

- **Repositório**: `https://github.com/SEU_USUARIO/controlecarga`
- **GitHub Pages**: `https://SEU_USUARIO.github.io/controlecarga`
- **Actions**: `https://github.com/SEU_USUARIO/controlecarga/actions`

## 📝 Checklist

- [ ] Repositório criado no GitHub
- [ ] Remote configurado corretamente
- [ ] Push realizado com sucesso
- [ ] GitHub Pages ativado
- [ ] Workflow Actions funcionando
- [ ] Aplicação acessível online

## 🆘 Solução de Problemas

### Erro: "repository not found"
- Verifique se o repositório foi criado no GitHub
- Confirme o nome do usuário no remote
- Verifique as permissões do repositório

### Erro: "authentication failed"
- Configure um Personal Access Token
- Ou use SSH keys para autenticação

### GitHub Pages não funciona
- Aguarde alguns minutos após o push
- Verifique se a branch gh-pages foi criada
- Confirme as configurações em Settings > Pages

## 🎉 Próximos Passos

Após configurar o repositório:

1. **Teste a aplicação online**
2. **Configure o Firebase** seguindo o README.md
3. **Compartilhe o link** com outros usuários
4. **Monitore o uso** através do Firebase Console

---

**Precisa de ajuda?** Abra uma issue no repositório ou entre em contato!
