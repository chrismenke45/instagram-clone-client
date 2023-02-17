import getUserObject from "../user/getUserObject"
import FetchAPI from "../fetch/FetchAPI"

const user = getUserObject()
const fetcher = new FetchAPI()

export const follow = (profile_id: number) => {
    return fetcher.fetchData(`users/${profile_id}/follows`, "POST", user.jwt)
}
export const unfollow = (profile_id: number) => {
    return fetcher.fetchData(`users/${profile_id}/follows`, "DELETE", user.jwt)
}