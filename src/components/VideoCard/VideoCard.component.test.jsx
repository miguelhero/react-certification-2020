import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import VideoCard from './VideoCard.component';
// import { useAuth } from '../../providers/Auth';
// import { mockedUser } from '../../services/login.api';

jest.mock('../../providers/Auth', () => ({
  useAuth: jest.fn(),
}));

describe('VideoCard component', () => {
  it('shows display info', () => {
    const props = {
      videoId: 'abcdef',
      imageSrc: 'http://url',
      altText: 'alttext',
      videoTitle: 'video title',
      videoDesc: 'video desc',
    };
    render(<VideoCard {...props} />, { wrapper: MemoryRouter });
    expect(screen.getByRole('heading', { name: props.videoTitle })).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', `/watch/${props.videoId}`);
    expect(screen.getByRole('button')).toHaveTextContent(props.videoDesc);
    expect(screen.getByTestId('card-media')).toHaveStyle(
      `background-image: url(${props.imageSrc})`
    );
    expect(screen.getByTestId('card-media')).toHaveAttribute('title', props.altText);
  });
});
