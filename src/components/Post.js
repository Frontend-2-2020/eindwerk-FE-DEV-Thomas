import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";

class Post extends Component {
  render() {
    const { post } = this.props;
    moment.locale("nl-be");
    return (
      <li className="postLi">
        <div className="postLi-timestamp">
          <p>{moment(post.created_at).format("LL")}</p>
        </div>
        <div className="postLi-content">
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </div>
        <div className="postLi-comments">
          <span>{post.comments_count}</span>
          <span>Comments</span>
        </div>
      </li>
    );
  }
}

Post.propTypes = {};

export default Post;
