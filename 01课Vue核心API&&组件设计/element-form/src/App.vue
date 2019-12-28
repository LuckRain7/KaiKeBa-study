<template>
  <div id="app">
    <div>
      <r-input :value="value" @input="value = arguments[0]"></r-input>
    </div>
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
export default {
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
    RInput
  }
};
</script>

<style></style>
