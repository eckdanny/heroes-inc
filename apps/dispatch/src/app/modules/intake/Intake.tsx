import React, { useEffect, useState } from 'react';

// type IUser = {
//   id: number;
//   firstName: string;
//   lastName: string;
//   age: number;
// };

type IntakeProps = {};

const Intake: React.FC<IntakeProps> = () => {
  // const [users, setUsers] = useState<IUser[]>(null);
  // useEffect(() => {
  //   fetch('/api/users')
  //     .then(r => r.json())
  //     .then(
  //       r => setUsers(r),
  //       err => {
  //         debugger;
  //       }
  //     );
  // }, []);
  return (
    <div>
      <h3>Report an Incident</h3>
      hi
    </div>
  );
};

export default Intake;
