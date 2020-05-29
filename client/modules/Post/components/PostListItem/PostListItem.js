import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './PostListItem.css';
import PostItemComments from './PostItemComments/PostItemComments';
import FormComment from './FormComment/FormComment';

class PostListItem extends React.Component {

  state = {
    isOpenedForm: false,
    isEditComment: false,
    isAddComment: true,
    comment: {
      id: '',
      author: '',
      text: '',
    },
    comments: [],
  }

  onChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(state => ({
      comment: { ...state.comment, [name]: value },
    }));
  }

  onOpenForm = event => {
    event.preventDefault();
    this.setState(state => ({
      isOpenedForm: !state.isOpenedForm,
    }));
  }

  onAddComment = event => {
    event.preventDefault();

    // Add comment
    this.setState(state => ({
      comments: [...state.comments,
        {
          id: Math.random(),
          author: state.comment.author,
          text: state.comment.text,
        }],
      comment: { author: '', text: '', id: '' },
      isOpenedForm: false,
    }));
  }

  onEditComment = event => {
    event.preventDefault();

    const comments = this.state.comments.map(c => {
      if (c.id === this.state.comment.id) {
        const newComment = { ...this.state.comment };
        return newComment;
      }
      return c;
    });
    this.setState({
      comments,
      comment: { author: '', text: '', id: '' },
      isOpenedForm: false,
      isEditComment: false,
      isAddComment: true,
    });
  }

  onEdit = id => {
    event.preventDefault();
    const comment = this.state.comments.find(c => c.id === id);
    this.setState({
      comment,
      isOpenedForm: true,
      isEditComment: true,
      isAddComment: false,
    });
  }

  onDelete = id => {
    event.preventDefault();
    const comments = this.state.comments.filter(c => c.id !== id);
    this.setState({
      comments,
    });
  }

  render() {
    const { props } = this;
    const { isOpenedForm, comment, comments, isEditComment, isAddComment } = this.state;

    return (
      <div className={styles['single-post']}>
        <h3 className={styles['post-title']}>
          <Link to={`/posts/${props.post.slug}-${props.post.cuid}`} >
            {props.post.title}
          </Link>
        </h3>
        <p className={styles['author-name']}><FormattedMessage id="by" /> {props.post.name}</p>
        <p className={styles['post-desc']}>{props.post.content}</p>


        <PostItemComments
          comments={comments}
          onEdit={this.onEdit}
          onDelete={this.onDelete}
        />

        {isOpenedForm && isAddComment ?
          <FormComment
            nameButton="Add"
            comment={comment}
            onChange={this.onChange}
            onHandleComment={this.onAddComment}
          /> : null
        }
        {isOpenedForm && isEditComment ?
          <FormComment
            nameButton="Edit"
            comment={comment}
            onChange={this.onChange}
            onHandleComment={this.onEditComment}
          /> : null
        }

        <p className={styles['post-action']}>
          <a href="#" onClick={props.onDelete}><FormattedMessage id="deletePost" /></a>
          <a href="#" onClick={this.onOpenForm}>Add Comment</a>
        </p>
        <hr className={styles.divider} />
      </div>
    );
  }


}

PostListItem.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PostListItem;
