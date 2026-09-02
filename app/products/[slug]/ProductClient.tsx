'use client'

import { useEffect, useState } from 'react'
import { Product, Variant, EmiPlan } from '@prisma/client'
import { toast } from 'sonner'

// nested types from prisma
type ProductWithVariants = Product & {
  variants: (Variant & {
    emiPlans: EmiPlan[]
  })[]
}

export default function ProductClient({ slug }: { slug: string }) {
  const [product, setProduct] = useState<ProductWithVariants | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedVariant, setSelectedVariant] = useState<(Variant & { emiPlans: EmiPlan[] }) | null>(null)
  const [selectedEmiPlan, setSelectedEmiPlan] = useState<EmiPlan | null>(null)

  useEffect(() => {
    fetch(`/api/products/${slug}`)
      .then(res => res.json())
      .then((data: ProductWithVariants) => {
        setProduct(data)
        if (data.variants && data.variants.length > 0) {
          setSelectedVariant(data.variants[0])
          if (data.variants[0].emiPlans?.length > 0) {
            setSelectedEmiPlan(data.variants[0].emiPlans[0])
          }
        }
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
        toast.error('Failed to load product data.')
      })
  }, [slug])

  const handleProceed = () => {
    if (!selectedEmiPlan || !selectedVariant) return
    toast.success(`Success! Redirecting to mutual fund gateway...`, {
      description: `Plan selected: ₹${selectedEmiPlan.monthlyPayment.toLocaleString()}/mo for ${selectedEmiPlan.tenureMonths} months for ${product?.name}.`
    })
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 p-4 md:p-8 animate-pulse">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row h-[700px]">
          <div className="w-full md:w-1/2 p-8 bg-gray-50 border-r border-gray-100 flex flex-col items-center">
            <div className="w-12 h-4 bg-gray-200 rounded mb-4 self-start"></div>
            <div className="w-3/4 h-10 bg-gray-200 rounded mb-4 self-start"></div>
            <div className="w-1/2 h-6 bg-gray-200 rounded mb-12 self-start"></div>
            <div className="w-full max-w-sm aspect-square bg-gray-200 rounded-full mb-8"></div>
          </div>
          <div className="w-full md:w-1/2 p-8 bg-white">
            <div className="w-1/3 h-10 bg-gray-200 rounded mb-4"></div>
            <div className="w-1/4 h-4 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-full h-20 bg-gray-100 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (!product || !selectedVariant) return <div className="min-h-screen flex items-center justify-center font-medium text-gray-500">Oops, we couldn't find this product!</div>

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row">
        
        <div className="w-full md:w-1/2 p-8 bg-gray-50 border-r border-gray-100 flex flex-col items-center">
          <div className="self-start text-red-500 font-semibold text-xs tracking-wider mb-2">NEW</div>
          <h1 className="text-4xl font-semibold text-gray-900 self-start">{product.name}</h1>
          <p className="text-lg text-gray-500 self-start mb-8">{selectedVariant.name}</p>
          
          <div className="w-full max-w-sm aspect-square relative mb-8">
            <img src={selectedVariant.imageUrl} alt={product.name} className="w-full h-full object-contain drop-shadow-xl transition-all duration-500 hover:scale-105" />
          </div>
          
          <div className="mt-auto">
            <p className="text-sm text-gray-500 mb-2">Available in {product.variants.length} finishes</p>
            <div className="flex gap-2">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => {
                    setSelectedVariant(v)
                    if (v.emiPlans.length > 0) {
                      setSelectedEmiPlan(v.emiPlans[0])
                    }
                  }}
                  className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${selectedVariant.id === v.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'}`}
                  style={{ backgroundColor: v.name.includes('Black') || v.name.includes('Obsidian') ? '#333' : v.name.includes('Gray') || v.name.includes('Titanium') ? '#999' : '#e5e7eb' }}
                  title={v.name}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 bg-white flex flex-col">
          <div className="mb-6 border-b border-gray-100 pb-6">
            <div className="text-3xl font-bold text-gray-900 mb-1 flex items-center gap-3">
              ₹{selectedVariant.price.toLocaleString()}
              <span className="text-sm font-medium px-2 py-1 bg-green-100 text-green-700 rounded-md">Save ₹{(selectedVariant.mrp - selectedVariant.price).toLocaleString()}</span>
            </div>
            <div className="text-gray-400 line-through text-sm mb-2">
              MRP: ₹{selectedVariant.mrp.toLocaleString()}
            </div>
            <p className="text-gray-700 font-medium">EMI plans backed by mutual funds</p>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar min-h-[400px] max-h-[450px]">
            {selectedVariant.emiPlans.map((plan) => (
              <label
                key={plan.id}
                className={`flex items-start p-4 border rounded-xl cursor-pointer transition-all duration-200 hover:shadow-sm
                  ${selectedEmiPlan?.id === plan.id ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-gray-200 hover:border-blue-300'}
                `}
              >
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-gray-900">₹{plan.monthlyPayment.toLocaleString()} <span className="text-gray-500 font-normal">x {plan.tenureMonths} months</span></span>
                    <span className="text-sm font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded">{plan.interestRate}% p.a.</span>
                  </div>
                  {plan.cashback && plan.cashback > 0 && (
                    <div className="text-green-600 text-xs font-semibold mt-2 flex items-center gap-1">
                      ✨ Additional cashback of ₹{plan.cashback.toLocaleString()}
                    </div>
                  )}
                </div>
                <input
                  type="radio"
                  name="emiPlan"
                  value={plan.id}
                  checked={selectedEmiPlan?.id === plan.id}
                  onChange={() => setSelectedEmiPlan(plan)}
                  className="ml-4 mt-1 w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
              </label>
            ))}
          </div>

          <div className="mt-8 pt-4 border-t border-gray-100">
            <button 
              onClick={handleProceed}
              className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              Proceed with {selectedEmiPlan?.tenureMonths} Months EMI
              <span className="text-xl">→</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
