# Interactive Product Configurator

A reusable React and TypeScript product configurator for customizable
branded canopy tents, combining product selection, dynamic pricing, 2D
design editing, and interactive 3D visualization.

## Overview

This project implements an engineering-focused MVP for configuring a
custom canopy tent. The application separates product configuration,
rendering, pricing, and future commerce integrations so the same core
architecture can support additional products.

Users can configure product size and options, customize supported
surfaces with text and images, preview the product in 3D, work with a 2D
design surface, review pricing, and prepare configuration data for
downstream PDF and Shopify workflows.

## Technology Stack

### Frontend

-   React
-   TypeScript
-   Vite
-   Tailwind CSS
-   Zustand
-   Three.js
-   React Three Fiber
-   React Three Drei
-   React Konva

### Backend

-   Node.js
-   Express
-   TypeScript

### Shared

-   TypeScript shared models
-   Shared configuration and product types

## Project Structure

``` text
interactive-product-configurator/
├── frontend/
│   ├── src/
│   │   └── app/
│   │       ├── assets/
│   │       ├── features/
│   │       │   ├── configurator/
│   │       │   ├── editor-2d/
│   │       │   ├── preview-3d/
│   │       │   └── product-options/
│   │       ├── hooks/
│   │       ├── services/
│   │       └── store/
│   └── public/
│       └── glb/
├── backend/
│   └── src/
│       ├── controllers/
│       ├── data/
│       ├── routes/
│       └── services/
├── shared/
│   └── src/
│       └── types/
├── docs/
└── tests/
```

## Architecture

The application uses one canonical configuration state as the source of
truth for product selections and customizable surface data.

``` text
User Actions
     |
     v
Canonical Configuration
     |
     v
Zustand Store
     |
     +------------+-------------+
     |            |             |
     v            v             v
  2D Editor   3D Preview    Pricing API
     |            |             |
     +------------+-------------+
                  |
                  v
        Configuration Summary
                  |
             +----+----+
             |         |
             v         v
            PDF     Shopify
```

Shared TypeScript models define the configuration contract used across
application boundaries.

## Configuration Model

The core configuration is represented by the shared
`ProductConfiguration` model.

``` ts
interface ProductConfiguration {
  productId: string;
  variantId: string;
  walls: {
    typeId: string | null;
  };
  surfaces: Record<string, SurfaceConfiguration>;
}
```

The shared types are maintained under:

``` text
shared/src/types/
```

The goal is to avoid maintaining separate, conflicting configuration
states in the 2D editor and 3D preview.

## 3D Product Visualization

The configurator uses the supplied GLB assets.

Currently available assets:

``` text
Tent_5_5.glb
Tent 6.5_6.5.glb
Tent_8_8.glb
```

The supplied asset set does not contain the required 10x10 GLB. The
implementation therefore does not falsely label an available model as
10x10.

Model paths are maintained through a centralized registry:

``` text
frontend/src/app/assets/modelRegistry.ts
```

This allows additional product models to be registered without rewriting
the rendering engine.

## Dynamic Pricing

Pricing is calculated through the backend pricing service rather than
being hard-coded into presentation components.

``` text
Product Configuration
        |
        v
Frontend Pricing Client
        |
        v
POST /api/pricing/calculate
        |
        v
Pricing Controller
        |
        v
Pricing Service
        |
        v
Pricing Data
        |
        v
Structured Pricing Summary
```

The response uses structured line items and totals so the pricing
information can be reused by the configuration summary and later PDF and
Shopify workflows.

### Pricing Endpoint

``` text
POST /api/pricing/calculate
```

The backend defaults to:

``` text
http://localhost:3000
```

### Mock Pricing

The technical assessment permits mocked pricing data. The current
pricing data is isolated from the pricing service so it can later be
replaced by a database or external pricing service.

Example:

``` ts
const MOCK_PRICING = {
  variants: {
    "10x10-frame": 849,
    "10x10-no-frame": 549,
    "8x8-frame": 749
  },
  walls: {
    "1-wall-single": 150,
    "3-wall-single": 400
  },
  customization: {
    textElementCost: 5,
    imageElementCost: 15
  }
};
```

