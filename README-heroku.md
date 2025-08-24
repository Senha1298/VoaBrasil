# Deploy no Heroku

## Passos para fazer deploy:

1. **Instalar Heroku CLI**
   ```bash
   # No Windows/Mac/Linux - baixar de https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Fazer login no Heroku**
   ```bash
   heroku login
   ```

3. **Criar aplicação no Heroku**
   ```bash
   heroku create nome-da-sua-aplicacao
   ```

4. **Configurar variáveis de ambiente (se necessário)**
   ```bash
   heroku config:set NODE_ENV=production
   ```

5. **Fazer deploy**
   ```bash
   git add .
   git commit -m "Deploy para Heroku"
   git push heroku main
   ```

## Arquivos criados para Heroku:

- **Procfile**: Define como iniciar a aplicação (`web: npm start`)
- **app.json**: Configurações da aplicação para Heroku
- **.env.example**: Exemplo de variáveis de ambiente necessárias
- **.slugignore**: Arquivos a serem ignorados no deploy
- **scripts/copy-assets.js**: Script para copiar assets estáticos (se necessário)

## Configurações importantes:

- ✅ Aplicação configurada para usar `process.env.PORT` (obrigatório no Heroku)
- ✅ Script de build executado automaticamente via `heroku-postbuild`
- ✅ Assets estáticos (vídeos, fontes) servidos da pasta `attached_assets`
- ✅ Modo produção configurado para servir arquivos buildados
- ✅ Compatível com Node.js no Heroku

## Como funciona em produção:

1. Heroku instala dependências com `npm install`
2. Script `postinstall` executa automaticamente o build completo
3. Aplicação inicia diretamente com `node dist/index.js`
4. Servidor Express serve tanto API quanto frontend
5. Assets estáticos ficam disponíveis em `/attached_assets/`

## Build otimizado:

- ✅ Frontend buildado com Vite (sem dependências de desenvolvimento)
- ✅ Backend buildado com versão de produção limpa (sem Vite/plugins)
- ✅ Assets copiados automaticamente durante o build
- ✅ Bundle final muito menor e mais eficiente

## Scripts importantes:

- `scripts/build-production.js` - Build completo integrado
- `scripts/copy-assets.js` - Cópia de assets (se necessário)

## Troubleshooting:

Se o build falhar no Heroku:
```bash
# Teste localmente
node scripts/build-production.js
PORT=3000 node dist/index.js
```

## ⚠️ Problema anterior corrigido:
- Removidas dependências de desenvolvimento do bundle final
- Criada versão limpa do servidor para produção
- Build agora funciona corretamente no Heroku