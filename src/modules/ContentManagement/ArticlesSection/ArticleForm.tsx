import React, { ChangeEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { ArticleInputs, articleSchema, initialValues } from "./articleSchema";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import ArticlesHeading from "./ArticlesHeading";
import AMIContentForm from "../../../components/common/AMIContentForm";
import AMIContentFormButtons from "../../../components/common/AMIContentFormButtons";
import AMIDatePicker, {
  useDatePickerSetter,
} from "../../../components/common/AMIDatePicker";
import AMIAlert from "../../../components/common/AMIAlert";
import Label from "../../../components/common/Label";
import UploadButton from "../../../components/common/UploadButton";
import ImageDefault from "../../../components/common/ImageDefault";
import useMediaPreview from "../../../hooks/useMediaPreview";
import { createArticle } from "../../../store/articles/actions";
import ImagePreview from "../../../components/common/ImagePreview";
import { getSystemSnackbar } from "../../../store/system/selectors";
import ReactPlayer from "react-player/youtube";
import usePreviewType from "../../../hooks/usePreviewType";
import { labelStyle } from "../styles";

const ArticleForm = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [errorAlertShown, setErrorAlertShown] = useState(false);

  // watch for error or success message from SYSTEM SNACKBAR
  const snackbar = useSelector(getSystemSnackbar);
  // custom hook for media select & preview
  const { mediaPreview, setMedia, media } = useMediaPreview();
  const [videoLink, setVideoLink] = useState<string>("");
  const { previewType, setPreviewType } = usePreviewType();

  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm<ArticleInputs>({
    resolver: yupResolver(articleSchema),
    defaultValues: initialValues,
  });

  // FOR resetting the form after SUCCESS
  useEffect(() => {
    if (snackbar && snackbar.type === "success") {
      reset(); // reset the form
      setMedia(null); // reset file
      setVideoLink("");
      setPreviewType("empty");
    }
  }, [reset, setMedia, setPreviewType, snackbar]);

  // BEGIN : set file src
  useEffect(() => {
    if (!videoLink) setValue("media", media);

    if (media) setVideoLink("");
  }, [media, setValue, videoLink]);

  useEffect(() => {
    if (videoLink) {
      setMedia(null);
      setValue("media", videoLink);
    }
  }, [setMedia, setValue, videoLink]);
  // END : set file src

  // BEGIN : work around for Material DatePicker
  const datePostedValue = getValues("datePosted");
  const datePosted = useDatePickerSetter(datePostedValue);

  useEffect(() => {
    register("datePosted");
  }, [register]);
  // END : work around for Material DatePicker

  const hasError = (inputName: keyof ArticleInputs) =>
    errors[inputName] ? true : false;
  const getError = (inputName: keyof ArticleInputs) =>
    errors[inputName]?.message;

  function onError(err: typeof errors) {
    console.log(err, getValues("media"));
    setErrorAlertShown(true);
  }

  function onSubmit(values: ArticleInputs) {
    // needs to remove the `file` field
    const _values = { ...values };
    const { title, content, datePosted, isEnabled } = _values;
    let newArticle;
    if (media) {
      delete _values.media;
      newArticle = { title, content, datePosted, isEnabled, media: null };
      dispatch(createArticle(newArticle, media as File));
    } else if (videoLink) {
      newArticle = { title, content, datePosted, isEnabled, media: videoLink };
      dispatch(createArticle(newArticle));
    }
  }

  function backToList() {
    history.push("/content/articles");
  }
  function handleCancel() {
    backToList();
  }

  function handleMediaChange(file: File | null) {
    setMedia(file);
    setPreviewType("image");
  }

  function handleVideoLinkChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setValue("media", value);
    setVideoLink(value);
    setPreviewType("link");
  }

  function renderMediaPreview() {
    switch (previewType) {
      case "image":
        return <ImagePreview src={mediaPreview as string} />;
      case "link":
        return (
          <ReactPlayer url={videoLink} width={400} height={230} controls />
        );
      case "empty":
      default:
        return null;
    }
  }

  return (
    <React.Fragment>
      <ArticlesHeading>
        <AMIContentFormButtons
          onSave={handleSubmit(onSubmit, onError)}
          onCancel={handleCancel}
        />
      </ArticlesHeading>
      <AMIContentForm>
        <AMIContentForm.Grid>
          <Label sx={labelStyle}>Title</Label>
          <AMIContentForm.TextField
            error={hasError("title")}
            helperText={getError("title")}
            {...register("title")}
          />
          <Label sx={labelStyle}>Upload Image or Video Attachment</Label>
          <Stack direction='row' alignItems='center' spacing={1} width={400}>
            <UploadButton accept='image' onChange={handleMediaChange} />
            <Typography component='span' color='GrayText' fontWeight='bold'>
              Or
            </Typography>
            <AMIContentForm.TextField
              label='Video Link'
              placeholder='Paste a Video Link here'
              sx={{ flex: 1, width: "auto" }}
              value={videoLink}
              onChange={handleVideoLinkChange}
            />
          </Stack>
          <Label sx={{ ...labelStyle, alignSelf: "start", marginTop: "8px" }}>
            Preview Uploaded Attachment
          </Label>
          <Box>
            {renderMediaPreview()}
            {previewType === "empty" && (
              <ImageDefault
                error={hasError("media")}
                errorMessage={getError("media")}
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

export default ArticleForm;
