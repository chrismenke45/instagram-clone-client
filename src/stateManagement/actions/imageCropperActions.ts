const imageCropperActions = {
    SET_PHOTO(photoUrl: string, oldPhotoUrl: string) {
        return {
            type: "SET_PHOTO",
            payload: {
                photoUrl,
                oldPhotoUrl
            }
        }
    },
    CLOSE_CROPPER(photoUrl = "", oldPhotoUrl = "") {
        return {
            type: "CLOSE_CROPPER",
            payload: {
                photoUrl,
                oldPhotoUrl
            }
        }
    },
    OPEN_CROPPER(photoUrl = "", oldPhotoUrl = "") {
        return {
            type: "OPEN_CROPPER",
            payload: {
                photoUrl,
                oldPhotoUrl
            }
        }
    }
}
export default imageCropperActions