import React from 'react';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as matchers from '@testing-library/jest-dom/matchers';
import UpvoteButton from './UpvoteButton';

expect.extend(matchers);

describe('UpvoteButton component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should be visible and show correct count', async () => {
    render(<UpvoteButton handleClick={() => {}} count={0} />);
    const upvoteButton = await screen.getByRole('button');
    const countText = await screen.getByRole('paragraph');

    expect(upvoteButton).toBeVisible();
    expect(upvoteButton).toContainElement(countText);
    expect(countText).toBeVisible();
    expect(countText).toHaveTextContent('0');
  });

  it('should call passed handleLogin function', async () => {
    const handleLoginMock = vi.fn();
    render(<UpvoteButton handleClick={handleLoginMock} count={0} />);
    const upvoteButton = await screen.getByRole('button');

    await userEvent.click(upvoteButton);

    expect(handleLoginMock).toHaveBeenCalledOnce();
  });

  it('icon should have different className when isVoted equal true', async () => {
    render(<UpvoteButton handleClick={() => {}} count={0} />);
    const upvoteButton = await screen.getByRole('button');
    const unvotedIconClassName = upvoteButton.querySelector('svg').getAttribute('class');

    cleanup();
    render(<UpvoteButton handleClick={() => {}} count={0} isVoted />);
    const upvotedButton = await screen.getByRole('button');
    const votedIconClassName = upvotedButton.querySelector('svg').getAttribute('class');

    expect(votedIconClassName).not.toEqual(unvotedIconClassName);
  });
});
