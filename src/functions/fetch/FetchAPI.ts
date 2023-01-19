interface FetchObjectProp {
    options: RequestInit
}

class FetchAPI {
    options: RequestInit;
    constructor() {
        this.options = {
            method: "GET",
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
            }
        }
    }
    buildFormData(formInfoArray: string[][]): void {
        let data = new FormData()
        formInfoArray.forEach(formInfo => {
            if (formInfo[1]) { data.append(formInfo[0], formInfo[1]) }
        })
        this.options.body = data
    }
    fetchData(path: string, method?: string, authToken?: string): Promise<any> {
        //this fetches data from the api at a certain path
        let url: string = `${process.env.REACT_APP_API_URL}/${path}`;
        this.options.method = method
        if (authToken) {
            this.options.headers = {
                ...this.options.headers,
                'Authorization': `Bearer ${authToken}`,
            }
        }
        return fetch(url, this.options)
            .then(response => response.json())
            .then(responseObject => responseObject)
            .catch(error => {
                console.error('Error:', error)
            })
    }
    loginAsGuest(): Promise<any> {
        this.buildFormData([["auth[username]", "guest"], ["auth[password]", process.env.REACT_APP_GUEST_PASSWORD || ""]])
        return this.fetchData("/auth/login", "POST")
        .then(data => {
            return data
        })
        .catch(err => console.error(err))
    }
}

export default FetchAPI