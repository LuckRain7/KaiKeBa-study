<template>
  <div>
    <h2>我是购物车</h2>
    <table>
      <tr>
        <td>勾选</td>
        <td>课程介绍</td>
        <td>课程价格</td>
        <td>数量</td>
        <td>价格</td>
      </tr>
      <tr v-for="(item, index) in courseItem" :key="index">
        <td>
          <input type="checkbox" v-model="item.isActive" />
        </td>
        <td>{{ item.name }}</td>
        <td>{{ item.price }}</td>
        <td>
          <button @click="minus(index)">-</button>
          {{ item.number }}
          <button @click="add(index)">+</button>
        </td>
        <td>{{ item.number * item.price }}</td>
      </tr>
      <tr>
        <td></td>
        <td colspan="2">{{ isActiveCourse }}/{{ allCourseList }}</td>
        <td colspan="2">{{ sum }}</td>
        <td colspan="2">{{ allPrice }}</td>
        <!-- <td></td> -->
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  // 遵守单项数据流
  data() {
    return {};
  },
  props: ["courseItem"],
  methods: {
    minus(index) {
      let number = this.courseItem[index].number;
      if (number) {
        this.courseItem[index].number -= 1;
      } else {
        // <=0 删除
        if (window.confirm("确定要删除吗？")) {
          this.$emit("removerItem", index);
        }
      }
    },
    add(index) {
      this.courseItem[index].number += 1;
    }
  },
  computed: {
    isActiveCourse() {
      return this.courseItem.filter(item => item.isActive).length;
    },
    allCourseList() {
      return this.courseItem.length;
    },
    sum() {
      let sum = 0;
      this.courseItem.forEach(x => {
        if (x.isActive) {
          sum += x.number;
        }
      });
      return sum;
    },
    allPrice() {
      let sum = 0;
      this.courseItem.forEach(x => {
        if (x.isActive) {
          sum += x.number * x.price;
        }
      });
      return sum;
    }
  }
};
</script>

<style></style>
