import React, { Component } from "react";
import moment from "moment";

class Comment extends Component {
  render() {
    const { comment } = this.props;
    const { user } = this.props;
    return (
      <li className="postLi comments">
        <div className="postLi-timestamp">
          <p>{moment(comment.created_at).format("LL")}</p>
        </div>
        <div className="postLi-content">
          <p dangerouslySetInnerHTML={{ __html: comment.body }}></p>
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
        </div>
      </li>
    );
  }
}

export default Comment;
