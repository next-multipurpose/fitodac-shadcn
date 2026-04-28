# @fitodac/shadcn

Librería de componentes y utilidades para React con Tailwind CSS, consumible por subpath imports.

## Instalación (GitHub Packages)

1. Configurar el scope en tu proyecto (en `~/.npmrc` o `.npmrc` del repo):

```
@fitodac:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

2. Instalar:

```
npm i @fitodac/shadcn
```



## Publicacion

Crear un Release publicado en GitHub. El workflow `.github/workflows/publish.yml` ejecuta `npm ci` y `npm publish` contra GitHub Packages usando `GITHUB_TOKEN`.

## Uso

```tsx
import { Button } from "@fitodac/shadcn/button"
```

Utilidades:

```ts
import { cn } from "@fitodac/shadcn/lib/utils"
```

Estilos:

```css
@import "@fitodac/shadcn/styles.css";
```

## Contrato público

La API pública es exclusivamente lo expuesto en `package.json#exports`. Imports profundos a `src/**` o a paths no exportados no se consideran soportados.
