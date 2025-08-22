export interface Product {
  id: string
  name: string
  price: number
  image: string
  description: string
  material: string
  category: string
  collection: string
}

export interface Collection {
  id: string
  name: string
  description: string
  image: string
}

export interface SiteConfig {
  websiteName: string
  websiteLogo: string
  themeColor: string
  products: Product[]
  collections: Collection[]
  about: {
    story: string
    mission: string
    values: Array<{
      title: string
      description: string
      icon: string
    }>
    craftsmanship: string
    timeline: Array<{
      year: string
      title: string
      description: string
    }>
  }
  contact: {
    address: string
    phone: string
    email: string
    businessHours: string
  }
}

// Default configuration
export const defaultConfig: SiteConfig = {
  websiteName: "Asia Jeweller",
  websiteLogo: "/logo.png",
  themeColor: "#0e5332",
  products: [
    {
      id: "1",
      name: "Diamond Solitaire Ring",
      price: 45000,
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
      description: "Exquisite diamond solitaire ring with 18K white gold setting",
      material: "Diamond",
      category: "Ring",
      collection: "Newest Collection"
    },
    {
      id: "2",
      name: "Pearl Necklace",
      price: 8500,
      image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop",
      description: "Elegant freshwater pearl necklace with sterling silver clasp",
      material: "Silver",
      category: "Necklace",
      collection: "Trending"
    },
    {
      id: "3",
      name: "Gold Bangle Set",
      price: 28000,
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
      description: "Traditional gold bangle set perfect for special occasions",
      material: "Gold",
      category: "Bracelet",
      collection: "Bestsellers"
    },
    {
      id: "4",
      name: "Sapphire Earrings",
      price: 15000,
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
      description: "Stunning sapphire drop earrings with diamond accents",
      material: "Platinum",
      category: "Earrings",
      collection: "Newest Collection"
    },
    {
      id: "5",
      name: "Rose Gold Chain",
      price: 12000,
      image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop",
      description: "Delicate rose gold chain necklace with adjustable length",
      material: "Gold",
      category: "Necklace",
      collection: "Trending"
    },
    {
      id: "6",
      name: "Emerald Ring",
      price: 35000,
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
      description: "Vintage-inspired emerald ring with diamond halo setting",
      material: "Diamond",
      category: "Ring",
      collection: "Bestsellers"
    }
  ],
  collections: [
    {
      id: "1",
      name: "Newest Collection",
      description: "Discover our latest designs and contemporary pieces",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=400&fit=crop"
    },
    {
      id: "2",
      name: "Trending",
      description: "Most popular pieces loved by our customers",
      image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&h=400&fit=crop"
    },
    {
      id: "3",
      name: "Bestsellers",
      description: "Timeless classics that never go out of style",
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=400&fit=crop"
    }
  ],
  about: {
    story: "Founded in 1995, Asia Jeweller has been crafting exquisite jewelry pieces that tell unique stories. Our journey began with a simple vision: to create timeless pieces that celebrate life's precious moments.",
    mission: "To provide exceptional jewelry that combines traditional craftsmanship with contemporary design, making luxury accessible to everyone.",
    values: [
      {
        title: "Quality",
        description: "We use only the finest materials and maintain the highest standards of craftsmanship.",
        icon: "✨"
      },
      {
        title: "Trust",
        description: "Building lasting relationships through transparency and reliability.",
        icon: "🤝"
      },
      {
        title: "Innovation",
        description: "Continuously evolving our designs to meet modern tastes and preferences.",
        icon: "💎"
      }
    ],
    craftsmanship: "Our master artisans bring decades of experience to every piece, ensuring that each creation is a work of art. We combine traditional techniques with modern technology to achieve perfection.",
    timeline: [
      {
        year: "1995",
        title: "Foundation",
        description: "Started as a small family workshop"
      },
      {
        year: "2005",
        title: "Expansion",
        description: "Opened our first retail store"
      },
      {
        year: "2015",
        title: "Innovation",
        description: "Launched online platform"
      },
      {
        year: "2023",
        title: "Excellence",
        description: "Recognized as leading jewelry brand"
      }
    ]
  },
  contact: {
    address: "123 Jewelry Street, Mumbai, Maharashtra 400001",
    phone: "+91 98765 43210",
    email: "info@asiajweller.com",
    businessHours: "Monday - Saturday: 10:00 AM - 8:00 PM, Sunday: 11:00 AM - 6:00 PM"
  }
}

// Configuration management
class ConfigManager {
  private config: SiteConfig

  constructor() {
    // Load from localStorage or use default
    const savedConfig = localStorage.getItem('siteConfig')
    this.config = savedConfig ? JSON.parse(savedConfig) : defaultConfig
  }

  getConfig(): SiteConfig {
    return this.config
  }

  updateConfig(newConfig: Partial<SiteConfig>): void {
    this.config = { ...this.config, ...newConfig }
    localStorage.setItem('siteConfig', JSON.stringify(this.config))
  }

  updateProducts(products: Product[]): void {
    this.config.products = products
    localStorage.setItem('siteConfig', JSON.stringify(this.config))
  }

  updateCollections(collections: Collection[]): void {
    this.config.collections = collections
    localStorage.setItem('siteConfig', JSON.stringify(this.config))
  }

  resetToDefault(): void {
    this.config = defaultConfig
    localStorage.setItem('siteConfig', JSON.stringify(this.config))
  }
}

export const configManager = new ConfigManager()
