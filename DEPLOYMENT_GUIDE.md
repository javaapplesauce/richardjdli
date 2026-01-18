# 🚀 Deployment Guide - Cloudflare Pages

Your portfolio is optimized for **Cloudflare Pages**, which is perfect for Next.js sites.

## Quick Deploy Steps

### Option 1: Using Git (Recommended)
1. Push your code to GitHub
2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
3. Navigate to **Pages**
4. Click **Create a project** → **Connect to Git**
5. Select your `richardjdli.com` repository
6. Configure:
   - **Framework preset**: Next.js
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
7. Click **Save and Deploy** ✨

### Option 2: Using Wrangler CLI
```bash
# Install dependencies if not already done
npm install

# Build the project
npm run build

# Deploy using Wrangler
wrangler pages deploy .next
```

## Environment Variables (if needed)

Add these in Cloudflare Pages settings if you add features like contact forms:
- `CONTACT_EMAIL` - Your email address
- `API_KEY` - Any API keys needed

## Custom Domain Setup

1. In Cloudflare Pages project settings
2. Add your custom domain: `richardjdli.com`
3. Cloudflare will guide you to configure DNS

## CI/CD Pipeline

Cloudflare Pages automatically:
- ✅ Rebuilds on every push to `main` branch
- ✅ Creates preview deployments for pull requests
- ✅ Handles SSL/HTTPS automatically
- ✅ Serves from Cloudflare's global edge network

## Rollback Deployments

If something goes wrong:
1. Go to **Deployments** in your Pages project
2. Find the previous good version
3. Click **Rollback to this deployment**

## Monitoring

- **Build logs**: Check in Cloudflare Pages dashboard
- **Analytics**: Available in Cloudflare Analytics
- **Performance**: Monitor with Web Vitals

## DNS Configuration

Make sure your domain's DNS is configured:
```
CNAME record: @ (or subdomain) → richardjdli.com.pages.dev
```

Cloudflare will provide the exact DNS values during setup.

## Troubleshooting

**Build fails?**
- Check that `npm run build` works locally
- Verify all dependencies are in `package.json`
- Review build logs in Cloudflare dashboard

**Site shows old content?**
- Clear Cloudflare cache: Settings → Cache → Purge Cache
- Or do a manual redeploy

**Domain not working?**
- Verify DNS records are correct
- Wait a few minutes for DNS propagation
- Check that nameservers point to Cloudflare

## Next Steps

1. ✅ Build your project: `npm run build`
2. ✅ Test production build locally: `npm start`
3. ✅ Push to GitHub
4. ✅ Connect to Cloudflare Pages
5. ✅ Configure custom domain
6. 🎉 Your site is live!

---

For more details: [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
