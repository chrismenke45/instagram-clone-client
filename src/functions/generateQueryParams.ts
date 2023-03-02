const generateQueryParams = (values: { [key: string]: string | number; }): string => {
    let queryStr = "?"
    for (const [index, [key, value]] of Object.entries(Object.entries(values))) {
        if (Number(index) !== 0) {
            queryStr += "?"
        }
        queryStr += `${key}=${value}`
    }
    return queryStr
}
export default generateQueryParams