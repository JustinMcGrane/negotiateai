declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    gtag?: (...args: unknown[]) => void
  }
}

export function trackMetaEvent(event: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', event, params)
  }
}

export function trackGoogleConversion(conversionLabel: string, value?: number) {
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID
  if (typeof window !== 'undefined' && window.gtag && adsId) {
    window.gtag('event', 'conversion', {
      send_to: `${adsId}/${conversionLabel}`,
      value,
      currency: 'USD',
    })
  }
}
