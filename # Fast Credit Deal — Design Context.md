\# Fast Credit Deal — Design Context

\#\# Project  
Landing page for loan consolidation DSA. Target: salaried Indians 25–40,  
Delhi NCR / Mumbai / Bangalore. EMI burden ₹40K–₹1.5L/month.

\#\# Design Reference  
Stripe.com. White/off-white base. Zero gradients. Zero decoration.  
Font: Geist Sans. Premium fintech feel — NOT a loan company look.

\#\# Colour Tokens  
\--bg-base: \#FAFAFA  
\--bg-surface: \#FFFFFF    
\--bg-dark: \#18181B  
\--text-primary: \#09090B  
\--text-body: \#52525B  
\--text-muted: \#A1A1AA  
\--border: \#E4E4E7  
\--accent: \#4F46E5  
\--accent-light: \#EEF2FF  
\--savings: \#059669  
\--old-emi: \#DC2626  
\--wa-green: \#25D366

\#\# Typography  
Font: Geist Sans (Google Fonts)  
Hero H1: 72px desktop / 48px mobile, weight 700  
Section H2: 36px, weight 600  
Body: 16px, weight 400  
CTA buttons: 16px, weight 600

\#\# Hard Rules — Never Break These  
\- No gradients anywhere  
\- No navigation links on this page — single purpose only  
\- One primary CTA per viewport scroll  
\- EMI savings amounts always in \#059669 (emerald)  
\- Old EMI always in \#DC2626 with text-decoration: line-through  
\- WhatsApp button always \#25D366 — nothing else uses this colour  
\- Mobile-first — build 375px first  
\- All form submissions via AJAX — never reload the page  
\- Consent checkbox never pre-checked (TRAI compliance)  
\- Calculator result stays blurred until WhatsApp number captured

\#\# Tech Stack  
Next.js 14, TypeScript, Tailwind CSS, Framer Motion  
Backend: Next.js API routes  
CRM: Airtable API  
WhatsApp: WATI BSP API  
Email alerts: Resend API  
Analytics: Google Analytics 4

\#\# What NOT to Build  
No mobile app. No navigation menu. No blog. No chatbot.  
No customer portal. No multiple pages in Phase 1\.  
