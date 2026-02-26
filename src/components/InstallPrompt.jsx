import { useState, useEffect } from 'react'

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }
    if (localStorage.getItem('han-pwa-installed') === 'true') {
      setIsInstalled(true)
      return
    }

    const onBeforeInstall = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setTimeout(() => setShowPrompt(true), 3000)
    }
    const onInstalled = () => {
      setIsInstalled(true)
      setShowPrompt(false)
      setDeferredPrompt(null)
      localStorage.setItem('han-pwa-installed', 'true')
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstall)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setIsInstalled(true)
      localStorage.setItem('han-pwa-installed', 'true')
    }
    setDeferredPrompt(null)
    setShowPrompt(false)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    sessionStorage.setItem('han-pwa-dismissed', 'true')
  }

  if (
    isInstalled ||
    !showPrompt ||
    !deferredPrompt ||
    sessionStorage.getItem('han-pwa-dismissed') === 'true'
  ) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-label="Install Han Portfolio"
    >
      <div className="w-full max-w-md rounded-2xl bg-tertiary p-6 shadow-xl border border-gray-200/60">
        <h3 className="text-lg font-semibold text-primary mb-1">
          Install Han Portfolio
        </h3>
        <p className="text-sm text-primary/80 mb-4">
          Add to your home screen for quick access and an app-like experience.
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleDismiss}
            className="flex-1 py-2.5 px-4 rounded-full text-sm font-medium text-primary border border-gray-300 hover:bg-gray-100"
          >
            Maybe Later
          </button>
          <button
            type="button"
            onClick={handleInstall}
            className="flex-1 py-2.5 px-4 rounded-full text-sm font-medium text-white bg-primary hover:opacity-90"
          >
            Install
          </button>
        </div>
      </div>
    </div>
  )
}
