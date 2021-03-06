import { cleanup, getByText, render, wait } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './app';

describe('App', () => {
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
        <App />
      </BrowserRouter>
    );
    await wait(() => getByText(baseElement, 'my message'));
  });
});
