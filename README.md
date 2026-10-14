# Regina Amaral — Site

Landing page estática (HTML + Tailwind CSS via CDN) publicada no Firebase Hosting (`recaamaral-prd`).

- Código do site: `public/`
- Deploy automático: push na `main` publica em produção; Pull Requests geram previews temporários (GitHub Actions).

## Rodar localmente

```bash
npx serve public
```

## Configuração do Firebase (secrets)

`public/firebase-init.js` contém placeholders `${VITE_FIREBASE_*}`. No deploy, o GitHub Actions roda `scripts/inject-firebase-config.sh`, que substitui os placeholders pelos secrets do repositório (Settings → Secrets and variables → Actions). As chaves estão listadas em `.env.example`.

Para cadastrar todos de uma vez a partir de um `.env` local (não versionado):

```bash
gh secret set -f .env -R leandroap/regina-amaral-site
```

Para testar localmente com Analytics:

```bash
set -a; . ./.env; set +a
./scripts/inject-firebase-config.sh   # não faça commit do arquivo alterado
npx serve public
```
