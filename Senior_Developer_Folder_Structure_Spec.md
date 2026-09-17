# SENIOR DEVELOPER FOLDER STRUCTURE SPECIFICATION

## Interactive Product Configurator --- Frontend + Backend

------------------------------------------------------------------------

# 1. PURPOSE

This document defines the required repository organization for the
Interactive Product Configurator technical test.

The project MUST be organized like a senior engineer would structure a
maintainable full-stack application.

The goal is:

-   small focused files
-   clear separation of responsibilities
-   reusable modules
-   easy testing
-   easy replacement of mock services
-   easy onboarding for another developer
-   scalable architecture for future products

DO NOT put hundreds of lines into one file when the responsibility can
naturally be split into multiple files.

DO NOT create folders only for the sake of creating folders. Every
folder must have a clear responsibility.

The project has TWO major applications:

1.  Frontend
2.  Backend

Keep them clearly separated.

------------------------------------------------------------------------

# 2. ROOT STRUCTURE

Use this as the target repository structure:

interactive-product-configurator/ │ ├── frontend/ │ ├── backend/ │ ├──
shared/ │ ├── docs/ │ ├── tests/ │ ├── scripts/ │ ├── .github/ │ ├──
README.md ├── PROJECT_STATUS.md ├── QA_CHECKLIST.md ├── ARCHITECTURE.md
├── .gitignore ├── .env.example ├── package.json └── README.md

------------------------------------------------------------------------

# 3. ROOT FOLDER RESPONSIBILITIES

## frontend/

Contains ONLY browser/client-side application code.

## backend/

Contains ONLY server/API code.

## shared/

Contains types/schemas/contracts that genuinely need to be shared
between frontend and backend.

Do NOT put business logic here.

## docs/

Contains architecture and engineering documentation.

## tests/

Contains cross-system/end-to-end tests if they are not naturally located
beside their source modules.

## scripts/

Contains developer/build/asset utility scripts.

## .github/

Contains GitHub Actions and repository automation.

------------------------------------------------------------------------

# 4. FRONTEND STRUCTURE

Target:

frontend/ │ ├── public/ │ ├── models/ │ │ ├── Tent_5_5.glb │ │ ├──
Tent_6.5_6.5.glb │ │ └── Tent_8_8.glb │ │ │ ├── fonts/ │ └── icons/ │
├── src/ │ │ │ ├── app/ │ │ ├── App.tsx │ │ ├── main.tsx │ │ ├── routes/
│ │ │ ├── AppRoutes.tsx │ │ │ ├── ConfiguratorRoute.tsx │ │ │ └──
EmbedRoute.tsx │ │ │ │ │ ├── providers/ │ │ │ ├── AppProviders.tsx │ │ │
└── ErrorBoundary.tsx │ │ │ │ │ └── config/ │ │ ├── environment.ts │ │
└── appConfig.ts │ │ │ ├── components/ │ │ ├── ui/ │ │ ├── layout/ │ │
├── feedback/ │ │ └── common/ │ │ │ ├── features/ │ │ ├── configurator/
│ │ ├── product-options/ │ │ ├── customization/ │ │ ├── editor-2d/ │ │
├── preview-3d/ │ │ ├── pricing/ │ │ ├── configuration/ │ │ ├── cart/ │
│ ├── pdf/ │ │ └── embed/ │ │ │ ├── services/ │ │ ├── api/ │ │ ├──
pricing/ │ │ ├── configuration/ │ │ ├── upload/ │ │ ├── shopify/ │ │ └──
pdf/ │ │ │ ├── store/ │ │ ├── configuratorStore.ts │ │ ├── selectors/ │
│ └── actions/ │ │ │ ├── products/ │ │ ├── canopy-10x10/ │ │ ├──
productRegistry.ts │ │ └── productTypes.ts │ │ │ ├── assets/ │ │ ├──
assetRegistry.ts │ │ ├── modelRegistry.ts │ │ └── textureRegistry.ts │ │
│ ├── types/ │ │ ├── configuration.ts │ │ ├── product.ts │ │ ├──
customization.ts │ │ ├── pricing.ts │ │ ├── cart.ts │ │ └── api.ts │ │ │
├── schemas/ │ │ ├── configurationSchema.ts │ │ ├── productSchema.ts │ │
└── pricingSchema.ts │ │ │ ├── hooks/ │ │ ├── useConfigurator.ts │ │ ├──
usePricing.ts │ │ ├── useConfiguration.ts │ │ └── useDebouncedValue.ts │
│ │ ├── utils/ │ │ ├── formatting/ │ │ ├── validation/ │ │ ├── geometry/
│ │ └── serialization/ │ │ │ ├── constants/ │ │ ├── surfaces.ts │ │ ├──
editor.ts │ │ └── ui.ts │ │ │ └── styles/ │ ├── globals.css │ └──
variables.css │ ├── package.json ├── tsconfig.json ├── vite.config.ts
└── eslint.config.js

