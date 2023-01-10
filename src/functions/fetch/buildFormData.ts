
const buildFormData = (formInfoArray: string[][]): FormData => {
    let data = new FormData()
    formInfoArray.forEach(formInfo => {
        data.append(formInfo[0], formInfo[1])
    })
    return data
}
export default buildFormData