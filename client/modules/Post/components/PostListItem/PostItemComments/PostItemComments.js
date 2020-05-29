import React from 'react';

// Import Style
import styles from './PostItemComments.css';
import PropTypes from 'prop-types';

const PostItemComments = props => {
  const { comments, onEdit, onDelete } = props;

  return (
    <div className={styles['list-comment']}>
      {comments ? comments.map(c => {
        return (<p key={c.id} className={styles['post-desc']}>
          <span className={styles['comment-author']}>{c.author}: </span>
          <span>{c.text}</span>
          <button className={styles['btn-comment']} onClick={() => onEdit(c.id)}>edit</button>
          <button className={styles['btn-comment']} onClick={() => onDelete(c.id)}>delete</button>
        </p>);
      }) : null}
    </div>
  );
};

PostItemComments.propTypes = {
  comments: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PostItemComments;
