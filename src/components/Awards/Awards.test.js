import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Awards from './Awards';

describe('<Awards />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<Awards />);
    const awards = getByTestId('Awards');

    expect(awards).toBeInTheDocument();
  });
});