------------------------------------------------------------------------

# 5. FRONTEND FILE SIZE RULE

IMPORTANT:

Do not create giant files.

Preferred guideline:

-   Component: approximately 50--180 lines
-   Hook: approximately 30--120 lines
-   Service: approximately 40--150 lines
-   Store: approximately 80--200 lines
-   Utility: approximately 20--100 lines

These are guidelines, NOT artificial limits.

If a file becomes difficult to understand, split it by responsibility.

Do NOT split a tiny 10-line concept into ten meaningless files.

------------------------------------------------------------------------

# 6. COMPONENT ORGANIZATION

Use feature-based components.

Example:

features/product-options/ │ ├── components/ │ ├──
ProductOptionsPanel.tsx │ ├── SizeSelector.tsx │ ├── WallSelector.tsx │
├── PrintTypeSelector.tsx │ └── OptionCard.tsx │ ├── hooks/ │ └──
useProductOptions.ts │ ├── services/ │ └── optionMapper.ts │ ├── types/
│ └── optionTypes.ts │ └── index.ts

Do NOT create one:

ProductConfigurator.tsx

with 1000 lines containing all product options, editor, pricing and cart
logic.

------------------------------------------------------------------------

# 7. CONFIGURATOR FEATURE

Target:

features/configurator/ │ ├── components/ │ ├── ConfiguratorShell.tsx │
├── ConfiguratorHeader.tsx │ ├── ConfiguratorWorkspace.tsx │ ├──
ConfiguratorSidebar.tsx │ └── ConfiguratorSummary.tsx │ ├── hooks/ │ └──
useConfiguratorFlow.ts │ ├── utils/ │ └── configuratorValidation.ts │
└── index.ts

The shell coordinates features.

It must NOT contain every business rule.

------------------------------------------------------------------------

# 8. PRODUCT OPTIONS

Target:

features/product-options/ │ ├── components/ │ ├──
ProductOptionsPanel.tsx │ ├── SizeOption.tsx │ ├── FrameOption.tsx │ ├──
WallOptions.tsx │ ├── HalfWallOptions.tsx │ └── PrintTypeOptions.tsx │
├── hooks/ │ └── useProductOptionSelection.ts │ ├── mappers/ │ └──
optionConfigurationMapper.ts │ └── index.ts

Each component should do one job.

------------------------------------------------------------------------

# 9. 2D EDITOR STRUCTURE

This feature deserves its own architecture.

features/editor-2d/ │ ├── components/ │ ├── Editor2D.tsx │ ├──
EditorToolbar.tsx │ ├── EditorCanvas.tsx │ ├── SurfaceSelector.tsx │ ├──
ElementToolbar.tsx │ ├── TextControls.tsx │ ├── ImageControls.tsx │ ├──
ColorControls.tsx │ └── TransformControls.tsx │ ├── canvas/ │ ├──
canvasFactory.ts │ ├── canvasRenderer.ts │ ├── canvasSerializer.ts │ └──
canvasEvents.ts │ ├── elements/ │ ├── textElement.ts │ ├──
imageElement.ts │ └── elementFactory.ts │ ├── hooks/ │ ├──
useEditorCanvas.ts │ ├── useEditorSelection.ts │ └── useEditorHistory.ts
│ ├── mappers/ │ └── editorConfigurationMapper.ts │ ├── utils/ │ ├──
coordinateUtils.ts │ └── imageUtils.ts │ ├── types/ │ └── editorTypes.ts
│ └── index.ts

The 2D editor must communicate with the central configuration store.

------------------------------------------------------------------------

# 10. 3D PREVIEW STRUCTURE

