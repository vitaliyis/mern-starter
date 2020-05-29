import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './PostListItem.css';

class PostListItem extends React.Component {

  state = {
    isOpened: false,
    isEditComment: false,
    comment: {
      id: '',
      author: '',
      text: ''
    },
    comments: []
  }

  onChange = event => {
    const name = event.target.name
    const value = event.target.value
    this.setState(state => ({
      comment: {...state.comment, [name] : value}
      })
    )
  }

  onClick = event => {
    event.preventDefault()
    this.setState(state => ({
       isOpened: !state.isOpened
      }))
  }

  onAddComment = () => {
    event.preventDefault()

    // Edit comment
    if (this.state.isEditComment) {
      const comments = this.state.comments.map(c => {
        if (c.id === this.state.comment.id) {
          c = {...this.state.comment}
        }
        return c
      })
      this.setState({
        comments,
        comment: {author: '', text: '', id: ''},
        isOpened: false,
        isEditComment: false
      })

    } else {
      // Add comment
      this.setState(state => ({
        // comments: [...state.comments, state.comment],
        comments: [...state.comments,
          {
            id: Math.random(),
            author: state.comment.author,
            text: state.comment.text
          }],
        comment: {author: '', text: '', id: ''},
        isOpened: false
      }))
    }
  }

  onEdit = id => {
    event.preventDefault()
    const comment = this.state.comments.find(c => c.id === id)
    console.log('comment => ', comment)
    this.setState({
      comment,
      isOpened: true,
      isEditComment: true
    })
  }

  onDelete = id => {
    event.preventDefault()
    const comments = this.state.comments.filter(c => c.id !== id)
    this.setState({
      comments
    })
  }

  render() {
    const {props} = this
    const {isOpened, comment, comments} = this.state

    return (
      <div className={styles['single-post']}>
        <h3 className={styles['post-title']}>
          <Link to={`/posts/${props.post.slug}-${props.post.cuid}`} >
            {props.post.title}
          </Link>
        </h3>
        <p className={styles['author-name']}><FormattedMessage id="by" /> {props.post.name}</p>
        <p className={styles['post-desc']}>{props.post.content}</p>

        <div className={styles['list-comment']}>
        {comments ? comments.map(c => {
          return  <p key={c.id} className={styles['post-desc']}>
                    <span className={styles['comment-author']}>{c.author}: </span>
                    <span>{c.text}</span>
                    <a href="#" onClick={() => this.onEdit(c.id)}>edit</a>
                    <a href="#" onClick={() => this.onDelete(c.id)}>delete</a>
                  </p>
        }) : null}
        </div>

        {isOpened ?
          <form className={styles['form-content form-comment']}>
            <input
              type="text"
              name="author"
              placeholder="author"
              value={comment.author}
              onChange={this.onChange}
            />
            <input
            type="text"
            name="text"
            placeholder="comment"
            value={comment.text}
            onChange={this.onChange}
            />
            <button
              type="button"
              disabled={!Boolean(comment.author && comment.text)}
              onClick={this.onAddComment}
            >add</button>
          </form>
              : null
          }

        <p className={styles['post-action']}>
          <a href="#" onClick={props.onDelete}><FormattedMessage id="deletePost" /></a>
          <a href="#" onClick={this.onClick}>Add Comment</a>
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
