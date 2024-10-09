import { render, screen } from '@testing-library/react';
import BrandFilter from './BrandFilter';
const mockSetFilters = jest.fn();

const defaultFilters = {
  page: 1,
  pageSize: 10,
  query: '',
  isActive: undefined,
};
// Add missing import

describe('BrandFilter Component', () => {
  it('renders correctly', () => {
    render(
      <BrandFilter filters={defaultFilters} setFilters={mockSetFilters} />
    );
    expect(screen.getByTestId('EnterName')).toBeInTheDocument();
    expect(screen.getByTestId('SelectStatus')).toBeInTheDocument();
    expect(screen.getByTestId('Search')).toBeInTheDocument();
  });
});
