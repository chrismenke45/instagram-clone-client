import { createContext } from "react";
import { reloadStateInterface } from "../reducers/reloadReducer";

export interface ReloadContextInterface {
  reloadState: reloadStateInterface;
  reloadDispatch: React.Dispatch<any>;
}
export const initialReloadState = {
  count: 0
}
const ReloadContext = createContext<ReloadContextInterface>({ reloadState: initialReloadState, reloadDispatch: () => null })


export default ReloadContext