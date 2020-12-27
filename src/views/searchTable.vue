<template>
  <div class="bg">
    <div class="search">
      <label for="">查询:
        <input type="text" v-model="keyword" @keyup="search(keyword)" placeholder="姓名/身份证/地址">
      </label>
    </div>
    <div class="list">
      <table>
        <thead>
          <tr>
            <th>姓名</th>
            <th>年龄</th>
            <th>身份证号</th>
            <th>地址</th>
            <th>邮编</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in search(keyword)" :key="index">
            <td>{{item.name}}</td>
            <td>{{item.age}}</td>
            <td>{{item.idCard}}</td>
            <td>{{item.city}}</td>
            <td>{{item.zip}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      list: [],
      keyword:'',
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList(){
      axios.get('/api/get/search').then( res=> {
        this.list = res.data.list
      })
    },
    search(word) {
      let result =[]
      for(let i=0; i<this.list.length; i++) {
        if(this.list[i].name.toLowerCase().indexOf(word.toLowerCase()) > -1 || 
        this.list[i].city.toLowerCase().indexOf(word.toLowerCase()) > -1 ||
        this.list[i].idCard.toLowerCase().indexOf(word.toLowerCase()) > -1
        ) {
          result.push(this.list[i])
        }
      }
      return result
    }
  }
}
</script>

<style lang="scss">

.search {
  & label {
    font-size: 25px;
    color:cornflowerblue;
    & input {
      width: 200px;
      padding: 5px 10px;
      font-size: 14px;
      border-radius: 4px;
      outline: none;
      border: 1px solid #aaa;
    }
  }
}
.list {
  margin-top: 20px;
  padding: 30px;
  background: #fff;
  border-radius: 15px;
  table {
    width: 100%;
    border: 1px solid #ccc;
    tbody {
      tr:hover {
        background:#f5f7fa;
      }
    }
    tr{
      th {
        padding: 20px;
        background: #dfe6e9;
        font-weight: 400;
      }
      th, td {
        padding: 30px;
        border: 1px solid #ccc;
        text-align: center;
        font-size: 14px;
        line-height: 14px;
      }
    }
  }
}
</style>