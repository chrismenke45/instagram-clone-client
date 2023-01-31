import deleteFile from "../../firebase/deleteFile";

export interface imageCropperStateInterface {
  showImageSelect: boolean;
  photoUrl: string;
  oldPhotoUrl: string
}
export interface imageCropperActionInterface {
  type: string;
  payload: {
    photoUrl: string
    oldPhotoUrl: string
  }
}

const imageCropperReducer = (state: imageCropperStateInterface, action: imageCropperActionInterface) => {
  switch (action.type) {
    case "SET_PHOTO":
      if (state.oldPhotoUrl && state.oldPhotoUrl !== process.env.REACT_APP_DEFAULT_PROFILE_PICTURE) {
        console.log(state)
        deleteFile(state.oldPhotoUrl)
          .catch(err => {
            console.error(err)
          })
      }
      return { showImageSelect: false, photoUrl: action.payload.photoUrl, oldPhotoUrl: "" }

    case "OPEN_CROPPER":
      return { showImageSelect: true, photoUrl: "", oldPhotoUrl: action.payload.photoUrl}
    case "CLOSE_CROPPER":
      return { showImageSelect: false, photoUrl: "", oldPhotoUrl: "" }
    default:
      return state
  }
}

export default imageCropperReducer