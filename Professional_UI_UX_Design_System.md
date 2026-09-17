# PROFESSIONAL UI/UX DESIGN SYSTEM

## Interactive Product Configurator --- Technical Test

## 1. PURPOSE

This document is a visual-design specification for the Interactive
Product Configurator.

It exists because the application must not look like a generic
AI-generated dashboard, template, or collection of default cards.

The target is a professional e-commerce product customization experience
with a strong product-preview focus.

IMPORTANT:

Do NOT change the established technical architecture or folder
structure.

This document controls:

-   visual direction
-   typography
-   colors
-   spacing
-   component hierarchy
-   interaction states
-   layout
-   responsive behavior
-   2D/3D presentation
-   visual polish

It does NOT replace the existing project-control or architecture
documents.

------------------------------------------------------------------------

# 2. DESIGN RESEARCH BASIS

The design direction is based on:

1.  The current MVP Visuals configurator experience.
2.  Shopify design-system principles.
3.  Modern e-commerce configurator patterns.
4.  Design-token based systems.
5.  Accessibility and contrast principles.

The current MVP Visuals configurator uses a clear staged flow:

Setup → Branding → Quote

and separates:

-   product size
-   setup type
-   walls
-   quantity
-   branding
-   logo upload
-   colors
-   styles
-   quote

This is a useful information architecture for the test.
citeturn0search0

The current MVP Visuals product page emphasizes a premium custom-product
story: unlimited colors/designs, branded panels, artwork proofing, and
clear product/package choices. The configurator should therefore feel
like a premium product-builder rather than an admin application.
citeturn0search5turn0search2

Shopify's design guidance emphasizes purposeful color, clear hierarchy,
contrast, consistent typography, spacing and semantic component
organization. citeturn0search4turn0search8turn0search9

Shopify design tokens demonstrate a restrained token-based approach to
typography, spacing, borders, surfaces and interaction states. Use the
principle, not a literal copy of Shopify's visual identity.
citeturn0search1turn0search7

------------------------------------------------------------------------

# 3. CORE VISUAL DIRECTION

The design direction is:

## "Editorial E-commerce + Precision Configurator"

It should feel:

-   premium
-   calm
-   precise
-   product-focused
-   trustworthy
-   modern
-   technical without looking like developer software

It should NOT feel:

-   like an admin dashboard
-   like a SaaS analytics page
-   like a generic Tailwind template
-   like a neon AI application
-   like a glassmorphism template
-   like a collection of oversized rounded cards
-   like an automatically generated UI

------------------------------------------------------------------------

# 4. DESIGN PRINCIPLE

The product is the hero.

The UI should support the product, not compete with it.

Visual hierarchy:

1.  Product preview
2.  Current configuration
3.  Primary configuration controls
4.  Price
5.  Secondary actions

The 3D/2D workspace should visually dominate the central area.

------------------------------------------------------------------------

# 5. COLOR SYSTEM

## Primary recommendation

Use a restrained warm-neutral palette with one deep brand accent.

Do NOT use the common AI-template combination:

-   purple
-   blue gradient
-   cyan
-   glass panels
-   neon accents

Use a more distinctive commercial palette.

### Base colors

``` text
Canvas / page background:
#F6F4EF

Primary surface:
#FFFFFF

Secondary surface:
#FBFAF7

Border:
#E5E1D8

Strong border:
#D6D0C5

Primary text:
#171717

Secondary text:
#625F58

Muted text:
#8A867E
```

### Brand accent

``` text
Deep Forest:
#183C34
```

Use this for:

-   primary CTA
-   active controls
-   selected states
-   key links
-   important interaction states

### Secondary accent

``` text
Warm Clay:
#B66A45
```

Use sparingly for:

-   subtle emphasis
-   optional highlights
-   small badges
-   important non-primary visual cues

Do NOT use the secondary accent everywhere.

### Success

``` text
#2F6B4F
```

### Warning

``` text
#A66A1F
```

### Error

``` text
#B5473C
```

### Information

``` text
#365D70
```

------------------------------------------------------------------------

# 6. COLOR USAGE RULE

Follow a 70 / 20 / 10 visual balance approximately:

70%: neutral surfaces and background

20%: text, borders and secondary UI

10%: brand/interactive color

The accent should feel intentional.

Do not color every card, button, label and icon.

------------------------------------------------------------------------

