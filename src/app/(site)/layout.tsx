import { draftMode } from 'next/headers';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getRoadMap } from '@/lib/content';
import '../globals.css';

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode();
  const stops = await getRoadMap(isEnabled);
  return (
    <>
      {isEnabled && (
        <div className="draft-banner" role="status">
          Draft preview is on. <a href="/api/draft/disable">Exit preview</a>
        </div>
      )}
      <Header stops={stops} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
