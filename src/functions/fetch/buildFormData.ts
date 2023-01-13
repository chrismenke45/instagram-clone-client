
const buildFormData = (formInfoArray: string[][]): FormData => {
    let data = new FormData()
    formInfoArray.forEach(formInfo => {
        if (formInfo[1]) { data.append(formInfo[0], formInfo[1]) }
    })
    return data
}
export default buildFormData