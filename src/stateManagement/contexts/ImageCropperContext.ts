import { createContext } from "react";
import { imageCropperStateInterface } from "../reducers/imageCropperReducer";

export interface ImageCropperContextInterface {
    imageCropperState: imageCropperStateInterface;
    imageCropperDispatch: React.Dispatch<any>;
  }
const initialImageCropperState = {
    photoUrl: "",
    showImageSelect: false,
    oldPhotoUrl: ""
}
 const ImageCropperContext = createContext<ImageCropperContextInterface>({imageCropperState: initialImageCropperState, imageCropperDispatch: () => null})


export default ImageCropperContext