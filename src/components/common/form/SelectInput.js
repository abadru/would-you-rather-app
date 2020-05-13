import React from "react";
import { Form, Label, Select } from "semantic-ui-react";

/*
    This is a reusable select control that has a label to display an error, if any. It is based on the Select component
    from semantic-ui-react.
 */

const SelectInput = ({
  input,
  width,
  options,
  placeholder,
  meta: { touched, error },
}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      <Select
        value={input.value}
        onChange={(e, data) => input.onChange(data.value)}
        placeholder={placeholder}
        options={options}
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default SelectInput;
