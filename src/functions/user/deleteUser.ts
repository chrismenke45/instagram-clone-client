import FetchAPI from "../fetch/FetchAPI"
import getUserObject from "./getUserObject"
import deleteFile from "../../firebase/deleteFile"

const deleteUser = (user_id: number) => {
    const fetcher = new FetchAPI()
    const user = getUserObject()
    if (user_id === user.user_id) {
        fetcher.fetchData(`posts?user=${user_id}&preveiw=true`, "GET", user.jwt)
            .then(posts => {
                fetcher.fetchData(`users/${user_id}`, "DELETE", user.jwt)
                    .then(res => {
                        console.log(res)
                        posts.forEach((post: any) => {
                            if (post.picture_url && post.picture_url !== process.env.REACT_APP_DEFAULT_PROFILE_PICTURE) { deleteFile(post.picture_url) }
                        })
                        if (user.profile_picture && user.profile_picture !== process.env.REACT_APP_DEFAULT_PROFILE_PICTURE) {deleteFile(user.profile_picture) }
                        localStorage.clear()
                    })
                    .catch(res => console.error(res))
            })

    }




}
export default deleteUser