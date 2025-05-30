import React from 'react';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as matchers from '@testing-library/jest-dom/matchers';
import DownvoteButton from './DownvoteButton';

expect.extend(matchers);

describe('DownvoteButton component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should be visible and show correct count', async () => {
    render(<DownvoteButton handleClick={() => {}} count={0} />);
    const downvoteButton = await screen.getByRole('button');
    const countText = await screen.getByRole('paragraph');

    expect(downvoteButton).toBeVisible();
    expect(downvoteButton).toContainElement(countText);
    expect(countText).toBeVisible();
    expect(countText).toHaveTextContent('0');
  });

  it('should call passed handleLogin function', async () => {
    const handleLoginMock = vi.fn();
    render(<DownvoteButton handleClick={handleLoginMock} count={0} />);
    const downvoteButton = await screen.getByRole('button');

    await userEvent.click(downvoteButton);

    expect(handleLoginMock).toHaveBeenCalledOnce();
  });

  it('icon should have different className when isVoted equal true', async () => {
    render(<DownvoteButton handleClick={() => {}} count={0} />);
    const downvoteButton = await screen.getByRole('button');
    const unvotedIconClassName = downvoteButton.querySelector('svg').getAttribute('class');

    cleanup();
    render(<DownvoteButton handleClick={() => {}} count={0} isVoted />);
    const downvotedButton = await screen.getByRole('button');
    const votedIconClassName = downvotedButton.querySelector('svg').getAttribute('class');

    expect(votedIconClassName).not.toEqual(unvotedIconClassName);
  });
});
