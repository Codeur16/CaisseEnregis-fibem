'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingCart, CreditCard, Truck, Shield, ArrowLeft } from 'lucide-react'

interface CartItem {
  id: number
  name: string
  provider: string
  type: 'service' | 'product'
  price: number
  quantity: number
  image?: string
}

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: 'Prestation Plomberie - Intervention urgente',
    provider: 'Ets A&R COLY',
    type: 'service',
    price: 150,
    quantity: 1,
  },
  {
    id: 2,
    name: 'Développement site web vitrine',
    provider: 'EDEP Digital',
    type: 'service',
    price: 1500,
    quantity: 1,
  },
  {
    id: 3,
    name: 'Pack CV FIBEM Premium',
    provider: 'SEN FIBEM',
    type: 'product',
    price: 29.99,
    quantity: 2,
  },
]

export default function PanierPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    )
  }

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const commission = subtotal * 0.03 // 3% commission
  const discount = promoApplied ? subtotal * 0.1 : 0 // 10% discount if promo applied
  const total = subtotal + commission - discount

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'fibem10') {
      setPromoApplied(true)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Mon Panier</h1>
            <p className="text-gray-500">{cartItems.length} article(s)</p>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Votre panier est vide</h2>
            <p className="text-gray-500 mb-6">Découvrez nos services et ajoutez-les à votre panier</p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 bg-fibem-primary text-white rounded-lg hover:bg-fibem-dark transition-colors"
            >
              Découvrir nos services
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-sm p-4 flex gap-4">
                  {/* Image placeholder */}
                  <div className="w-24 h-24 bg-gradient-to-br from-fibem-primary to-fibem-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-2xl font-bold">{item.name.charAt(0)}</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          item.type === 'service' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {item.type === 'service' ? 'Service' : 'Produit'}
                        </span>
                        <h3 className="font-semibold text-gray-800 mt-1">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.provider}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 border rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 border rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="font-bold text-lg text-fibem-primary">
                        {(item.price * item.quantity).toFixed(2)} €
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h2 className="font-bold text-lg text-gray-800 mb-4">Récapitulatif</h2>

                {/* Promo code */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Code promo</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Entrez votre code"
                      disabled={promoApplied}
                      className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-secondary disabled:bg-gray-100"
                    />
                    <button
                      onClick={applyPromoCode}
                      disabled={promoApplied || !promoCode}
                      className="px-4 py-2 bg-fibem-primary text-white rounded-lg hover:bg-fibem-dark transition-colors disabled:opacity-50"
                    >
                      {promoApplied ? 'Appliqué' : 'Appliquer'}
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="text-green-600 text-sm mt-1">Code promo appliqué : -10%</p>
                  )}
                </div>

                {/* Price breakdown */}
                <div className="space-y-3 border-t pt-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Sous-total</span>
                    <span>{subtotal.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Commission plateforme (3%)</span>
                    <span>{commission.toFixed(2)} €</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Réduction (-10%)</span>
                      <span>-{discount.toFixed(2)} €</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg text-gray-800 border-t pt-3">
                    <span>Total</span>
                    <span>{total.toFixed(2)} €</span>
                  </div>
                </div>

                <button className="w-full mt-6 py-3 bg-fibem-accent text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors flex items-center justify-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Procéder au paiement
                </button>

                {/* Trust badges */}
                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                    <Shield className="w-5 h-5 text-green-500" />
                    <span>Paiement 100% sécurisé</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <Truck className="w-5 h-5 text-blue-500" />
                    <span>Livraison suivie</span>
                  </div>
                </div>

                {/* Payment methods */}
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm text-gray-500 mb-3">Moyens de paiement acceptés</p>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-xs font-bold text-gray-500">VISA</div>
                    <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-xs font-bold text-gray-500">MC</div>
                    <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-xs font-bold text-gray-500">PP</div>
                    <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-xs font-bold text-gray-500">VIR</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
