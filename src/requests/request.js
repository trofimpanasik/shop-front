export const request = async (url, data, type, image) =>  {
  try {
    const URL = 'http://10.100.31.123:49374/api'//http://localhost:3001/api
    let body
    const key = localStorage.getItem('key')
    if (type === 'get' || type === 'delete' || type === 'put') {
      body = {
        method: type.toUpperCase(),
        headers: {'Content-Type': 'application/json', authorization: key},
        url: `${URL}${url}`
      }
    } else if(image) {
      body = {
        method: type.toUpperCase(),
        headers: {'Content-Type':  'application/json', authorization: key},
        url: `${URL}${url}`,
        body: image
      }
    } else {
      body = {
        method: type.toUpperCase(),
        headers: {'Content-Type': 'application/json', authorization: key},
        url: `${URL}${url}`,
        body: JSON.stringify(data)
      }
    }
    const res = await fetch(`${URL}${url}`, body)
    const response = await res.json()
    if(!res?.ok) {
      return {text: response.message, code: response.code}
    }
    return response
  } catch (e) {
    console.log(e)
  }
}//разбить значения в useSelector