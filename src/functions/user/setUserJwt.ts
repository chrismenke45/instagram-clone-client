const setUserJwt = (jwt: string) => {
    localStorage.setItem("userToken", jwt)
}
export default setUserJwt