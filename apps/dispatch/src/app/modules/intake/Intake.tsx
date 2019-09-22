import React, { useEffect, useState } from 'react';
import { IHero } from '@heros-inc/api-interfaces';

type IntakeProps = {};

const Intake: React.FC<IntakeProps> = () => {
  const [heroes, setHeroes] = useState<IHero[]>(null);
  useEffect(() => {
    fetch('/api/heroes')
      .then(r => r.json())
      .then(
        r => setHeroes(r),
        err => {
          debugger;
        }
      );
  }, []);
  return (
    <div>
      <h3>Heroes</h3>
      <div>Hello world from Intake!</div>
      {heroes && heroes.length && (
        <ul>
          {heroes.map(hero => (
            <li key={hero.id}>{hero.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Intake;
