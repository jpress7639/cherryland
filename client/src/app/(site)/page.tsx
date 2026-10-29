import { draftMode } from 'next/headers';
import { RoadMap } from '@/components/RoadMap';
import { getRoadMap } from '@/lib/content';

export default async function HomePage() {
  const { isEnabled } = await draftMode();
  const stops = await getRoadMap(isEnabled);

  return (
    <section className="hero" id="services">
      <div className="wrap">
        <p className="label label--cherry">Creative agency for musical artists</p>
        <h1 className="display hero__title">
          Find your way to <em>unforgettable.</em>
        </h1>
        <p className="lede">
          Every route through Cherryland leads somewhere on-brand. Trace the line to see where we can take your
          project.
        </p>
      </div>
      <div className="wrap">
        <RoadMap stops={stops} />
      </div>
    </section>
  );
}
