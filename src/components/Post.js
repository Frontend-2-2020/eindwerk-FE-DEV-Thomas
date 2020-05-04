import React, { Component } from "react";
import moment from "moment";

class Post extends Component {
  render() {
    const { post } = this.props;
    return (
      <li
        className="postLi"
        onClick={() => (window.location.href = "/" + post.id)}
      >
        <div className="postLi-timestamp">
          <p>{moment(post.created_at).format("LL")}</p>
        </div>
        <div className="postLi-content">
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </div>
        <div className="postLi-comments">
          <span>{post.comments_count}</span>
          <span>comments</span>
        </div>
      </li>
    );
  }
}

export default Post;
