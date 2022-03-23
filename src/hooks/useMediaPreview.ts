import { useState, useEffect } from "react";

export default function useMediaPreview() {
  const [media, setMedia] = useState<File | null>();
  const [mediaPreview, setMediaPreview] = useState<string | null>();
  const [mediaType, setMediaType] = useState<string>("");
  const [longMediaType, setLongMediaType] = useState<string>("");
  // BEGIN: handling media preview
  useEffect(() => {
    if (media) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result as string);
      };
      reader.readAsDataURL(media);
      setLongMediaType(media.type);
      setMediaType(media.type.substr(0, 5));
    } else {
      setMediaPreview(null);
    }
  }, [media]);
  // END: handling media preview

  return {
    mediaType,
    longMediaType,
    mediaPreview,
    setMedia,
    fileName: media?.name,
    media,
  };
}
