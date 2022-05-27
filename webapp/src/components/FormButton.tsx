import { Button, ButtonProps } from "@mui/material";

interface ButtonOptions {
  label: string;
}

const FormButton = <T extends React.ElementType>(
  props: ButtonProps<T, { component?: T }> & ButtonOptions
) => {
  return <Button {...props}>{props.label}</Button>;
};

export default FormButton;
