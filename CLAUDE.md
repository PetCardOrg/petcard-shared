# petcard-shared — Contexto para Claude Code

> **Plano da M7 (cross-repo) vive na raiz: `../CLAUDE.md`.** Aqui só as convenções do shared.

## O que é

Pacote `@petcardorg/shared` (**`0.10.0`**, GitHub Packages) com os **DTOs e enums** compartilhados entre `petcard-api`, `petcard-web` e `petcard-mobile`. Fonte-única dos contratos de request/response. Sem runtime próprio — é só tipos + metadata.

- **Estrutura:** `src/dtos/<dominio>/` (carteira-digital, clinica, deworming, medication, nota-clinica, notification, pet, tutor, vaccine, veterinario), `src/enums/` (role, sex, species, device-platform), `src/index.ts` (barrel).

## Build (o ponto não-óbvio)

- `npm run build` = `node scripts/build.js` — compila com o **plugin do `@nestjs/swagger` como transformer**, que injeta `_OPENAPI_METADATA_FACTORY` estático nos DTOs (metadata OpenAPI derivada dos tipos + `class-validator`). É o que faz a **api gerar schemas Swagger completos** a partir de DTOs externos (o CLI plugin da api não infere tipos de pacote externo).
- A saída é **JS puro, sem dependência de runtime nova** — inerte para web/mobile. Usa `tsconfig.build.json`.

## Convenções

- **Todo DTO novo entra aqui**, não local nos consumidores. Adicionar ao barrel `src/index.ts`.
- **Versionamento:** bump **minor** para feature (DTO novo), **patch** para fix de tipo. Publicar após bump.
- **Publish:** `.github/workflows/publish.yaml` (GitHub Packages). Publish é **idempotente** — pula se a versão já existe (não republica).
- **Lint/format no commit** (husky + lint-staged): `eslint --fix` + `prettier --write`.
- **Sem testes por design** (pacote de tipos) — a cobertura vive nos consumidores.
- Git flow, commits e regras cross-repo: ver `../CLAUDE.md`. PR mira `develop`.

## M7 nesta repo

Sem issue funcional própria. As features da Fase 1 que criarem request/response nova (ex.: observações clínicas do web#34, auth do mobile#54, histórico do api#117) trazem os DTOs para cá primeiro — bump minor + publish — antes de a api/web/mobile consumirem.
