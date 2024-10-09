import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Page404 from './Page404';

it('Renders correctly', () => {
  const { container } = render(
    <Router>
      <Page404 />
    </Router>
  );

  expect(container).toMatchSnapshot();
});
