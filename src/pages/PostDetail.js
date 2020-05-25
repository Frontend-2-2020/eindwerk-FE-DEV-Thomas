import React, { Component } from "react";
import { connect } from "react-redux";
import Comment from "../components/Comment";
import Post from "../components/Post";
import { getDetailPost } from "../redux/actions/postActions";
import { addComment } from "../redux/actions/postActions";
import NewCommentForm from "../components/forms/NewCommentForm";
import { Formik } from "formik";

class PostDetail extends Component {
  componentDidMount() {
    this.props.getDetailPost(this.props.match.params.id);
  }

  state = { editingComment: false };

  addCommentHandler = (values) => {
    const newValues = {
      body: values.body,
      user_id: this.props.currentUser.id,
      blog_post_id: this.props.postDetail.id,
    };
    console.log(newValues);
    this.props.addComment(newValues, this.props.currentUser);
    this.setState({ editingComment: false });
  };

  validate = (values) => {
    const errors = {};
    const requiredFields = ["body"];

    requiredFields.forEach((field) => {
      if (!values[field]) {
        errors[field] = "required";
      }
    });

    return errors;
  };

  render() {
    const { postDetail } = this.props;

    if (postDetail.id) {
      return (
        <div className="container" style={{ maxWidth: "900px" }}>
          <Post post={postDetail} user={postDetail.user}></Post>
          {this.props.currentUser.id === postDetail.user.id ? (
            <div>
              <button
                className="mt-4 btn btn-outline-success"
                onClick={() => this.setState({ editingPost: true })}
              >
                Edit
              </button>
            </div>
          ) : (
            <div></div>
          )}

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
            {this.state.editingComment === true ? (
              <Formik
                onSubmit={this.addCommentHandler}
                validate={this.validate}
                initialValues={{
                  body: "",
                }}
              >
                {(props) => <NewCommentForm {...props} />}
              </Formik>
            ) : this.props.currentUser.id ? (
              <button
                onClick={() => this.setState({ editingComment: true })}
                className="btn btn-outline-success"
              >
                Add Comment
              </button>
            ) : (
              <div></div>
            )}
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
  currentUser: store.auth,
});

const mapDispatchToProps = (dispatch) => ({
  getDetailPost: (postId) => dispatch(getDetailPost(postId)),
  addComment: (values, user) => dispatch(addComment(values, user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
