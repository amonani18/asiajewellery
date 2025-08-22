import { useState } from 'react'
import { useConfig } from '../context/ConfigContext'
import type { Product, Collection } from '../config/siteConfig'

const Admin = () => {
  const { config, updateConfig, updateProducts, updateCollections, resetToDefault } = useConfig()
  
  const [activeTab, setActiveTab] = useState('site')
  const [showSuccess, setShowSuccess] = useState(false)
  
  // Site configuration form
  const [siteForm, setSiteForm] = useState({
    websiteName: config.websiteName,
    websiteLogo: config.websiteLogo,
    themeColor: config.themeColor
  })
  
  // Product form
  const [productForm, setProductForm] = useState({
    id: '',
    name: '',
    price: '',
    image: '',
    description: '',
    material: '',
    category: '',
    collection: ''
  })
  
  // Collection form
  const [collectionForm, setCollectionForm] = useState({
    id: '',
    name: '',
    description: '',
    image: ''
  })
  
  const [editingProduct, setEditingProduct] = useState<string | null>(null)
  const [editingCollection, setEditingCollection] = useState<string | null>(null)

  const handleSiteSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateConfig(siteForm)
    showSuccessMessage()
  }

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newProduct: Product = {
      id: editingProduct || Date.now().toString(),
      name: productForm.name,
      price: parseFloat(productForm.price),
      image: productForm.image,
      description: productForm.description,
      material: productForm.material,
      category: productForm.category,
      collection: productForm.collection
    }

    let updatedProducts = [...config.products]
    if (editingProduct) {
      updatedProducts = updatedProducts.map(p => p.id === editingProduct ? newProduct : p)
    } else {
      updatedProducts.push(newProduct)
    }
    
    updateProducts(updatedProducts)
    resetProductForm()
    showSuccessMessage()
  }

  const handleCollectionSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newCollection: Collection = {
      id: editingCollection || Date.now().toString(),
      name: collectionForm.name,
      description: collectionForm.description,
      image: collectionForm.image
    }

    let updatedCollections = [...config.collections]
    if (editingCollection) {
      updatedCollections = updatedCollections.map(c => c.id === editingCollection ? newCollection : c)
    } else {
      updatedCollections.push(newCollection)
    }
    
    updateCollections(updatedCollections)
    resetCollectionForm()
    showSuccessMessage()
  }

  const editProduct = (product: Product) => {
    setProductForm({
      id: product.id,
      name: product.name,
      price: product.price.toString(),
      image: product.image,
      description: product.description,
      material: product.material,
      category: product.category,
      collection: product.collection
    })
    setEditingProduct(product.id)
  }

  const editCollection = (collection: Collection) => {
    setCollectionForm({
      id: collection.id,
      name: collection.name,
      description: collection.description,
      image: collection.image
    })
    setEditingCollection(collection.id)
  }

  const deleteProduct = (productId: string) => {
    const updatedProducts = config.products.filter(p => p.id !== productId)
    updateProducts(updatedProducts)
    showSuccessMessage()
  }

  const deleteCollection = (collectionId: string) => {
    const updatedCollections = config.collections.filter(c => c.id !== collectionId)
    updateCollections(updatedCollections)
    showSuccessMessage()
  }

  const resetProductForm = () => {
    setProductForm({
      id: '',
      name: '',
      price: '',
      image: '',
      description: '',
      material: '',
      category: '',
      collection: ''
    })
    setEditingProduct(null)
  }

  const resetCollectionForm = () => {
    setCollectionForm({
      id: '',
      name: '',
      description: '',
      image: ''
    })
    setEditingCollection(null)
  }

  const showSuccessMessage = () => {
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const categories = ['Ring', 'Necklace', 'Earrings', 'Bracelet', 'Pendant', 'Chain']
  const materials = ['Gold', 'Silver', 'Diamond', 'Platinum', 'Pearl', 'Emerald', 'Ruby', 'Sapphire']

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Website Admin Panel</h1>
          <p className="text-lg text-gray-600">Manage your jewelry website configuration</p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            Changes saved successfully!
          </div>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveTab('site')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'site'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Site Settings
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'products'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('collections')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'collections'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Collections
          </button>
          <button
            onClick={() => setActiveTab('reset')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'reset'
                ? 'bg-red-600 text-white'
                : 'bg-white text-red-600 hover:bg-red-50 border border-red-200'
            }`}
          >
            Reset to Default
          </button>
        </div>

        {/* Site Settings Tab */}
        {activeTab === 'site' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Site Configuration</h2>
            <form onSubmit={handleSiteSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website Name
                </label>
                <input
                  type="text"
                  value={siteForm.websiteName}
                  onChange={(e) => setSiteForm({ ...siteForm, websiteName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo URL
                </label>
                <input
                  type="url"
                  value={siteForm.websiteLogo}
                  onChange={(e) => setSiteForm({ ...siteForm, websiteLogo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://example.com/logo.png"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Theme Color
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="color"
                    value={siteForm.themeColor}
                    onChange={(e) => setSiteForm({ ...siteForm, themeColor: e.target.value })}
                    className="w-16 h-10 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    value={siteForm.themeColor}
                    onChange={(e) => setSiteForm({ ...siteForm, themeColor: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="#0e5332"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 px-6 rounded-md font-medium hover:bg-primary-light transition-colors"
              >
                Save Site Settings
              </button>
            </form>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Add/Edit Product Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <form onSubmit={handleProductSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                  <input
                    type="number"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                  <input
                    type="url"
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
                  <select
                    value={productForm.material}
                    onChange={(e) => setProductForm({ ...productForm, material: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  >
                    <option value="">Select Material</option>
                    {materials.map(material => (
                      <option key={material} value={material}>{material}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Collection</label>
                  <select
                    value={productForm.collection}
                    onChange={(e) => setProductForm({ ...productForm, collection: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  >
                    <option value="">Select Collection</option>
                    {config.collections.map(collection => (
                      <option key={collection.id} value={collection.name}>{collection.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                
                <div className="md:col-span-2 flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-primary text-white py-3 px-6 rounded-md font-medium hover:bg-primary-light transition-colors"
                  >
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                  {editingProduct && (
                    <button
                      type="button"
                      onClick={resetProductForm}
                      className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-md font-medium hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Products List */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-6">Current Products</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {config.products.map((product) => (
                  <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-32 object-cover rounded-md mb-3"
                    />
                    <h4 className="font-semibold text-gray-900 mb-2">{product.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">₹{product.price.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mb-3">{product.material} • {product.category}</p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => editProduct(product)}
                        className="flex-1 bg-blue-500 text-white py-2 px-3 rounded text-sm hover:bg-blue-600 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="flex-1 bg-red-500 text-white py-2 px-3 rounded text-sm hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Collections Tab */}
        {activeTab === 'collections' && (
          <div className="space-y-6">
            {/* Add/Edit Collection Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                {editingCollection ? 'Edit Collection' : 'Add New Collection'}
              </h2>
              <form onSubmit={handleCollectionSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={collectionForm.name}
                    onChange={(e) => setCollectionForm({ ...collectionForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                  <input
                    type="url"
                    value={collectionForm.image}
                    onChange={(e) => setCollectionForm({ ...collectionForm, image: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={collectionForm.description}
                    onChange={(e) => setCollectionForm({ ...collectionForm, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-primary text-white py-3 px-6 rounded-md font-medium hover:bg-primary-light transition-colors"
                  >
                    {editingCollection ? 'Update Collection' : 'Add Collection'}
                  </button>
                  {editingCollection && (
                    <button
                      type="button"
                      onClick={resetCollectionForm}
                      className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-md font-medium hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Collections List */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-6">Current Collections</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {config.collections.map((collection) => (
                  <div key={collection.id} className="border border-gray-200 rounded-lg p-4">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-32 object-cover rounded-md mb-3"
                    />
                    <h4 className="font-semibold text-gray-900 mb-2">{collection.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{collection.description}</p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => editCollection(collection)}
                        className="flex-1 bg-blue-500 text-white py-2 px-3 rounded text-sm hover:bg-blue-600 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCollection(collection.id)}
                        className="flex-1 bg-red-500 text-white py-2 px-3 rounded text-sm hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Reset Tab */}
        {activeTab === 'reset' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Reset to Default</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Warning</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>This action will reset all your website settings, products, and collections to their default values. This action cannot be undone.</p>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                resetToDefault()
                showSuccessMessage()
              }}
              className="w-full bg-red-600 text-white py-3 px-6 rounded-md font-medium hover:bg-red-700 transition-colors"
            >
              Reset to Default Configuration
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin
