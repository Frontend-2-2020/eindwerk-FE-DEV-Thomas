import React, { Component } from "react";
import moment from "moment";

class Post extends Component {
  render() {
    const { post } = this.props;
    const { user } = this.props;

    return (
      <div className="postLi">
        <div className="postLi-timestamp">
          <p>{moment(post.created_at).format("LL")}</p>
        </div>
        <div className="postLi-content">
          <h4>{post.title}</h4>
          <p dangerouslySetInnerHTML={{ __html: post.body }}></p>
          <p style={{ textAlign: "right" }}>
            <span>says</span>{" "}
            <a style={{ fontWeight: "bold" }} href={"/profile/" + user.id}>
              {user.first_name} {user.last_name}
            </a>
            <img
              alt={
                "This is the avatar of " +
                user.first_name +
                " " +
                user.last_name
              }
              src={
                user.avatar.startsWith("http")
                  ? user.avatar
                  : "../assets/img/user.png"
              }
              style={{ width: "30px" }}
              className="ml-2"
            ></img>
          </p>
          {post.comments_count !== undefined ? (
            <p className="postLi-comments">
              <span>{post.comments_count} </span>
              {post.comments_count === 1 ? "comment" : "comments"}
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default Post;
