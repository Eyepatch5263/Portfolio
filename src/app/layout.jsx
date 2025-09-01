import './globals.css'
import { Analytics } from "@vercel/analytics/next"

export const metadata = {
  title: 'Portfolio',
  description: 'Personal Portfolio Website',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./logo .svg" />
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
        <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css" />
      </head>
      <body>
        <Analytics />
        {children}
      </body>
    </html>
  )
}

