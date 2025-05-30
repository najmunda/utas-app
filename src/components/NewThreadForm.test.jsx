import React from 'react';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as matchers from '@testing-library/jest-dom/matchers';

import NewThreadForm from './NewThreadForm';

expect.extend(matchers);

const dispatchMock = vi.fn();
const asyncCreateThreadMock = vi.fn();
vi.mock('react-redux', () => ({
  useDispatch: () => dispatchMock,
}));
vi.mock('../states/threads/action', () => ({
  asyncCreateThread: (threadData) => {
    asyncCreateThreadMock(threadData);
    return () => {};
  },
}));

describe('NewThreadForm component', () => {
  afterEach(() => {
    vi.resetAllMocks();
    cleanup();
  });

  it('should has title input that required and handle input correctly', async () => {
    render(<NewThreadForm categories={[]} />);
    const input = 'Thread Test Title';
    const titleInput = await screen.getByRole('textbox', { name: 'title' });

    await userEvent.type(titleInput, input);

    expect(titleInput).toBeVisible();
    expect(titleInput).toBeRequired();
    expect(titleInput).toHaveValue(input);
  });

  it('should has category input that handle type input correctly', async () => {
    render(<NewThreadForm categories={[]} />);
    const categoryInput = await screen.getByRole('combobox', { name: 'category' });

    await userEvent.type(categoryInput, 'test');

    expect(categoryInput).toBeVisible();
    expect(categoryInput).toHaveValue('test');
  });

  it('should has option of given category', async () => {
    const categories = ['category-1', 'category-2'];
    const { container } = render(<NewThreadForm categories={categories} />);

    const datalist = container.querySelector('datalist');
    const options = container.querySelectorAll('option');

    expect(datalist).toBeInTheDocument();
    expect(options).toHaveLength(categories.length);
  });

  it('should has body input that required and handle input correctly', async () => {
    render(<NewThreadForm categories={[]} />);
    const input = 'this is body';
    const bodyInput = await screen.getByRole('textbox', { name: 'body' });

    await userEvent.type(bodyInput, input);

    expect(bodyInput).toBeVisible();
    expect(bodyInput).toBeRequired();
    expect(bodyInput).toHaveValue(input);
  });

  it('should has button with submit type and dispatch correct action', async () => {
    render(<NewThreadForm categories={[]} />);
    const titleInput = await screen.getByRole('textbox', { name: 'title' });
    const categoryInput = await screen.getByRole('combobox', { name: 'category' });
    const bodyInput = await screen.getByRole('textbox', { name: 'body' });
    const submitButton = await screen.getByRole('button');
    const titleText = 'Title of Test Thread';
    const category = 'test';
    const bodyText = 'Body of Test Thread';

    await userEvent.type(titleInput, titleText);
    await userEvent.type(categoryInput, category);
    await userEvent.type(bodyInput, bodyText);
    await userEvent.click(submitButton);

    expect(submitButton.getAttribute('type')).toBe('submit');
    expect(typeof dispatchMock.mock.calls[0][0]).toBe('function');
    expect(asyncCreateThreadMock).toHaveBeenCalledWith({
      title: titleText,
      category,
      body: bodyText,
    });
  });
});
