import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { userServices } from 'services';
import App from './App';

const { getByTestId } = screen;

describe('user has already logged in', () => {
  it('Clicks logout on header', async () => {
    const logoutMock = jest.spyOn(userServices, 'logout');

    render(<App />);

    await waitFor(() => {
      fireEvent.click(getByTestId('current-user-name'));
      fireEvent.click(getByTestId('logout-btn'));
    });

    expect(logoutMock).toHaveBeenCalled();
  });
});
