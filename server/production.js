import express from "express";
import { createServer } from "http";
import fs from "fs";
import path from "path";

const app = express();

// Middleware básico
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Servir assets estáticos
app.use('/attached_assets', express.static('attached_assets'));

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${new Date().toISOString()} ${req.method} ${req.path} ${res.statusCode} ${duration}ms`);
  });
  next();
});

// Servir arquivos estáticos do build
const distPath = path.resolve(process.cwd(), "dist/public");

if (!fs.existsSync(distPath)) {
  console.error(`Build directory not found: ${distPath}`);
  console.log("Make sure to run the build script first");
  process.exit(1);
}

app.use(express.static(distPath));

// Fallback para SPA
app.use("*", (_req, res) => {
  res.sendFile(path.resolve(distPath, "index.html"));
});

// Error handler
app.use((err, _req, res, _next) => {
  console.error('Server error:', err);
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

// Criar servidor HTTP
const httpServer = createServer(app);

// Iniciar servidor
const port = parseInt(process.env.PORT || '5000', 10);
httpServer.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`📁 Serving static files from: ${distPath}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
});