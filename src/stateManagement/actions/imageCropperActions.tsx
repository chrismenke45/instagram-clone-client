const userAction = {
    SET_PHOTO(photoUrl: { photoUrl: string}) {
        return {
            type: "SET_PHOTO",
            payload: photoUrl
        }
    },
    SELECT_PHOTO(photoUrl = {photoUrl: ""}) {
        return {
            type: "SELECT_PHOTO",
            payload: photoUrl
        }
    }
}
export default userAction