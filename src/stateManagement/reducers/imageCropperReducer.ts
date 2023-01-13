export interface imageCropperStateInterface {
  showImageSelect: boolean;
  photoUrl: string;
}
export interface imageCropperActionInterface {
  type: string;
  payload: {
    photoUrl: string
  }
}

const imageCropperReducer = (state: imageCropperStateInterface, action: imageCropperActionInterface) => {
  switch (action.type) {
    case "SET_PHOTO":
      return { showImageSelect: false, photoUrl: action.payload.photoUrl }
    case "OPEN_CROPPER":
      return { showImageSelect: true, photoUrl: "" }
    case "CLOSE_CROPPER":
      return { showImageSelect: false, photoUrl: "" }
    default:
      return state
  }
}

export default imageCropperReducer