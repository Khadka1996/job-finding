# Deployment Guide

## Vercel Deployment (Recommended)

Vercel is the optimal platform for Next.js applications and is created by the Next.js team.

### Prerequisites
- GitHub/GitLab/Bitbucket account with the repository
- Vercel account (free tier available)

### Steps

1. **Push to Git Repository**
   ```bash
   git add .
   git commit -m "Complete optimization for Visa Sponsor Jobs"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add all variables from `.env.example`:
     ```
     NEXT_PUBLIC_SITE_URL=https://your-domain.com
     NEXT_PUBLIC_BASE_URL=https://your-domain.com
     NEXT_PUBLIC_WHATSAPP_NUMBER=your_number
     NEXT_PUBLIC_API_TIMEOUT=5000
     ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically
   - Your app will be live at `*.vercel.app`

5. **Custom Domain**
   - In Vercel Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

### Performance Optimization on Vercel

- **Edge Network**: Automatic global CDN caching
- **Automatic Compression**: GZip and Brotli enabled
- **Serverless Functions**: API routes run on Edge
- **Image Optimization**: next/image automatically optimized
- **Core Web Vitals**: Monitored in Vercel Analytics

---

## Self-Hosted Deployment (Docker)

If you prefer to self-host, use Docker for consistency.

### Docker Setup

1. **Create Dockerfile**
   ```dockerfile
   FROM node:20-alpine
   
   WORKDIR /app
   
   COPY package*.json ./
   RUN npm ci --only=production
   
   COPY .next ./.next
   COPY public ./public
   
   EXPOSE 3000
   ENV NODE_ENV=production
   
   CMD ["npm", "start"]
   ```

2. **Build Docker Image**
   ```bash
   docker build -t visa-sponsor-jobs .
   ```

3. **Run Container**
   ```bash
   docker run -p 3000:3000 \
     -e NEXT_PUBLIC_SITE_URL=https://your-domain.com \
     -e NEXT_PUBLIC_BASE_URL=https://your-domain.com \
     visa-sponsor-jobs
   ```

### Using Docker Compose

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_SITE_URL: https://your-domain.com
      NEXT_PUBLIC_BASE_URL: https://your-domain.com
      NEXT_PUBLIC_WHATSAPP_NUMBER: ${WHATSAPP_NUMBER}
      NEXT_PUBLIC_API_TIMEOUT: "5000"
    restart: unless-stopped
```

---

## nginx Configuration (Reverse Proxy)

For optimal performance, use nginx as a reverse proxy:

```nginx
upstream nextjs_backend {
  server localhost:3000;
}

server {
  listen 80;
  server_name your-domain.com;

  # Redirect to HTTPS
  return 301 https://$server_name$request_uri;
}

server {
  listen 443 ssl http2;
  server_name your-domain.com;

  ssl_certificate /path/to/cert.pem;
  ssl_certificate_key /path/to/key.pem;

  # Security headers
  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
  add_header X-Frame-Options "SAMEORIGIN" always;
  add_header X-Content-Type-Options "nosniff" always;
  add_header X-XSS-Protection "1; mode=block" always;
  add_header Referrer-Policy "strict-origin-when-cross-origin" always;

  # Gzip compression
  gzip on;
  gzip_vary on;
  gzip_proxied any;
  gzip_comp_level 6;
  gzip_types text/plain text/css text/xml text/javascript 
             application/json application/javascript application/xml+rss 
             application/rss+xml font/truetype font/opentype 
             application/vnd.ms-fontobject image/svg+xml;

  # Cache static assets
  location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }

  # Proxy to Next.js
  location / {
    proxy_pass http://nextjs_backend;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
  }
}
```

---

## Performance Monitoring

### Vercel Analytics
- Dashboard shows real user metrics
- Core Web Vitals tracking
- Performance insights

### Google Search Console
1. Add property: your domain
2. Upload sitemap: `/sitemap.xml`
3. Monitor indexing status

### Google PageSpeed Insights
```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Test your site
lighthouse https://your-domain.com --view
```

### Monitoring Checklist
- [ ] Mobile PageSpeed: 95+
- [ ] Desktop PageSpeed: 99+
- [ ] SEO Score: 100
- [ ] Accessibility: 95+
- [ ] Best Practices: 95+

---

## Post-Deployment Tasks

1. **Update Environment**
   - Set `NEXT_PUBLIC_SITE_URL` to production URL
   - Update WhatsApp number if needed

2. **SSL/TLS Certificate**
   - Enable HTTPS (automatic on Vercel)
   - Use Let's Encrypt for self-hosted

3. **DNS Configuration**
   - Point your domain to Vercel nameservers
   - Or configure CNAME record

4. **SEO Setup**
   - Verify domain in Google Search Console
   - Submit sitemap
   - Monitor indexing

5. **Analytics**
   - Enable Vercel Analytics
   - Connect Google Analytics
   - Monitor Core Web Vitals

6. **Email Setup**
   - Configure contact form email
   - Set up WhatsApp webhook (if needed)

---

## Continuous Deployment

### GitHub Actions (Auto-Deploy)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - run: npm ci
      - run: npm run build
      - run: npm run lint
      - run: npm run type-check

      - uses: vercel/action@main
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
npm run build -- --no-cache

# Check Node version
node --version  # Should be 18+

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Slow Performance
- Check Core Web Vitals in Vercel Analytics
- Verify images are using next/image
- Check for unused dependencies
- Enable Turbopack in dev mode

### SEO Issues
- Verify robots.txt is accessible
- Check sitemap.xml generation
- Ensure meta tags are present
- Test with Google Search Console

---

## Support & Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

For questions or issues, contact Intersect Info Developers at [https://www.intersect.com.np/](https://www.intersect.com.np/)
