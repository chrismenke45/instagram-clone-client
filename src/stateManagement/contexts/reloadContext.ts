import { createContext } from "react";
import { reloadStateInterface } from "../reducers/reloadReducer";

export interface ImageCropperContextInterface {
    reloadState: reloadStateInterface;
    reloadDispatch: React.Dispatch<any>;
  }
const initialReloadState = {
    count: 0
}
 const ReloadContext = createContext<ImageCropperContextInterface>({reloadState: initialReloadState, reloadDispatch: () => null})


export default ReloadContext