import buildFormData from "./buildFormData"
import fetchData from "./fetchData"
import setUserJwt from "../user/setUserJwt"

const loginAsGuest = () => {
    let data = buildFormData([["auth[username]", "guest"], ["auth[password]", process.env.REACT_APP_GUEST_PASSWORD || ""]])
    fetchData("/auth/login", "POST", data)
        .then(data => {
            console.log(data)
            if (data.t) {
                setUserJwt(data.t)
            }
        })
        .catch(err => console.error(err))
}

export default loginAsGuest