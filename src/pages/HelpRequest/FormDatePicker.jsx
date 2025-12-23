import { Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const FormDatePicker = ({ name, label, control, errors, rules = {}, ...props }) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field }) => (
      <DatePicker
        {...field}
        label={label}
        slotProps={{
          textField: {
            fullWidth: true,
            error: !!errors?.[name],
            helperText: errors?.[name]?.message,
          },
        }}
        {...props}
      />
    )}
  />
);

export default FormDatePicker;
