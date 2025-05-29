import React from 'react';
import {
  afterEach, beforeEach, describe, expect, it,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as matchers from '@testing-library/jest-dom/matchers';
import { Provider } from 'react-redux';
import NewThreadForm from './NewThreadForm';
import store from '../states/index';

expect.extend(matchers);

describe('NewThreadForm component', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <NewThreadForm categories={[]} />
      </Provider>,
    );
  });
  afterEach(() => {
    cleanup();
  });

  it('should has title input that required and handle input correctly', async () => {
    const input = 'usernametest';
    const titleInput = await screen.getByRole('textbox', { name: 'title' });

    await userEvent.type(titleInput, input);

    expect(titleInput).toBeVisible();
    expect(titleInput).toBeRequired();
    expect(titleInput).toHaveValue(input);
  });

  it('should has category input that handle type input correctly', async () => {
    const categoryInput = await screen.getByRole('combobox', { name: 'category' });

    await userEvent.type(categoryInput, 'test');

    expect(categoryInput).toBeVisible();
    expect(categoryInput).toHaveValue('test');
  });

  it('should has body input that required and handle input correctly', async () => {
    const input = 'this is body';
    const bodyInput = await screen.getByRole('textbox', { name: 'body' });

    await userEvent.type(bodyInput, input);

    expect(bodyInput).toBeVisible();
    expect(bodyInput).toBeRequired();
    expect(bodyInput).toHaveValue(input);
  });

  it('should has button with submit type', async () => {
    const submitButton = await screen.getByRole('button');

    expect(submitButton).toBeVisible();
    expect(submitButton.getAttribute('type')).toBe('submit');
  });
});
