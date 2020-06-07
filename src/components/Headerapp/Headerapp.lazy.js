import React, { lazy, Suspense } from 'react';

const LazyHeaderapp = lazy(() => import('./Headerapp'));

const Headerapp = props => (
  <Suspense fallback={null}>
    <LazyHeaderapp {...props} />
  </Suspense>
);

export default Headerapp;
