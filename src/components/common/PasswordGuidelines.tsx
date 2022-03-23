import { Stack, Typography } from "@mui/material";
import React from "react";
import { SxProps } from "@mui/system";

const guidelineStyle: SxProps = {
  fontSize: "13px",
};

interface PasswordGuidelinesProps {
  hasLastGuideLine?: boolean;
}
export function PasswordGuidelines({
  hasLastGuideLine = true,
}: PasswordGuidelinesProps) {
  return (
    <div>
      <Typography
        fontWeight='bold'
        fontSize={14}
        paddingBottom='10px'
        borderBottom='1px solid #aaa'
      >
        Reset Password Guidelines
      </Typography>
      <Stack component='ul' paddingLeft={2}>
        <Typography component='li' sx={guidelineStyle}>
          Passwords must be 8-36 characters in length
        </Typography>
        <Typography component='li' sx={guidelineStyle}>
          Passwords must contain at least one (1) uppercase letter
        </Typography>
        <Typography component='li' sx={guidelineStyle}>
          Passwords must contain at least one (1) lowercase letter
        </Typography>
        <Typography component='li' sx={guidelineStyle}>
          Passwords must contain at least one (1) number
        </Typography>
        {hasLastGuideLine && (
          <Typography component='li' sx={guidelineStyle}>
            Passwords must NOT include the user’s first OR last name.
          </Typography>
        )}
      </Stack>
    </div>
  );
}

export function PasswordNameValidation( name : any, password : any)
{
    return password.includes(name);
}

