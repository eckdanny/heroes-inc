import React from 'react';
import { cleanup, getByText, render, wait } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Home from './Home';

describe(' Home', () => {
  afterEach(() => {
    delete global['fetch'];
    cleanup();
  });

  it('should render successfully', async () => {
    global['fetch'] = jest.fn().mockResolvedValueOnce({
      json: () => ({
        message: 'my message'
      })
    });

    const { baseElement } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    await wait(() => getByText(baseElement, 'my message'));
  });
});
