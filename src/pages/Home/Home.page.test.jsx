import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './Home.page';
import youtube from '../../services/youtube';

jest.mock('../../services/youtube');

const videosDataResponse = {
  data: {
    items: [
      {
        id: { videoId: 'hwLo7aU1Aas' },
        snippet: {
          title: 'The Best Surfing Clips of 2019',
          description: '',
          thumbnails: {
            default: {
              url: 'https://i.ytimg.com/vi/hwLo7aU1Aas/default.jpg',
              width: 120,
              height: 90,
            },
            medium: {
              url: 'https://i.ytimg.com/vi/hwLo7aU1Aas/mqdefault.jpg',
              width: 320,
              height: 180,
            },
            high: {
              url: 'https://i.ytimg.com/vi/hwLo7aU1Aas/hqdefault.jpg',
              width: 480,
              height: 360,
            },
          },
        },
      },
      {
        id: { videoId: 'UB_jWsKAYIY' },
        snippet: {
          title: 'One Hundred Perfect Meters - Uluwatu, 3 October 2020',
          description:
            'After some fun ramps at Canggu earlier in the day (see https://youtu.be/CGNBP2W_4gI ), it was off to Uluwatu for some more serious fun for the afternoon ...',
          thumbnails: {
            default: {
              url: 'https://i.ytimg.com/vi/UB_jWsKAYIY/default.jpg',
              width: 120,
              height: 90,
            },
            medium: {
              url: 'https://i.ytimg.com/vi/UB_jWsKAYIY/mqdefault.jpg',
              width: 320,
              height: 180,
            },
            high: {
              url: 'https://i.ytimg.com/vi/UB_jWsKAYIY/hqdefault.jpg',
              width: 480,
              height: 360,
            },
          },
        },
      },
    ],
  },
};

describe('HomePage', () => {
  it('display no videos found when there are no videos returned from search', async () => {
    youtube.get.mockResolvedValueOnce({ data: { items: [] } });
    await act(async () => render(<HomePage />));
    const headings = screen.getAllByRole('heading');
    expect(headings).toHaveLength(2);
    expect(headings[1]).toHaveTextContent('No videos found!');
  });

  it('displays videos when search has results', async () => {
    youtube.get.mockResolvedValueOnce(videosDataResponse);
    await act(async () => render(<HomePage />, { wrapper: MemoryRouter }));
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute(
      'href',
      `/watch/${videosDataResponse.data.items[0].id.videoId}`
    );
    expect(links[1]).toHaveAttribute(
      'href',
      `/watch/${videosDataResponse.data.items[1].id.videoId}`
    );
  });

  it('undefined data show no videos', async () => {
    youtube.get.mockResolvedValueOnce(undefined);
    await act(async () => render(<HomePage />));
    const headings = screen.getAllByRole('heading');
    expect(headings).toHaveLength(2);
    expect(headings[1]).toHaveTextContent('No videos found!');
  });
});
