const imageCropperActions = {
    SET_PHOTO(photoUrl: string) {
        return {
            type: "SET_PHOTO",
            payload: { photoUrl }
        }
    },
    CLOSE_CROPPER(photoUrl = "") {
        return {
            type: "CLOSE_CROPPER",
            payload: { photoUrl }
        }
    },
    OPEN_CROPPER(photoUrl = "") {
        return {
            type: "OPEN_CROPPER",
            payload: { photoUrl }
        }
    }
}
export default imageCropperActions