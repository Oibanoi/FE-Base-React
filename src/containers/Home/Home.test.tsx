import { render } from '@testing-library/react';
import Home from './Home';

it('Renders correctly', () => {
  const { container } = render(<Home />);

  expect(container).toMatchSnapshot();
});
