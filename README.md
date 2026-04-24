# Portfolio (React + Vite)

## Contact Form Setup (Deploy-ready)

To ensure users can send messages to your Gmail (`vh971190@gmail.com`) after deployment, use Formspree.

### 1) Create a Formspree form

1. Go to [Formspree](https://formspree.io/) and create a new form.
2. Set recipient email to `vh971190@gmail.com`.
3. Copy your endpoint, e.g. `https://formspree.io/f/xxxxx`.

### 2) Configure environment variable

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Then set:

```env
VITE_CONTACT_ENDPOINT=https://formspree.io/f/your_form_id
```

### 3) Add env var on your hosting platform

On Vercel / Netlify / Render, add:

- Key: `VITE_CONTACT_ENDPOINT`
- Value: your Formspree endpoint

Then redeploy.

### 4) Verify

1. Open deployed site.
2. Fill Name, Email, Message in Contact form.
3. Submit and confirm success notification appears.
4. Check inbox of `vh971190@gmail.com`.

### Notes

- Contact form code is in `src/components/sections/Contact.jsx`.
- `.env` files are ignored by git; use `.env.example` for sharing config structure.
