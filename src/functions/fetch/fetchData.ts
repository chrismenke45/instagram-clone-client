const fetchData = (path: string, method: string, data?: FormData, authToken?: string) => {
    //this fetches data from the api at a certain path
    let url: string = `${process.env.REACT_APP_API_URL}/${path}`;
    const options: RequestInit = {
      method,
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
      }
    };
    if (data) { options.body = data}
    if (authToken) { options.headers = { ...options.headers, "Authorization": `Bearer ${authToken}`} }
    return fetch(url, options)
      .then(response => response.json())
      .then(responseObject => responseObject)
      .catch(error => {
        console.error('Error:', error)
      })
  }
  export default fetchData