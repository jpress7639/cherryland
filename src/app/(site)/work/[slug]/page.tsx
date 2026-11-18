import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { CaseStudyView } from '@/components/CaseStudyView';
import { getCaseStudies, getCaseStudy, getServices } from '@/lib/content';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const studies = await getCaseStudies();
  return studies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  return study ? { title: study.title, description: study.tagline } : {};
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const [study, services] = await Promise.all([getCaseStudy(slug, isEnabled), getServices()]);
  if (!study) notFound();
  const serviceNames = Object.fromEntries(services.map((s) => [s.slug, s.name]));
  return <CaseStudyView study={study} serviceNames={serviceNames} />;
}
