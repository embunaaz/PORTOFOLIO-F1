# Portfolio — Embun Aqeela Zahra

A portfolio website themed around **Ferrari / F1**, featuring a main navigation designed in a **podium** layout (P1 = Profile, P2 = Work Experience, P3 = Projects) and a **standings list** (P4 = Soft Skills, P5 = Hard Skills, P6 = Certificates), matching the style of an F1 leaderboard.

The project structure is pure static HTML/CSS/JS — no build steps required, making it ready to deploy directly to Vercel.

```
index.html      -> all content & page structure
styles.css      -> all styling (Ferrari colors, typography, layout, responsiveness)
script.js       -> mobile navigation, scroll-active menu, reveal animations, back-to-top button
vercel.json     -> minimal configuration for Vercel
assets/         -> place your profile picture & other assets here
```

## What you need to replace before publishing

1. **Profile picture**
   - Save your photo file in `assets/profile.jpg`.
   - In `index.html`, locate the 2 placeholder spots (commented with `<!-- TODO: replace with your profile picture -->`):
     - under the **Podium** section (`ph-p1`)
     - under the **About** section (`about-photo`)
   - Remove the `<span>EAZ</span>` tag and uncomment the `<img src="assets/profile.jpg" ...>` line in both places.

2. **Project GitHub links**
   - In each `<a class="pc-link" href="#" ...>` within the **Projects** section, replace `href="#"` with the link to that project's GitHub repository.

3. **Certificate Google Drive links**
   - In each `<a class="cert-row" href="#" ...>` within the **Certificates** section, replace `href="#"` with the Google Drive link to each respective certificate.

4. **GitHub profile link**
   - In the footer, replace `href="#"` on the **GitHub** link with your own GitHub profile link.

All other text contents (profile, education, work experience, skills) have been imported directly from your CV — feel free to edit `index.html` directly if you'd like to make any changes.

## How to deploy to Vercel

**Option A — via GitHub (recommended)**
1. Create a new repository on GitHub, then upload/push this folder to the repository.
2. Go to [vercel.com](https://vercel.com) and sign in (you can use your GitHub account).
3. Click **Add New → Project**, and select your repository.
4. Framework preset: select **Other** (since this is standard static HTML). Build command & output directory can be left blank.
5. Click **Deploy**. Done — you will get a public URL like `your-name.vercel.app`.

**Option B — via Vercel CLI**
```bash
npm i -g vercel
cd portfolio
vercel        # follow the prompts for preview deployment
vercel --prod # publish to production
```

After deploying, every time you push changes to GitHub, Vercel will automatically re-deploy the latest version.

## Quick Customization

- **Colors**: all colors are configured using CSS variables at the top of `styles.css` (`--red`, `--yellow`, `--black`, etc.).
- **Fonts**: `Racing Sans One` (for numbers/large displays) + `Titillium Web` (for headings & body text), loaded from Google Fonts.
- **New Section**: simply add a `<section class="section" id="section-name">...</section>` in `index.html`, and add its corresponding link to `.nav-links`.
