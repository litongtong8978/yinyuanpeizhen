import request from "../utils/request"
export const getCodeService = (data) => {
  return request.post('/get/code', data)
}