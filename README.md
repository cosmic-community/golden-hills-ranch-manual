# Golden Hills Ranch

![App Preview](https://imgix.cosmicjs.com/82119990-16b1-11f1-8f19-f3dd3ee2f907-autopilot-photo-1618164436241-4473940d1f5c-1772508707226.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A premium online storefront for Golden Hills Ranch, showcasing grass-fed steaks, farm-fresh raw milk, and handcrafted artisan cheeses. Built with Next.js 16 and powered by [Cosmic](https://www.cosmicjs.com) for seamless content management.

## Features

- 🥩 **Product Catalog** — Browse all ranch products with rich imagery and detailed descriptions
- 🏷️ **Category Browsing** — Filter products by Grass-Fed Steaks, Raw Milk, or Artisan Cheese
- ⭐ **Customer Reviews** — Authentic testimonials with star ratings linked to specific products
- 🖼️ **Interactive Image Galleries** — Multiple product images with click-to-enlarge functionality
- 💰 **Sale Pricing** — Compare-at prices with visual sale badges
- 📦 **Inventory Status** — Real-time stock indicators for each product
- 📱 **Fully Responsive** — Beautiful on mobile, tablet, and desktop
- ⚡ **Server-Side Rendering** — Fast page loads with Next.js App Router

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=69a655bed2901931d6add07a&clone_repository=69a6596d42ed116de4c9f32d)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for an online store with products (including images, pricing, description, and inventory status), product categories, and customer reviews.
>
> User instructions: Golden Hills Ranch is an online store that sells grass-fed steak, raw milk, and cheese."

### Code Generation Prompt

> "Build a Next.js website that uses my existing objects in this bucket"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** TypeScript (strict mode)
- **CMS:** [Cosmic](https://www.cosmicjs.com) ([docs](https://www.cosmicjs.com/docs))
- **Styling:** Tailwind CSS 3.4
- **Image Optimization:** imgix
- **Runtime:** Bun

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (v1.0+)
- A [Cosmic](https://www.cosmicjs.com) account with the Golden Hills Ranch bucket

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd golden-hills-ranch
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Cosmic SDK Examples

### Fetching Products with Category Data
```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Product by Slug
```typescript
const { object: product } = await cosmic.objects
  .findOne({ type: 'products', slug: 'ribeye-steak' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Reviews for a Product
```typescript
const { objects: reviews } = await cosmic.objects
  .find({ type: 'customer-reviews', 'metadata.product': productId })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This application uses three Cosmic object types:

| Object Type | Slug | Description |
|------------|------|-------------|
| 🏷️ Product Categories | `product-categories` | Grass-Fed Steaks, Raw Milk, Artisan Cheese |
| 🥩 Products | `products` | Individual products with pricing, images, and inventory |
| ⭐ Customer Reviews | `customer-reviews` | Customer testimonials linked to products |

All content is managed through the [Cosmic dashboard](https://app.cosmicjs.com) — no code changes required to update products, categories, or reviews.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables (`COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`)
4. Deploy

### Netlify

1. Push your code to GitHub
2. Import the project in [Netlify](https://netlify.com)
3. Set build command to `bun run build`
4. Add environment variables
5. Deploy

<!-- README_END -->