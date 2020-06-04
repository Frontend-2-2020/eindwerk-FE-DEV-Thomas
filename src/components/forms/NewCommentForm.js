import React, { Component } from "react";
import { Form } from "formik";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CustomErrorMessage from "../CustomErrorMessage";

class NewCommentForm extends Component {
  render() {
    const { setFieldValue, values } = this.props;

    return (
      <Form>
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Comment message</label>

          {/* Rendering CKEditor */}
          <CKEditor
            name="body"
            editor={ClassicEditor}
            data={values.body}
            onChange={(event, editor) => {
              const data = editor.getData();
              setFieldValue("body", data);
            }}
          />
          <CustomErrorMessage name="body" />
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button
            type="submit"
            value="Save"
            className="float-right btn btn-outline-success my-2 my-sm-0"
          >
            Publish
          </button>
        </div>
      </Form>
    );
  }
}

export default NewCommentForm;
