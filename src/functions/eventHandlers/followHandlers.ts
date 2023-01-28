import getUserObject from "../user/getUserObject"
import FetchAPI from "../fetch/FetchAPI"

const user = getUserObject()
const fetcher = new FetchAPI

export const follow = (profile_id: number) => {
    fetcher.fetchData(`users/${profile_id}/follows`, "POST", user.jwt)
        .then(co => console.log(co))
}
export const unfollow = (profile_id: number) => {
    fetcher.fetchData(`users/${profile_id}/follows`, "DELETE", user.jwt)
        .then(co => console.log(co))
}