# Fast Credit Deal - Landing Page Structure

## Technical Foundation
- Framework: Next.js (App Router)
- Styling: Tailwind CSS
- State/Forms: react-hook-form + zod
- Typography: Playfair Display (Headers), Manrope (Body)
- Primary Color Palette: Deep Navy/Charcoal, Amber/Gold, White

## Component Map (`src/components/`)

### 1. `Hero.tsx`
- **Purpose**: First impression, immediate value prop, and trust indicators.
- **Content**:
  - Headline: "Paying Over ₹40,000 in EMIs Every Month?" (Playfair Display)
  - Subhead: "We'll reduce it. Free analysis. Response in 2 hours." (Manrope)
  - CTA Button: primary button that smooth scrolls to Lead Form.
  - Trust Bar: 4 metrics (₹500Cr+ Disbursed, 10+ Yrs Exp, 40+ Bank Partners, 2-Hr Response).

### 2. `PainPoints.tsx`
- **Purpose**: Validate user anxiety and offer relief.
- **Content**:
  - 3 Pain Points:
    - "Multiple EMIs bleeding your salary dry every month"
    - "Paying 18 to 24 percent interest when you qualify for 10 to 12 percent"
    - "Banks won't restructure their own loans — nobody is in your corner."
  - Reframe Reassurance: "You're not bad with money. You were sold the wrong loans."

### 3. `CaseStudies.tsx`
- **Purpose**: Social proof with numbers.
- **Content**:
  - Card 1: Rajesh S., IT Professional, Bengaluru (Before ₹1,12,000 [Red] -> After ₹68,000 [Green], save ₹44,000).
  - Card 2: Priya M., Government Employee, Delhi (Before ₹78,000 [Red] -> After ₹47,000 [Green], save ₹31,000).
  - Card 3: Amit K., Factory Manager, Pune (Before ₹55,000 [Red] -> After ₹33,000 [Green], save ₹22,000).

### 4. `HowItWorks.tsx`
- **Purpose**: Demystify the process.
- **Content**:
  - 3 Step Vertical/Grid layout:
    - Step 1: Fill the form, takes 90 seconds.
    - Step 2: We analyse your profile and WhatsApp you within 2 hours.
    - Step 3: We place you with the right bank and disburse in 48 hours.

### 5. `LeadForm.tsx` (Top priority on mobile)
- **Purpose**: Lead capture.
- **Content**:
  - Dropdown: Take-home salary (₹30,000 - ₹1,50,000+)
  - Dropdown: Total EMI per month (₹20,000 - ₹1,50,000+)
  - Dropdown: Number of loans/cards (2, 3, 4, 5+)
  - Text Input: City
  - Phone Input: WhatsApp number
  - CTA Button: "Get My Free EMI Analysis"
  - Privacy Text: "Zero spam. Your data stays private. We'll WhatsApp you within 2 hours."
- **Logic**: Form validates via zod, sets an inline success message without page reload, changes button state.

### 6. `WhyChooseUs.tsx`
- **Purpose**: Differentiators closing the trust gap.
- **Content**:
  - "We know which bank will approve your profile before we apply"
  - "WhatsApp-first — you will never have to chase us"
  - "48-hour disbursal on bank loans, same day on NBFC"
  - "We only take cases we can close."

### 7. `BottomCTA.tsx`
- **Purpose**: Final push to action at the bottom of the page.
- **Content**:
  - Header: "Stop Overpaying. Start Saving Today."
  - Buttons: Scroll to Lead Form (Primary), Open WhatsApp (Secondary).

### 8. `Footer.tsx`
- **Purpose**: Legal and passive trust.
- **Content**:
  - Trust block: RBI Regulated Partners, 40+ Banks/NBFCs, ₹500Cr+ Disbursed, 10+ Yrs Exp.
  - Copyright: © 2026 Fast Credit Deal.

### 9. `FloatingWhatsApp.tsx`
- **Purpose**: Persistent conversion channel.
- **Content**:
  - Fixed position at bottom-right.
  - Custom SVG WhatsApp Icon.
  - Pulsing green glow animation.
  - Link points to `https://wa.me/{config.whatsappNumber}?text={config.whatsappMessage}`
