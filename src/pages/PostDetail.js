import React, { Component } from "react";
import moment from "moment";
import { getPostDetail } from "../redux/actions/postActions";
import { connect } from "react-redux";

class PostDetail extends Component {
  componentDidMount() {
    const postId = this.props.match.params.id;
    this.props.getPostDetail(postId);
  }

  render() {
    const { postDetail } = this.props;

    return (
      <div className="container">
        <div className="postLi">
          <div className="postLi-timestamp">
            <p>{moment(postDetail.created_at).format("LL")}</p>
          </div>
          <div className="postLi-content">
            <h4>{postDetail.title}</h4>
            <p>{postDetail.body}</p>
          </div>
          {/*<div className="postLi-comments">
            <img src={postDetail.user.avatar} />
            <span>{postDetail.user.first_name}</span>
          </div> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  postDetail: state.posts,
});

const mapDispatchToProps = (dispatch) => ({
  getPostDetail: (postId) => dispatch(getPostDetail(postId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
