const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

const API = {
    BaseUrl: API_BASE_URL,
    token: null,
    setToken: (token) => {
        API.token = token
    },
    User: {
        Register: (name, email, password) => {
            return fetch(`${API.BaseUrl}/user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                }),
            })
        },
        Auth: {
            Login: (email, password, remember_me) => {
                remember_me = remember_me || false

                return fetch(`${API.BaseUrl}/user/auth`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        remember_me: remember_me.toString(),
                    }),
                })
            },
            Logout: () => {
                return fetch(`${API.BaseUrl}/user/auth`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${API.token}`,
                    },
                })
            }
        },

    },
    Items: {
        List: (offset, limit, sort, order, filter, filterValue, filterLiterally) => {
            offset = offset || 0
            limit = limit || 40
            sort = sort || 'created_at'
            order = order || 'desc'
            filter = filter || ''
            filterValue = filterValue || ''
            filterLiterally = filterLiterally || false

            let url = `${API.BaseUrl}/items`
            url += `?offset=${offset}`
            url += `&limit=${limit}`
            url += `&sort=${sort}`
            url += `&order=${order}`
            url += `&filter=${filter}`

            return fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API.token}`,
                },
            }).then((res) => {
                return res.json()
            })
        },
        Add: (name, description) => {
            return fetch(`${API.BaseUrl}/items`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API.token}`,
                },
            })
        },
        Update: (id, name, description) => {
            return fetch(`${API.BaseUrl}/items/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API.token}`,
                },
            })
        },
        Delete: (id) => {
            return fetch(`${API.BaseUrl}/items/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API.token}`,
                },
            })
        }
    }
}

export default API;