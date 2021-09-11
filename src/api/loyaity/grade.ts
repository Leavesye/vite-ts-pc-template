import service from '@/utils/request'

const BASE_API = import.meta.env.VITE_APP_LOYALTY_API

// 查询等级列表
export const getGrades = data => {
  return service({
    url: `${BASE_API}/getGrades`,
    method: 'get',
    params: data
  })
}
// 根据id查询等级信息
export const getGradeById = data => {
  return service({
    url: `${BASE_API}/getGradeById`,
    method: 'get',
    params: data
  })
}
// 新增等级
export const createGrade = data => {
  return service({
    url: `${BASE_API}/createGrade`,
    method: 'post',
    data
  })
}
// 更新等级
export const updateGrade = data => {
  return service({
    url: `${BASE_API}/updateGrade`,
    method: 'post',
    data
  })
}
// 删除等级
export const removeGrade = data => {
  return service({
    url: `${BASE_API}/removeGrade`,
    method: 'get',
    params: data
  })
}
