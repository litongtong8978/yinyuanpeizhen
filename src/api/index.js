import request from "../utils/request"
export const getCodeService = (data) => {
  return request.post('/get/code', data)
}
export const authenticationService = (data) => {
  return request.post('/user/authentication', data)
}
export const loginService = (data) => {
  return request.post('/login', data)
}
// 账号管理
export const authAdminService = (params = {}) => {
  return request.get('/auth/admin', { params })
}