// a utility function to call backend API
export default async function apiCall({endpoint, method, body, secured = false}) {
  try {
    // get token from local storage
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;      

    // set the headers to be sent to backend
    const headers = {
      "Content-Type": "application/json",
      "Authorization": secured && `Bearer ${token}`,
    };

    // make the api call to backend and get the response object
    const response = await fetch(`http://localhost:5000${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    const resp = await response.json();        

    // keep error switch on and retur ndata
    if (!response.ok) {
      return { error: true, data: resp };
    } else {
      return { error: false, data: resp };
    }
  } catch (error) {
    // catch error and return data
    return { error: true, error };
  }
}
