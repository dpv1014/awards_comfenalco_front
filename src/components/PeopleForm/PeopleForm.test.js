import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PeopleForm from './PeopleForm';

describe('<PeopleForm />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<PeopleForm />);
    const peopleForm = getByTestId('PeopleForm');

    expect(peopleForm).toBeInTheDocument();
  });
});