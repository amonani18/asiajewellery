import { useConfig } from '../context/ConfigContext'

const About = () => {
  const { config } = useConfig()
  const values = config.about.values.map(value => ({
    ...value,
    icon: <span className="text-2xl">{value.icon}</span>
  }))

  const milestones = config.about.timeline

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1920&h=600&fit=crop&crop=center"
            alt="About Us"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
            Our Story
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Three decades of passion, craftsmanship, and dedication to creating jewelry that tells your unique story.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                At AsiaJweller, we believe that every piece of jewelry should be more than just an accessory. 
                It should be a reflection of your personality, a celebration of your achievements, and a 
                testament to the moments that matter most in your life.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our mission is to create jewelry that not only enhances your beauty but also tells your story. 
                We combine traditional craftsmanship with contemporary design to create pieces that are both 
                timeless and relevant to today's modern lifestyle.
              </p>
              <p className="text-lg text-gray-600">
                From the selection of the finest materials to the final polish, every step in our process 
                is guided by our commitment to excellence and our passion for creating jewelry that you'll 
                treasure for a lifetime.
              </p>
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

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do, from design to delivery.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-serif font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=400&fit=crop&crop=center"
                alt="Craftsmanship"
                className="rounded-lg shadow-2xl"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
                The Art of Craftsmanship
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Our master craftsmen bring decades of experience and an unwavering commitment to perfection 
                to every piece they create. Using traditional techniques passed down through generations, 
                combined with modern precision tools, they transform precious metals and gemstones into 
                works of art.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Each piece undergoes rigorous quality control at multiple stages, ensuring that every detail 
                meets our exacting standards. From the initial design sketch to the final polish, our 
                craftsmen pour their heart and soul into creating jewelry that will be cherished for 
                generations.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">30+</div>
                  <div className="text-sm text-gray-600">Years of Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">50+</div>
                  <div className="text-sm text-gray-600">Master Craftsmen</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Three decades of growth, innovation, and dedication to excellence.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-primary"></div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <div className="text-2xl font-bold text-primary mb-2">{milestone.year}</div>
                      <h3 className="text-lg font-serif font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-md"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Why Trust AsiaJweller?
          </h2>
          <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto">
            Our commitment to quality, transparency, and customer satisfaction has made us a trusted name 
            in jewelry for over three decades.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Certified Quality',
                description: 'All our jewelry comes with proper certification and quality guarantees.'
              },
              {
                title: 'Lifetime Warranty',
                description: 'We stand behind our craftsmanship with comprehensive warranty coverage.'
              },
              {
                title: 'Expert Consultation',
                description: 'Our jewelry experts are here to guide you in making the perfect choice.'
              }
            ].map((trust, index) => (
              <div key={index} className="text-center">
                <h3 className="text-xl font-serif font-semibold mb-3">{trust.title}</h3>
                <p className="text-gray-300">{trust.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
