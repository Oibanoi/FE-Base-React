import { render } from '@testing-library/react';
import { useMedia } from 'use-media';
import { Responsive } from './Responsive'; // Adjust the path as needed

jest.mock('use-media');

describe('Responsive component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });
  it('renders mobile content when isMobile is true', () => {
    (useMedia as jest.Mock).mockReturnValue(true);
    const { getByText } = render(
      <Responsive
        mobile={<div>Mobile Content</div>}
        desktop={<div>Desktop Content</div>}
      />
    );
    expect(getByText('Mobile Content')).toBeInTheDocument();
  });

  it('renders desktop content when isMobile is false', () => {
    (useMedia as jest.Mock).mockReturnValue(false);
    const { getByText } = render(
      <Responsive
        mobile={<div>Mobile Content</div>}
        desktop={<div>Desktop Content</div>}
      />
    );
    expect(getByText('Desktop Content')).toBeInTheDocument();
  });

  it('renders children as default content when useChildDefault is true', () => {
    (useMedia as jest.Mock).mockReturnValue(false);
    const { getByText } = render(
      <Responsive useChildDefault={true}>
        <div>Default Child Content</div>
      </Responsive>
    );
    expect(getByText('Default Child Content')).toBeInTheDocument();
  });

  it('renders desktop content when mobile and desktop are not provided', () => {
    (useMedia as jest.Mock).mockReturnValue(false);
    const { container } = render(<Responsive />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders mobile content when mobile is provided and isMobile is true', () => {
    (useMedia as jest.Mock).mockReturnValue(true);
    const { getByText } = render(
      <Responsive mobile={<div>Mobile Content</div>} />
    );
    expect(getByText('Mobile Content')).toBeInTheDocument();
  });

  it('renders desktop content when desktop is provided and isMobile is false', () => {
    (useMedia as jest.Mock).mockReturnValue(false);
    const { getByText } = render(
      <Responsive desktop={<div>Desktop Content</div>} />
    );
    expect(getByText('Desktop Content')).toBeInTheDocument();
  });
});
