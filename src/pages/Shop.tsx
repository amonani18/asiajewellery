import { useState, useMemo } from 'react'
import { useConfig } from '../context/ConfigContext'

const Shop = () => {
  const { config } = useConfig()
  const [selectedMaterial, setSelectedMaterial] = useState<string>('All')
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('All')
  const [selectedCollection, setSelectedCollection] = useState<string>('All')
  const [sortBy, setSortBy] = useState<string>('name')

  const materials = ['All', 'Gold', 'Silver', 'Diamond', 'Platinum']
  const priceRanges = [
    { label: 'All', min: 0, max: Infinity },
    { label: 'Under ₹2000', min: 0, max: 2000 },
    { label: '₹2000–₹5000', min: 2000, max: 5000 },
    { label: '₹5000–₹20000', min: 5000, max: 20000 },
    { label: 'Above ₹20000', min: 20000, max: Infinity }
  ]
  const collections = ['All', 'Newest Collection', 'Trending', 'Bestsellers']

  const filteredProducts = useMemo(() => {
    let filtered = config.products

    // Filter by material
    if (selectedMaterial !== 'All') {
      filtered = filtered.filter(product => product.material === selectedMaterial)
    }

    // Filter by price range
    if (selectedPriceRange !== 'All') {
      const range = priceRanges.find(r => r.label === selectedPriceRange)
      if (range) {
        filtered = filtered.filter(product => product.price >= range.min && product.price <= range.max)
      }
    }

    // Filter by collection
    if (selectedCollection !== 'All') {
      filtered = filtered.filter(product => product.collection === selectedCollection)
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'name':
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    return filtered
  }, [selectedMaterial, selectedPriceRange, selectedCollection, sortBy])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Shop Our Collection</h1>
          <p className="text-lg text-gray-600">Discover exquisite jewelry pieces that tell your unique story</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-serif font-semibold text-gray-900 mb-6">Filters</h2>
              
              {/* Material Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Material</h3>
                <div className="space-y-2">
                  {materials.map((material) => (
                    <label key={material} className="flex items-center">
                      <input
                        type="radio"
                        name="material"
                        value={material}
                        checked={selectedMaterial === material}
                        onChange={(e) => setSelectedMaterial(e.target.value)}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">{material}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <label key={range.label} className="flex items-center">
                      <input
                        type="radio"
                        name="priceRange"
                        value={range.label}
                        checked={selectedPriceRange === range.label}
                        onChange={(e) => setSelectedPriceRange(e.target.value)}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Collection Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Collection</h3>
                <div className="space-y-2">
                  {collections.map((collection) => (
                    <label key={collection} className="flex items-center">
                      <input
                        type="radio"
                        name="collection"
                        value={collection}
                        checked={selectedCollection === collection}
                        onChange={(e) => setSelectedCollection(e.target.value)}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">{collection}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSelectedMaterial('All')
                  setSelectedPriceRange('All')
                  setSelectedCollection('All')
                }}
                className="w-full text-sm text-primary hover:text-primary-dark transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Sort and Results Count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                             <p className="text-sm text-gray-600 mb-2 sm:mb-0">
                 Showing {filteredProducts.length} of {config.products.length} products
               </p>
              <div className="flex items-center space-x-4">
                <label className="text-sm text-gray-700">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="name">Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="group">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden card-hover">
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2">
                          <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                            {product.collection}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-serif font-semibold text-gray-900 mb-2">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-xl font-bold text-primary">
                            ₹{product.price.toLocaleString()}
                          </span>
                          <span className="text-sm text-gray-500 capitalize">
                            {product.material}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500 uppercase tracking-wide">
                            {product.category}
                          </span>
                          <button className="text-sm text-primary hover:text-primary-dark font-medium transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your filters to find what you're looking for.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop
