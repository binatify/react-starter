import React, { Component } from 'react';
import CommentContainer from './Comment/index'
import './index.css';

class PostShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      post: null,
      comments: [],
    };
  }

  componentDidMount() {
    const postId = this.props.match.params.id;
    fetch(`/api/v1.0/posts/${postId}`)
      .then(res => res.json())
      .then(
        (post) => {
          this.setState({
            isLoaded: true,
            post: post
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }


  render() {
    let post = this.state.post;

    if (post == null) {
      return "";
    }
    if (post.tags == null) {
      post.tags = [];
    }

    const tags = post.tags.map((tag) =>{
      return <span className="PostShow-tag" key={tag}>{tag}</span>;
    })

    return (
      <div className="PostShow">
        <div class="PostShow__Main">
          <h2>{this.state.post.title}</h2>
          <div dangerouslySetInnerHTML={{__html: this.state.post.content}} />
          <div>{tags}</div>
        </div>
        <CommentContainer postID={post.id}/>
      </div>
    );
  }
}

export default PostShow;
