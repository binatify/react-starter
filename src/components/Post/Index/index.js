import React, { Component } from 'react';
import AppHeader from '../../App/AppHeader';
import PostIndexItem from './item';
import './index.css';

class PostIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      posts: []
    };
  }

  componentDidMount() {
    fetch("/api/v1.0/posts")
      .then(res => res.json())
      .then(
        (posts) => {
          this.setState({
            isLoaded: true,
            posts: posts
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
    const listItems = this.state.posts.map((post) =>
      <PostIndexItem key={post.id} {...post}/>
    );

    return (
      <div>
        <AppHeader />
        <div className="PostList">
          {listItems}
        </div>
      </div>
    );
  }
}

export default PostIndex;
