import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RelatedVideos from './RelatedVideos.component';
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

describe('RelatedVideos component', () => {
  it('displays no related videos when it gets an empty array', async () => {
    youtube.get.mockResolvedValueOnce({ data: { items: [] } });
    await act(async () => render(<RelatedVideos videoId="12345" />));
    expect(screen.queryAllByRole('link')).toHaveLength(0);
  });

  it('displays videos when it has results', async () => {
    youtube.get.mockResolvedValueOnce(videosDataResponse);
    await act(async () =>
      render(<RelatedVideos videoId="12345" />, { wrapper: MemoryRouter })
    );
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });
});
