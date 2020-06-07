import React, { lazy, Suspense } from 'react';

const LazyAwardForm = lazy(() => import('./AwardForm'));

const AwardForm = props => (
  <Suspense fallback={null}>
    <LazyAwardForm {...props} />
  </Suspense>
);

export default AwardForm;
