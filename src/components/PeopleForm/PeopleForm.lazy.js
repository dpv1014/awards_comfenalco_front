import React, { lazy, Suspense } from 'react';

const LazyPeopleForm = lazy(() => import('./PeopleForm'));

const PeopleForm = props => (
  <Suspense fallback={null}>
    <LazyPeopleForm {...props} />
  </Suspense>
);

export default PeopleForm;