features/preview-3d/ │ ├── components/ │ ├── Product3DPreview.tsx │ ├──
Scene.tsx │ ├── CameraController.tsx │ ├── Lighting.tsx │ ├──
LoadingOverlay.tsx │ └── ModelErrorBoundary.tsx │ ├── models/ │ ├──
CanopyModel.tsx │ ├── RoofMesh.tsx │ ├── WallMesh.tsx │ └──
FrameMesh.tsx │ ├── materials/ │ ├── surfaceMaterial.ts │ └──
materialUpdater.ts │ ├── textures/ │ ├── textureLoader.ts │ └──
artworkTexture.ts │ ├── hooks/ │ ├── useGLTFModel.ts │ ├──
useSurfaceTexture.ts │ └── useModelConfiguration.ts │ ├── utils/ │ ├──
modelDimensions.ts │ └── modelMapping.ts │ ├── types/ │ └──
previewTypes.ts │ └── index.ts

Do not put the entire Three.js scene into one file.

------------------------------------------------------------------------

# 11. PRODUCT DEFINITIONS

Use product-specific configuration without polluting the engine.

products/ │ ├── canopy-10x10/ │ ├── index.ts │ ├── productDefinition.ts
│ ├── surfaces.ts │ ├── options.ts │ ├── capabilities.ts │ ├── assets.ts
│ └── defaults.ts │ ├── productRegistry.ts └── productTypes.ts

Future product:

products/ └── banner-3x6/ ├── productDefinition.ts ├── surfaces.ts ├──
options.ts └── assets.ts

The configurator engine should not need major rewriting.

------------------------------------------------------------------------

# 12. ASSET MANAGEMENT

Create:

assets/ │ ├── assetRegistry.ts ├── modelRegistry.ts ├──
textureRegistry.ts └── assetTypes.ts

The GLB files remain under:

frontend/public/models/

Do not hard-code model paths throughout components.

The model registry should map product/variant identifiers to assets.

------------------------------------------------------------------------

# 13. CONFIGURATION STATE

Use:

store/ │ ├── configuratorStore.ts │ ├── selectors/ │ ├──
configurationSelectors.ts │ ├── pricingSelectors.ts │ └──
surfaceSelectors.ts │ ├── actions/ │ ├── productActions.ts │ ├──
surfaceActions.ts │ ├── elementActions.ts │ └── configurationActions.ts
│ └── storeTypes.ts

If the store becomes large, move logic into slices.

Possible:

store/slices/ ├── productSlice.ts ├── surfaceSlice.ts ├──
customizationSlice.ts └── sessionSlice.ts

The store remains the canonical configuration source.

------------------------------------------------------------------------

# 14. SERVICES

Services must be separated by responsibility.

services/ │ ├── api/ │ ├── apiClient.ts │ ├── apiErrors.ts │ └──
apiTypes.ts │ ├── pricing/ │ ├── pricingService.ts │ ├──
pricingMapper.ts │ └── pricingTypes.ts │ ├── configuration/ │ ├──
configurationService.ts │ ├── configurationSerializer.ts │ └──
configurationMapper.ts │ ├── upload/ │ ├── uploadService.ts │ ├──
uploadValidator.ts │ └── uploadTypes.ts │ ├── shopify/ │ ├──
shopifyService.ts │ ├── shopifyAdapter.ts │ ├── mockShopifyAdapter.ts │
└── shopifyMapper.ts │ └── pdf/ ├── pdfService.ts ├── pdfDataBuilder.ts
└── pdfTypes.ts

Do not put all API calls in App.tsx or components.

------------------------------------------------------------------------

# 15. BACKEND STRUCTURE

Use:

backend/ │ ├── src/ │ │ │ ├── server.ts │ ├── app.ts │ │ │ ├── config/ │
│ ├── environment.ts │ │ └── serverConfig.ts │ │ │ ├── routes/ │ │ ├──
index.ts │ │ ├── productRoutes.ts │ │ ├── pricingRoutes.ts │ │ ├──
configurationRoutes.ts │ │ ├── uploadRoutes.ts │ │ ├── pdfRoutes.ts │ │
└── shopifyRoutes.ts │ │ │ ├── controllers/ │ │ ├── productController.ts
│ │ ├── pricingController.ts │ │ ├── configurationController.ts │ │ ├──
uploadController.ts │ │ ├── pdfController.ts │ │ └──
shopifyController.ts │ │ │ ├── services/ │ │ ├── product/ │ │ ├──
pricing/ │ │ ├── configuration/ │ │ ├── upload/ │ │ ├── pdf/ │ │ └──
shopify/ │ │ │ ├── adapters/ │ │ ├── pricing/ │ │ ├── storage/ │ │ └──
shopify/ │ │ │ ├── repositories/ │ │ ├── configurationRepository.ts │ │
└── productRepository.ts │ │ │ ├── data/ │ │ ├── products/ │ │ ├──
pricing/ │ │ └── mock/ │ │ │ ├── schemas/ │ │ ├── pricingSchema.ts │ │
├── configurationSchema.ts │ │ └── cartSchema.ts │ │ │ ├── middleware/ │
│ ├── errorHandler.ts │ │ ├── requestLogger.ts │ │ └──
validationMiddleware.ts │ │ │ ├── utils/ │ │ ├── errors/ │ │ ├──
logging/ │ │ └── ids/ │ │ │ └── types/ │ ├── express.ts │ └──
serviceTypes.ts │ ├── tests/ │ ├── package.json ├── tsconfig.json └──
README.md

