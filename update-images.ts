import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const products = await prisma.product.findMany({ include: { variants: true } })

  for (const product of products) {
    for (const variant of product.variants) {
      let imageUrl = ''
      if (product.slug.includes('iphone')) {
        imageUrl = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop'
      } else if (product.slug.includes('samsung')) {
        imageUrl = 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=600&auto=format&fit=crop'
      } else {
        imageUrl = 'https://images.unsplash.com/photo-1598327105666-5b89351cb315?q=80&w=600&auto=format&fit=crop'
      }

      await prisma.variant.update({
        where: { id: variant.id },
        data: { imageUrl }
      })
    }
  }

  console.log('Images updated successfully!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
