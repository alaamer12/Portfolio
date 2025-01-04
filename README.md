# Portfolio Website

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS.

## Features

- 🎨 Modern UI design with smooth animations
- 🌓 Dark/Light mode support
- 📱 Fully responsive layout
- ⚡ Fast loading with Vite
- 🎭 Smooth animations with Framer Motion
- 🎯 SEO optimized

## Local Development

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

## Deployment

This website is configured to automatically deploy to GitHub Pages when changes are pushed to the main branch.

### Manual Deployment

If you need to deploy manually:

1. Make sure your repository is configured for GitHub Pages:
   - Go to repository Settings > Pages
   - Set the source branch to `gh-pages`

2. Run the deploy command:
   ```bash
   bun run deploy
   ```

### Environment Setup

1. Clone the repository
2. Install dependencies: `bun install`
3. Update `vite.config.js` with your repository name
4. Push to GitHub and enable GitHub Pages

## Built With

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Icons](https://react-icons.github.io/react-icons/)
