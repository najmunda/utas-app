import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

function CommentButton({ to = '', count }) {
  const className = `group p-1 flex items-center gap-2 ${to ? 'cursor-pointer' : ''}`;
  const child = (
    <>
      <MessageSquare
        size={20}
        className="rounded-md group-hover:bg-blue-300 group-hover:outline-8
          group-hover:outline-blue-300"
      />
      <p>{count}</p>
    </>
  );

  return to ? (
    <Link to={to} className={className}>
      {child}
    </Link>
  ) : (
    <div className={className}>
      {child}
    </div>
  );
}

CommentButton.propTypes = {
  to: PropTypes.string,
  count: PropTypes.number.isRequired,
};

CommentButton.defaultProps = {
  to: '',
};

export default CommentButton;
