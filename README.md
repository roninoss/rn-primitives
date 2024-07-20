# RN Primitives

Universal Style agnostic and accessible react-native components

## Unstyled Nature

RN Primitives provides unstyled components, offering a high degree of customization freedom. By default, the components come without any predefined styles, allowing developers to seamlessly match their app's aesthetics.

## Accessibility

Accessibility is a significant focus within RN Primitives. We are dedicated to ensuring our components align with accessibility standards. Our ongoing efforts involve designing and testing components with appropriate labels, roles, and behaviors, aiming to provide an inclusive user experience.

### Primitives

#### Core

- `accordion`
- `alert-dialog`
- `aspect-ratio`
- `avatar`
- `checkbox`
- `collapsible`
- `context-menu`
- `dialog`
- `dropdown-menu`
- `hover-card`
- `label`
- `menubar`
- `navigation-menu`
- `popover`
- `progress`
- `radio-group`
- `select`
- `separator`
- `slider`
- `switch`
- `table`
- `tabs`
- `toast`
- `toggle`
- `toggle-group`
- `toolbar`
- `tooltip`

#### Shared

- `hooks`
- `portal`
- `slot`
- `types`
- `utils`

### Getting started for contributors

1. Fork, clone, and install the dependencies with `pnpm`

```bash
pnpm i
```

2. Build and watch all of the primitive packages:

> This builds all of the primitive packages, it watches them for changes. This prevents the need to run the `build` command every time a primitive file is changed.

```bash
pnpm dev:primitives
```

3. Start the app of your choice:

```bash
# Start the Example app
pnpm dev:example
# Or the Documentation app
pnpm dev:docs
```

### Trying out the example app

1. Clone, and install the dependencies with `pnpm`

```bash
pnpm i
```

2. Build all of the primitive packages:

```bash
pnpm build
```

3. Start the example app

```bash
pnpm dev:example
```
