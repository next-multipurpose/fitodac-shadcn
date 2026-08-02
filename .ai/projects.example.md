# project.json examples

Use `.ai/project.json` to describe the project kind and select the UI profiles
available to its pages and components.

`defaultUiProfile` applies when a page or component does not declare a profile
explicitly. Every explicitly declared profile must be included in
`allowedUiProfiles`.

## Administrative application

Use this configuration for an administrative application:

```json
{
  "projectKind": "application",
  "defaultUiProfile": "admin-app",
  "allowedUiProfiles": ["admin-app"]
}
```

## Creative website

Use this configuration for a creative or marketing website:

```json
{
  "projectKind": "website",
  "defaultUiProfile": "creative-website",
  "allowedUiProfiles": ["creative-website"]
}
```

## Mixed project

Use this configuration when the project contains both administrative and
creative surfaces:

```json
{
  "projectKind": "hybrid",
  "defaultUiProfile": "admin-app",
  "allowedUiProfiles": [
    "admin-app",
    "creative-website"
  ]
}
```

## fitodac-shadcn

The component library uses the administrative profile by default while
allowing expressive components and landing pages to opt into the creative
profile:

```json
{
  "projectKind": "component-library",
  "defaultUiProfile": "admin-app",
  "allowedUiProfiles": [
    "admin-app",
    "creative-website"
  ]
}
```

The catalog and components inherit `admin-app` unless they declare another
profile. A landing page or expressive component may explicitly declare
`creative-website`.
