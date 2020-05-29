import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

// Import Style
import styles from './FormComment.css';

const FormComment = props => {
  const { comment, nameButton, onChange, onHandleComment } = props;
  return (
    <form className={styles['form-comment']}>
      <input
        className={styles['form-field']}
        type="text"
        name="author"
        placeholder={props.intl.messages.placeholderAuthorFormComment}
        value={comment.author}
        onChange={onChange}
      />
      <input
        className={styles['form-field']}
        type="text"
        name="text"
        placeholder={props.intl.messages.placeholderCommentFormComment}
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
  comment: PropTypes.object.isRequired,
  nameButton: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onHandleComment: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(FormComment);
