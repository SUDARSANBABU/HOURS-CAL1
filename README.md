# Hours Calculator

React hours calculator for the Amazon Transportation scheduling page.

## Calculator behavior

- No Calculate / Copy / Clear buttons.
- Result is empty initially.
- Typing hours calculates automatically.
- Example: `48` -> `2 Days + 00 Hours`.
- Example: `51` -> `2 Days + 03 Hours`.
- The dialog can be dragged across the page.
- The direct page injection uses a Shadow DOM and does NOT use an iframe.

## Normal web app

```bash
npm install
npm run dev
```

## Build the Netlify site

```bash
npm run build
```

## Build the direct-injection Tampermonkey bundle

```bash
npm run build:extension
```

The extension build creates `dist/hours-calculator.js`.

The supplied Tampermonkey script loads that file with `@require` and injects the calculator directly into the Amazon page. There is no iframe.

## Netlify

`netlify.toml` runs both builds so the published `dist` contains the normal site and `hours-calculator.js`.
# HOURS-CAL1
