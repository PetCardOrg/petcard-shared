/**
 * Build do pacote com o plugin do @nestjs/swagger aplicado como transformer.
 *
 * O plugin injeta `_OPENAPI_METADATA_FACTORY` estático nos DTOs (metadata
 * OpenAPI derivada dos tipos + class-validator), permitindo que a API gere
 * schemas completos no Swagger. A saída é JS puro sem nenhuma dependência
 * de runtime nova — inerte para web e mobile.
 */
const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const { before } = require('@nestjs/swagger/plugin');

const configPath = ts.findConfigFile(
  process.cwd(),
  ts.sys.fileExists,
  'tsconfig.build.json',
);
if (!configPath) {
  console.error('tsconfig.build.json não encontrado');
  process.exit(1);
}

const parsed = ts.getParsedCommandLineOfConfigFile(
  configPath,
  {},
  {
    ...ts.sys,
    onUnRecoverableConfigFileDiagnostic: (diagnostic) => {
      console.error(
        ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'),
      );
      process.exit(1);
    },
  },
);

const program = ts.createProgram(parsed.fileNames, parsed.options);
const emitResult = program.emit(undefined, undefined, undefined, false, {
  before: [
    before(
      { classValidatorShim: true, introspectComments: true },
      program,
    ),
  ],
});

const diagnostics = ts
  .getPreEmitDiagnostics(program)
  .concat(emitResult.diagnostics);

for (const diagnostic of diagnostics) {
  if (diagnostic.file && diagnostic.start !== undefined) {
    const { line, character } = ts.getLineAndCharacterOfPosition(
      diagnostic.file,
      diagnostic.start,
    );
    const message = ts.flattenDiagnosticMessageText(
      diagnostic.messageText,
      '\n',
    );
    console.error(
      `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`,
    );
  } else {
    console.error(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
  }
}

if (emitResult.emitSkipped || diagnostics.some((d) => d.category === ts.DiagnosticCategory.Error)) {
  process.exit(1);
}

// O plugin injeta `const openapi = require("@nestjs/swagger")` em todo arquivo
// transformado, mas com metadata factory o import nunca é usado. Removê-lo
// mantém o pacote sem dependência de runtime do Nest (web/mobile intactos).
const DEAD_IMPORT = /^const openapi = require\("@nestjs\/swagger"\);\r?\n/m;

function stripDeadImport(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      stripDeadImport(fullPath);
    } else if (entry.name.endsWith('.js')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('openapi.')) {
        console.error(`${fullPath}: uso inesperado de openapi.* no emit`);
        process.exit(1);
      }
      if (DEAD_IMPORT.test(content)) {
        fs.writeFileSync(fullPath, content.replace(DEAD_IMPORT, ''));
      }
    }
  }
}

stripDeadImport(path.resolve(parsed.options.outDir ?? 'dist'));
