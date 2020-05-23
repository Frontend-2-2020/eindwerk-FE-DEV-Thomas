import React, { Component } from "react";
import { Form, Field, ErrorMessage } from "formik";
import { TOKEN } from "../../helpers";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CustomErrorMessage from "../CustomErrorMessage";

class EditForm extends Component {
  render() {
    const { setFieldValue, values } = this.props;
    if (TOKEN) {
      return (
        <Form>
          <div className="form-group">
            <label htmlFor="title"> Title</label>
            <Field
              type="text"
              name="title"
              className="form-control"
              id="title"
              placeholder="Type a title"
            />
            <ErrorMessage name="title" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Message</label>

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
          <div>
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
    } else {
      window.location.href = "/login";
    }
  }
}

export default EditForm;
