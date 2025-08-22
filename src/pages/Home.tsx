import { useConfig } from '../context/ConfigContext'

const Home = () => {
  const { config } = useConfig()
  const featuredProducts = config.products.slice(0, 4)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1920&h=1080&fit=crop&crop=center"
            alt="Premium Jewelry"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 gradient-overlay"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6">
            Timeless Jewelry for Every Occasion
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-200">
            Discover our exquisite collection of premium jewelry crafted with passion, precision, and timeless elegance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary text-lg px-8 py-4">
              Explore Collection
            </button>
            <button className="btn-secondary text-lg px-8 py-4">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Our Collections
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From elegant rings to stunning necklaces, discover jewelry that tells your unique story.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&crop=center', count: '50+ Designs' },
              { name: 'Necklaces', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop&crop=center', count: '40+ Styles' },
              { name: 'Earrings', image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=400&fit=crop&crop=center', count: '35+ Pairs' },
              { name: 'Bracelets', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop&crop=center', count: '30+ Designs' }
            ].map((category, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg shadow-lg card-hover">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <h3 className="text-xl font-serif font-semibold mb-2">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.count}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Handpicked pieces that embody elegance, craftsmanship, and timeless beauty.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group">
                <div className="relative overflow-hidden rounded-lg shadow-lg card-hover bg-white">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-serif font-semibold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-primary">
                        ₹{product.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500 capitalize">
                        {product.material}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Crafted with Passion
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                For over three decades, AsiaJweller has been creating exceptional jewelry that celebrates life's most precious moments. Our master craftsmen combine traditional techniques with modern innovation to bring you pieces of unparalleled beauty and quality.
              </p>
              <button className="btn-secondary">
                Our Story
              </button>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=400&fit=crop&crop=center"
                alt="Craftsmanship"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Stay Updated
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Be the first to know about new collections, exclusive offers, and jewelry care tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button className="btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
