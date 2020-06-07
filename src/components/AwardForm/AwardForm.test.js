import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AwardForm from './AwardForm';

describe('<AwardForm />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<AwardForm />);
    const awardForm = getByTestId('AwardForm');

    expect(awardForm).toBeInTheDocument();
  });
});