# Portfolio Website - Ndung'u Kinyanjui

Personal portfolio website showcasing skills as a Data Scientist and AWS Certified Cloud Engineer.

## Features

- Modern cyberpunk-inspired design
- Responsive layout
- Smooth scroll animations
- Phosphor Icons integration
- Clean typography with BBH Sans and Lato fonts

## Technologies Used

- HTML5
- CSS3 (Custom Properties, Grid, Flexbox)
- Vanilla JavaScript
- Phosphor Icons

## Local Development

### Prerequisites

- Node.js (v14 or higher)
- npm

### Setup

1. Clone the repository

```bash
git clone <your-repo-url>
cd trx
```

2. Install dependencies

```bash
npm install
```

3. Start local development server

```bash
npm run dev
```

4. Open your browser to `http://localhost:8080`

## Deployment to GitHub Pages

### Option 1: Using gh-pages package (Automated)

1. Make sure your repository is initialized and pushed to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. Deploy using the npm script

```bash
npm run deploy
```

This will automatically create a `gh-pages` branch and deploy your site.

### Option 2: Manual GitHub Pages Setup

1. Push your code to GitHub

```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

2. Go to your repository settings on GitHub
3. Navigate to **Pages** section
4. Under **Source**, select the `main` branch and `/ (root)` folder
5. Click **Save**
6. Your site will be available at `https://<username>.github.io/<repository-name>/`

### Important Notes for GitHub Pages

- The `node_modules` folder is automatically excluded via `.gitignore`
- Phosphor Icons are loaded from the local `node_modules` directory
- Make sure to commit the `node_modules/@phosphor-icons` folder or use a CDN alternative for production

### Using Phosphor Icons CDN (Recommended for GitHub Pages)

For easier deployment, you can replace the local Phosphor Icons scripts in `index.html` with the CDN version:

```html
<!-- Replace the local scripts with: -->
<script src="https://unpkg.com/@phosphor-icons/web@2.1.1"></script>
```

## Project Structure

```
trx/
├── index.html          # Main HTML file
├── style.css           # Stylesheet
├── script.js           # JavaScript interactions
├── package.json        # Node dependencies
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

## Customization

### Update Personal Information

1. Replace placeholder email (`your.email@example.com`) with your actual email
2. Update social media links in the hero and footer sections
3. Replace placeholder images with your professional photos

### Color Palette

Colors are defined as CSS custom properties in `style.css`:

- `--color-electric-blue`: #4C5DD7
- `--color-neon-magenta`: #C231C9
- `--color-soft-sky-blue`: #68A2EB
- `--color-midnight-purple`: #1D0225
- `--color-deep-indigo`: #260B68

## License

MIT License - feel free to use this template for your own portfolio!

## Author

Ndung'u Kinyanjui

- Email: your.email@example.com
- Location: Nairobi, Kenya
