# Theme System Documentation

This project uses a semantic theme system powered by CSS Custom Properties and Tailwind CSS. It supports both Light and Dark modes with WCAG AA compliant contrast ratios.

## Color Tokens

The theme is defined using CSS variables in `app/globals.css`.

### Light Mode (`:root`)
- `--color-background`: `#ffffff` (Base background)
- `--color-surface`: `#f9fafb` (Elevated surfaces)
- `--color-text-primary`: `#111827` (Primary text)
- `--color-text-secondary`: `#4b5563` (Secondary text)
- `--color-brand-primary`: `#9810fa` (Brand purple)

### Dark Mode (`.dark`)
- `--color-background`: `#141217` (Figma dark bg)
- `--color-surface`: `#1a1820` (Slightly elevated)
- `--color-text-primary`: `#ffffff` (Primary text)
- `--color-text-secondary`: `#d4c5e0` (Secondary text)
- `--color-brand-primary`: `#a76dff` (Lighter purple for dark mode)

## Usage Guidelines

Use the following Tailwind utility classes to apply theme-aware styles:

| Category | Tailwind Class | CSS Variable |
|----------|----------------|--------------|
| Background | `bg-theme-background` | `--color-background` |
| | `bg-theme-surface` | `--color-surface` |
| | `bg-theme-card` | `--color-card` |
| Text | `text-theme-primary` | `--color-text-primary` |
| | `text-theme-secondary` | `--color-text-secondary` |
| | `text-theme-brand` | `--color-brand-primary` |
| Border | `border-theme` | `--color-border` |

## Theme Management

The theme is managed via `contexts/ThemeContext.jsx`. Use the `useTheme` hook to access the current theme or toggle it.

```javascript
import { useTheme } from '../contexts/ThemeContext';

const MyComponent = () => {
  const { theme, toggleTheme } = useTheme();
  // ...
};
```

## Accessibility

- All normal text combinations maintain a contrast ratio of at least 4.5:1.
- Global transitions are applied for smooth theme switching.
- Focus states use the `theme-brand` color for visibility.

## Icon Theming

SVG icons should use `fill="currentColor"` or `stroke="currentColor"` to inherit the theme's text color.
Apply text color classes to the parent or the `svg` element:
```jsx
<SearchIcon className="text-theme-brand" />
```
