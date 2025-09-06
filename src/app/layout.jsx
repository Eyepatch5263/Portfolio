import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import { Analytics } from "@vercel/analytics/next"
import '@fortawesome/fontawesome-free/css/all.min.css';


export const metadata = {
  title: 'Portfolio',
  description: 'Personal Portfolio Website',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./logo.svg" />
      </head>
      <body>
          <Analytics />
          <SpeedInsights />
          {children}
      </body>
    </html>
  )
}

