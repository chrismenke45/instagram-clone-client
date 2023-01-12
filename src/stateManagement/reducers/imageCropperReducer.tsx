import { act } from "react-dom/test-utils";

interface State {
    showImageSelect: boolean;
    photoUrl: string;
}
interface Action {
    type: string;
    payload: {
        photoUrl: string
    }
}

const imageCropperReducer = (state: State, action: Action) => {
    switch (action.type) {
      case "SET_PHOTO":
        return { showImageSelect: false, photoUrl: action.payload.photoUrl }
      case "SELECT_PHOTO":
        return { showImageSelect: true, photoUrl: "" }
      default:
        return state
    }
  }

  export default imageCropperReducer