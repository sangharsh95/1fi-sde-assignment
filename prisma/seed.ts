import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clean up existing data
  await prisma.emiPlan.deleteMany()
  await prisma.variant.deleteMany()
  await prisma.product.deleteMany()

  const apple = await prisma.product.create({
    data: {
      name: 'iPhone 17 Pro',
      slug: 'iphone-17-pro',
      description: 'The ultimate iPhone.',
      variants: {
        create: [
          {
            name: '256GB',
            mrp: 134900,
            price: 127400,
            imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop',
            emiPlans: {
              create: [
                { monthlyPayment: 44967, tenureMonths: 3, interestRate: 0, cashback: 7500 },
                { monthlyPayment: 22483, tenureMonths: 6, interestRate: 0, cashback: 7500 },
                { monthlyPayment: 11242, tenureMonths: 12, interestRate: 0, cashback: 7500 },
                { monthlyPayment: 5621, tenureMonths: 24, interestRate: 0, cashback: 7500 },
                { monthlyPayment: 4297, tenureMonths: 36, interestRate: 10.5, cashback: 7500 },
                { monthlyPayment: 3385, tenureMonths: 48, interestRate: 10.5, cashback: 7500 },
                { monthlyPayment: 2842, tenureMonths: 60, interestRate: 10.5, cashback: 7500 },
              ],
            },
          },
          {
            name: '512GB',
            mrp: 154900,
            price: 147400,
            imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop',
            emiPlans: {
              create: [
                { monthlyPayment: 49133, tenureMonths: 3, interestRate: 0, cashback: 7500 },
                { monthlyPayment: 24566, tenureMonths: 6, interestRate: 0, cashback: 7500 },
                { monthlyPayment: 12283, tenureMonths: 12, interestRate: 0, cashback: 7500 },
              ],
            },
          },
        ],
      },
    },
  })

  const samsung = await prisma.product.create({
    data: {
      name: 'Samsung Galaxy S24 Ultra',
      slug: 'samsung-s24-ultra',
      description: 'Galaxy AI is here.',
      variants: {
        create: [
          {
            name: 'Titanium Gray',
            mrp: 129999,
            price: 129999,
            imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=600&auto=format&fit=crop',
            emiPlans: {
              create: [
                { monthlyPayment: 43333, tenureMonths: 3, interestRate: 0, cashback: 5000 },
                { monthlyPayment: 21666, tenureMonths: 6, interestRate: 0, cashback: 5000 },
                { monthlyPayment: 10833, tenureMonths: 12, interestRate: 0, cashback: 5000 },
              ],
            },
          },
          {
            name: 'Titanium Black',
            mrp: 129999,
            price: 129999,
            imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=600&auto=format&fit=crop',
            emiPlans: {
              create: [
                { monthlyPayment: 43333, tenureMonths: 3, interestRate: 0, cashback: 5000 },
                { monthlyPayment: 21666, tenureMonths: 6, interestRate: 0, cashback: 5000 },
                { monthlyPayment: 10833, tenureMonths: 12, interestRate: 0, cashback: 5000 },
              ],
            },
          },
        ],
      },
    },
  })

  const pixel = await prisma.product.create({
    data: {
      name: 'Google Pixel 9 Pro',
      slug: 'google-pixel-9-pro',
      description: 'The pro Google phone.',
      variants: {
        create: [
          {
            name: 'Obsidian',
            mrp: 109999,
            price: 109999,
            imageUrl: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=600&auto=format&fit=crop',
            emiPlans: {
              create: [
                { monthlyPayment: 36666, tenureMonths: 3, interestRate: 0, cashback: 3000 },
                { monthlyPayment: 18333, tenureMonths: 6, interestRate: 0, cashback: 3000 },
                { monthlyPayment: 9166, tenureMonths: 12, interestRate: 0, cashback: 3000 },
              ],
            },
          },
          {
            name: 'Porcelain',
            mrp: 109999,
            price: 109999,
            imageUrl: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=600&auto=format&fit=crop',
            emiPlans: {
              create: [
                { monthlyPayment: 36666, tenureMonths: 3, interestRate: 0, cashback: 3000 },
                { monthlyPayment: 18333, tenureMonths: 6, interestRate: 0, cashback: 3000 },
                { monthlyPayment: 9166, tenureMonths: 12, interestRate: 0, cashback: 3000 },
              ],
            },
          },
        ],
      },
    },
  })

  console.log('Database seeded successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
