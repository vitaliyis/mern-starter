import React from 'react';

// Import Style
import styles from './FormComment.css';
import PropTypes from 'prop-types';

const FormComment = props => {
  const { comment, nameButton, onChange, onHandleComment } = props;

  return (
    <form className={styles['form-content form-comment']}>
      <input
        type="text"
        name="author"
        placeholder="author"
        value={comment.author}
        onChange={onChange}
      />
      <input
        type="text"
        name="text"
        placeholder="comment"
        value={comment.text}
        onChange={onChange}
      />
      <button
        className={styles['btn-form-comment']}
        disabled={!Boolean(comment.author && comment.text)}
        onClick={onHandleComment}
      >{nameButton}</button>
    </form>
  );
};

FormComment.propTypes = {
  comment: PropTypes.string.isRequired,
  nameButton: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onHandleComment: PropTypes.func.isRequired,
};

export default FormComment;
