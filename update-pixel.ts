import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const pixelProducts = await prisma.product.findUnique({
    where: { slug: 'google-pixel-9-pro' },
    include: { variants: true }
  })
  
  if (pixelProducts) {
    for (const variant of pixelProducts.variants) {
      await prisma.variant.update({
        where: { id: variant.id },
        data: { imageUrl: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=600&auto=format&fit=crop' }
      })
    }
  }

  console.log('Pixel images updated successfully!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
