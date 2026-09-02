import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const slug = (await params).slug
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        variants: {
          include: {
            emiPlans: {
              orderBy: { tenureMonths: 'asc' }
            }
          }
        }
      }
    })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch product', details: error instanceof Error ? error.message : String(error) }, { status: 500 })
  }
}
