# @fitodac/shadcn

`@fitodac/shadcn` es un package npm alojado en GitHub Packages. Publica una librería de componentes React, utilidades y estilos compilados para consumo por subpath imports.

## Qué publica este package

- Componentes compilados desde `src/**` hacia `dist/**`.
- Tipos TypeScript para cada export público.
- Hoja de estilos en `@fitodac/shadcn/styles.css`.
- Un contrato público definido únicamente por `package.json#exports`.

Este repositorio no publica a npmjs.org. El destino de publicación es `https://npm.pkg.github.com`.

## Instalación

GitHub Packages para npm requiere autenticación para instalar desde la CLI. La forma más simple es usar un token personal clásico con permiso `read:packages` en el proyecto consumidor.

En el proyecto consumidor, crea o edita `.npmrc`:

```ini
@fitodac:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GH_PACKAGES_TOKEN}
```

Luego instala:

```bash
npm i @fitodac/shadcn
```

Si prefieres autenticarte con `npm login`, usa el scope `@fitodac` y el registry `https://npm.pkg.github.com`.

## Uso

Componente:

```tsx
import { Button } from "@fitodac/shadcn/button"
```

Utilidad:

```ts
import { cn } from "@fitodac/shadcn/lib/utils"
```

Estilos:

```css
@import "@fitodac/shadcn/styles.css";
```

## Publicación

La publicación se hace mediante un `release` publicado en GitHub. El workflow [`publish.yml`](/Volumes/external-ssd/work/fitodac-shadcn/.github/workflows/publish.yml) valida el paquete y ejecuta `npm publish` contra GitHub Packages usando `secrets.GITHUB_TOKEN`.

La guía paso a paso está en [HOW_TO_PUBLISH.md](/Volumes/external-ssd/work/fitodac-shadcn/HOW_TO_PUBLISH.md).

## Contrato público

La API pública es exclusivamente lo expuesto en `package.json#exports`. Imports profundos a `src/**`, `dist/**` o a paths no exportados no se consideran soportados.