------------------------------------------------------------------------

# 16. BACKEND RESPONSIBILITIES

## Routes

Routes only define endpoints and connect middleware/controllers.

They should NOT contain business logic.

## Controllers

Controllers:

-   receive request
-   validate/parse input
-   call service
-   return response

Controllers should remain thin.

## Services

Services contain business/use-case logic.

Examples:

pricingService configurationService pdfService shopifyService

## Repositories

Repositories handle persistence.

For the test, this can use:

-   memory
-   JSON
-   mock repository

Later it can become:

-   PostgreSQL
-   MongoDB

without rewriting business services.

## Adapters

Adapters isolate external systems.

Examples:

MockPricingAdapter RealPricingAdapter

MockShopifyAdapter RealShopifyAdapter

MockStorageAdapter S3StorageAdapter

------------------------------------------------------------------------

# 17. PRICING BACKEND STRUCTURE

Use:

backend/src/services/pricing/ │ ├── pricingService.ts ├──
pricingCalculator.ts ├── pricingRules.ts ├── pricingMapper.ts └──
pricingTypes.ts

For the technical test, pricing data can be mock data.

But:

pricingController -\> pricingService -\> pricingCalculator -\>
pricingRules/data

Do NOT put price calculation inside the route.

------------------------------------------------------------------------

# 18. SHOPIFY BACKEND STRUCTURE

Use:

backend/src/services/shopify/ │ ├── shopifyService.ts ├── cartBuilder.ts
├── configurationMetadata.ts └── types.ts

Adapters:

backend/src/adapters/shopify/ │ ├── ShopifyAdapter.ts ├──
MockShopifyAdapter.ts └── RealShopifyAdapter.ts

RealShopifyAdapter may remain a future implementation if credentials are
unavailable.

The interface should already exist.

------------------------------------------------------------------------

# 19. PDF BACKEND STRUCTURE

Use:

backend/src/services/pdf/ │ ├── pdfService.ts ├── pdfDocumentBuilder.ts
├── pdfSections/ │ ├── productSection.ts │ ├── configurationSection.ts │
├── customizationSection.ts │ ├── previewSection.ts │ └──
pricingSection.ts ├── pdfTypes.ts └── pdfUtils.ts

Do not create a 500-line PDF function.

------------------------------------------------------------------------

# 20. UPLOAD BACKEND STRUCTURE

Use:

backend/src/services/upload/ │ ├── uploadService.ts ├──
uploadValidator.ts └── uploadTypes.ts

Adapter:

backend/src/adapters/storage/ │ ├── StorageAdapter.ts ├──
MockStorageAdapter.ts └── future/ └── S3StorageAdapter.ts

------------------------------------------------------------------------

# 21. SHARED STRUCTURE

Use shared/ only for contracts genuinely shared between
frontend/backend.

shared/ │ ├── types/ │ ├── configuration.ts │ ├── product.ts │ ├──
pricing.ts │ └── cart.ts │ ├── schemas/ │ ├── configurationSchema.ts │
├── pricingSchema.ts │ └── cartSchema.ts │ └── constants/ └──
surfaces.ts

Do NOT put frontend React components here.

Do NOT put backend database code here.

------------------------------------------------------------------------

# 22. DOCUMENTATION STRUCTURE

docs/ │ ├── architecture/ │ ├── system-overview.md │ ├──
frontend-architecture.md │ ├── backend-architecture.md │ ├──
data-flow.md │ └── synchronization.md │ ├── api/ │ ├── overview.md │ ├──
pricing.md │ ├── configurations.md │ ├── uploads.md │ ├── pdf.md │ └──
shopify.md │ ├── product/ │ ├── product-model.md │ ├── surfaces.md │ └──
asset-mapping.md │ └── deployment/ ├── local-development.md └──
production.md

------------------------------------------------------------------------

# 23. TEST STRUCTURE

