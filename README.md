# 1Fi SDE1 Assignment 🚀

Hey! This is my submission for the 1Fi SDE1 Assignment. It's a full-stack Next.js app that shows a catalog of smartphones along with their dynamic EMI plans (backed by mutual funds).

I built this following the reference design provided in the PDF, and it hits all the core requirements including dynamic routing, API endpoints, and a database connection.

## What's inside?
- **Frontend**: Next.js (React), Tailwind CSS, sonner (for toast notifications)
- **Backend**: Next.js App Router API Routes (`/api/products`)
- **Database**: SQLite (via Prisma ORM) - I went with SQLite so it's super easy for you to run locally without needing to set up Postgres or MongoDB!

## How to run it locally

1. **Install packages**
   ```bash
   npm install
   ```

2. **Set up the database**
   Run these two commands to push the schema to SQLite and populate it with the seed data (phones, variants, and EMI plans):
   ```bash
   npx prisma migrate dev --name init
   npx tsx prisma/seed.ts
   ```

3. **Start the dev server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) and you're good to go!

---

## API Endpoints

I built two main endpoints to serve the data to the frontend:

### `GET /api/products`
Returns all products for the homepage grid.
```json
[
  {
    "id": "cm...1h",
    "name": "iPhone 17 Pro",
    "slug": "iphone-17-pro",
    "description": "The ultimate iPhone.",
    "variants": [ ... ]
  }
]
```

### `GET /api/products/:slug`
Returns a specific product along with its nested variants and EMI plans (sorted by tenure).
```json
{
  "name": "iPhone 17 Pro",
  "variants": [
    {
      "name": "256GB",
      "price": 127400,
      "emiPlans": [
        {
          "monthlyPayment": 44967,
          "tenureMonths": 3
        }
      ]
    }
  ]
}
```

## Schema Used
Here is a quick look at how the data is modeled in Prisma:

```prisma
model Product {
  id          String    @id @default(cuid())
  name        String
  slug        String    @unique
  description String?
  variants    Variant[]
}

model Variant {
  id        String    @id @default(cuid())
  productId String
  product   Product   @relation(fields: [productId], references: [id])
  name      String
  mrp       Float
  price     Float
  imageUrl  String
  emiPlans  EmiPlan[]
}

model EmiPlan {
  id             String   @id @default(cuid())
  variantId      String
  variant        Variant  @relation(fields: [variantId], references: [id])
  monthlyPayment Float
  tenureMonths   Int
  interestRate   Float
  cashback       Float?
}
```

Thanks for checking out my submission! Let me know if you run into any issues getting it running.
