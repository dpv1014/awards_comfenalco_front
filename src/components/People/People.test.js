import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import People from './People';

describe('<People />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<People />);
    const people = getByTestId('People');

    expect(people).toBeInTheDocument();
  });
});