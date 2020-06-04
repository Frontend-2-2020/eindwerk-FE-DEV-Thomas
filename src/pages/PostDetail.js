import React, { Component } from "react";
import { connect } from "react-redux";
import Comment from "../components/Comment";
import Post from "../components/Post";
import { getDetailPost } from "../redux/actions/postActions";
import { addComment } from "../redux/actions/postActions";
import NewCommentForm from "../components/forms/NewCommentForm";
import { Formik } from "formik";
import Loader from "../components/Loader";

class PostDetail extends Component {
  componentDidMount() {
    // Load post detail
    this.props.getDetailPost(this.props.match.params.id);
  }

  // Local state of component to show or hide CKEditor
  state = { editingComment: false };

  addCommentHandler = (values) => {
    // Creating new set of values
    const newValues = {
      body: values.body,
      user_id: this.props.currentUser.id,
      blog_post_id: this.props.postDetail.id,
    };
    this.props.addComment(newValues, this.props.currentUser);

    // Reset value in state to hide CKEditor
    this.setState({ editingComment: false });
  };

  // Form validation
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

    // Handle redirect of page after submitting form
    if (this.props.canRedirect === true) {
      this.props.history.push("/" + this.props.currentPage);
      this.props.changeRedirectStatus();
    }

    // If statement to prevent error when axios call hasn't finished yet
    if (postDetail.id) {
      return (
        <div className="container" style={{ maxWidth: "900px" }}>
          {/* Main post */}
          <Post
            history={this.props.history}
            post={postDetail}
            postUser={postDetail.user}
          ></Post>

          {/* Comment Section*/}
          <div className="mt-4">
            <h4>
              Comments (<span>{postDetail.comments.length}</span>)
            </h4>
            <ul>
              {/* Mapping comments */}
              {postDetail.comments.map((comment) => (
                <Comment
                  comment={comment}
                  user={comment.user}
                  key={comment.id}
                />
              ))}
            </ul>
            {/* Hide / show form with CK Editor */}
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
                // On button click change state of component to render CKEditor in form
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
      return <Loader />;
    }
  }
}

const mapStateToProps = (store) => ({
  postDetail: store.posts.postDetail,
  currentUser: store.auth.currentUser,
  canRedirect: store.posts.canRedirect,
  currentPage: store.posts.currentPage,
});

const mapDispatchToProps = (dispatch) => ({
  getDetailPost: (postId) => dispatch(getDetailPost(postId)),
  addComment: (values, user) => dispatch(addComment(values, user)),
  changeRedirectStatus: () => dispatch({ type: "CHANGE_REDIRECT_STATUS" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
