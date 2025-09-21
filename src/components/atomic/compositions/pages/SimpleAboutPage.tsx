'use client';

import { AP010Hero } from '../../organisms/AP010Hero';
import { AP020OurMission } from '../../organisms/AP020OurMission';
import { AP030TheTeam } from '../../organisms/AP030TheTeam';

export const SimpleAboutPage = () => {
  return (
    <div className='w-full'>
      <section className='container mx-auto px-4 py-12'>
        <AP010Hero />
      </section>
      <section className='w-full'>
        <AP020OurMission />
      </section>
      <section className='w-full'>
        <AP030TheTeam />
      </section>
    </div>
  );
};
