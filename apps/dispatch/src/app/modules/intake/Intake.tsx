import React, { useEffect, useState } from 'react';

type IUser = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
};

type IntakeProps = {};

const Intake: React.FC<IntakeProps> = () => {
  const [users, setUsers] = useState<IUser[]>(null);
  useEffect(() => {
    fetch('/api/users')
      .then(r => r.json())
      .then(
        r => setUsers(r),
        err => {
          debugger;
        }
      );
  }, []);
  return (
    <div>
      <h3>Heroes</h3>
      <div>Hello world from Intake!</div>
      {users && users.length && (
        <ul>
          {users.map(hero => (
            <li key={hero.id}>
              <pre>{JSON.stringify(hero, null, 2)}</pre>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Intake;
