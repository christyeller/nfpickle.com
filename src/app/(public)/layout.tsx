import Header from '@/components/public/Header'
import Footer from '@/components/public/Footer'
import AnnouncementBar from '@/components/public/AnnouncementBar'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="pt-[114px] lg:pt-[164px]">{children}</main>
      <Footer />
    </>
  )
}
