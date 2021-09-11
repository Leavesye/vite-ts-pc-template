import service from '@/utils/request'

const BASE_API = import.meta.env.VITE_APP_CUSTOMER_API

// 查询会员列表
export const getMembers = data => {
  return service({
    url: `${BASE_API}/getMembers`,
    method: 'get',
    params: data
  })
}
// 根据id查询会员信息
export const getMemberById = data => {
  return service({
    url: `${BASE_API}/getMemberById`,
    method: 'get',
    params: data
  })
}
// 新增会员
export const createMember = data => {
  return service({
    url: `${BASE_API}/createMember`,
    method: 'post',
    data
  })
}
// 更新会员
export const updateMember = data => {
  return service({
    url: `${BASE_API}/updateMember`,
    method: 'post',
    data
  })
}
// 删除会员
export const removeMember = data => {
  return service({
    url: `${BASE_API}/removeMember`,
    method: 'get',
    params: data
  })
}
