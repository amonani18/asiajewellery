import { useConfig } from '../context/ConfigContext'

const Collections = () => {
  const { config } = useConfig()
  const newestCollection = config.products.filter(p => p.collection === 'Newest Collection')
  const trending = config.products.filter(p => p.collection === 'Trending')
  const bestsellers = config.products.filter(p => p.collection === 'Bestsellers')

  const collections = [
    {
      name: 'Newest Collection',
      description: 'Discover our latest designs that push the boundaries of contemporary jewelry.',
      products: newestCollection,
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=400&fit=crop&crop=center'
    },
    {
      name: 'Trending',
      description: 'The most popular pieces that are capturing hearts and turning heads.',
      products: trending,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=400&fit=crop&crop=center'
    },
    {
      name: 'Bestsellers',
      description: 'Timeless classics that have stood the test of time and continue to inspire.',
      products: bestsellers,
      image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&h=400&fit=crop&crop=center'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1920&h=600&fit=crop&crop=center"
            alt="Collections"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
            Our Collections
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Each collection tells a unique story, crafted with passion and designed to celebrate life's most precious moments.
          </p>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {collections.map((collection, index) => (
            <div key={collection.name} className={`mb-20 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="lg:flex items-center gap-12">
                {/* Collection Image */}
                <div className="lg:w-1/2 mb-8 lg:mb-0">
                  <div className="relative overflow-hidden rounded-lg shadow-2xl">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-96 lg:h-[500px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl font-serif font-bold mb-2">{collection.name}</h3>
                      <p className="text-sm opacity-90">{collection.products.length} pieces</p>
                    </div>
                  </div>
                </div>

                {/* Collection Content */}
                <div className="lg:w-1/2">
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                    {collection.name}
                  </h2>
                  <p className="text-lg text-gray-600 mb-8">
                    {collection.description}
                  </p>
                  
                  {/* Featured Products */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {collection.products.slice(0, 4).map((product) => (
                      <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden card-hover">
                        <div className="relative">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-32 object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="font-serif font-semibold text-gray-900 text-sm mb-1">
                            {product.name}
                          </h4>
                          <p className="text-lg font-bold text-primary">
                            ₹{product.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <button className="btn-primary">
                      View All {collection.name}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Special Collections */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Special Collections
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Limited edition pieces and exclusive designs that define luxury and sophistication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Wedding Collection',
                description: 'Symbols of eternal love and commitment',
                image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&h=300&fit=crop&crop=center',
                count: '25 pieces'
              },
              {
                name: 'Festival Collection',
                description: 'Celebrate traditions with modern elegance',
                image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop&crop=center',
                count: '30 pieces'
              },
              {
                name: 'Corporate Collection',
                description: 'Professional sophistication for the modern woman',
                image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=300&fit=crop&crop=center',
                count: '20 pieces'
              }
            ].map((special, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg shadow-lg card-hover">
                  <img
                    src={special.image}
                    alt={special.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                    <h3 className="text-xl font-serif font-semibold mb-2 text-center">{special.name}</h3>
                    <p className="text-sm opacity-90 text-center mb-2">{special.description}</p>
                    <span className="text-xs bg-white/20 px-3 py-1 rounded-full">{special.count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Find Your Perfect Piece
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Whether you're looking for a timeless classic or a contemporary statement piece, our collections offer something for every style and occasion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-secondary">
              Explore All Collections
            </button>
            <button className="btn-primary">
              Book Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Collections
