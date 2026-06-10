---
name: backend-patterns
description: Common backend patterns including error handling, logging, authentication, and API design. Use for implementing backend infrastructure.
---

# Backend Patterns

- Use `winston` or `pino` for structured logging
- Use JWT (`jsonwebtoken`) or session-based auth
- Rate limiting with `express-rate-limit`
- Use `async-handler` wrapper for async route error catching
- Pagination with `?page&limit` query params, return `{ data, total, page, limit }`
- API versioning via `/v1/`, `/v2/` prefixes
- Return consistent response shape: `{ ok, data, message, errors }`
