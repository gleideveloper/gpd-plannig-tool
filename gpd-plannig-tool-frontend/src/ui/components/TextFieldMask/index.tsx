import { OutlinedTextFieldProps, TextField } from "@mui/material";
import { FC, JSX } from "react";
import InputMask from "react-input-mask";

interface TextFieldMaskProps extends OutlinedTextFieldProps {
  mask: string;
  value: string;
  disabled: boolean;
}

const TextFieldMask: FC<TextFieldMaskProps> = ({
  mask,
  value,
  disabled,
  onChange,
  ...props
}): JSX.Element => {
  return (
    <InputMask
      mask={mask}
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      {() => <TextField {...props} />}
    </InputMask>
  );
};

export { TextFieldMask, TextFieldMaskProps };
