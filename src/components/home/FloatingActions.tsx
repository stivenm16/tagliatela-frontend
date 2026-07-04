'use client'

import { Download, RefreshCw, Share2 } from 'lucide-react'

export const FloatingActions = () => {
  const handleDownload = () => {
    // TODO: implementar descarga del menú
    console.log('Descargar menú')
  }

  const handleRefresh = () => {
    window.location.reload()
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Menú Tagliatela',
          url: window.location.href,
        })
      } catch {
        // Usuario canceló o falló el share nativo
      }
    } else {
      console.log('Compartir no disponible en este dispositivo')
    }
  }

  return (
    <div className="fixed bottom-4 right-4 flex items-center gap-3 z-50">
      <button
        onClick={handleDownload}
        aria-label="Descargar menú"
        className="bg-white/90 text-brand-dark hover:bg-white rounded-full p-3 shadow-lg transition-colors"
      >
        <Download size={24} />
      </button>
      <button
        onClick={handleRefresh}
        aria-label="Actualizar"
        className="bg-white/90 text-brand-dark hover:bg-white rounded-full p-3 shadow-lg transition-colors"
      >
        <RefreshCw size={24} />
      </button>
      <button
        onClick={handleShare}
        aria-label="Compartir"
        className="bg-white/90 text-brand-dark hover:bg-white rounded-full p-3 shadow-lg transition-colors"
      >
        <Share2 size={24} />
      </button>
    </div>
  )
}
