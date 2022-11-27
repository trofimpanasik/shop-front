export const request = async (url, data, type, image) =>  {
  try {
    const URL = 'https://shopturzim3632.herokuapp.com/api'//http://localhost:3001/api
    let body
    const key = localStorage.getItem('key')
    if (type === 'get' || type === 'delete' || type === 'put') {
      body = {
        mode: 'cors',
        method: type.toUpperCase(),
        headers: {'Content-Type': 'application/json', authorization: key},
        url: `${URL}${url}`
      }
    } else if(image) {
      body = {
        mode: 'cors',
        method: type.toUpperCase(),
        headers: {authorization: key},
        url: `${URL}${url}`,
        body: image
      }
    } else {
      body = {
        mode: 'cors',
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