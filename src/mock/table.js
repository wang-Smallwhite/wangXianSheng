import Mock from 'mockjs'

const list = Mock.mock({
  'lists|55': [
    {
      'id': "@increment()",
      'name': '@cname',
      'age|20-60': 20,
      'idCard': /\d{18}/,
      'city': '@county(true)',
      'zip': '@zip'
    }
  ]
})
// console.log(list)

// 查询数据

Mock.mock('/api/get/search', 'get', ()=>{
  return {
    status: 200,
    message: '查询数据',
    list:list.lists,
    total: list.length
  }
})

const getQuery =(url, name)=> {
  // console.log('url', url)
  // console.log('name', name)
  const index = url.indexOf('?')
  if(index !== -1) {
    const queryStr = url.substr(index+1).split('&')
    // console.log('queryStr', queryStr)
    for (let i = 0; i < queryStr.length; i++) {
      const itemArr = queryStr[i].split('=')
      // console.log('item', item)
      if(itemArr[0] === name) {
        return itemArr[1]
      }
    }
  }
  return null
}


Mock.mock(/\/api\/get\/list/, 'get', (option)=> {
  const pageindex = getQuery(option.url, 'pageindex')
  const pagesize = getQuery(option.url, 'pagesize')
  const start = (pageindex - 1) * pagesize
  const end = pageindex * pagesize
  const totalPage = Math.ceil(list.lists.length/pagesize)
  const listPage= pageindex > totalPage?[] :list.lists.slice(start, end)
  return {
    status: 200,
    message: '表格数据获取成功',
    list: listPage,
    total: list.lists.length
  }
})


// 删除

Mock.mock('/api/post/del', 'post', (options) => {
  const body = JSON.parse(options.body)
  // console.log(body)
  const index = list.lists.findIndex(item => {
    return item.id === body.id
  })
  list.lists.splice(index, 1)
  // console.log(index,'index')
  return {
    status: 200,
    message: '删除数据成功',
    list:list.lists,
    total: list.length
  }
})


// 修改

Mock.mock('/api/post/edit', 'post', (options) =>{
  const body = JSON.parse(options.body).data
  // console.log(JSON.parse(options.body).data)
  for(let i = 0; i < list.lists.length; i++) {
    if(list.lists[i].id === body.id) {
      list.lists[i].name = body.name
      list.lists[i].age = body.age
      list.lists[i].age = body.age
      list.lists[i].age = body.age
      list.lists[i].age = body.age
    }
  }
  // console.log(list.lists)
  return {
    status: 200,
    message: '修改数据成功',
    list:list.lists,
    total: list.length
  }
})


// 添加
Mock.mock('/api/post/add', 'post', (options)=> {
  const body = JSON.parse(options.body)
  // console.log(body)
  list.lists.push(Mock.mock({
    'id': "@increment()",
    'name': body.name,
    'age': body.age,
    'idCard': body.idCard,
    'city': body.city,
    'zip': body.zip
  }))
  return {
    status: 200,
    message: '添加数据成功',
    list:list.lists,
    total: list.length
  }
})
