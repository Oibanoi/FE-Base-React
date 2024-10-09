import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Page500 from './Page500';

it('Renders correctly', () => {
  const { container } = render(
    <Router>
      <Page500 />
    </Router>
  );

  expect(container).toMatchSnapshot();
});
