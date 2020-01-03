<template>
  <div id="app">
    <div>
      <r-form :model="model" :rules="rules">
        <r-form-item label="用户名" prop="username">
          <r-input v-model="model.username"></r-input>
        </r-form-item>
        <r-form-item label="密码" prop="password">
          <r-input v-model="model.password" type="password"></r-input>
        </r-form-item>
      </r-form>
    </div>
    <div></div>
    <div>
      <h3>Element表单</h3>
      <hr />
      <el-form :model="model" :rules="rules" ref="loginForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="model.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password">
          <el-input
            type="password"
            v-model="model.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">
            提交
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import RInput from "./components/Input";
import RFormItem from "./components/FormItem";
import RForm from "./components/Form";
export default {
  name: "app",
  provide() {
    return {
      someval:'来自app.vue'
    };
  },
  data() {
    return {
      value: "",
      model: { username: "tom", password: "" },
      rules: {
        username: [
          { required: true, message: "请输入用户名" },
          { min: 6, max: 10, message: "请输入6~10的用户名" }
        ],
        password: [{ required: true, message: "请输入密码" }]
      }
    };
  },
  methods: {
    submitForm() {}
  },
  components: {
    RInput,
    RFormItem,
    RForm
  }
};
</script>

<style></style>
