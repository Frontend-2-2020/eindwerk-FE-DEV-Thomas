import React, { Component } from "react";
import { getPostDetail } from "../redux/actions/postActions";
import { connect } from "react-redux";
import Comment from "../components/Comment";
import Post from "../components/Post";

class PostDetail extends Component {
  componentDidMount() {
    const postId = this.props.match.params.id;
    this.props.getPostDetail(postId);
  }

  render() {
    const { postDetail } = this.props;

    if (postDetail.id) {
      return (
        <div className="container" style={{ maxWidth: "900px" }}>
          <Post post={postDetail} user={postDetail.user}></Post>

          <div className="mt-4">
            <h4>
              Comments (<span>{postDetail.comments.length}</span>)
            </h4>
            <ul>
              {postDetail.comments.map((comment) => (
                <Comment
                  comment={comment}
                  user={comment.user}
                  key={comment.id}
                />
              ))}
            </ul>
          </div>
        </div>
      );
    } else {
      return <p className="mt-4 text-center">Loading...</p>;
    }
  }
}

const mapStateToProps = (state) => ({
  postDetail: state.posts,
});

const mapDispatchToProps = (dispatch) => ({
  getPostDetail: (postId) => dispatch(getPostDetail(postId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
