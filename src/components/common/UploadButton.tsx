import React, { ChangeEvent } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const Input = styled("input")({
  display: "none",
});

type UploadButtonProps = {
  onChange: (file: File | null) => void;
  accept?: "image" | "video" | "image-video";
};

const allowedMediaTypes = ["image", "video"];
const mapAccept = {
  image: "image/*",
  video: "video/*",
  "image-video": "image/*,video/*",
};

export default function UploadButton({
  onChange,
  accept = "image-video",
}: UploadButtonProps): JSX.Element {
  function handleChange(event: ChangeEvent) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const fileType = file.type.substr(0, 5);
    if (file && allowedMediaTypes.includes(fileType)) {
      if (accept && fileType === accept) {
        onChange(file);
      } else {
        onChange(file);
      }
    } else {
      onChange(null);
    }
  }
  return (
    <Stack direction='row' alignItems='center'>
      <label htmlFor='upload-media-button'>
        <Input
          accept={mapAccept[accept]}
          id='upload-media-button'
          type='file'
          onChange={handleChange}
        />
        <Button variant='contained' component='span' disableElevation>
          Upload
        </Button>
      </label>
      <label htmlFor='icon-button-file'>
        <Input
          accept='image/*'
          id='icon-button-file'
          type='file'
          onChange={handleChange}
        />
      </label>
    </Stack>
  );
}
