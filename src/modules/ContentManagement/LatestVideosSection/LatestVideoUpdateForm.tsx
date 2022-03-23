import React, { useState, useEffect, ChangeEvent } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import {
  LatestVideoInputs,
  latestVideoUpdateSchema,
  initialValues,
} from "./latestVideoSchema";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import LatestVideosHeading from "./LatestVideosHeading";
import Label from "../../../components/common/Label";
import AMIDatePicker, {
  useDatePickerSetter,
} from "../../../components/common/AMIDatePicker";
import AMIAlert from "../../../components/common/AMIAlert";
import ImageDefault from "../../../components/common/ImageDefault";
import { updateVideo } from "../../../store/latest-videos/actions";
import { selectLatestVideoById } from "../../../store/latest-videos/selectors";
import AMIContentFormButtons from "../../../components/common/AMIContentFormButtons";
import AMIContentForm from "../../../components/common/AMIContentForm";
import AMIRichTextEditor from "../../../components/common/AMIRichTextEditor";
import ReactPlayer from "react-player/youtube";
import { labelStyle } from "../styles";

type VideoParams = {
  videoId: string;
};

const LatestVideoUpdateForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [errorAlertShown, setErrorAlertShown] = useState(false);

  // the id of the video to update
  const { videoId } = useParams<VideoParams>();
  // the video to update
  const videoToUpdate = useSelector(selectLatestVideoById(videoId));
  // get form initialvalues
  const defaultValues: LatestVideoInputs = videoToUpdate
    ? {
        title: videoToUpdate.title,
        media: videoToUpdate.media as string,
        datePosted: videoToUpdate.datePosted,
        content: videoToUpdate.content,
        isEnabled: videoToUpdate.isEnabled,
      }
    : initialValues;

  const [videoLink, setVideoLink] = useState<string>("");

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm<LatestVideoInputs>({
    resolver: yupResolver(latestVideoUpdateSchema),
    defaultValues,
  });

  // If the videoToUpdate is undefined, set form values (means that the page was refreshed)
  useEffect(() => {
    if (videoToUpdate) {
      const { title, content, isEnabled, datePosted, media } = videoToUpdate;
      setValue("title", title);
      setValue("content", content);
      setValue("media", media as string);
      setValue("isEnabled", isEnabled);
      setValue("datePosted", datePosted);

      setVideoLink(media as string);
    }
  }, [videoToUpdate, setValue]);

  // BEGIN : work around for Material DatePicker
  const datePostedValue = getValues("datePosted");
  const datePosted = useDatePickerSetter(datePostedValue);

  useEffect(() => {
    register("datePosted");
    register("content");
  }, [register]);
  // END : work around for Material DatePicker

  const hasError = (inputName: keyof LatestVideoInputs) =>
    errors[inputName] ? true : false;
  const getError = (inputName: keyof LatestVideoInputs) =>
    errors[inputName]?.message;

  function onError(err: typeof errors) {
    setErrorAlertShown(true);
  }

  function onSubmit(values: LatestVideoInputs) {
    const _values = { ...values };
    const updatedVideo = {
      ..._values,
    };

    // console.log(updatedVideo);
    dispatch(updateVideo(videoId, updatedVideo));
  }

  function backToList() {
    history.push("/content/latest-videos");
  }
  function handleCancel() {
    backToList();
  }

  function handleVideoLinkChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setVideoLink(value);
    setValue("media", value);
  }

  function handleContentEditorChange(contentValue: string) {
    setValue("content", contentValue, {
      shouldValidate: true,
      shouldDirty: false,
    });
  }

  return (
    <React.Fragment>
      <LatestVideosHeading>
        <AMIContentFormButtons
          saveText='Update'
          onSave={handleSubmit(onSubmit, onError)}
          onCancel={handleCancel}
        />
      </LatestVideosHeading>
      <AMIContentForm>
        <AMIContentForm.Grid>
          <Label sx={labelStyle}>Title</Label>
          <AMIContentForm.TextField
            error={hasError("title")}
            helperText={getError("title")}
            {...register("title")}
          />
          <Label sx={labelStyle}>Provide Video Attachment</Label>
          <AMIContentForm.TextField
            placeholder='Paste a video link here'
            error={hasError("media")}
            value={videoLink}
            onChange={handleVideoLinkChange}
          />
          <Label sx={{ ...labelStyle, alignSelf: "start", marginTop: "8px" }}>
            Preview Video Attachment
          </Label>
          <Box>
            {videoLink ? (
              <ReactPlayer url={videoLink} width={400} height={230} controls />
            ) : (
              <ImageDefault
                error={hasError("media")}
                errorMessage={getError("media")}
              />
            )}
          </Box>
          <Label sx={labelStyle}>Body</Label>
          <Box width='100%'>
            <AMIRichTextEditor
              data={getValues("content") || ""}
              onChange={handleContentEditorChange}
            />
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

export default LatestVideoUpdateForm;
