import Header from '@/components/public/Header'
import Footer from '@/components/public/Footer'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="pt-[70px] lg:pt-[160px]">{children}</main>
      <Footer />
    </>
  )
}
