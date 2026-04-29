# How To Publish

Este repositorio publica `@fitodac/shadcn` en GitHub Packages usando el workflow [`publish.yml`](/Volumes/external-ssd/work/fitodac-shadcn/.github/workflows/publish.yml).

El disparador es un `release` publicado en GitHub. No hace falta usar tarjeta, comprar nada ni guardar tokens personales en el repo.

## Flujo corto

1. Asegúrate de que `main` tenga exactamente el código que quieres publicar.
2. Sube la versión en `package.json`.
3. Haz commit y push de ese cambio.
4. Crea un release cuyo tag coincida con la versión.
5. GitHub Actions publica el package automáticamente.

## Paso a paso

### 1. Verifica el estado local

```bash
npm run check-types
npm pack --dry-run
```

Si alguno falla, no sigas hasta corregirlo.

### 2. Sube la versión

Ejemplos:

```bash
npm version patch --no-git-tag-version
```

```bash
npm version minor --no-git-tag-version
```

```bash
npm version major --no-git-tag-version
```

Esto actualiza `package.json` y `package-lock.json`.

Ejemplo:

- versión actual: `0.1.0`
- nueva versión patch: `0.1.1`

### 3. Haz commit y push

```bash
git add package.json package-lock.json
git commit -m "Release v0.1.1"
git push origin main
```

### 4. Crea el release en GitHub

Usa un tag con el mismo número de versión, normalmente con prefijo `v`.

Ejemplo:

- versión en `package.json`: `0.1.1`
- tag del release: `v0.1.1`

Opción UI:

1. Abre GitHub.
2. Entra al repo.
3. Ve a `Releases`.
4. Crea un release nuevo.
5. Escribe el tag `v0.1.1`.
6. Selecciona `main`.
7. Publica el release.

Opción CLI:

```bash
gh release create v0.1.1 --target main --title "v0.1.1" --notes "Publica @fitodac/shadcn v0.1.1"
```

### 5. Espera la publicación automática

Al publicar el release, GitHub ejecuta el workflow de publicación. Ese workflow:

1. instala dependencias,
2. valida tipos,
3. genera el paquete,
4. prueba el tarball,
5. ejecuta `npm publish` contra `https://npm.pkg.github.com`.

No necesitas un token personal para este paso: el workflow usa `secrets.GITHUB_TOKEN`.

### 6. Verifica que salió bien

Revisa:

1. la pestaña `Actions` del repo,
2. la sección `Packages` del repo u organización,
3. la versión publicada, por ejemplo `0.1.1`.

## Reglas importantes

- No reutilices una versión ya publicada. Si `0.1.1` falló después de crear el release, corrige el problema y publica `0.1.2`.
- Mantén alineados `package.json` y el tag del release.
- El package se publica en GitHub Packages, no en npmjs.org.
- El workflow solo publica cuando el release está `published`.

## Ejemplo completo

```bash
npm run check-types
npm pack --dry-run
npm version patch --no-git-tag-version
git add package.json package-lock.json
git commit -m "Release v0.1.1"
git push origin main
gh release create v0.1.1 --target main --title "v0.1.1" --notes "Publica @fitodac/shadcn v0.1.1"
```
