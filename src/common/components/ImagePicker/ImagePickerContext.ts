import react, { createContext } from "react";
import { DEFAULT_SIZE } from "./ModelPicker";
interface ImagePickerContextProps {
  modalType: "video" | "personalize" | "image" | "all";
  currentImage: {
    imageId: string | number;
    imageUrl: string;
    imageWidth: number | string | null;
    imageHeight: number | string | null;
    imageSize: string;
    imageAlt: string;
    videoSrc: string;
    uploadType: "IMAGE" | "VIDEO";
    videoType: "YTB" | "URL";
  };
  setCurrentImage: (any) => void;
  loading: boolean;
  setLoading: (boolean) => void;
  currentTab: number;
  setCurrentTab: (any) => void;
  updateFnDispatch: (any) => void;
  setIsFirstFetch: (any) => void;
}

export const ImagePickerContext = createContext<ImagePickerContextProps>({
  modalType: "image",
  currentImage: {
    imageId: "",
    imageUrl: "",
    imageWidth: "",
    imageHeight: "",
    imageSize: DEFAULT_SIZE,
    imageAlt: "",
    videoSrc: "",
    uploadType: "IMAGE",
    videoType: "URL"
  },
  setCurrentImage: () => {},
  loading: false,
  setLoading: () => {},
  currentTab: 1,
  setCurrentTab: () => {},
  updateFnDispatch: () => {},
  setIsFirstFetch: () => {}
});
