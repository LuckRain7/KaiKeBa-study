<template>
  <div id="app">
    <h1>{{title}}</h1>
    <hr/>
    <div>
      <h2>添加课程</h2>
      <div>
        <label for="">课程名称：</label>
        <input type="text" v-model="courseInfo.name">
      </div>
      <div>
        <label for="">课程价格：</label>
        <input type="text" v-model="courseInfo.price">
      </div>
      <div>
        <button @click="addCourseToList">添加课程到列表</button>
      </div>
    </div>
    <div>
      <h2>课程列表</h2>
      <table>
        <tr>
          <th>课程名称</th>
          <th>课程价格</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item,index) in courseList" :key="item.id">
          <td>{{item.name}}</td>
          <td>{{item.price}}</td>
          <td><button @click="addCourseToCart(index)">添加到购物车</button></td>
        </tr>

      </table>

    </div>
    <cart :courseItem="courseItem" @removeItem="remove"></cart>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Cart from './components/Cart.vue';
export default {
  name: 'app',
  components: {
    // HelloWorld
    Cart
  },
  methods:{
      addCourseToCart(index){
        let item = this.courseList[index];
        let isHasCourse = this.courseItem.find(x=>x.id == item.id)
        if(isHasCourse){
          isHasCourse.number += 1;
        }else{
          this.courseItem.push({
            ...item,
            number: 1,
            isActive:true
          });
        }
        
      },
      remove(index){
        this.courseItem.splice(index,1)
      },
      addCourseToList(){
        this.courseList.push(this.courseInfo)
      }
  },
  data() {
    return {
      title: '开课吧-购物车',
      courseInfo:{
        name:'',
        price: ''
      },
      courseItem:[],
      courseList:[
        {
          id:0,
          name:'web全栈开发架构师',
          price: 9998
        },{
          id:1,
          name:'Python人工智能',
          price: 8888
        }
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
