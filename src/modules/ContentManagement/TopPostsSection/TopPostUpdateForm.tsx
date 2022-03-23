import React, { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import {
  ArticleInputs,
  articleUpdateSchema,
  initialValues,
} from "../ArticlesSection/articleSchema";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import TopPostHeading from "./TopPostHeading";
import AMIContentForm from "../../../components/common/AMIContentForm";
import AMIContentFormButtons from "../../../components/common/AMIContentFormButtons";
import AMIDatePicker, {
  useDatePickerSetter,
} from "../../../components/common/AMIDatePicker";
import AMIAlert from "../../../components/common/AMIAlert";
import AMIRichTextEditor from "../../../components/common/AMIRichTextEditor";
import Label from "../../../components/common/Label";
import UploadButton from "../../../components/common/UploadButton";
import ImageDefault from "../../../components/common/ImageDefault";
import ImagePreview from "../../../components/common/ImagePreview";
import useMediaPreview from "../../../hooks/useMediaPreview";
import ReactPlayer from "react-player/youtube";
import usePreviewType from "../../../hooks/usePreviewType";
import { selectTopPostById } from "../../../store/top-posts/selectors";
import { updateTopPost } from "../../../store/top-posts/actions";
import { labelStyle } from "../styles";

type TopPostParams = {
  topPostId: string;
};

// any "article" reference here refers to a top post.
// top post is an 'special' article
const TopPostUpdateForm = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [errorAlertShown, setErrorAlertShown] = useState(false);

  // the id of the article to update
  const { topPostId } = useParams<TopPostParams>();
  // the article to update
  const articleToUpdate = useSelector(selectTopPostById(topPostId));

  // get form initialvalues
  const defaultValues: ArticleInputs = articleToUpdate
    ? {
        title: articleToUpdate.title,
        media: articleToUpdate.media as string,
        datePosted: articleToUpdate.datePosted,
        content: articleToUpdate.content,
        isEnabled: articleToUpdate.isEnabled,
      }
    : initialValues;

  // custom hook for media select & preview
  const {
    mediaPreview: dynamicMediaPreview,
    setMedia,
    media,
  } = useMediaPreview();

  const [videoLink, setVideoLink] = useState<string>("");
  const { previewType, setPreviewType } = usePreviewType();

  const mediaPreview = dynamicMediaPreview
    ? dynamicMediaPreview
    : articleToUpdate?.media;

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm<ArticleInputs>({
    resolver: yupResolver(articleUpdateSchema),
    defaultValues,
  });

  // If the articleToUpdate is undefined, set form values (means that the page was refreshed)
  useEffect(() => {
    if (articleToUpdate) {
      const { title, content, isEnabled, datePosted, media } = articleToUpdate;
      setValue("title", title);
      setValue("content", content);
      setValue("isEnabled", isEnabled);
      setValue("datePosted", datePosted);
      setValue("media", media);
    }
  }, [articleToUpdate, setValue]);

  // BEGIN : set file src
  useEffect(() => {
    if (!articleToUpdate) return;
    const _previewType = articleToUpdate?.media?.includes("pajrw/articles")
      ? "image"
      : "link";

    if (_previewType === "link") setVideoLink(articleToUpdate?.media as string);
    setPreviewType(_previewType);
  }, [articleToUpdate, setPreviewType]);

  useEffect(() => {
    setValue("media", media);

    if (media) setVideoLink("");
  }, [media, setValue]);

  useEffect(() => {
    if (videoLink) {
      setMedia(null);
      setValue("media", videoLink);
    }
  }, [setMedia, setValue, videoLink]);
  // END : set file src

  // BEGIN : work around for Material DatePicker & RichText Editor
  const datePostedValue = getValues("datePosted");
  const datePosted = useDatePickerSetter(datePostedValue);

  useEffect(() => {
    register("datePosted");
    register("content");
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
    let updatedArticle;
    if (media) {
      delete _values.media;
      updatedArticle = { title, content, datePosted, isEnabled, media: null };
      dispatch(updateTopPost(topPostId, updatedArticle, media as File));
    } else if (videoLink || articleToUpdate?.media) {
      const _media =
        videoLink && previewType === "link"
          ? videoLink
          : (articleToUpdate?.media as string);
      updatedArticle = {
        title,
        content,
        datePosted,
        isEnabled,
        media: _media,
      };
      dispatch(updateTopPost(topPostId, updatedArticle));
    }
  }

  function backToList() {
    history.push("/content/top-posts");
  }
  function handleCancel() {
    backToList();
  }

  function handleMediaChange(file: File | null) {
    setMedia(file);
    setPreviewType("image");
  }

  function handleContentEditorChange(contentValue: string) {
    setValue("content", contentValue, {
      shouldValidate: true,
      shouldDirty: false,
    });
  }

  function handleVideoLinkChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setVideoLink(value);
    setPreviewType("link");
    setValue("media", value);
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
      <TopPostHeading>
        <AMIContentFormButtons
          saveText='Update'
          onSave={handleSubmit(onSubmit, onError)}
          onCancel={handleCancel}
        />
      </TopPostHeading>
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
          <Label sx={{ ...labelStyle, alignSelf: "start", marginTop: "8px" }}>
            Body
          </Label>
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

export default TopPostUpdateForm;
