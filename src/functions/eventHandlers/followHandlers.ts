import getUserObject from "../user/getUserObject"
import FetchAPI from "../fetch/FetchAPI"

const fetcher = new FetchAPI()

export const follow = (profile_id: number) => {
    const user = getUserObject()
    return fetcher.fetchData(`users/${profile_id}/follows`, "POST", user.jwt)
}
export const unfollow = (profile_id: number) => {
    const user = getUserObject()
    return fetcher.fetchData(`users/${profile_id}/follows`, "DELETE", user.jwt)
}