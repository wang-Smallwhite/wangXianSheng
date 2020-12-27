import Mock from 'mockjs'

const user = Mock.mock({
  userList: [
    {
      id: 1,
      title: '管理员',
      username: 'admin',
      password: '123456',
      token: '@date(T)',
      image: "@image('88x31','#FF83FA', '#63a7f5', 'png', '坤坤')"
    },
    {
      id: 2,
      usertitle: '超级管理员',
      username: 'root',
      password: 'root999',
      'token': '@date(T)',
      image: "@image('88x31','#FF83FA', '#68fdf9', 'png', '辉')"
    }
  ]
})
// console.log(user)
// console.log(user.userList.length)

Mock.mock('/api/login', 'get', ()=> {
  return {
    status: 200,
    message: '用户信息获取成功',
    data: user,
    len: user.userList.length
  }
})