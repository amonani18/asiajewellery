import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { SiteConfig, configManager } from '../config/siteConfig'

interface ConfigContextType {
  config: SiteConfig
  updateConfig: (newConfig: Partial<SiteConfig>) => void
  updateProducts: (products: SiteConfig['products']) => void
  updateCollections: (collections: SiteConfig['collections']) => void
  resetToDefault: () => void
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined)

export const useConfig = () => {
  const context = useContext(ConfigContext)
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider')
  }
  return context
}

interface ConfigProviderProps {
  children: ReactNode
}

export const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(configManager.getConfig())

  const updateConfig = (newConfig: Partial<SiteConfig>) => {
    configManager.updateConfig(newConfig)
    setConfig(configManager.getConfig())
  }

  const updateProducts = (products: SiteConfig['products']) => {
    configManager.updateProducts(products)
    setConfig(configManager.getConfig())
  }

  const updateCollections = (collections: SiteConfig['collections']) => {
    configManager.updateCollections(collections)
    setConfig(configManager.getConfig())
  }

  const resetToDefault = () => {
    configManager.resetToDefault()
    setConfig(configManager.getConfig())
  }

  // Update CSS custom properties when theme color changes
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--color-primary', config.themeColor)
    
    // Generate lighter and darker shades
    const color = config.themeColor
    const lighter = adjustColor(color, 20)
    const darker = adjustColor(color, -20)
    
    root.style.setProperty('--color-primary-light', lighter)
    root.style.setProperty('--color-primary-dark', darker)
  }, [config.themeColor])

  return (
    <ConfigContext.Provider value={{
      config,
      updateConfig,
      updateProducts,
      updateCollections,
      resetToDefault
    }}>
      {children}
    </ConfigContext.Provider>
  )
}

// Helper function to adjust color brightness
function adjustColor(color: string, percent: number): string {
  const num = parseInt(color.replace("#", ""), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) + amt
  const G = (num >> 8 & 0x00FF) + amt
  const B = (num & 0x0000FF) + amt
  return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1)
}
