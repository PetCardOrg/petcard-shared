#!/usr/bin/env bash
# Falha o PR que muda src/ sem mudar a versão do package.json.
#
# O publish pula versão que já existe no registry, então uma mudança de
# contrato sem bump chegava na main, o workflow ficava verde e nenhum
# consumidor recebia nada.
#
# Uso: scripts/check-version-bump.sh <ref da base>   (ex.: origin/develop)
set -euo pipefail

BASE_REF="${1:?informe a ref da base, ex.: origin/develop}"

if git diff --quiet "$BASE_REF...HEAD" -- src/; then
  echo "src/ não mudou em relação a $BASE_REF; bump não é necessário."
  exit 0
fi

BASE_VERSION=$(git show "$BASE_REF:package.json" | node -p "JSON.parse(require('fs').readFileSync(0, 'utf8')).version")
HEAD_VERSION=$(node -p "require('./package.json').version")

if [ "$BASE_VERSION" = "$HEAD_VERSION" ]; then
  echo "::error file=package.json::src/ mudou, mas a versão continua $HEAD_VERSION (a mesma de $BASE_REF). Faça o bump: minor para contrato novo, patch para correção, major para breaking. Sem ele o publish pula e os consumidores não recebem a mudança."
  exit 1
fi

echo "src/ mudou e a versão foi de $BASE_VERSION para $HEAD_VERSION."
