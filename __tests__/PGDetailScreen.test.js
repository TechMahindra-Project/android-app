import React from 'react';
import { render } from '@testing-library/react-native';
import PGDetailScreen from '../src/screens/PGDetailScreen';

const mockPG = {
  name: 'Test PG',
  rent: '5,000',
  location: 'Test City',
  isAvailable: true,
  noAdvance: true,
  services: ['WiFi'],
  contact: {
    phone: '9999999999',
    email: 'test@test.com',
    manager: 'John',
  },
};

const mockRoute = { params: { pgItem: mockPG } };
const mockNavigation = { navigate: jest.fn() };

test('renders PG name and rent', () => {
  const { getByText } = render(
    <PGDetailScreen route={mockRoute} navigation={mockNavigation} />
  );

  expect(getByText('Test PG')).toBeTruthy();
  expect(getByText('₹5,000/mon')).toBeTruthy();
});
