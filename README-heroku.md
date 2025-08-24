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

1. Heroku executa `npm run build` automaticamente
2. Aplicação inicia com `npm start` 
3. Servidor Express serve tanto API quanto frontend
4. Assets estáticos ficam disponíveis em `/attached_assets/`

## Troubleshooting:

Se assets não carregarem:
```bash
# Execute o script manualmente após build
node scripts/copy-assets.js
```