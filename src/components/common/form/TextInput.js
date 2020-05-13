import React from "react";
import { Form, Label } from "semantic-ui-react";
/*
    This is a reusable text input control that has a label to display an error, if any. Created based on
    semantic-ui-react form field.
 */
const TextInput = ({
  input,
  width,
  type,
  placeholder,
  meta: { touched, error },
}) => {
  return (
    <Form.Field error={touched && !!error} type={type} width={width}>
      <input {...input} placeholder={placeholder} />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default TextInput;
