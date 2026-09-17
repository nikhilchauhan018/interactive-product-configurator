# AI PROJECT CONTROL DOCUMENT

# Interactive Product Configurator --- Technical Test

## 0. DOCUMENT PURPOSE

This document is the permanent source of truth for the AI agent working
on this technical-test project.

The AI MUST read this document before making changes.

The AI MUST NOT rely only on conversation memory.

The AI MUST maintain this document and the project status files as the
project evolves.

If there is a conflict between an old conversation instruction and this
document, use the latest explicit project decision and update this
document accordingly.

The goal is to submit a working, polished, GitHub-ready and
live-demo-ready Interactive Product Configurator that satisfies the
complete technical-test specification.

This is an ENGINEERING assignment, not merely a visual cloning exercise.

------------------------------------------------------------------------

# 1. FINAL PROJECT GOAL

Build a reusable Interactive Product Configurator for a custom canopy
tent.

Reference product:

10x10 Logo Canopy Tent

Reference URL:

https://mvpvisuals.com/products/10x10-custom-canopy-tent

The application must allow a customer to configure a product, customize
printable surfaces, see the result in 2D and 3D, receive dynamically
calculated pricing from an API/service, save structured configuration
data, generate a production-summary PDF, and pass the configuration
toward Shopify when adding the product to cart.

The architecture must be reusable for other customizable products in the
future.

The evaluator should be able to understand from the code that the
developer knows:

-   React + TypeScript
-   scalable frontend architecture
-   state management
-   2D editing
-   Three.js / React Three Fiber
-   synchronized rendering
-   API abstraction
-   dynamic pricing
-   Shopify integration
-   structured configuration modeling
-   PDF generation
-   iframe embedding
-   responsive UI
-   performance
-   testing
-   maintainability

------------------------------------------------------------------------

# 2. ORIGINAL TECHNICAL TEST REQUIREMENTS

The assignment requires:

## Core

-   React + TypeScript
-   Replicate the main configurator experience from the reference
-   Different product sections can be customized independently
-   Support text
-   Support image uploads
-   Support colors
-   Support positioning
-   Include 2D editing
-   Include 3D preview
-   Synchronize changes between 2D and 3D
-   Store configuration as structured data
-   Architecture reusable for other products/configurators
-   Responsive
-   Reasonably optimized
-   Embeddable using iframe

## Shopify and Pricing

The configurator must be designed to integrate with Shopify.

Demonstrate a basic Shopify integration or mock integration where:

-   customer selections determine final price
-   different options/variants can have different prices
-   customization costs can be added dynamically
-   pricing is obtained through an API/service rather than hard-coded in
    UI
-   final configuration and price can be passed to Shopify when adding
    product to cart

Pricing/CRM API may be mocked for the technical test.

The integration architecture must make it easy to connect a real API
later.

## PDF

Generate a PDF/production summary containing:

-   final product configuration
-   relevant selections
-   customization details
-   preview(s)
-   final price
-   information suitable for later association with a Shopify order

## Deliverables

1.  GitHub/GitLab repository
2.  Working live demo
3.  Short README explaining architecture and key technical decisions

Time expectation:

Approximately 8--10 hours.

The evaluator is primarily evaluating engineering approach and
architecture, not expecting a complete production system.

------------------------------------------------------------------------

# 3. CURRENT PROJECT STATUS --- VERY IMPORTANT

At the time this document was created, the uploaded project ZIP contains
3 GLB 3D assets:

-   glb/Tent_5_5.glb
-   glb/Tent 6.5_6.5.glb
-   glb/Tent_8_8.glb

These are REAL project assets and must be inspected and considered
during implementation.

IMPORTANT:

The reference product is a 10x10 canopy tent.

The available ZIP assets appear to represent:

-   5x5
-   6.5x6.5
-   8x8

Do NOT falsely claim that any of these is a 10x10 model without
verifying the geometry/dimensions.

If a 10x10 GLB is not available, architect the application so that a
10x10 model can be added later through configuration without rewriting
the configurator engine.

The project should NOT discard these GLB assets and replace them with a
fake static image.

Before implementation, inspect:

-   GLB dimensions
-   mesh structure
-   node names
-   materials
-   textures
-   surface separation
-   frame geometry
-   roof geometry
-   wall geometry
-   whether individual surfaces can receive custom artwork
-   whether materials can be changed dynamically

CURRENT IMPLEMENTATION STATUS:

