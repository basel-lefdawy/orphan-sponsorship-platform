import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const FieldRenderer = ({ field, register, control, errors }) => {
  const { name, label, type, required, pattern, options, sx } = field;

  if (type === "text" || type === "number") {
    return (
      <TextField
        type={type}
        label={label}
        {...register(name, { required, pattern })}
        error={!!errors[name]}
        helperText={errors[name]?.message}
        fullWidth
        sx={sx}
      />
    );
  }

  if (type === "radio") {
    return (
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field }) => (
          <RadioGroup row {...field}>
            {options.map(opt => (
              <FormControlLabel
                key={opt.value}
                value={opt.value}
                control={<Radio />}
                label={opt.label}
              />
            ))}
          </RadioGroup>
        )}
      />
    );
  }

  return null;
};

export default FieldRenderer;
