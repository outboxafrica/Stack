import http from './httpService'
import { apiEndPoint } from '../Services/config.json'

const apiEndpoint = `${apiEndPoint}/questions`

export function postQuestion(user) {
    return http.post(apiEndpoint,{
        "question": user.question,
    },
   { headers: {
      "Content-Type": "application/json"
    }})
}