import { MockMethod } from 'vite-plugin-mock'

let members = [
  { id: 1, name: '张三', age: 10 },
  { id: 2, name: '李四', age: 12 }
]
const mockAPis: MockMethod[] = [
  // 查询所有会员
  {
    url: '/api/customer/getMembers',
    method: 'get',
    response: ({ query, body }) => {
      console.log(query, body, 'query')
      return {
        code: 0,
        data: members,
        msg: 'success'
      }
    }
  },
  // 根据会员id查会员详情
  {
    url: '/api/customer/getMemberById',
    method: 'get',
    response: ({ query, body }) => {
      const member = members.find(o => o.id === +query.id)
      console.log(members, member)
      return {
        code: 0,
        data: member,
        msg: 'success'
      }
    }
  },
  // 新增会员
  {
    url: '/api/customer/createMember',
    method: 'post',
    response: ({ query, body }) => {
      console.log(body)
      let maxId = 0
      members.forEach(o => {
        maxId = o.id > maxId ? o.id : maxId
      })
      members.push({ ...body, id: ++maxId })
      return {
        code: 0,
        data: members,
        msg: 'success'
      }
    }
  },
  // 编辑会员
  {
    url: '/api/customer/updateMember',
    method: 'post',
    response: ({ query, body }) => {
      members.forEach(o => {
        if (o.id === +body.id) {
          o.name = body.name
          o.age = body.age
        }
      })
      return {
        code: 0,
        data: members,
        msg: 'success'
      }
    }
  },
  // 删除会员
  {
    url: '/api/customer/removeMember',
    method: 'post',
    response: ({ query, body }) => {
      console.log(body)
      members = members.filter(o => o.id !== body)
      return {
        code: 0,
        data: members,
        msg: 'success'
      }
    }
  }
]

export default mockAPis