# 7. IMPORTANT COLOR RULE

The customer's actual tent colors are DIFFERENT from the application's
UI colors.

The application UI uses the design system above.

The product customization system allows the CUSTOMER to select product
colors independently.

Never mix the UI theme with the customer's product artwork.

Example:

UI: warm neutral + forest

Tent: bright red + blue

This is valid.

------------------------------------------------------------------------

# 8. TYPOGRAPHY

Use a professional sans-serif system.

Preferred:

``` text
Inter
```

Fallback:

``` text
-apple-system
BlinkMacSystemFont
"Segoe UI"
Roboto
sans-serif
```

Do not use:

-   futuristic fonts
-   overly decorative fonts
-   multiple unrelated font families

Use ONE primary family.

------------------------------------------------------------------------

# 9. TYPE SCALE

Use a restrained type scale.

### Display / Product Title

Desktop:

32px line-height: 38px weight: 600

Mobile:

26px line-height: 32px weight: 600

### Section Heading

20px line-height: 26px weight: 600

### Subsection

16px line-height: 22px weight: 600

### Body

14px line-height: 21px weight: 400

### Secondary body

13px line-height: 19px weight: 400

### Small metadata

12px line-height: 16px weight: 500

### Price

28px line-height: 32px weight: 650

### Button

14px line-height: 20px weight: 600

Do not make every heading huge.

------------------------------------------------------------------------

# 10. LETTER SPACING

Use normal or slightly tight tracking.

Do NOT use:

letter-spacing: 0.1em

on everything.

Uppercase labels may use:

0.04em

only when useful.

------------------------------------------------------------------------

# 11. SPACING SYSTEM

Use a 4px base unit.

Recommended values:

``` text
4
8
12
16
20
24
32
40
48
64
```

Most controls should use:

12--20px

Most section spacing:

24--32px

Large page sections:

40--64px

Do not randomly use 13px, 17px, 27px, 31px etc. unless required.

------------------------------------------------------------------------

# 12. BORDER RADIUS

Avoid the "everything is a giant rounded card" AI look.

Recommended:

Small controls: 6px

Inputs: 7px

Cards: 10px

Main panels: 12px

Pills: 999px

Do not use:

24px / 32px radius on every component.

------------------------------------------------------------------------

# 13. SHADOWS

Use shadows very sparingly.

Preferred:

Subtle:

0 1px 2px rgba(0,0,0,0.04)

Medium:

0 4px 12px rgba(0,0,0,0.06)

Do not make every panel float.

Use borders for most structure.

------------------------------------------------------------------------

# 14. PAGE STRUCTURE

Desktop:

┌───────────────────────────────────────────────────────────────┐ │
Brand Product / Progress Save Cart │
├───────────────────────────────────────────────────────────────┤ │ │ │
OPTIONS PRODUCT WORKSPACE SUMMARY │ │ 280--320px Flexible / dominant
300--340px │ │ │ │ Setup 2D / 3D preview Configuration │ │ Walls large
product Price │ │ Branding canvas CTA │ │ │
└───────────────────────────────────────────────────────────────┘

The center workspace should receive the most visual attention.

------------------------------------------------------------------------

# 15. THREE-COLUMN BALANCE

Suggested desktop widths:

Left: 280--320px

Center: flexible

Right: 300--340px

Do not make the sidebars wider than the product preview.

------------------------------------------------------------------------

# 16. HEADER

Header height:

64--72px

Use:

-   small brand/product mark
-   product title
-   progress/status
-   save state
-   cart/price action if useful

Avoid a giant marketing header.

The user came to configure a product.

------------------------------------------------------------------------

# 17. CONFIGURATION FLOW

Use a clear staged flow.

Recommended:

``` text
01 Setup
02 Design
03 Review
```

This is inspired by the reference configurator's staged
setup/branding/quote organization. citeturn0search0

Do not create 8--10 unnecessary steps.

Three major stages are enough.

------------------------------------------------------------------------

# 18. STEP INDICATOR

Use a restrained step indicator.

Example:

01 Setup ───── 02 Design ───── 03 Review

Current step: deep forest

Completed: subtle dark/green indicator

Future: neutral border/text

Do not use bright rainbow colors.

------------------------------------------------------------------------

# 19. PRODUCT OPTIONS

Option controls should look like premium commerce controls.

Example:

SIZE

