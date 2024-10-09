import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { BackToHomeButton, LogoutButton } from '.';
describe('Button Component', () => {
  it('Renders button back to home correctly', () => {
    const { container } = render(
      <Router>
        <BackToHomeButton />
      </Router>
    );

    expect(container).toMatchSnapshot();
  });

  it('Renders button logout correctly', () => {
    const { container } = render(
      <Router>
        <LogoutButton />
      </Router>
    );

    expect(container).toMatchSnapshot();
  });
});
