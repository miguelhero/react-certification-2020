import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen } from '@testing-library/react';
import ThumbnailCard from './ThumbnailCard.component';

describe('ThumbnailCard component', () => {
  it('displays title, content, image, and alt text', () => {
    render(
      <ThumbnailCard
        image="image url"
        imageAltText="alt text"
        title="video title"
        description="video description"
      />
    );
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('video title');
    expect(button).toHaveTextContent('video description');
    expect(button.getElementsByTagName('div')[0]).toHaveAttribute('title', 'alt text');
  });
});
