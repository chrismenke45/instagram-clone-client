const shortenTime = (timeStr: string): string => {
    let timePieces = timeStr.split(" ")
    return timePieces[0] + timePieces[1].slice(0,1)
}
export default shortenTime