-   3D GLB assets available: YES
-   React application status: MUST BE INSPECTED
-   2D editor: MUST BE VERIFIED
-   3D renderer: MUST BE VERIFIED
-   configuration store: MUST BE VERIFIED
-   pricing API: MUST BE VERIFIED
-   Shopify integration: MUST BE VERIFIED
-   PDF generation: MUST BE VERIFIED
-   iframe support: MUST BE VERIFIED
-   tests: MUST BE VERIFIED
-   README: MUST BE VERIFIED

NEVER assume a feature is complete just because a button or file exists.

A feature is COMPLETE only if it works end-to-end.

------------------------------------------------------------------------

# 4. NON-NEGOTIABLE ARCHITECTURAL PRINCIPLE

There must be ONE canonical configuration state.

The 2D editor and 3D renderer MUST NOT maintain independent copies of
product configuration.

Use:

User Action \| v Configuration Store \| +----\> 2D Editor \| +----\> 3D
Renderer \| +----\> Pricing Service \| +----\> Configuration API \|
+----\> PDF Generator \| +----\> Shopify Adapter

The configuration store is the source of truth.

Example:

If a user moves a logo in the 2D editor:

2D Editor -\> Configuration Store -\> 3D Renderer updates

If the selected product surface or option changes:

Configuration Store -\> 2D Editor updates -\> 3D Renderer updates -\>
Pricing updates if required

Do not create:

-   separate 2D state
-   separate 3D state
-   separate pricing state containing duplicated business rules

------------------------------------------------------------------------

# 5. RECOMMENDED TECHNOLOGY

Frontend:

-   React
-   TypeScript
-   Vite
-   Tailwind CSS or clean CSS

State:

-   Zustand preferred
-   React Context + useReducer acceptable if architecture is cleaner

2D:

Prefer one of:

-   Fabric.js
-   Konva
-   React Konva

3D:

-   Three.js
-   React Three Fiber
-   @react-three/drei where useful

Backend/API:

-   Node.js
-   Express
-   TypeScript

Testing:

-   Vitest
-   React Testing Library
-   Playwright if practical

PDF:

Use a browser-compatible PDF library or a clean PDF service.

Storage:

Mock storage is acceptable.

------------------------------------------------------------------------

# 6. REUSABLE CONFIGURATOR ARCHITECTURE

The application MUST NOT become a one-off tent application.

Separate:

1.  Configurator Engine
2.  Product Definition
3.  Configuration State
4.  2D Renderer
5.  3D Renderer
6.  Pricing Service
7.  Configuration Service
8.  Upload Service
9.  PDF Service
10. Shopify Adapter

Concept:

Configurator Engine \| v Product Definition \| +--\> Options \| +--\>
Surfaces \| +--\> Customization capabilities \| +--\> Asset mapping \|
+--\> Pricing identifiers \| v Renderers + Services

The same engine should later support:

-   tents
-   banners
-   flags
-   table covers
-   signs
-   apparel
-   exhibition displays

------------------------------------------------------------------------

# 7. RECOMMENDED PROJECT STRUCTURE

Use or improve this structure:

src/ \| +-- app/ \| +-- routes/ \| +-- providers/ \| +-- config/ \| +--
components/ \| +-- configurator/ \| +-- editor2d/ \| +-- preview3d/ \|
+-- product/ \| +-- pricing/ \| +-- common/ \| +-- features/ \| +--
configuration/ \| +-- customization/ \| +-- product-options/ \| +--
pricing/ \| +-- cart/ \| +-- pdf/ \| +-- services/ \| +--
pricingService.ts \| +-- productService.ts \| +-- uploadService.ts \|
+-- shopifyService.ts \| +-- pdfService.ts \| +--
configurationService.ts \| +-- store/ \| +-- configuratorStore.ts \| +--
types/ \| +-- product.ts \| +-- configuration.ts \| +-- pricing.ts \|
+-- shopify.ts \| +-- utils/ \| +-- pages/

Backend if used:

server/ \| +-- routes/ +-- services/ +-- adapters/ +-- data/ +-- types/

Do not force this exact structure if a demonstrably better structure is
appropriate.

------------------------------------------------------------------------

# 8. PRODUCT CONFIGURATION MODEL

The configuration must be structured and serializable.

Example conceptual model:

