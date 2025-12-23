import { TextField } from "@mui/material";

const FormTextField = ({ name, label, register, errors, rules = {}, ...props }) => (
  <TextField
    label={label}
    {...register(name, rules)}
    fullWidth
    error={!!errors?.[name]}
    helperText={errors?.[name]?.message}
    {...props}
  />
);

export default FormTextField;
