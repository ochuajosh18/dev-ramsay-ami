import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import {
  PrimaryBannerInputs,
  initialValues,
  primaryBannerUpdateSchema,
} from "./primaryBannerSchema";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import PrimaryBannerHeading from "./PrimaryBannerHeading";
import AMIContentForm from "../../../components/common/AMIContentForm";
import AMIContentFormButtons from "../../../components/common/AMIContentFormButtons";
import AMIDatePicker, {
  useDatePickerSetter,
} from "../../../components/common/AMIDatePicker";
import AMIAlert from "../../../components/common/AMIAlert";
// import AMIRichTextEditor from "../../../components/common/AMIRichTextEditor";
import Label from "../../../components/common/Label";
import UploadButton from "../../../components/common/UploadButton";
import ImageDefault from "../../../components/common/ImageDefault";
import ImagePreview from "../../../components/common/ImagePreview";
import VideoPreview from "../../../components/common/VideoPreview";
import useMediaPreview from "../../../hooks/useMediaPreview";
import { selectPrimaryBannerById } from "../../../store/banner/selectors";
import { updateBanner } from "../../../store/banner/actions";
import { labelStyle } from "../styles";

type BannerParams = {
  bannerId: string;
};

const PrimaryBannerUpdateForm = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [errorAlertShown, setErrorAlertShown] = useState(false);

  // the id of the banner to update
  const { bannerId } = useParams<BannerParams>();
  // the banner to update
  const bannerToUpdate = useSelector(selectPrimaryBannerById(bannerId));
  // get form initialvalues
  const defaultValues: PrimaryBannerInputs = bannerToUpdate
    ? {
        title: bannerToUpdate.title,
        file: null, // the preview will come from bannerToUpdate.media
        datePosted: bannerToUpdate.datePosted,
        content: bannerToUpdate.content,
        isEnabled: bannerToUpdate.isEnabled,
      }
    : initialValues;

  // custom hook for media select & preview
  const {
    mediaType: dynamicMediaType,
    mediaPreview: dynamicMediaPreview,
    setMedia,
    media,
  } = useMediaPreview();

  const mediaType = dynamicMediaType ? dynamicMediaType : "image"; // will handle the file type later

  const mediaPreview = dynamicMediaPreview
    ? dynamicMediaPreview
    : bannerToUpdate?.media;

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm<PrimaryBannerInputs>({
    resolver: yupResolver(primaryBannerUpdateSchema),
    defaultValues,
  });

  // If the bannerToUpdate is undefined, set form values (means that the page was refreshed)
  useEffect(() => {
    if (bannerToUpdate) {
      const { title, content, isEnabled, datePosted } = bannerToUpdate;
      setValue("title", title);
      setValue("content", content);
      setValue("isEnabled", isEnabled);
      setValue("datePosted", datePosted);
    }
  }, [bannerToUpdate, setValue]);

  // BEGIN : set file src
  useEffect(() => {
    setValue("file", media);
  }, [media, setValue]);
  // END : set file src

  // BEGIN : work around for Material DatePicker & RichText Editor
  const datePostedValue = getValues("datePosted");
  const datePosted = useDatePickerSetter(datePostedValue);

  useEffect(() => {
    register("datePosted");
    register("content");
  }, [register]);
  // END : work around for Material DatePicker

  const hasError = (inputName: keyof PrimaryBannerInputs) =>
    errors[inputName] ? true : false;
  const getError = (inputName: keyof PrimaryBannerInputs) =>
    errors[inputName]?.message;

  function onError(err: typeof errors) {
    setErrorAlertShown(true);
  }

  function onSubmit(values: PrimaryBannerInputs) {
    // temporarily remove the `file` field, replace with `media` = mediaPreview string
    const _values = { ...values };

    let updatedBanner;
    if (_values.file) {
      delete _values.file;
      updatedBanner = {
        ..._values,
      };

      dispatch(updateBanner(bannerId, updatedBanner, values.file as File));
    } else {
      delete _values.file;
      updatedBanner = {
        id: bannerId,
        ..._values,
        media: bannerToUpdate?.media,
      };

      dispatch(updateBanner(bannerId, updatedBanner));
    }
  }

  function backToList() {
    history.push("/content/primary-banner");
  }
  function handleCancel() {
    backToList();
  }

  function handleMediaChange(file: File | null) {
    setMedia(file);
  }

  return (
    <React.Fragment>
      <PrimaryBannerHeading>
        <AMIContentFormButtons
          saveText='Update'
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
          {/* <Label sx={{ ...labelStyle, alignSelf: "start", marginTop: "8px" }}>
            Body
          </Label>
          <Box width='100%'>
            <AMIRichTextEditor
              data={getValues("content") || ""}
              onChange={handleContentEditorChange}
            />
          </Box> */}
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

export default PrimaryBannerUpdateForm;
