import React, { Component } from "react";
import { connect } from "react-redux";
import Comment from "../components/Comment";
import Post from "../components/Post";
import { getDetailPost } from "../redux/actions/postActions";

class PostDetail extends Component {
  componentDidMount() {
    this.props.getDetailPost(this.props.match.params.id);
  }

  render() {
    const { postDetail } = this.props;
    console.log(postDetail);
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

const mapStateToProps = (store) => ({
  postDetail: store.posts.postDetail,
});

const mapDispatchToProps = (dispatch) => ({
  getDetailPost: (postId) => dispatch(getDetailPost(postId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