{ "productId": "canopy-10x10", "variant": { "size": "10x10-frame" },
"walls": { "type": "3-wall", "printType": "double" }, "surfaces": {
"roof": { "backgroundColor": "#FFFFFF", "elements": \[\] }, "front": {
"backgroundColor": "#FFFFFF", "elements": \[\] }, "back": {
"backgroundColor": "#FFFFFF", "elements": \[\] }, "left": {
"backgroundColor": "#FFFFFF", "elements": \[\] }, "right": {
"backgroundColor": "#FFFFFF", "elements": \[\] } }, "pricing": {
"basePrice": 0, "optionAdjustments": 0, "customizationCost": 0, "total":
0, "currency": "USD" }, "metadata": { "configurationId": "","createdAt":
"","updatedAt": "" } }

Improve this schema where needed.

Do not store transient UI state inside the production configuration
unless necessary.

------------------------------------------------------------------------

# 9. PRODUCT OPTIONS

At minimum model:

SIZE

-   10'x10' Canopy with Frame
-   10'x10' Canopy Only (No Frame)

SIDE WALLS

-   None
-   1 x 10ft Side Wall --- Single Sided Print
-   3 x 10ft Side Walls --- Single Sided Print
-   1 x 10ft Side Wall --- Double Sided Print
-   3 x 10ft Side Wall --- Double Sided Print

HALF WALLS

-   None
-   Half Walls (Set of 2) --- Single Sided Print
-   Half Walls (Set of 2) --- Double Sided Print

IMPORTANT:

The exact currently available options/prices must be checked against the
reference page when implementing.

Do not invent claims about the real site.

The mock pricing service may use reasonable test prices, but those
values must live in the API/service layer and be clearly documented as
mock data.

------------------------------------------------------------------------

# 10. 2D EDITOR REQUIREMENTS

The 2D editor must support:

-   surface selection
-   background color
-   image upload
-   text creation
-   text editing
-   text color
-   font size
-   font family
-   movement
-   resizing
-   rotation
-   selection
-   deletion
-   undo/redo if practical

The editor must read from and update the central configuration.

The editor must not independently become the source of truth.

Use normalized coordinates where practical, for example:

x: 0.5 y: 0.5 width: 0.25 height: 0.25

This helps synchronize different canvas sizes and 3D surfaces.

------------------------------------------------------------------------

# 11. IMAGE UPLOAD

Support:

-   PNG
-   JPG/JPEG
-   WebP

Validate:

-   file type
-   reasonable file size

For the test:

-   object URL
-   base64
-   mock storage URL

are acceptable.

Create an abstraction such as:

uploadService.ts

so production storage can later be:

-   AWS S3
-   Cloudinary
-   Shopify Files
-   Supabase Storage

Do not claim production cloud upload if it is not actually implemented.

------------------------------------------------------------------------

# 12. TEXT CUSTOMIZATION

Support:

-   add
-   edit
-   delete
-   move
-   resize
-   rotate
-   font
-   font size
-   color

Example:

{ "id": "text-1", "type": "text", "surface": "front", "content": "MY
COMPANY", "x": 0.5, "y": 0.5, "fontSize": 32, "fontFamily": "Arial",
"color": "#000000", "rotation": 0 }

------------------------------------------------------------------------

# 13. COLOR CUSTOMIZATION

Each editable surface can have a background color.

Changes must immediately synchronize to:

-   2D
-   3D
-   saved configuration
-   PDF summary where relevant

------------------------------------------------------------------------

# 14. 3D PREVIEW

Use the supplied GLB assets where appropriate.

Use:

-   Three.js
-   React Three Fiber

Support:

-   camera rotation
-   zoom
-   different angles
-   product variant changes
-   frame visibility where supported
-   wall changes where supported
-   surface colors
-   custom artwork where technically supported

The 3D model does not need manufacturing-grade accuracy.

It must clearly communicate the configured product.

If GLB materials/nodes make direct artwork mapping difficult, implement
the cleanest practical approach and document the limitation.

------------------------------------------------------------------------

# 15. GLB ASSET ARCHITECTURE

Never hard-code GLB paths throughout components.

Use an asset registry/configuration.

Concept:

