import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Headerapp from './Headerapp';

describe('<Headerapp />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<Headerapp />);
    const headerapp = getByTestId('Headerapp');

    expect(headerapp).toBeInTheDocument();
  });
});