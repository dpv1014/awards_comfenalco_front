import React, { lazy, Suspense } from 'react';

const LazyAwards = lazy(() => import('./Awards'));

const Awards = props => (
  <Suspense fallback={null}>
    <LazyAwards {...props} />
  </Suspense>
);

export default Awards;
