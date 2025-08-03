# ChiefOnboarding Web Components

This directory contains web components for the ChiefOnboarding platform.

## Animated Button Component

A customizable, accessible animated button web component with ripple effects and multiple variants.

### Features

- **Multiple Variants**: Primary, Secondary, Success, Outline
- **Size Options**: Small, Medium, Large
- **Accessibility**: Focus indicators, high contrast support, reduced motion support
- **Interactive Effects**: Hover animations, ripple click effects
- **Custom Events**: Dispatches `animated-button-click` events

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
# Watch for changes and rebuild
npm run dev

# Build for production
npm run build

# Serve demo locally
npm run serve
```

### Usage

#### Basic HTML Usage
```html
<script type="module" src="dist/animated-button.js"></script>
<link rel="stylesheet" href="dist/animated-button.css">

<animated-button text="Click me" variant="primary"></animated-button>
```

#### With Event Handling
```javascript
document.addEventListener('animated-button-click', (e) => {
  console.log('Button clicked:', e.detail);
});
```

### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `text` | string | "Click me" | Button text content |
| `variant` | string | "primary" | Button style variant (primary, secondary, success, outline) |
| `size` | string | "medium" | Button size (small, medium, large) |
| `disabled` | boolean | false | Disable the button |

### Browser Support

- Chrome 67+
- Firefox 63+
- Safari 10.1+
- Edge 79+

### Demo

Open `dist/index.html` in a browser after building to see the interactive demo.

## Development Guidelines

- Follow web component best practices
- Ensure accessibility compliance
- Include comprehensive CSS for all states
- Test across different browsers
- Document all public APIs