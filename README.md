# Portfolio Website - Ndung'u Kinyanjui

Professional portfolio website showcasing my expertise as a Cloud Engineer, DevOps Practitioner, and Backend Developer.

🔗 **Live Site**: [https://maven-13ttn.github.io](https://maven-13ttn.github.io)  
📦 **Repository**: [https://github.com/MaVeN-13TTN/MaVeN-13TTN.github.io](https://github.com/MaVeN-13TTN/MaVeN-13TTN.github.io)

## ✨ Features

### Design & UI

- **Cyberpunk-themed design** with electric blue and neon magenta accents
- **Fully responsive** - optimized for desktop, tablet, and mobile devices
- **Smooth animations** and scroll effects
- **Interactive hamburger menu** for mobile navigation
- **Custom tooltips** for social media icons
- **Gradient section dividers** for visual separation

### Sections

- **Hero Section** - Purple gradient background with animated introduction
- **About Me** - Professional narrative and personal photo
- **Resume** - H-arrangement layout featuring:
  - What I Do (Core Competencies)
  - Professional Experience
  - Technical Skills & Competencies (4 categories)
  - Education (Daystar University + ALX)
  - Community Involvement
- **Certifications** - AWS and GitHub professional certifications with Credly badges
- **ALX Certificates Carousel** - Interactive slideshow of 5 ALX program certificates
- **Contact Form** - EmailJS-powered modal form for direct messaging
- **Footer** - Social media links with hover tooltips

### Interactive Elements

- **Infinite carousel** for ALX certificates with smooth circular transitions
- **Contact form modal** with real-time EmailJS integration
- **Skill progress bars** with scroll-triggered animations
- **Hover effects** on buttons, cards, and links

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript** - DOM manipulation, carousel logic, form handling
- **Phosphor Icons** (v2.1.1) - Icon library via CDN
- **EmailJS** - Contact form email delivery
- **Typography**:
  - BBH Sans Bartle (navbar)
  - BBH Sans Bogle (headings)
  - Lato (body text, weights 100-900)

## 📁 Project Structure

```
MaVeN-13TTN.github.io/
├── assets/
│   ├── alx_certs/                    # ALX certificate images
│   │   ├── 28-introduction-to-swe-0623-certificate-samuel-kinyanjui.png
│   │   ├── 71-aws-cloud-computing-certificate-ndung-u-kinyanjui.png
│   │   ├── 89-professional-foundations-certificate-ndung-u-kinyanjui.png
│   │   ├── 113-alx-ai-starter-kit-certificate-ndung-u-kinyanjui.png
│   │   └── 86-prodev-backend-certificate-ndung-u-kinyanjui.png
│   ├── css/
│   │   └── style.css                 # Main stylesheet (1400+ lines)
│   ├── js/
│   │   └── script.js                 # JavaScript functionality
│   └── images/
│       ├── hero-section-image.png    # About section photo
│       └── purple-hero-background.png # Background image (Hero and Footer)
├── node_modules/                     # Dependencies (git-ignored)
├── .env                              # EmailJS credentials (git-ignored)
├── .gitignore                        # Git ignore rules
├── EMAILJS_SETUP.md                  # EmailJS configuration guide
├── index.html                        # Main HTML file
├── package.json                      # Node dependencies
├── package-lock.json                 # Dependency lock file
└── README.md                         # This file
```

## 🚀 Local Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

### Setup

1. **Clone the repository**

```bash
git clone https://github.com/MaVeN-13TTN/MaVeN-13TTN.github.io.git
cd MaVeN-13TTN.github.io
```

2. **Install dependencies**

```bash
npm install
```

3. **Start local development server**

```bash
npm run dev
```

4. **Open your browser** to `http://localhost:8080`

### EmailJS Setup (Required for Contact Form)

The contact form uses EmailJS to send emails. Follow these steps:

1. Create a free account at [emailjs.com](https://www.emailjs.com/)
2. Add an email service (Gmail recommended)
3. Create an email template with variables: `{{name}}`, `{{email}}`, `{{subject}}`, `{{message}}`
4. Get your Public Key, Service ID, and Template ID
5. Update `assets/js/script.js` with your credentials (already configured in current version)

For detailed setup instructions, see `docs/EMAILJS_SETUP.md`

## 🌐 Deployment to GitHub Pages

### Automated Deployment

1. **Initialize Git and push to GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/MaVeN-13TTN/MaVeN-13TTN.github.io.git
git push -u origin main
```

2. **Deploy using npm script**

```bash
npm run deploy
```

This automatically creates a `gh-pages` branch and deploys your site.

### Manual GitHub Pages Setup

1. **Push code to GitHub**

```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

2. Go to repository **Settings** → **Pages**
3. Select **Source**: `main` branch, `/ (root)` folder
4. Click **Save**
5. Site will be live at: `https://maven-13ttn.github.io`

## 🎨 Customization Guide

### Color Palette (CSS Custom Properties)

```css
--color-electric-blue: #4C5DD7      /* Primary buttons, borders */
--color-neon-magenta: #C231C9       /* Accents, hover states */
--color-soft-sky-blue: #68A2EB      /* Headings, links */
--color-midnight-purple: #1D0225    /* Background */
--color-deep-indigo: #260B68        /* Gradients, borders */
--color-text: #E6E6FA               /* Light lavender text */
--color-muted: #9B9BB5              /* Secondary text */
```

### Update Personal Information

**In `index.html`:**

- Line 57: Email address (About section)
- Lines 264-267: Social media links (Footer)
- Lines 195-211: Education and volunteer experience
- Lines 100-107: Work experience

**In `assets/js/script.js`:**

- Lines 88: EmailJS Public Key (if using different account)
- Line 123: EmailJS Service ID and Template ID

### Replace Images

**Required images:**

1. `assets/images/hero-section-image.png` - Your professional photo (About section)
2. `assets/images/purple-hero-background.png` - Background image (Hero and Footer)
3. `assets/alx_certs/` - Your ALX certificate images (5 total)

### Update Content

- **Resume Section**: Edit skills, experience, education in `index.html`
- **Certifications**: Update Credly badge URLs and credential links
- **About Section**: Customize the professional narrative

## 📝 Contact Information

- **Email**: kinyanjuindungu1324@gmail.com
- **Phone**: +254 728 446 824
- **Location**: Nairobi, Kenya

### Social Links

- **GitHub**: [MaVeN-13TTN](https://github.com/MaVeN-13TTN)
- **LinkedIn**: [ndungu-kinyanjui](https://www.linkedin.com/in/ndungu-kinyanjui/)
- **Medium**: [@kinyanjuindungu1324](https://medium.com/@kinyanjuindungu1324)
- **X (Twitter)**: [@Maven_TTN](https://x.com/Maven_TTN)

## 🏆 Certifications Showcase

### Professional Certifications

1. AWS Certified Cloud Practitioner (November 19, 2023)
2. AWS Certified Solutions Architect - Associate (November 1, 2024)
3. GitHub Foundations (February 26, 2025)

### ALX Program Certificates (Chronological)

1. Introduction to Software Engineering (November 17, 2023)
2. AWS Cloud Computing (December 11, 2024)
3. Professional Foundations (April 15, 2025)
4. ALX AI Starter Kit (May 22, 2025)
5. Backend Development (August 22, 2025)

## 📦 Dependencies

### Production

- `@phosphor-icons/web` (v2.1.1) - Icon library (loaded via CDN)
- EmailJS Browser SDK (v4) - Contact form email service (loaded via CDN)

### Development

- `http-server` - Local development server
- `gh-pages` - GitHub Pages deployment tool

## 🔒 Security & Best Practices

- EmailJS public keys are **safe to expose** in client-side code
- `.env` file is git-ignored (not used in production - GitHub Pages is static)
- All external links use `target="_blank"` and `rel="noopener"` for security
- Form validation and error handling implemented
- Responsive images with proper alt text for accessibility

## 📄 License

MIT License - Feel free to use this template for your own portfolio!

## 🙏 Acknowledgments

- **Fonts**: BBH Sans (Bartle & Bogle) and Lato from Google Fonts
- **Icons**: Phosphor Icons
- **Email Service**: EmailJS
- **Hosting**: GitHub Pages

---

**Built with ❤️ by Ndung'u Kinyanjui**

_Last Updated: June 13, 2026_
