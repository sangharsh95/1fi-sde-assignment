import ProductClient from './ProductClient'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await prisma.product.findUnique({ where: { slug } })
  return {
    title: product ? `${product.name} | 1Fi EMI` : 'Product Not Found',
    description: product?.description || 'View EMI plans backed by mutual funds'
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  
  return <ProductClient slug={slug} />
}

