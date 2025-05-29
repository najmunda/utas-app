import React from 'react';
import {
  afterAll,
  afterEach, describe, expect, it, vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { Provider } from 'react-redux';
import ThreadList from './ThreadList';
import store from '../states/index';

expect.extend(matchers);

const fakeUsers = [
  {
    id: 'user_one',
  },
  {
    id: 'user_two',
  },
  {
    id: 'user_three',
  },
];
const fakeThreads = [
  {
    id: 'thread-one',
    ownerId: 'user_one',
  },
  {
    id: 'thread-three',
    ownerId: 'user_three',
  },
  {
    id: 'thread-two',
    ownerId: 'user_two',
  },
];

describe('ThreadList component', () => {
  afterEach(() => {
    cleanup();
  });

  afterAll(() => {
    vi.resetModules();
    vi.resetAllMocks();
  });

  it('should show parent and column div with correct className to form masonry', async () => {
    render(<ThreadList users={fakeUsers} threads={fakeThreads} columnCount={3} />);
    const parentDiv = await screen.getByLabelText('thread-list');
    const columnDiv = parentDiv.children[0];

    expect(parentDiv).toBeVisible();
    expect(parentDiv.className.includes('grid grid-cols-3')).toBe(true);
    expect(columnDiv).toBeVisible();
    expect(columnDiv.className.includes('flex flex-col')).toBe(true);
  });

  it('should have 2 column children and grid-cols-2 class when columnCount equal 2', async () => {
    render(<ThreadList users={fakeUsers} threads={fakeThreads} columnCount={2} />);
    const parentDiv = await screen.getByLabelText('thread-list');

    expect(parentDiv.children).toHaveLength(2);
    expect(parentDiv.className.includes('grid-cols-2')).toBe(true);
  });

  it('should have 1 column children and grid-cols-1 class when columnCount equal 1', async () => {
    render(<ThreadList users={fakeUsers} threads={fakeThreads} columnCount={1} />);
    const parentDiv = await screen.getByLabelText('thread-list');

    expect(parentDiv.children).toHaveLength(1);
    expect(parentDiv.className.includes('grid-cols-1')).toBe(true);
  });

  it('should have 1 column children and grid-cols-1 class when columnCount not equal 1, 2, or 3', async () => {
    render(<ThreadList users={fakeUsers} threads={fakeThreads} columnCount={8} />);
    const parentDiv = await screen.getByLabelText('thread-list');

    expect(parentDiv.children).toHaveLength(1);
    expect(parentDiv.className.includes('grid-cols-1')).toBe(true);
  });

  it('should have thread item children equal threads length', async () => {
    vi.mock('./ThreadItem', () => ({
      default: ({ data }) => (<div>{data.id}</div>),
    }));
    render(
      <Provider store={store}>
        <ThreadList users={fakeUsers} threads={fakeThreads} columnCount={1} />
      </Provider>,
    );
    const parentDiv = await screen.getByLabelText('thread-list');
    const totalChildren = (Array.from(parentDiv.children))
      .reduce((total, column) => total + column.children.length, 0);

    expect(totalChildren).toBe(fakeThreads.length);
  });
});
