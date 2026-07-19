'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useCallback, useState } from 'react'
import { CookieConsent } from './CookieConsent'

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID

export function TrackingScripts() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [consentGranted, setConsentGranted] = useState(false)

  const handleConsent = useCallback((granted: boolean) => {
    setConsentGranted(granted)
  }, [])

  useEffect(() => {
    if (!consentGranted) return
    if (window.fbq) window.fbq('track', 'PageView')
    if (window.gtag && GOOGLE_ADS_ID) {
      window.gtag('config', GOOGLE_ADS_ID, { page_path: pathname })
    }
  }, [pathname, searchParams, consentGranted])

  return (
    <>
      <CookieConsent onConsent={handleConsent} />

      {consentGranted && META_PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
        `}</Script>
      )}

      {consentGranted && GOOGLE_ADS_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-ads" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_ID}');
          `}</Script>
        </>
      )}
    </>
  )
}
