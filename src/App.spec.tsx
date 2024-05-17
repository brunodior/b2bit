import { render } from '@testing-library/react';
import { NavBar } from './components/Navbar'
import { MockUserProvider } from './tests/test-utils';

describe('NavBar', () => {
  it('should display elements', () => {
    const mockContextValue = {
      login: jest.fn(),
      checkAuth: jest.fn(),
      getUser: jest.fn(),
      logout: jest.fn(),
    };

    const { getByText } = render(
      <MockUserProvider value={mockContextValue}>
        <NavBar />
      </MockUserProvider>
    );

    expect(getByText('Logout')).toBeInTheDocument();
  });
});
