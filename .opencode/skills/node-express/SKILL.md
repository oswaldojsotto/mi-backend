---
name: node-express
description: Node.js and Express.js best practices. Use for creating REST APIs, middleware, error handling, routing, and Express app structure.
---

# Node.js & Express.js

- Use `express.Router()` for modular route files
- Centralized error handling middleware with `(err, req, res, next)`
- Use `helmet`, `cors`, `compression` as standard middleware
- Validate request body with `zod` before passing to controllers
- Structure: `routes/`, `controllers/`, `middleware/`, `validators/`, `services/`
- Use `express.json({ limit: '1mb' })` for body parsing
- Use `dotenv` or `process.env` with validated env schema
