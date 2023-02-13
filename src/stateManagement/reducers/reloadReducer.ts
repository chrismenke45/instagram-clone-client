import deleteFile from "../../firebase/deleteFile";

export interface reloadStateInterface {
  count: number;
}
export interface imageCropperActionInterface {
  type: string;
}

const reloadReducer = (state: reloadStateInterface, action: imageCropperActionInterface) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1}
    default:
      return state
  }
}

export default reloadReducer