┌────────────────────────────┐ │ 10' × 10' │ │ Canopy + Frame │ │ From
\$849 │ └────────────────────────────┘

Selected:

-   forest border
-   subtle tinted background
-   checkmark or selected indicator

Unselected:

-   neutral border
-   white background

Avoid huge colored cards.

------------------------------------------------------------------------

# 20. RADIO / OPTION DESIGN

Use:

-   label
-   short description
-   optional price delta

Example:

○ Canopy only Top only

● Canopy + frame Complete setup +\$150

The selected state must be visible without relying only on color.

------------------------------------------------------------------------

# 21. PRODUCT PREVIEW

This is the hero.

Background:

#F0EEE8

or a similar neutral preview surface.

Do NOT use a busy gradient.

The 3D tent should have:

-   sufficient breathing room
-   subtle floor/shadow
-   clean lighting
-   clear silhouette

Use a soft neutral environment.

------------------------------------------------------------------------

# 22. 3D CAMERA

Default camera should show a useful 3/4 perspective.

Avoid:

-   extreme perspective
-   object too close
-   object too small
-   awkward clipping

The first frame should immediately communicate:

"This is a customizable canopy tent."

Provide:

-   rotate
-   zoom
-   reset

controls.

Keep controls small and unobtrusive.

------------------------------------------------------------------------

# 23. 2D EDITOR

The 2D editor should feel like a focused design tool.

Do NOT turn it into Photoshop.

Show only the controls necessary for the assignment.

Toolbar:

\[Select\] \[Text\] \[Image\] \[Color\] \[Undo\] \[Redo\]

Secondary controls appear when an element is selected.

This reduces cognitive load.

------------------------------------------------------------------------

# 24. SURFACE NAVIGATION

Use a horizontal or compact surface selector:

Roof Front Back Left Right

Selected surface:

forest text/border

Unselected:

neutral

Do not use five large cards.

------------------------------------------------------------------------

# 25. TEXT TOOL

When text is selected:

Text \[\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\]

Font \[Inter ▼\]

Size \[ 32 \]

