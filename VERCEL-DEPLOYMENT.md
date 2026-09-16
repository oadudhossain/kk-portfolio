# Deploy this portfolio to Vercel

This copy uses standard Next.js dev, build, and start commands. The existing pnpm dependency versions and lockfile are preserved. No database or Cloudflare service is needed by the portfolio page.

1. Extract the ZIP and upload the contents of `kaniz-portfolio` to a Git repository.
2. Import that repository into Vercel.
3. Select the directory containing `package.json` as Root Directory. Use `kaniz-portfolio` only if that folder itself is inside your repository.
4. Use Framework Preset **Next.js**.
5. Select Node.js **22.x**.
6. Add environment variable `ENABLE_EXPERIMENTAL_COREPACK=1` for Production and Preview. This lets Vercel use the pinned `pnpm@11.25.0` from package.json instead of guessing a version from the lockfile.
7. Leave Install Command on automatic. Keep Output Directory on the Next.js default. Do not use `dist` or `public` as the output override.
8. Deploy. `vercel.json` explicitly selects `pnpm run build:next`.
9. Optionally set `NEXT_PUBLIC_SITE_URL` to your final HTTPS website origin, then redeploy to set canonical metadata.

## Run locally

Install Node.js 22.13 or newer within the 22.x release line, then run:

```sh
npm install -g pnpm@11.25.0
pnpm install --frozen-lockfile
pnpm dev
```

Production build:

```sh
pnpm build
pnpm start
```

## Common errors

- Missing `.next`, unexpected Cloudflare or Vinext output: use the included vercel.json and remove any conflicting dashboard build override.
- A pnpm version or lockfile mismatch: set ENABLE_EXPERIMENTAL_COREPACK=1 and retain both packageManager and pnpm-lock.yaml. Do not delete the lockfile as a workaround.
- Framework not detected: choose Next.js and ensure Root Directory contains package.json.
- Invalid canonical URL: NEXT_PUBLIC_SITE_URL must be a full origin such as https://your-domain.com. It can be omitted until a final domain is known.
- Deployment succeeds but form does not send: the form intentionally prepares a mailto draft. Direct delivery requires an email provider integration.

The page source already passed a native Next.js production build. Vercel cloud installation and deployment have not been run in this session.
