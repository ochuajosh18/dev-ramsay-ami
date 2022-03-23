import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { parseDate } from "../../utils/helpers";

type AMIDatePickerProps = {
  value: string | null;
  name?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  DateInputProps?: TextFieldProps;
  error?: boolean;
  helperText?: string;
};

export default function AMIDatePicker({
  value,
  placeholder = "Date",
  onChange,
  DateInputProps,
  error,
  helperText,
}: AMIDatePickerProps) {
  function handleDateChange(newValue: typeof value) {
    if (onChange) onChange(parseDate(newValue));
  }
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <DatePicker
        value={value}
        onChange={handleDateChange}
        showTodayButton
        renderInput={(params) => (
          <TextField
            {...params}
            {...DateInputProps}
            size='small'
            placeholder={placeholder}
            error={error}
            helperText={helperText}
            sx={{
              ...DateInputProps?.sx,
              bgcolor: "transparent",
              width: "max-content",
              "& .MuiOutlinedInput-root": {
                bgcolor: "white",
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
}

/**
 *
 * @param dateValue the date value from react-hook-form
 * @returns date -> the date value to be set as the value of the AMIDatePicker
 */
export function useDatePickerSetter(dateValue: string | null) {
  // BEGIN : work around for Material DatePicker
  const [date, setDate] = React.useState<string | null>(null);

  React.useEffect(() => {
    setDate(dateValue);
  }, [date, dateValue]);

  return date;
  // END : work around for Material DatePicker
}
