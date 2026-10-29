import { draftMode } from 'next/headers';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import '../globals.css';

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode();
  return (
    <>
      {isEnabled && (
        <div className="draft-banner" role="status">
          Draft preview is on. <a href="/api/draft/disable">Exit preview</a>
        </div>
      )}
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
