import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import {
  MostPopularInputs,
  mostPopularSchema,
  initialValues,
} from "./mostPopularSchema";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { SxProps } from "@mui/system";

import MostPopularHeading from "./MostPopularHeading";
import Label from "../../../components/common/Label";
import UploadButton from "../../../components/common/UploadButton";
import AMIDatePicker from "../../../components/common/AMIDatePicker";
import AMIAlert from "../../../components/common/AMIAlert";
import ImageDefault from "../../../components/common/ImageDefault";
import ImagePreview from "../../../components/common/ImagePreview";
import VideoPreview from "../../../components/common/VideoPreview";
import useMediaPreview from "../../../hooks/useMediaPreview";
import { updateMostPopularPost } from "../../../store/most-popular-posts/actions";
import { selectMostPopularPostById } from "../../../store/most-popular-posts/selectors";

const labelStyle: SxProps = {
  fontWeight: "bold",
  textAlign: "right",
  display: "inline",
};

const textFieldStyle: SxProps = {
  bgcolor: "transparent",
  width: 300,
};

type PostParams = {
  postId: string;
};

const MostPopularUpdateForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [errorAlertShown, setErrorAlertShown] = useState(false);
  const [successAlertShown, setSuccessAlertShown] = useState(false);

  // the id of the post to update
  const { postId } = useParams<PostParams>();
  // the post to update
  const postToUpdate = useSelector(selectMostPopularPostById(postId));
  // get form initialvalues
  const defaultValues: MostPopularInputs = postToUpdate
    ? {
        title: postToUpdate.title,
        file: postToUpdate.file,
        datePosted: postToUpdate.datePosted,
        body: postToUpdate.body,
        enabled: postToUpdate.enabled,
      }
    : initialValues;

  // custom hook for media select & preview
  const {
    mediaType: dynamicMediaType,
    mediaPreview: dynamicMediaPreview,
    setMedia,
  } = useMediaPreview();

  const mediaType = dynamicMediaType
    ? dynamicMediaType
    : postToUpdate?.file?.substr(5, 5);

  const mediaPreview = dynamicMediaPreview
    ? dynamicMediaPreview
    : postToUpdate?.file;

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm<MostPopularInputs>({
    resolver: yupResolver(mostPopularSchema),
    defaultValues,
  });

  // BEGIN : set file src
  useEffect(() => {
    setValue("file", mediaPreview);
  }, [mediaPreview, setValue]);
  // END : set file src

  // BEGIN : work around for Material DatePicker
  const [datePosted, setDatePosted] = useState<string | null>(null);
  const datePostedValue = getValues("datePosted");
  useEffect(() => {
    register("datePosted");
  }, [register]);

  useEffect(() => {
    setDatePosted(datePostedValue);
  }, [datePosted, datePostedValue]);
  // END : work around for Material DatePicker

  const hasError = (inputName: keyof MostPopularInputs) =>
    errors[inputName] ? true : false;
  const getError = (inputName: keyof MostPopularInputs) =>
    errors[inputName]?.message;

  function onError(err: typeof errors) {
    setErrorAlertShown(true);
  }

  function onSubmit(values: MostPopularInputs) {
    const updatedPost = { id: postId, ...values };

    dispatch(updateMostPopularPost(postId, updatedPost));

    setSuccessAlertShown(true); // show success alert
  }

  function backToList() {
    history.push("/content/most-popular");
  }
  function handleCancel() {
    backToList();
  }

  function handleMediaChange(file: File | null) {
    setMedia(file);
  }

  return (
    <React.Fragment>
      <MostPopularHeading>
        <Stack direction='row' ml='auto' spacing={2}>
          <Button
            onClick={handleSubmit(onSubmit, onError)}
            disableElevation
            variant='contained'
            color='primary'
            sx={{ color: "white", height: "100%" }}
          >
            Update
          </Button>
          <Button
            onClick={handleCancel}
            disableElevation
            variant='contained'
            color='secondary'
            sx={{
              color: "white",
              height: "100%",
              mr: 2,
            }}
          >
            Cancel
          </Button>
        </Stack>
      </MostPopularHeading>
      <Stack
        alignItems='center'
        spacing={3}
        component='form'
        sx={{
          paddingY: "10px",
          overflow: "auto",
          maxHeight: "calc(100% - 150px)",
        }}
      >
        <Grid container alignItems='center' spacing={2} justifyContent='center'>
          <Grid item xs={5} justifyContent='end' sx={{ display: "flex" }}>
            <Label sx={labelStyle}>Title</Label>
          </Grid>
          <Grid item xs={7}>
            <TextField
              sx={textFieldStyle}
              size='small'
              type='text'
              placeholder='Title'
              InputProps={{ sx: { bgcolor: "white" } }}
              error={hasError("title")}
              helperText={getError("title")}
              {...register("title")}
            />
          </Grid>
          <Grid item xs={5} justifyContent='end' sx={{ display: "flex" }}>
            <Label sx={labelStyle}>Upload Image or Video Attachment</Label>
          </Grid>
          <Grid item xs={7}>
            <Box sx={{ flex: 2 }}>
              <UploadButton onChange={handleMediaChange} />
            </Box>
          </Grid>
          <Grid
            item
            xs={5}
            justifyContent='end'
            alignSelf='start'
            sx={{ display: "flex" }}
          >
            <Label sx={labelStyle}>Preview Uploaded Attachment</Label>
          </Grid>
          <Grid item xs={7}>
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
          </Grid>
          <Grid item xs={5} justifyContent='end' sx={{ display: "flex" }}>
            <Label sx={labelStyle}>Body</Label>
          </Grid>
          <Grid item xs={7}>
            <p>Body field here</p>
          </Grid>
          <Grid item xs={5} justifyContent='end' sx={{ display: "flex" }}>
            <Label sx={labelStyle}>Date Posted</Label>
          </Grid>
          <Grid item xs={7}>
            <AMIDatePicker
              value={datePosted}
              onChange={(dateValue) =>
                setValue("datePosted", dateValue, {
                  shouldValidate: true,
                  shouldDirty: false,
                })
              }
              DateInputProps={{
                sx: { ...textFieldStyle, bgcolor: "white" },
                size: "small",
                error: hasError("datePosted"),
                helperText: getError("datePosted"),
              }}
            />
          </Grid>
          <Grid item xs={5} justifyContent='end' sx={{ display: "flex" }}>
            <Label sx={labelStyle}>Enable</Label>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name='enabled'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value, name, ref } }) => (
                <FormControlLabel
                  control={
                    <Checkbox onChange={onChange} checked={value} ref={ref} />
                  }
                  label=''
                  labelPlacement='end'
                />
              )}
            />
          </Grid>
        </Grid>
      </Stack>
      <AMIAlert
        message='Please check required field(s)'
        open={errorAlertShown && !isValid}
        type='error'
        autoHideDuration={3000}
        onClose={() => setErrorAlertShown(false)}
      />
      <AMIAlert
        message='Successfully saved!'
        open={successAlertShown}
        type='success'
        autoHideDuration={3000}
        onClose={() => setSuccessAlertShown(false)}
      />
    </React.Fragment>
  );
};

export default MostPopularUpdateForm;
