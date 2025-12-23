import { TextField, MenuItem } from "@mui/material";
const FormSelect = ({ name, label, register, errors, rules = {}, children, ...props }) => (
  <TextField
    select
    label={label}
    {...register(name, rules)}
    fullWidth
    error={!!errors?.[name]}
    helperText={errors?.[name]?.message}
    {...props}   
  >
    {children}
  </TextField>
);

export default FormSelect;
