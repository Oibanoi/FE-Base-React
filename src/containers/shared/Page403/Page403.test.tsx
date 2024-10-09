import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Page403 from './Page403';

it('Renders correctly', () => {
  const { container } = render(
    <Router>
      <Page403 />
    </Router>
  );

  expect(container).toMatchSnapshot();
});