const productAssets = { "5x5": "glb/Tent_5_5.glb", "6.5x6.5": "glb/Tent
6.5_6.5.glb", "8x8": "glb/Tent_8_8.glb" }

The final implementation may use another format.

The important rule:

PRODUCT DEFINITION -\> ASSET ID -\> ASSET REGISTRY -\> GLB LOADER -\> 3D
RENDERER

If a 10x10 GLB is missing, do not fake the asset identity.

Document it.

------------------------------------------------------------------------

# 16. DYNAMIC PRICING

Pricing is a CRITICAL evaluation requirement.

Never put business pricing logic directly in UI components.

Use:

POST /api/pricing/calculate

Request example:

{ "productId": "canopy-10x10", "variant": { "size": "10x10-frame" },
"walls": { "type": "3-wall", "printType": "double" }, "customization": {
"numberOfImages": 1, "numberOfTextElements": 2 } }

Response:

{ "currency": "USD", "basePrice": 849, "optionAdjustments": 150,
"customizationCost": 25, "total": 1024, "lineItems": \[\] }

The frontend calls the pricing service.

The UI displays the result.

The UI does not independently calculate authoritative prices.

Pricing calls should be debounced where appropriate.

Do not call pricing on every text keystroke.

------------------------------------------------------------------------

# 17. PRICING ARCHITECTURE

Use an abstraction:

PricingService \| +--\> MockPricingService \| +--\> RealPricingService
(future)

This allows replacing mock pricing without changing UI components.

The mock API should be clearly documented.

------------------------------------------------------------------------

# 18. CONFIGURATION PERSISTENCE

Support:

POST /api/configurations

GET /api/configurations/:id

Example:

POST response:

{ "configurationId": "cfg_12345" }

The saved configuration should be recoverable.

For the test:

-   in-memory
-   JSON
-   mock database

is acceptable.

The architecture should allow MongoDB/PostgreSQL later.

------------------------------------------------------------------------

# 19. SHOPIFY INTEGRATION

Use an adapter pattern.

Recommended:

CartService \| v ShopifyAdapter \| +--\> MockShopifyAdapter \| +--\>
RealShopifyAdapter

The frontend must NEVER contain private Shopify Admin API credentials.

The add-to-cart flow:

User configures -\> Validate configuration -\> Calculate price -\> Save
configuration -\> Generate PDF -\> Prepare Shopify line item -\> Add to
cart -\> Show confirmation

Example metadata:

{ "variantId": "...", "quantity": 1, "properties": { "configuration_id":
"cfg_123", "configuration_summary": "...", "pdf_url": "...",
"customization": "Custom Logo + Text" } }

For the test, a mock Shopify service is acceptable.

It must be honest and clearly labeled as mock.

------------------------------------------------------------------------

# 20. PDF PRODUCTION SUMMARY

Generate a professional PDF.

Include:

-   product name
-   product ID
-   configuration ID
-   date/time
-   selected size
-   frame selection
-   wall selection
-   print type
-   surface colors
-   uploaded image information
-   text customization
-   position information
-   final price
-   currency
-   configuration summary
-   2D preview
-   3D preview where practical

The PDF should be designed so that it could later be attached to or
associated with a Shopify order.

------------------------------------------------------------------------

# 21. IFRAME EMBEDDING

The configurator must be usable through:

```{=html}
<iframe src="https://YOUR-DOMAIN/configurator/canopy-10x10" width="100%" height="900" frameborder="0">
```
```{=html}
</iframe>
```
The application must not assume it is always running as the top-level
site.

If practical, support postMessage events:

-   CONFIGURATION_UPDATED
-   PRICE_UPDATED
-   CONFIGURATION_SAVED
-   ADD_TO_CART

Do not expose sensitive data through postMessage.

------------------------------------------------------------------------

# 22. RESPONSIVE UI

Desktop:

Product Options \| Editor/Preview \| Summary

Mobile:

Product -\> Options -\> 2D/3D Preview -\> Customization -\> Price -\>
Add to Cart

The UI must not simply overflow on mobile.

Test common widths.

------------------------------------------------------------------------

# 23. UI QUALITY

The application should feel like a real commercial configurator.

Use:

-   clean spacing
-   clear hierarchy
-   professional typography
-   clear buttons
-   clear active states
-   good loading states
-   useful error messages
-   compact option cards
-   clear price summary
-   intuitive editor controls

Avoid unnecessary:

-   gradients
-   excessive animations
-   giant headings
-   clutter
-   decorative UI that reduces usability

The reference website should guide the overall product experience, but
the implementation must use original code.

------------------------------------------------------------------------

# 24. ERROR HANDLING

Handle:

-   failed image upload
-   pricing API failure
-   invalid configuration
-   PDF generation failure
-   Shopify failure
-   invalid option combinations
-   unsupported asset
-   3D loading failure

Do not silently fail.

Provide useful messages and recovery actions.

------------------------------------------------------------------------

# 25. LOADING STATES

Implement loading states for:

-   product loading
-   pricing calculation
-   image upload
-   3D model loading
-   PDF generation
-   save configuration
-   add to cart

The interface should never appear frozen.

------------------------------------------------------------------------

# 26. VALIDATION BEFORE CART

Before Add to Cart:

-   required options selected
-   configuration valid
-   uploads valid
-   pricing successfully calculated
-   configuration saved
-   required PDF generated if the flow requires it

Then enable cart action.

------------------------------------------------------------------------

# 27. PERFORMANCE

Pay attention to:

-   React re-renders
-   3D rendering cost
-   image size
-   canvas rendering
-   unnecessary API calls
-   large GLB loading
-   memory leaks from object URLs
-   mobile performance

Use:

-   React.memo where useful
-   useMemo/useCallback where useful
-   lazy loading
-   debouncing
-   optimized images
-   cleanup for object URLs
-   memoized 3D components

Do not optimize blindly.

Prefer measurable/simple optimizations.

------------------------------------------------------------------------

# 28. TESTING

Test important business logic.

At minimum:

1.  configuration creation
2.  configuration update
3.  option update
4.  pricing request/result
5.  configuration serialization
6.  validation
7.  Shopify cart payload
8.  PDF data generation

If practical:

-   component tests
-   integration tests
-   basic end-to-end test

------------------------------------------------------------------------

# 29. REQUIRED DOCUMENTATION FILES

Maintain:

/PROJECT_STATUS.md /ARCHITECTURE.md /API_SPEC.md
/CONFIGURATION_SCHEMA.md /SHOPIFY_INTEGRATION.md /PDF_SPEC.md
/QA_CHECKLIST.md /README.md

These files are part of the engineering deliverable.

------------------------------------------------------------------------

# 30. PROJECT_STATUS.md RULE

PROJECT_STATUS.md is the live project control panel.

Use this structure:

# Project Status

## Overall Status

## Completed

## Partial

## Not Started

## Blocked

## Current Phase

## Current Task

## Last Verified

## Known Bugs

## Architecture Decisions

## API Status

## 2D Status

## 3D Status

## Pricing Status

## Shopify Status

## PDF Status

## iframe Status

## Responsive Status

## Testing Status

## Final Submission Checklist

Never mark PASS unless actually verified.

------------------------------------------------------------------------

# 31. DEVELOPMENT PHASES

Do NOT attempt random implementation.

Follow these phases.

## Phase 0 --- Inspection

-   inspect repository
-   inspect all files
-   inspect package.json
-   inspect GLB assets
-   inspect existing source
-   inspect reference product
-   identify existing features
-   identify missing features

Deliver:

gap analysis

Do not rewrite the project yet.

## Phase 1 --- Architecture

-   configuration types
-   product schema
-   service interfaces
-   store
-   asset registry

## Phase 2 --- Product UI

-   product selection
-   options
-   summary
-   responsive shell

## Phase 3 --- Pricing API

-   mock API
-   pricing service
-   dynamic total
-   line items

## Phase 4 --- 2D Editor

-   surfaces
-   colors
-   images
-   text
-   positioning
-   transformations

## Phase 5 --- 3D

-   GLB loading
-   camera
-   controls
-   material changes
-   product option changes

## Phase 6 --- Synchronization

-   central state
-   2D -\> state -\> 3D
-   option -\> state -\> 2D/3D
-   color synchronization

## Phase 7 --- Persistence

-   configuration API
-   configuration ID
-   save/load

## Phase 8 --- PDF

-   preview
-   summary
-   price
-   configuration ID

## Phase 9 --- Shopify

-   adapter
-   mock cart
-   metadata
-   final price/configuration flow

## Phase 10 --- iframe

-   embed route
-   postMessage where useful

## Phase 11 --- Quality

-   responsive
-   performance
-   error handling
-   loading states
-   accessibility basics

## Phase 12 --- Testing

-   unit
-   integration
-   end-to-end where practical

## Phase 13 --- Documentation

-   README
-   architecture
-   API
-   schema
-   Shopify
-   PDF
-   QA

## Phase 14 --- Final QA

Compare every requirement against the implementation.

Fix all feasible PARTIAL/FAIL items.

------------------------------------------------------------------------

# 32. AI EXECUTION RULES

The AI must follow these rules.

RULE 1: Inspect before modifying.

RULE 2: Do not delete working code without understanding it.

RULE 3: Do not create duplicate implementations of the same feature.

RULE 4: Do not hard-code pricing in React UI.

RULE 5: Do not create independent 2D and 3D configuration states.

RULE 6: Do not fake functionality.

RULE 7: If something is mocked, clearly label it as mocked.

RULE 8: Do not expose secrets.

RULE 9: Do not claim a feature works until it has been tested.

RULE 10: Update PROJECT_STATUS.md after every major phase.

RULE 11: When uncertain, inspect the project files and documentation
before making assumptions.

RULE 12: Do not replace real GLB assets with placeholders unless
necessary.

RULE 13: Do not add unnecessary libraries when existing dependencies can
solve the problem.

RULE 14: Prefer simple maintainable architecture over unnecessary
complexity.

RULE 15: Do not optimize for code volume. Optimize for working behavior
and engineering quality.

------------------------------------------------------------------------

# 33. NO-FAKE-IMPLEMENTATION POLICY

These are NOT acceptable:

-   button that does nothing
-   static image pretending to be 3D
-   hard-coded final price in UI
-   fake API call hidden inside UI
-   fake Shopify claim
-   PDF button that does not generate a PDF
-   image upload button that does not store/use the image
-   configuration data that does not represent actual UI state
-   fake synchronization

If a feature cannot be completed because of a genuine technical
limitation:

1.  document the limitation
2.  implement the strongest reasonable alternative
3.  isolate the limitation behind an interface
4.  explain how production would replace it

------------------------------------------------------------------------

# 34. API CONTRACT

Suggested endpoints:

GET /api/products/:productId

POST /api/pricing/calculate

POST /api/configurations

GET /api/configurations/:id

POST /api/uploads

POST /api/shopify/cart

POST /api/pdf

Exact implementation can differ.

The important requirement is separation between frontend and
service/business logic.

------------------------------------------------------------------------

# 35. ENVIRONMENT VARIABLES

Create:

.env.example

Possible values:

VITE_API_URL= VITE_SHOPIFY_STORE_DOMAIN= VITE_SHOPIFY_PUBLIC_TOKEN=

Never commit:

.env

Never expose:

Shopify Admin API secret private backend credentials storage private
keys

------------------------------------------------------------------------

# 36. GIT REPOSITORY QUALITY

Do not commit:

-   node_modules
-   .env
-   temporary files
-   build output unless specifically required
-   unnecessary large generated files
-   debug artifacts

Create a proper .gitignore.

Use clear naming.

Keep code formatted.

Remove unnecessary console logs before final submission.

------------------------------------------------------------------------

# 37. README REQUIREMENTS

README must explain:

# Interactive Product Configurator

## Overview

## Reference Product

## Demo

## Features

## Tech Stack

## Architecture

## Architecture Diagram

## Data Flow

## Configuration Model

## 2D/3D Synchronization

## Dynamic Pricing

## API Architecture

## Shopify Integration

## PDF Generation

## iframe Embedding

## Project Structure

## Local Setup

## Environment Variables

## Testing

## Performance

## Scalability

## Technical Decisions

## Known Limitations

Do not exaggerate.

------------------------------------------------------------------------

# 38. TARGET USER JOURNEY

The final flow should be:

1.  Open configurator
2.  View product
3.  Select product size/variant
4.  Select wall options
5.  Select print options
6.  Select a surface
7.  Change surface color
8.  Upload logo
9.  Add text
10. Position logo/text
11. View 2D result
12. View synchronized 3D result
13. Review options
14. View dynamic price
15. Save configuration
16. Generate production PDF
17. Add to Shopify/mock cart
18. Receive confirmation

This flow must be tested before final submission.

------------------------------------------------------------------------

# 39. FINAL ACCEPTANCE CRITERIA

The project is NOT finished merely because it starts.

The project is considered ready only when:

CORE

\[ \] React \[ \] TypeScript \[ \] Responsive \[ \] Product options \[
\] Independent surfaces \[ \] Text \[ \] Image upload \[ \] Colors \[ \]
Positioning \[ \] 2D editor \[ \] 3D preview \[ \] 2D/3D synchronization
\[ \] Structured configuration \[ \] Reusable architecture \[ \] iframe

PRICING

\[ \] API/service pricing \[ \] Variant pricing \[ \] Option pricing \[
\] Customization pricing \[ \] Dynamic total \[ \] UI does not own
pricing rules

SHOPIFY

\[ \] Adapter \[ \] Mock integration \[ \] Variant mapping \[ \]
Configuration metadata \[ \] Final price handling \[ \] Cart flow \[ \]
No private secrets in frontend

PDF

\[ \] Production summary \[ \] Configuration ID \[ \] Selections \[ \]
Customization details \[ \] Preview \[ \] Price \[ \]
Order-association-ready structure

ENGINEERING

\[ \] Clean architecture \[ \] TypeScript types \[ \] Error handling \[
\] Loading states \[ \] Validation \[ \] Tests \[ \] Performance
considerations \[ \] README \[ \] Architecture docs \[ \] API docs \[ \]
Schema docs \[ \] Shopify docs \[ \] PDF docs \[ \] QA checklist

------------------------------------------------------------------------

# 40. FINAL QA TABLE

Before declaring completion, create:

  Requirement          Status              Evidence    Remaining Work
  -------------------- ------------------- ----------- ----------------
  React + TypeScript   PASS/PARTIAL/FAIL   file/path   ...
  2D editor            PASS/PARTIAL/FAIL   file/path   ...
  3D preview           PASS/PARTIAL/FAIL   file/path   ...
  2D/3D sync           PASS/PARTIAL/FAIL   file/path   ...
  Dynamic pricing      PASS/PARTIAL/FAIL   file/path   ...
  Shopify              PASS/PARTIAL/FAIL   file/path   ...
  PDF                  PASS/PARTIAL/FAIL   file/path   ...
  iframe               PASS/PARTIAL/FAIL   file/path   ...
  Responsive           PASS/PARTIAL/FAIL   file/path   ...
  Testing              PASS/PARTIAL/FAIL   file/path   ...

After creating the table:

-   fix all feasible FAIL items
-   fix all feasible PARTIAL items
-   run build
-   run tests
-   verify main user journey
-   update status

------------------------------------------------------------------------

# 41. FINAL REPORT TO THE DEVELOPER

When the project is finally complete, provide:

1.  Implementation summary
2.  Architecture summary
3.  Configuration model
4.  2D/3D synchronization explanation
5.  Pricing architecture
6.  Shopify architecture
7.  PDF architecture
8.  iframe architecture
9.  GLB asset usage
10. Testing performed
11. Performance work
12. Known limitations
13. How to run
14. How to deploy
15. How to connect real pricing API
16. How to connect real Shopify
17. What remains mocked

Do not say "production ready" unless the implementation actually
supports that claim.

------------------------------------------------------------------------

# 42. FINAL PRINCIPLE

The strongest submission is NOT the one with the most code.

The strongest submission is the one where an evaluator can clearly see:

ONE CONFIGURATION MODEL \| +--\> 2D \| +--\> 3D \| +--\> PRICING API \|
+--\> PERSISTENCE \| +--\> PDF \| +--\> SHOPIFY

with clean interfaces between each system.

Build this as a reusable configurator ENGINE with a canopy tent PRODUCT
DEFINITION.

Do not build a hard-coded tent page.

------------------------------------------------------------------------

# 43. START INSTRUCTION FOR AI

START NOW.

First do NOT start writing a large amount of code.

Perform these exact steps:

STEP 1: Inspect every uploaded project file.

STEP 2: Inspect the three GLB assets.

STEP 3: Inspect their dimensions, nodes, meshes, materials and textures.

STEP 4: Inspect the existing source code if present.

STEP 5: Inspect package.json and current dependencies.

STEP 6: Inspect the reference product page.

STEP 7: Create a detailed gap analysis.

STEP 8: Create/update PROJECT_STATUS.md.

STEP 9: Create the architecture and implementation plan.

STEP 10: Only then begin implementation.

At every stage, preserve working functionality.

After each major phase, update PROJECT_STATUS.md.

Never silently skip a requirement.

The final target is a polished technical-test submission with:

-   working live demo
-   clean GitHub repository
-   strong architecture
-   working 2D customization
-   working 3D preview
-   synchronized 2D/3D state
-   API-driven dynamic pricing
-   Shopify mock/adapter integration
-   production-summary PDF
-   iframe embedding
-   responsive UX
-   documentation
-   tests
-   honest limitations
