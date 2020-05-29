import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './PostItemComments.css';

const PostItemComments = props => {
  const { comments, onEdit, onDelete } = props;

  return (
    <div className={styles['list-comment']}>
      {comments ? comments.map(c => {
        return (<p key={c.id} className={styles['post-desc']}>
          <span className={styles['comment-author']}>{c.author}: </span>
          <span>{c.text}</span>
          <button className={styles['btn-comment']} onClick={() => onEdit(c.id)}>{<FormattedMessage id="btnEditInComment" />}</button>
          <button className={styles['btn-comment']} onClick={() => onDelete(c.id)}>{<FormattedMessage id="btnDeleteInComment" />}</button>
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