Color \[● #171717\]

Alignment \[Left\] \[Center\] \[Right\]

Keep the controls compact.

------------------------------------------------------------------------

# 26. IMAGE TOOL

Upload area should be compact but polished.

Example:

┌──────────────────────────────┐ │ + Add logo or graphic │ │ PNG, JPG,
SVG, WebP │ └──────────────────────────────┘

After upload:

\[thumbnail\] logo.png

\[Replace\] \[Remove\]

The reference configurator explicitly supports logo/graphic upload and
common image formats, so the interaction should feel natural for this
product. citeturn0search0

------------------------------------------------------------------------

# 27. COLOR CONTROL

Provide:

Primary color \[ swatch \] #183C34

Secondary color \[ swatch \] #FFFFFF

Do not show 30 color chips by default.

Allow custom color input.

The reference product experience also treats brand colors as a central
part of customization. citeturn0search0turn0search2

------------------------------------------------------------------------

# 28. PRICE SUMMARY

Right panel:

CONFIGURATION

10' × 10' Canopy + Frame

3 Side Walls Double-sided print

Customization Logo + Text

────────────────────

Estimated total

\$1,224

\[ Add to Cart \]

The price is visually important but should not dominate the entire
interface.

------------------------------------------------------------------------

# 29. PRICE TYPOGRAPHY

Use:

label: 12--13px

line item: 14px

total label: 14px / 600

total: 28px / 650

Avoid:

72px prices

The product is the hero, not the price.

------------------------------------------------------------------------

# 30. CTA

Primary CTA:

background: #183C34

text: #FFFFFF

height: 44--48px

radius: 7px

weight: 600

Example:

Add to Cart

Secondary:

white/neutral background dark border/text

Avoid:

gradient buttons

glowing buttons

oversized pill buttons

------------------------------------------------------------------------

# 31. BUTTON HIERARCHY

Primary:

Add to Cart Generate PDF

Secondary:

Continue Save Configuration

Tertiary:

Reset Back Cancel

Destructive:

Remove

Do not make all buttons look equally important.

------------------------------------------------------------------------

# 32. FORM CONTROLS

Inputs:

Height: 40--44px

Border: #D6D0C5

Background: #FFFFFF

Text: #171717

Focus: 2px or equivalent accessible focus indicator using the brand
color.

Placeholder: #8A867E

Avoid excessive shadows.

------------------------------------------------------------------------

# 33. LABELS

Labels:

13px weight 600 color #625F58

Do not use tiny 10px labels.

The user should not need to zoom to understand the configurator.

------------------------------------------------------------------------

# 34. CARDS

Use cards only where grouping helps.

Good:

-   product option groups
-   upload area
-   summary

Bad:

-   card inside card inside card
-   every button inside a card
-   every section floating separately

Prefer flat layout with borders.

------------------------------------------------------------------------

# 35. ICONS

Use ONE icon family.

Lucide is acceptable.

Icons should generally be:

16--20px

Avoid mixing:

-   emoji
-   random SVG styles
-   Font Awesome
-   Lucide
-   custom icons

all together.

Do NOT use emojis as UI icons.

------------------------------------------------------------------------

# 36. MICRO-INTERACTIONS

Use subtle transitions:

100--180ms

Examples:

-   selected option
-   button hover
-   panel transition
-   price update
-   upload completion

Do not animate the entire page.

Do not use excessive Framer Motion.

Motion should communicate state.

------------------------------------------------------------------------

# 37. LOADING

3D:

small centered loader + "Loading preview"

Pricing:

small inline spinner beside price

PDF:

button:

Generating PDF...

Upload:

progress/loading indicator

Avoid full-screen spinners for small operations.

------------------------------------------------------------------------

# 38. ERROR DESIGN

Use:

icon + message + action

Example:

Unable to calculate the latest price.

\[Try again\]

Do not use giant red alert boxes.

------------------------------------------------------------------------

# 39. SUCCESS DESIGN

Example:

Configuration saved

Configuration ID: CFG-10482

\[Download PDF\]

Keep it quiet and professional.

------------------------------------------------------------------------

# 40. MOBILE DESIGN

At:

390px

the interface must remain comfortable.

Do NOT simply shrink desktop.

Use:

Preview ↓ Current Step ↓ Controls ↓ Summary

The 3D preview should remain large enough to understand.

------------------------------------------------------------------------

# 41. MOBILE STICKY ACTION

At the bottom:

┌────────────────────────────────────┐ │ Total \$1,224 \[Add to Cart\] │
└────────────────────────────────────┘

Ensure it does not cover content.

Add sufficient bottom padding.

------------------------------------------------------------------------

# 42. RESPONSIVE BREAKPOINTS

Recommended:

Mobile: \< 640px

Tablet: 640--1023px

Desktop: ≥ 1024px

Large desktop: ≥ 1440px

Do not design separate arbitrary breakpoints for every component.

------------------------------------------------------------------------

# 43. ACCESSIBILITY

The interface must maintain readable contrast.

Do not rely on color alone for:

-   selected state
-   errors
-   success
-   required fields

Use:

-   border
-   icon
-   text
-   state changes

Shopify's guidance explicitly emphasizes adequate contrast and not
relying on color alone for context. citeturn0search8turn0search4

------------------------------------------------------------------------

# 44. DESIGN TOKENS

Create central tokens.

Example:

``` css
:root {
  --color-bg: #F6F4EF;
  --color-surface: #FFFFFF;
  --color-surface-subtle: #FBFAF7;

  --color-text: #171717;
  --color-text-secondary: #625F58;
  --color-text-muted: #8A867E;

  --color-border: #E5E1D8;
  --color-border-strong: #D6D0C5;

  --color-primary: #183C34;
  --color-secondary: #B66A45;

  --color-success: #2F6B4F;
  --color-warning: #A66A1F;
  --color-error: #B5473C;
  --color-info: #365D70;

  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 10px;
  --radius-xl: 12px;
  --radius-full: 999px;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
}
```

Do not scatter arbitrary hex values throughout components.

------------------------------------------------------------------------

# 45. COMPONENT DESIGN SYSTEM

Create reusable primitives:

Button Input Select OptionCard Section Divider Badge Tooltip Modal
Drawer Tabs StepIndicator PriceRow ColorSwatch UploadArea IconButton

These should live in the shared UI layer.

Feature-specific components should compose them.

------------------------------------------------------------------------

# 46. DESIGN SYSTEM RULE

Do not blindly use a component library's default theme.

If using:

-   Tailwind
-   shadcn
-   Radix
-   Material UI
-   another UI library

customize the visual tokens to this design specification.

The final result should have a coherent visual identity.

------------------------------------------------------------------------

# 47. AVOIDING "AI-GENERATED LOOK"

Do NOT use all of these common patterns together:

-   purple-to-blue gradients
-   giant rounded cards
-   excessive glassmorphism
-   excessive shadows
-   neon blue buttons
-   huge headings
-   dashboard sidebar
-   floating metric cards
-   decorative blobs
-   excessive animations
-   rainbow color palette
-   random icons
-   oversized pills

These patterns frequently make a generated UI feel generic.

Instead use:

-   neutral canvas
-   strong typography
-   restrained borders
-   one deep accent
-   deliberate whitespace
-   product-focused composition
-   consistent spacing
-   small purposeful interactions

------------------------------------------------------------------------

# 48. E-COMMERCE CONTENT HIERARCHY

The interface should answer these questions in order:

1.  What am I configuring?
2.  What does it look like?
3.  What options do I have?
4.  What am I currently customizing?
5.  What will it cost?
6.  What happens when I add it to cart?

Do not make users hunt for these answers.

------------------------------------------------------------------------

# 49. PRODUCT INFORMATION

Use concise product information.

Example:

10' × 10' Logo Canopy Tent

Custom printed canopy with optional frame and wall configurations.

Avoid huge marketing paragraphs inside the configurator.

The reference product itself emphasizes concrete product/package
information and configuration choices, so keep product information
useful rather than decorative. citeturn0search5

------------------------------------------------------------------------

# 50. REVIEW STEP

Review should be visually calm.

Show:

Product 10' × 10' Canopy + Frame

Walls 3 Side Walls

Branding Logo + Text

Colors Forest / White

Price \$1,224

Preview: 2D + 3D

CTA: Generate PDF Add to Cart

------------------------------------------------------------------------

# 51. PDF VISUAL CONSISTENCY

The PDF should use the same visual language:

-   same typography
-   same primary accent
-   same spacing logic
-   same section hierarchy

Do not make the PDF look like an unrelated report.

------------------------------------------------------------------------

# 52. FINAL VISUAL QA

Before completion, inspect:

1440px 1280px 1024px 768px 480px 390px

Check:

-   typography
-   spacing
-   alignment
-   preview size
-   sidebar balance
-   selected states
-   buttons
-   price
-   upload area
-   editor controls
-   mobile sticky CTA
-   3D loading
-   error states
-   empty states

------------------------------------------------------------------------

# 53. FINAL "DESIGNER TEST"

Ask these questions while reviewing the UI:

1.  Does the product preview immediately attract attention?
2.  Can a first-time user understand what to do without explanation?
3.  Is the selected option unmistakable?
4.  Is the price easy to find?
5.  Does the interface feel like an e-commerce product builder?
6.  Are there too many cards?
7.  Are there too many colors?
8.  Are there too many rounded corners?
9.  Are shadows being overused?
10. Does anything look like a generic AI template?
11. Does mobile feel intentionally designed?
12. Does the 2D editor feel focused rather than overloaded?
13. Does the 3D preview feel premium?
14. Are all interactions visually consistent?

Fix anything that fails.

------------------------------------------------------------------------

# 54. DO NOT CHANGE CORE ARCHITECTURE

This document is ONLY for visual design.

Do NOT use it as a reason to change:

-   folder architecture
-   API architecture
-   configuration schema
-   pricing architecture
-   Shopify adapter
-   backend structure
-   2D/3D synchronization model

Only change those if an actual functional bug requires it.

------------------------------------------------------------------------

# 55. FINAL AI INSTRUCTION

The existing project architecture is already defined.

Do NOT redesign the architecture.

Do NOT create a new project.

Do NOT replace working functionality.

Perform a dedicated professional UI/UX refinement pass.

First inspect the current UI.

Then compare it against this document.

Then identify:

-   inconsistent colors
-   generic AI patterns
-   poor spacing
-   weak hierarchy
-   oversized components
-   bad typography
-   poor responsive behavior
-   weak 2D editor presentation
-   weak 3D presentation
-   weak pricing presentation
-   inconsistent states

Then fix them systematically.

The final interface must look intentionally designed by a professional
product designer.

The result should feel like a real premium e-commerce configurator, not
a generic AI-generated dashboard.

Preserve the functionality and architecture already implemented.

Only after visual QA is complete should the project be considered
visually finished.
