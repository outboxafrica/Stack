import http from './httpService'
import { apiEndPoint } from './config.json'

const apiEndpoint = `${apiEndPoint}/auth/login`

export function login(user) {
    return http.post("http://localhost:3000/api/v1/auth/login",{
        "email": user.email,
        "password": user.password
    },
   { headers: {
      "Content-Type": "application/json"
    }})
}
