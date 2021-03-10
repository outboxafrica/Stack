import http from './httpService'
import { apiEndPoint } from './ config.json'

const apiEndpoint = `${apiEndPoint}/auth/signup`

export function signup(user) {
    return http.post(apiEndpoint,{
        "name": user.username,
        "email": user.email,
        "password": user.password,
        "password_conf": user.password
    },
   { headers: {
      "Content-Type": "application/json"
    }})
}