# 🐾 PetCard Shared
 
[![Publish](https://github.com/PetCardOrg/petcard-shared/actions/workflows/publish.yml/badge.svg)](https://github.com/PetCardOrg/petcard-shared/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
 
Pacote npm compartilhado do ecossistema PetCard. Contém DTOs, enums, types e validators utilizados pelo backend, web e mobile.
 
**Projeto de TCC** — Ciência da Computação (2026)
 
## Ecossistema PetCard
 
Este repositório faz parte de um conjunto de 5 repos:
 
| Repositório | Descrição |
|---|---|
| [petcard-api](https://github.com/PetCardOrg/petcard-api) | Backend NestJS |
| [petcard-web](https://github.com/PetCardOrg/petcard-web) | Painel do Veterinário (React.js) |
| [petcard-mobile](https://github.com/PetCardOrg/petcard-mobile) | App do Tutor (React Native / Expo) |
| **petcard-shared** | ← Você está aqui |
| [petcard-docs](https://github.com/PetCardOrg/petcard-docs) | Documentação e gestão do projeto |
 
## Instalação (nos repos consumidores)
 
Requer configuração do `.npmrc` para apontar ao GitHub Packages:
 
```
@petcardorg:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```
 
Depois:
 
```bash
npm install @petcardorg/shared
```
 
## Uso
 
```typescript
import { CreatePetDto, Species, Sex } from '@petcardorg/shared';
 
const pet: CreatePetDto = {
  name: 'Luna',
  species: Species.DOG,
  sex: Sex.FEMALE,
};
```
 
## Desenvolvimento
 
```bash
# Clone o repositório
git clone https://github.com/PetCardOrg/petcard-shared.git
cd petcard-shared
 
# Instale as dependências
npm install
 
# Build
npm run build
# Gera a pasta dist/ com os arquivos compilados
```
 
## Publicação
 
A publicação é automática via GitHub Actions. Todo push na branch `main` dispara o workflow que faz build e publica no GitHub Packages.
 
Para publicar uma nova versão manualmente:
 
1. Atualize a versão no `package.json` (seguir semver)
2. Faça push para `main`
3. O workflow publica automaticamente
 
### Versionamento
 
| Tipo | Quando usar | Exemplo |
|---|---|---|
| patch (0.1.X) | Correções de tipos, novos campos opcionais | 0.1.0 → 0.1.1 |
| minor (0.X.0) | Novos DTOs, novos enums | 0.1.0 → 0.2.0 |
| major (X.0.0) | Breaking changes (renomear/remover campos) | 0.2.0 → 1.0.0 |
 
## Estrutura
 
```
src/
├── dtos/          → Interfaces de transferência de dados
├── enums/         → Enumerações compartilhadas
├── types/         → Tipos utilitários
├── validators/    → Funções de validação
└── index.ts       → Barrel export
```
 
## Contribuição
 
Leia o [CONTRIBUTING.md](https://github.com/PetCardOrg/petcard-docs/blob/main/CONTRIBUTING.md) no repositório petcard-docs.