Tests should be close to the relevant feature when practical.

Example:

features/pricing/ ├── pricingService.ts └── pricingService.test.ts

2D:

features/editor-2d/ ├── ... └── **tests**/ ├── coordinateUtils.test.ts
└── editorConfiguration.test.ts

Backend:

backend/src/services/pricing/ ├── pricingCalculator.ts └──
pricingCalculator.test.ts

End-to-end:

tests/e2e/ ├── configurator-flow.spec.ts ├── pricing-flow.spec.ts └──
cart-flow.spec.ts

------------------------------------------------------------------------

# 24. FILE RESPONSIBILITY RULE

Every file must have ONE primary reason to change.

BAD:

Configurator.tsx

contains:

-   product options
-   Zustand store
-   API calls
-   pricing
-   PDF
-   Shopify
-   2D editor
-   3D renderer

GOOD:

ConfiguratorShell.tsx ProductOptionsPanel.tsx PricingSummary.tsx
Editor2D.tsx Product3DPreview.tsx useConfigurator.ts pricingService.ts
configurationService.ts shopifyService.ts pdfService.ts

------------------------------------------------------------------------

# 25. IMPORT RULES

Prefer:

feature -\> shared/common feature -\> service feature -\> store service
-\> types service -\> API

Avoid circular dependencies.

Avoid:

component -\> random component -\> unrelated feature -\> store internals

Keep dependency direction clear.

------------------------------------------------------------------------

# 26. BARREL FILES

Use index.ts only where it improves public module boundaries.

Example:

features/editor-2d/index.ts

export the public editor API.

Do not create an index.ts in every folder just because it looks
organized.

------------------------------------------------------------------------

# 27. DOMAIN SEPARATION

Keep these domains separate:

PRODUCT CONFIGURATION CUSTOMIZATION EDITOR 3D PREVIEW PRICING
PERSISTENCE UPLOAD PDF SHOPIFY EMBED

Do not mix their business logic.

------------------------------------------------------------------------

# 28. CONFIGURATION FLOW

The code organization must support:

User ↓ Feature Component ↓ Store Action ↓ Configuration State ↓
Service/API ↓ External System

For rendering:

Configuration State ├──\> 2D Editor └──\> 3D Renderer

For pricing:

Configuration State ↓ Pricing Service ↓ Backend Pricing API ↓ Pricing
Result ↓ UI

For Shopify:

Configuration ↓ Save ↓ PDF ↓ Shopify Adapter ↓ Cart

------------------------------------------------------------------------

# 29. ASSET FLOW

Use:

Product Definition ↓ Variant ↓ Asset ID ↓ Asset Registry ↓ GLB Path ↓
Three.js Loader ↓ 3D Renderer

Do NOT:

Product3DPreview.tsx directly contain 10 different hard-coded GLB paths.

------------------------------------------------------------------------

# 30. 2D/3D SYNCHRONIZATION FILE OWNERSHIP

Central configuration:

store/configuratorStore.ts

2D:

features/editor-2d/

3D:

features/preview-3d/

Mapping:

editor-2d/mappers/ preview-3d/utils/

Shared configuration types:

shared/types/configuration.ts

This separation must make the synchronization architecture obvious to an
evaluator.

------------------------------------------------------------------------

# 31. PRODUCT-SPECIFIC VS ENGINE CODE

Product-specific:

products/canopy-10x10/

Generic:

features/configurator/ features/editor-2d/ features/preview-3d/ store/
services/

A future product should mostly require:

-   new product definition
-   new assets
-   product options
-   product surface definition

and NOT require rewriting the entire application.

------------------------------------------------------------------------

# 32. SMALL-FILE PRINCIPLE

When a file starts doing multiple unrelated jobs, split it.

Example:

BAD:

pdfService.ts - collect data - build every section - render images -
calculate price - save file - upload file

GOOD:

pdfService.ts pdfDataBuilder.ts pdfDocumentBuilder.ts productSection.ts
customizationSection.ts previewSection.ts pricingSection.ts

But avoid meaningless fragmentation.

The goal is:

HIGH COHESION LOW COUPLING SMALL RESPONSIBILITIES

------------------------------------------------------------------------

# 33. WHAT THE AI MUST NOT DO

DO NOT:

-   put all frontend code in App.tsx
-   put all backend code in server.ts
-   create one giant Configurator component
-   create one giant service
-   mix API requests into visual components
-   mix pricing rules into UI
-   mix Shopify code into React components
-   mix PDF implementation into cart code
-   hard-code GLB paths everywhere
-   duplicate configuration state
-   create random folders without responsibility
-   create dozens of meaningless 5-line files

