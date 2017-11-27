import React, { Component } from 'react';
import './style.css';

class CommentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      newComment: {
        username: "",
        content: "",
      }
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeContent = this.handleChangeContent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeName(event) {
    let newStat = Object.assign(this.state);
    newStat.newComment.username = event.target.value;
    this.setState(newStat);
  }

  handleChangeContent(event) {
    let newStat = Object.assign(this.state);
    newStat.newComment.content = event.target.value;
    this.setState(newStat);
  }

  handleSubmit(event) {
    event.preventDefault();
    let that = this;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", `/api/v1.0/comments?post_id=${this.props.postID}`, true);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        var result = JSON.parse(xhr.responseText);
        that.state.items.push(result);
        let newStat = Object.assign(that.state);
        newStat.newComment.username = "";
        newStat.newComment.content = "";
        that.setState(newStat);
      }
    }

    xhr.send(JSON.stringify(this.state.newComment));
  }

  componentDidMount() {
    const postId = this.props.postID;
    fetch(`/api/v1.0/comments?post_id=${postId}`)
      .then(res => res.json())
      .then(
        (items) => {
          if (items == null){
            items = [];
          }

          this.setState({
            isLoaded: true,
            items: items
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
    const commentItems = this.state.items.map((item) => {
      return (
        <div className="CommentItem" key={item.id}>
          <div className="CommentItem_Header">
            <p class="CommentItem__user">{item.username}</p>
            <p className="CommentItem__timer">{item.created_at}</p>
          </div>
          <pre>{item.content}</pre>
        </div>
      )
    })
    return (
      <div className="PostShow_Comment">
        <div className="Comment-Form">
          <p>Responses</p>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="input"
                className="form-control"
                placeholder="name"
                value={this.state.newComment.username}
                onChange={this.handleChangeName}/>
            </div>
            <div className="form-group">
              <textarea
                placeholder="content"
                className="form-control"
                rows="4"
                value={this.state.newComment.content}
                onChange={this.handleChangeContent}></textarea>
            </div>
            <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>
        <div className="CommentList">
          {commentItems}
        </div>
      </div>
    );
  }
}

export default CommentContainer;
