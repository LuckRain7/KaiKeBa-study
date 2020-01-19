<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <hr />
    <div>
      <h2>添加课程</h2>
      <div>
        <label for="">课程名称：</label>
        <input type="text" v-model="courseInfo.name" />
      </div>
      <div>
        <label for="">课程价格：</label>
        <input type="text" v-model="courseInfo.price" />
      </div>
      <div>
        <button @click="addCourseToList">添加课程到列表</button>
      </div>
    </div>
    <hr />
    <div>
      <h2>课程列表</h2>
      <table>
        <tr>
          <th>课程名称</th>
          <th>课程价格</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item, index) in courseList" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.price }}</td>
          <td><button @click="addCourseToCart(index)">添加到购物车</button></td>
        </tr>
      </table>
    </div>
    <hr />
    <cart :courseItem="courseItem" @removerItem="remove"></cart>
  </div>
</template>

<script>
import Cart from "./components/Cart";
export default {
  data() {
    return {
      title: "购物车",
      courseList: [
        {
          id: "1111",
          name: "web全栈开发架构师",
          price: 9969
        },
        {
          id: "1112",
          name: "python人工智能开发",
          price: 4765
        }
      ],
      courseInfo: {
        name: "",
        price: ""
      },
      courseItem: []
    };
  },
  methods: {
    addCourseToList() {
      this.courseList.push(this.courseInfo);
    },
    // 添加到购物车
    addCourseToCart(index) {
      let item = this.courseList[index];
      let isHasCourse = this.courseItem.find(x => x.id == item.id);
      if (isHasCourse) {
        isHasCourse.number += 1;
      } else {
        this.courseItem.push({
          ...item,
          number: 1,
          isActive: true
        });
      }
    },
    // 删除
    remove(index) {
      this.courseItem.splice(index, 1);
    }
  },
  components: {
    Cart
  }
};
</script>

<style></style>
