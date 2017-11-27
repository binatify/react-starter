import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';

class PostIndexItem extends Component {
  render() {
    let detailLink = `/posts/${this.props.id}`;
    return (
      <div className="PostList-item">
        <h3><Link to={detailLink}>{this.props.title}</Link></h3>
      </div>
    );
  }
}

export default PostIndexItem;
