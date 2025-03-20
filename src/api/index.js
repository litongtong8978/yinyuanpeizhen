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
export const userGetMenuService = () => {
  return request.get('/user/getmenu')
}
export const userSetMenuService = (data) => {
  return request.post('/user/setmenu', data)
}
export const menuListService = (params) => {
  return request.get('/menu/list', { params })
}





export const photoListService = () => {
  return request.get('/photo/list')
}
export const companionService = (data) => {
  return request.post('/companion', data)
}
export const companionListService = (params) => {
  return request.get('/companion/list', { params })
}
export const deleteCompanionService = (data) => {
  return request.post('/delete/companion', data)
}