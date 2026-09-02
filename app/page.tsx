'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Product, Variant } from '@prisma/client'

export default function Home() {
  const [products, setProducts] = useState<(Product & { variants: Variant[] })[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen p-8 bg-gray-50 flex items-center justify-center animate-pulse">
        <div className="text-gray-400 font-medium text-lg">Loading catalog...</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">1Fi Smartphones on EMI</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.slug}`}>
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 border border-gray-100 cursor-pointer h-full flex flex-col">
                <div className="aspect-square relative mb-6 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={product.variants[0]?.imageUrl} alt={product.name} className="object-contain h-full w-full drop-shadow-lg transition-transform duration-500 hover:scale-110" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">{product.name}</h2>
                <p className="text-gray-500 mt-2 text-sm leading-relaxed flex-1">{product.description}</p>
                <div className="mt-6 pt-4 border-t border-gray-100 font-semibold text-blue-600 flex justify-between items-center">
                  <span>From ₹{product.variants[0]?.price.toLocaleString()}</span>
                  <span className="text-lg">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
