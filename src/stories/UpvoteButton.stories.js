import UpvoteButton from '../components/UpvoteButton';

export default {
  title: 'UpvoteButton',
  component: UpvoteButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    count: { control: { type: 'number', min: 0 } },
  },
};

export const Unvoted = {
  args: {
    handleClick: () => {},
    count: 0,
  },
};

export const Voted = {
  args: {
    handleClick: () => {},
    count: 1,
    isVoted: true,
  },
};