## 2D Design

The 2D editor is separated from the 3D renderer and operates on the
shared configuration model.

The design model supports the planned customization workflow, including:

-   Surface selection
-   Background colors
-   Text elements
-   Image elements
-   Element positioning
-   Configuration updates

The 2D layer and 3D layer are intentionally separated while consuming
the same configuration state.

## UI and Design System

The interface follows an editorial ecommerce and precision configurator
direction.

The visual system uses:

-   `#F6F4EF` page background
-   `#FFFFFF` primary surface
-   `#FBFAF7` secondary surface
-   `#171717` primary text
-   `#625F58` secondary text
-   `#8A867E` muted text
-   `#E5E1D8` border
-   `#D6D0C5` strong border
-   `#183C34` primary accent
-   `#B66A45` secondary accent

Typography uses a restrained hierarchy with Inter as the preferred font
family.

The UI intentionally avoids excessive gradients, glassmorphism, neon
styling, oversized cards, and generic dashboard patterns.

## Development Setup

### Prerequisites

-   Node.js
-   npm

### Install

``` bash
npm install
```

### Start Backend

``` bash
npm run dev --workspace=backend
```

The backend uses port `3000` by default.

### Start Frontend

``` bash
npm run dev --workspace=frontend
```

Use the local URL printed by Vite.

### Build

``` bash
npm run build
```

The workspace build compiles the shared package, backend, and frontend.

## Environment Variables and Secrets

Never commit:

-   API keys
-   passwords
-   GitHub access tokens
-   production credentials
-   `.env` files containing secrets

Typical local environment files should remain untracked:

``` text
.env
.env.local
```

## Repository Hygiene

Do not commit generated or local-only files such as:

``` text
node_modules/
dist/
.env
.env.local
*.log
IDE-specific files
temporary files
```

The GitHub repository should contain the source code and required
project assets only.

## Testing and Verification

Before submission, verify:

-   Frontend starts successfully
-   Backend starts on port 3000
-   Shared package compiles
-   Backend compiles
-   Frontend compiles
-   Production build succeeds
-   Pricing API returns structured pricing
-   Configuration remains centralized
-   GLB assets load through the model registry
-   2D and 3D layers consume the canonical configuration
-   Responsive layouts have been checked
-   No secrets are committed

Build command:

``` bash
npm run build
```

## Asset Limitation

The reference product is a 10x10 canopy, while the supplied GLB package
contains 5x5, 6.5x6.5, and 8x8 models.

The missing 10x10 asset is intentionally represented as unavailable
until the correct model is provided. This prevents an incorrectly sized
model from being presented as a genuine 10x10 product.

## Engineering Principles

1.  Single source of truth for configuration
2.  Separation of UI and business logic
3.  Shared types across application boundaries
4.  Backend-driven pricing
5.  Centralized product and asset definitions
6.  Feature-based frontend organization
7.  Clear integration boundaries
8.  Minimal hardcoded business logic in UI components
9.  Explicit handling of unavailable assets
10. Incremental implementation and verification

## Future Integration Points

The architecture provides clear boundaries for:

-   Production pricing services
-   Configuration persistence
-   PDF production proofs
-   Shopify cart integration
-   Shopify order metadata
-   Production asset storage
-   Additional product models
-   Additional configurable products

## Submission Checklist

-   [ ] Required source files are committed
-   [ ] No secrets or access tokens are committed
-   [ ] Frontend builds successfully
-   [ ] Backend builds successfully
-   [ ] Shared package builds successfully
-   [ ] Pricing API has been verified
-   [ ] Canonical configuration has been verified
-   [ ] 2D editor has been verified
-   [ ] 3D preview has been verified
-   [ ] Camera view controls have been manually verified
-   [ ] Responsive layout has been checked
-   [ ] PDF workflow has been verified
-   [ ] Shopify workflow has been verified
-   [ ] README reflects the actual implementation

## License

This project was created as a technical assessment / MVP implementation.

Third-party product assets and materials remain subject to their
respective ownership and licensing terms.
