<template>
  <div>
    <section class="author">
      <h2>欢迎来到 Wang-Xiansheng 练习系统</h2>
      <span>这是根据 Vue-ElementUI-VueRouter 搭建的后台管理系统，根据自己学的知识，有表格操作、表单操作、登录、Mockjs、视频、ElementUI各个组件搭建的后台系统。</span>
    </section>
    <section class="chart">
      <div class="chart-day">
        <div id="myChart" :style="{width: '300px', height: '250px'}"></div>
        <span>日常访问数量：
          <animate-number class="chart-number" from="1" :to="daynum" duration="2000" easing="easeOutQuad">
          </animate-number>
        </span>
      </div>
      <div class="chart-Source">
        <div id="chartSource" :style="{width: '300px', height: '250px'}"></div>
        <span>访问来源量：
          <animate-number class="chart-number" from="1" :to="source" duration="2000" easing="easeOutQuad">
          </animate-number>
        </span>
      </div>
      <div class="chart-wordcloud">
        <wordcloud class="wordcloud"
          :data="wrodcloud"
          nameKey="name"
          valueKey="value"
          spiral="rectangular"
          color="Category10"
          :showTooltip="false"
          :wordClick="wordClickHandler"
        ></wordcloud>
      </div>
    </section>
    <section class="toolbar">
      <ul class="toolbar-ul">
        <li>
          <a href="javascript:;">
            Mdn
          </a>
        </li>
        <li>
          <a href="javascript:;">
            Vue
          </a>
        </li>
        <li>
          <a href="javascript:;">ElementUI</a>
        </li>
        <li>
          <a href="javascript:;">Mock</a>
        </li>
        <li>
          <a href="javascript:;">Echarts</a>
        </li>
        <li>
          <a href="javascript:;">Bootstrap</a>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
import wordcloud from 'vue-wordcloud'
export default {
  components: {
    wordcloud
  },
  data() {
    return{
      wrodcloud: [
        { "name": 'Vue',"value": 20 },
        { "name": 'Javascript',"value": 20 },
        { "name": 'HTML5',"value": 23 },
        { "name": 'Npm',"value": 25 },
        { "name": 'CSS3',"value": 24 },
        { "name": 'Vue-Router',"value": 19 },
        { "name": 'Vuex',"value": 30 },
        { "name": 'SQL',"value": 29 },
        { "name": 'Git',"value": 26 },
        { "name": 'ES6',"value": 22 },
      ],
      daynum: Number,
      source: Number
    }
  },
  created() {
    this.daynum = this.randNnum()
    this.source = this.randNum()
  },
  mounted() {
    this.drawLine()
  },
  methods: {
    randNnum() {
      return parseInt(Math.random() *100000)
    },
    randNum() {
      return parseInt(Math.random() *45215)
    },
    wordClickHandler(name, value, vm) {
      console.log('wordClickHandler', name, value);
    },
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let echarts = require('echarts')
        let myChart = echarts.init(document.getElementById('myChart'))
        let chartSource = echarts.init(document.querySelector('#chartSource'))
        // 绘制图表
        myChart.setOption({
          title: {
            text: '访问量',
            left: 'left',
            textStyle: {
              color: '#3c4a54'
            },
          },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
              name: '访问量',
              radius: '55%',
              center: ['50%', '50%'],
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line',
            }]
        })
        chartSource.setOption({
            title: {
                text: '站点用户访问来源',
                left: 'left'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    {value: 335, name: '直接访问'},
                    {value: 310, name: '邮件营销'},
                    {value: 234, name: '联盟广告'},
                    {value: 135, name: '视频广告'},
                    {value: 1548, name: '搜索引擎'}
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
            ]
        })
    }
  }
}
</script>

<style lang="scss">
.author{
  padding: 30px;
  width: 100%;
  height: 150px;
  color: #3c4a54;
  background-color: #fff;
  box-shadow: 4px 4px 8px 4px #e0e0e0;
  & > h2 {
    text-align: center;
    font-size: 30px;
  }
}
.chart {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  &-day {
    padding: 30px;
    width: 350px;
    height: 350px;
    background-color: #fff;
    border: 1px solid #e0e0e0;
    &:hover {
      border: none;
      box-shadow: 4px 4px 8px 4px #e0e0e0;
    }
  }
  &-Source {
    padding: 30px;
    width: 350px;
    height: 350px;
    background-color: #fff;
    border: 1px solid #e0e0e0;
    &:hover {
      border: none;
      box-shadow: 4px 4px 8px 4px #e0e0e0;
    }
  }
  &-wordcloud {
    position: relative;
    padding: 30px;
    width: 400px;
    height: 350px;
    background-color: #fff;
    border: 1px solid #e0e0e0;
    &:hover {
      border: none;
      box-shadow: 4px 4px 8px 4px #e0e0e0;
    }
  }
}
.chart-number {
color: red;
}
.wordcloud {
  height: 100% !important;
}
.toolbar {
  margin-top: 30px;
  &-ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    & > li {
      width: 120px;
      line-height: 120px;
      text-align: center;
      background-color: #fff;
      border: 1px solid #e0e0e0;
      font-size: 22px;
      color: #fff;
    }
    & > li:nth-child(1) {
      background-image: linear-gradient(#a9fda0, #68fdf9);
    }
    & > li:nth-child(2) {
      background-image: linear-gradient( #63a7f5, #68fdf9);
    }
    & > li:nth-child(3) {
      background-image: linear-gradient( #63a7f5, #ff9ef7);
    }
    & > li:nth-child(4) {
      background-image: linear-gradient( #63a7f5, #f78aaa);
    }
    & > li:nth-child(5) {
      background-image: linear-gradient( #68fdf9, #00FA9A);
    }
    & > li:nth-child(6) {
      background-image: linear-gradient( #FF3E96, #fd96f0);
    }
  }
}
</style>