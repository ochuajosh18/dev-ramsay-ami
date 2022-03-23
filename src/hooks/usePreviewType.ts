import { useState } from "react";

export default function usePreviewType() {
  const [previewType, setPreviewType] = useState<
    "empty" | "image" | "video" | "link"
  >("empty");

  return { previewType, setPreviewType };
}
