import React, { Suspense, lazy } from 'react';

const Home = lazy(() => import('./Home'));

export const App = () => {
  return (
    <>
      <h1>This is the App Shell!</h1>
      <p>
        Contents in the <code>main</code> element below are lazily loaded!
      </p>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Home />
        </Suspense>
      </main>
    </>
  );
};

export default App;
