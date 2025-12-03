# Netlify Deployment Guide

This guide explains how to deploy the portfolio to Netlify using the CLI and configure the environment.

## Prerequisites

1. Install Netlify CLI globally (optional but recommended):
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

## Environment Variables

The following environment variables need to be set in the Netlify dashboard (Site Settings > Build & deploy > Environment):

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_APP_URL` | The production URL of the site | Yes |
| `VITE_EMAIL_SERVICE_ID` | EmailJS Service ID | Yes |
| `VITE_EMAIL_TEMPLATE_ID` | EmailJS Template ID | Yes |
| `VITE_EMAIL_PUBLIC_KEY` | EmailJS Public Key | Yes |
| `VITE_GA_TRACKING_ID` | Google Analytics Tracking ID | No |

## Deployment Commands

### Local Development
Run the Netlify development server locally:
```bash
npm run netlify:dev
```

### Preview Deployment
Deploy a preview version to a unique URL:
```bash
npm run deploy:netlify
```

### Production Deployment
Deploy to the production URL:
```bash
npm run deploy:netlify:prod
```

## CI/CD Configuration

The project is configured to automatically deploy to Netlify using GitHub Actions.
- Pushes to `main` trigger a production deployment.
- Pull requests trigger a preview deployment.

## Troubleshooting

### Build Failures
If the build fails, check the following:
1. Ensure all environment variables are set correctly.
2. Check the build logs in the Netlify dashboard.
3. Verify that `bun.lockb` is up to date.

### Routing Issues
If you experience 404 errors on refresh, ensure the `_redirects` file or `netlify.toml` redirects are correctly configured.
The `netlify.toml` file should contain:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```
