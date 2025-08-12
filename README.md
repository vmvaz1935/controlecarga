# controlecarga (GitHub Pages)

Site estático para controle de carga (ACWR sRPE) com Firebase (Google + Email/Senha).
O app já inicia conectado ao seu projeto Firebase (auto-connect).

## Publicar
1) Envie `index.html` e `.nojekyll` para a **raiz** do repositório.
2) GitHub → Settings → Pages → *Deploy from a branch* → `main` / `(root)` → Save.
3) Acesse `https://SEU-USUARIO.github.io/NOME-DO-REPO/`.

## Firebase
- Authentication → Sign-in method: ative **Google** e, se quiser, **Email/Password**.
- Authentication → Settings → Authorized domains: adicione `vmvaz1935.github.io` (ou seu domínio).
- Firestore → crie o banco. Regras sugeridas:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/sessions/{docId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```
