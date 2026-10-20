import './globals.css'

export const metadata = { title: 'VALDEUD OS', description: 'Le centre de contrôle de ton agence' }

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