------------------------------------------------------------------------

# 34. REFACTORING RULE

If an existing file is already large:

1.  understand it
2.  identify responsibilities
3.  extract one responsibility at a time
4.  preserve behavior
5.  run tests/build
6.  update imports
7.  remove dead code
8.  verify again

Do not perform a risky full rewrite just to match the folder structure.

------------------------------------------------------------------------

# 35. DEVELOPMENT ORDER

Create the structure in this order:

1.  Root workspace
2.  Frontend
3.  Backend
4.  Shared contracts
5.  Product definitions
6.  Configuration store
7.  API services
8.  Product options
9.  2D editor
10. 3D renderer
11. Synchronization
12. Pricing
13. Persistence
14. PDF
15. Shopify
16. iframe
17. tests
18. documentation

------------------------------------------------------------------------

# 36. FINAL TARGET TREE

The final repository should look approximately like:

interactive-product-configurator/ │ ├── frontend/ │ ├── public/ │ │ └──
models/ │ │ ├── Tent_5_5.glb │ │ ├── Tent 6.5_6.5.glb │ │ └──
Tent_8_8.glb │ │ │ └── src/ │ ├── app/ │ ├── components/ │ ├── features/
│ │ ├── configurator/ │ │ ├── product-options/ │ │ ├── editor-2d/ │ │
├── preview-3d/ │ │ ├── customization/ │ │ ├── pricing/ │ │ ├──
configuration/ │ │ ├── cart/ │ │ ├── pdf/ │ │ └── embed/ │ ├── products/
│ │ └── canopy-10x10/ │ ├── services/ │ ├── store/ │ ├── assets/ │ ├──
types/ │ ├── schemas/ │ ├── hooks/ │ ├── utils/ │ ├── constants/ │ └──
styles/ │ ├── backend/ │ └── src/ │ ├── config/ │ ├── routes/ │ ├──
controllers/ │ ├── services/ │ │ ├── product/ │ │ ├── pricing/ │ │ ├──
configuration/ │ │ ├── upload/ │ │ ├── pdf/ │ │ └── shopify/ │ ├──
adapters/ │ │ ├── pricing/ │ │ ├── storage/ │ │ └── shopify/ │ ├──
repositories/ │ ├── data/ │ ├── schemas/ │ ├── middleware/ │ ├── utils/
│ └── types/ │ ├── shared/ │ ├── types/ │ ├── schemas/ │ └── constants/
│ ├── docs/ │ ├── architecture/ │ ├── api/ │ ├── product/ │ └──
deployment/ │ ├── tests/ │ └── e2e/ │ ├── scripts/ │ ├── .github/ │ └──
workflows/ │ ├── README.md ├── PROJECT_STATUS.md ├── QA_CHECKLIST.md ├──
ARCHITECTURE.md ├── .env.example ├── .gitignore └── package.json

------------------------------------------------------------------------

# 37. FINAL INSTRUCTION TO GOOGLE AI STUDIO

READ THIS DOCUMENT BEFORE CREATING OR MOVING FILES.

You are expected to organize the project like a senior software
engineer.

Do not place unrelated responsibilities into one file.

Prefer multiple focused files over giant files.

However, do not create meaningless fragmentation.

Every folder and file must have a clear responsibility.

Before implementation:

1.  Inspect the existing repository.
2.  Inspect existing files.
3.  Inspect the GLB assets.
4.  Compare existing structure with this document.
5.  Create a proposed folder tree.
6.  Explain any deviation from this document.
7.  Only then implement.

During implementation:

-   keep files focused
-   keep components small
-   keep services independent
-   keep business logic outside UI
-   keep API calls outside visual components
-   keep pricing outside UI
-   keep Shopify behind adapters
-   keep PDF logic separate
-   keep 2D and 3D separate
-   use one canonical configuration state
-   reuse shared types/contracts
-   update PROJECT_STATUS.md

If a file becomes too large or has multiple responsibilities, refactor
it before continuing.

The evaluator should be able to open the repository and immediately
understand where:

-   frontend lives
-   backend lives
-   product definitions live
-   2D editor lives
-   3D renderer lives
-   pricing lives
-   Shopify integration lives
-   PDF generation lives
-   configuration state lives
-   API routes live
-   tests live
-   documentation lives

DO NOT declare the project complete until the final folder structure has
been reviewed against this document.
