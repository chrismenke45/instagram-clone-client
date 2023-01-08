import jwt_decode from "jwt-decode";

interface UserObject {
    username: string;
    user_id: number;
    exp: number;
}

const getUserObject = () => {
    const jwt = localStorage.getItem("userToken")
    if (jwt) {
        let userObject: UserObject = jwt_decode(jwt)
        let currentDate = new Date()
        let currentSecondsSinceEpoch = Math.round(currentDate.getTime() / 1000)
        if (currentSecondsSinceEpoch < userObject.exp) {
            return {
                ...userObject,
                jwt
            }
        }
    }
    return false


}
export default getUserObject