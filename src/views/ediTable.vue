<template>
  <div>
    <div class="editlist">
      <div class="add">
        <input type="text" onkeyup="value=value.replace(/[\d]/g,'') " v-model="Aname" placeholder="姓名">
        <input type="text" onkeyup="this.value=this.value.replace(/\D/g,'')"  v-model="Aage" placeholder="年龄">
        <input type="text" onkeyup="value=value.replace(/[^\w\.\/]/ig,'')" maxlength="18" v-model="AidCard" placeholder="身份证号">
        <input type="text" onkeyup="value=value.replace(/[\d]/g,'')"  v-model="Acity" placeholder="城市">
        <input type="text" onkeyup="this.value=this.value.replace(/\D/g,'')" maxlength="6" v-model="Azip" placeholder="邮编">
        <button @click="add">添加</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>姓名</th>
            <th>年龄</th>
            <th>身份证号</th>
            <th>地址</th>
            <th>zip</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in list" :key="index">
            <td>{{item.name}}</td>
            <td>{{item.age}}</td>
            <td>{{item.idCard}}</td>
            <td>{{item.city}}</td>
            <td>{{item.zip}}</td>
            <td class="editbtn">
              <a href="javascript:;" @click.prevent="edit(index)">编辑</a>
              <a href="javascript:;" @click.prevent="del(item.id)">删除</a>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="page">
        <button @click="prevpage">上一页</button>
        <button @click="nextpage">下一页</button>
      </div>
    </div>
    <div class="editbar" v-show="iseditBar">
      <label for="">姓名<input v-model="name" type="text"></label>
      <label for="">年龄<input v-model="age" type="text"></label>
      <label for="">身份证号<input v-model="idCard" type="text"></label>
      <label for="">地址<input v-model="city" type="text"></label>
      <label for="">邮编<input v-model="zip" type="text"></label>
      <div>
        <button @click.prevent="keep">保存</button>
        <button @click.prevent="cancel">取消</button>
      </div>
    </div>
    <div class="detele" v-show="isDel">
      <h3>是否删除此条记录！</h3>
      <div>
        <button  @click="yesDel">是</button>
        <button  @click="noDel">否</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      list: [],
      iseditBar: false,
      name: '',
      age: '',
      idCard: '',
      city: '', 
      zip: '',
      index: '',
      isDel: false,
      delId:'',
      pageindex: 1,
      pagesize: 10, 
      totalPage: Number,
      Aname: '',
      Aage: '',
      AidCard: '',
      Acity: '',
      Azip: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      axios.get('/api/get/list', {
        params: {
          pageindex: this.pageindex,
          pagesize: 10
        }
      }).then(res => {
        this.list = res.data.list
        this.totalPage = res.data.total
      })
    },
    add() {
      if(this.Aname ==="" || this.Aage ==="" || this.AidCard ==="" || this.Acity==="" || this.Azip ===""){
        alert('请输入完整内容！')
      }else {
        axios.post('/api/post/add', {
          name: this.Aname,
          age: this.Aage,
          idCard: this.AidCard,
          city: this.Acity,
          zip: this.Azip
        }).then(res => {

        })
        this.Aname = ""
        this.Aage = ""
        this.AidCard = ""
        this.Acity = ""
        this.Azip = ""
      }
      
    },
    del(id) {
      this.isDel = !this.isDel
      this.delId = id
    },
    yesDel() {
      this.isDel = !this.isDel
      for(let i =0; i < this.list.length; i++) {
        if(this.list[i].id === this.delId) {
          this.list.splice(i, 1)
        }
      }
      axios.post('/api/post/del', {
        id:this.delId
      }).then(res =>{
        console.log(res)
      })
    },
    noDel() {
      this.isDel = !this.isDel
    },
    edit(id) {
      this.index = id
      this.iseditBar = !this.iseditBar
      this.name = this.list[id].name
      this.age = this.list[id].age
      this.idCard = this.list[id].idCard
      this.city = this.list[id].city
      this.zip = this.list[id].zip
    },
    keep() {
      this.list[this.index].name = this.name
      this.list[this.index].age = this.age
      this.list[this.index].idCard = this.idCard
      this.list[this.index].city = this.city
      this.list[this.index].zip = this.zip
      const data = {
        id: this.index,
        name: this.name,
        age: this.age,
        idCard: this.idCard,
        city: this.city,
        zip: this.zip
      }
      this.iseditBar = !this.iseditBar
      // 向后端发送修改内容
      axios.post('/api/post/edit', {
        data
      }).then(res => {

      })
    },
    cancel() {
      this.iseditBar = !this.iseditBar
    },
    prevpage() {
      if (this.pageindex === 1 ) {
        alert('当前位置为第一页')
      }else {
        this.pageindex--
        this.getList()
      } 
    },
    nextpage() {
      if (this.pageindex === Math.ceil(this.totalPage / this.pagesize) ) {
        alert('已经在最后一页了')
      }else {
        this.pageindex++
        this.getList()
      }  
    }
  }
}
</script>

<style lang="scss">
.editlist {
  position: relative;
  padding: 30px;
  .add {
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
    input {
      padding: 5px 10px;
      border-radius: 4px;
      outline: none;
      border: 1px solid #aaa;
    }
    button{
      padding: 5px 25px;
      background: #0984e3;
      border: 1px solid #0984e3;
      border-radius: 5px;
      color: #fff;
      &:hover {
        background: #3e9eff;
      }
    }
  }
  table {
    width: 100%;
    border: 1px solid #ccc;
    background: #fff;
    tbody {
      tr:hover {
        background:#f5f7fa;
      }
      & .editbtn {
        a {
          color: #0652DD;
          &:last-child {
            margin-left: 10px;
            color: red;
          }
        }
        
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
  .page {
    margin-top: 30px;
    button {
      margin-left: 10px;
      padding: 12px 22px;
      border: 0;
      border-radius: 5px;
      color: #fff;
      background:#0984e3;
      &:hover {
        background: #3e9eff;
      }
    }
  }
}
.editbar {
  padding: 30px;
  width: 400px;
  height: 300px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border: 1px solid #333;
  border-radius: 10px;
  label {
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    input {
      padding: 5px 10px;
      border-radius: 4px;
      outline: none;
      border: 1px solid #aaa;
    }
  }
  div {
    display: flex;
    justify-content: space-around;
    button {
      padding: 8px 12px;
      background: #0984e3;
      border: 0;
      border-radius: 8px;
      color: #fff;
    }
  }
}
.detele {
  padding: 20px 30px;
  position: fixed;
  top: 30%;
  left: 50%;
  // transform: translate(-50%, -50%);
  color: #EA2027;
  background: #fff;
  border: 1px solid #333;
  border-radius: 10px;
  h3 {
    font-weight: 400;
  }
  div {
    margin-top: 30px;
    display: flex;
    justify-content: space-around;
    button {
      padding: 4px 20px;
      border: 0;
      border-radius: 8px;
      color: #fff;
      background: #1289A7;
      &:hover {
        background: #EA2027;
      }
    }
  }
}
</style>