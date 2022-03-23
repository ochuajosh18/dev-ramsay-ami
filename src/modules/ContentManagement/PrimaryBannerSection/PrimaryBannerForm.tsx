import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  PrimaryBannerInputs,
  primaryBannerSchema,
  initialValues,
} from "./primaryBannerSchema";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import AMIAlert from "../../../components/common/AMIAlert";
import UploadButton from "../../../components/common/UploadButton";
import ImageDefault from "../../../components/common/ImageDefault";
import ImagePreview from "../../../components/common/ImagePreview";
import VideoPreview from "../../../components/common/VideoPreview";
import PrimaryBannerHeading from "./PrimaryBannerHeading";
import useMediaPreview from "../../../hooks/useMediaPreview";
import AMIContentFormButtons from "../../../components/common/AMIContentFormButtons";
import AMIContentForm from "../../../components/common/AMIContentForm";
import Label from "../../../components/common/Label";
import AMIDatePicker, {
  useDatePickerSetter,
} from "../../../components/common/AMIDatePicker";
import { getSystemSnackbar } from "../../../store/system/selectors";
import { createBanner } from "../../../store/banner/actions";
import { labelStyle } from "../styles";

const PrimaryBannerForm = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [errorAlertShown, setErrorAlertShown] = useState(false);
  // watch for error or success message from SYSTEM SNACKBAR
  const snackbar = useSelector(getSystemSnackbar);
  // custom hook for media select & preview
  const { mediaType, mediaPreview, setMedia, media } = useMediaPreview();
  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm<PrimaryBannerInputs>({
    resolver: yupResolver(primaryBannerSchema),
    defaultValues: initialValues,
  });

  // FOR resetting the form after SUCCESS
  useEffect(() => {
    if (snackbar && snackbar.type === "success") {
      reset(); // reset the form
      setMedia(null); // reset file
    }
  }, [getValues, reset, setMedia, snackbar]);

  // BEGIN : set file src
  useEffect(() => {
    setValue("file", media);
  }, [media, setValue]);
  // END : set file src

  const handleMediaChange = (file: File | null) => {
    setMedia(file);
  };

  // BEGIN : work around for Material DatePicker
  const datePostedValue = getValues("datePosted");
  const datePosted = useDatePickerSetter(datePostedValue);
  useEffect(() => {
    register("datePosted");
  }, [register]);
  // END : work around for Material DatePicker

  const handleCancel = () => {
    history.push("/content/primary-banner");
  };

  const onSubmit = (values: PrimaryBannerInputs) => {
    // needs to remove the `file` field
    const _values = { ...values };
    delete _values.file;
    const newBanner = { ..._values };
    dispatch(createBanner(newBanner, media as File));
  };

  const hasError = (inputName: keyof PrimaryBannerInputs) =>
    errors[inputName] ? true : false;
  const getError = (inputName: keyof PrimaryBannerInputs) =>
    errors[inputName]?.message;

  function onError(err: typeof errors) {
    setErrorAlertShown(true);
  }

  return (
    <React.Fragment>
      <PrimaryBannerHeading>
        <AMIContentFormButtons
          onSave={handleSubmit(onSubmit, onError)}
          onCancel={handleCancel}
        />
      </PrimaryBannerHeading>
      <AMIContentForm>
        <AMIContentForm.Grid>
          <Label sx={labelStyle}>Title</Label>
          <AMIContentForm.TextField
            error={hasError("title")}
            helperText={getError("title")}
            {...register("title")}
          />
          <Label sx={labelStyle}>Upload Image or Video Attachment</Label>
          <Box sx={{ flex: 2 }}>
            <UploadButton accept='image-video' onChange={handleMediaChange} />
          </Box>
          <Label sx={{ ...labelStyle, alignSelf: "start", marginTop: "8px" }}>
            Preview Uploaded Attachment
          </Label>
          <Box>
            {mediaPreview ? (
              mediaType === "image" ? (
                <ImagePreview src={mediaPreview} />
              ) : (
                <VideoPreview src={mediaPreview} />
              )
            ) : (
              <ImageDefault
                error={hasError("file")}
                errorMessage={getError("file")}
              />
            )}
          </Box>
          <Label sx={labelStyle}>Date Posted</Label>
          <AMIDatePicker
            value={datePosted}
            error={hasError("datePosted")}
            helperText={getError("datePosted")}
            onChange={(dateValue) =>
              setValue("datePosted", dateValue, {
                shouldValidate: true,
                shouldDirty: false,
              })
            }
          />
          <Label sx={labelStyle}>Enable</Label>
          <Controller
            name='isEnabled'
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => (
              <FormControlLabel
                sx={{ width: "max-content" }}
                control={
                  <Checkbox onChange={onChange} checked={value} ref={ref} />
                }
                label=''
                labelPlacement='end'
              />
            )}
          />
        </AMIContentForm.Grid>
      </AMIContentForm>
      <AMIAlert
        message='Please check required field(s)'
        open={errorAlertShown && !isValid}
        type='error'
        autoHideDuration={3000}
        onClose={() => setErrorAlertShown(false)}
      />
    </React.Fragment>
  );
};

export default PrimaryBannerForm;
