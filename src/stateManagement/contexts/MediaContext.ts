import { createContext } from "react";
import { MediaStateInterface } from "../reducers/mediaReducer";

export interface MediaContextInterface {
    mediaState: MediaStateInterface;
    mediaDispatch: React.Dispatch<any>;
  }
export const initialmediaState = {
    media: []
}
 const MediaContext = createContext<MediaContextInterface>({mediaState: initialmediaState, mediaDispatch: () => null})


export default MediaContext