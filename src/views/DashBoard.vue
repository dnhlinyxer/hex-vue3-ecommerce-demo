<template>
  <NavBar></NavBar>
  <div class="container-fluid mt-3 position-relative">
    <ToastMessages></ToastMessages>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue';
import emitter from '@/methods/emitter';
import ToastMessages from '@/components/ToastMessages.vue';

export default {
  components: {
    NavBar,
    ToastMessages
  },
  provide() {
    return {
      emitter
    }
  },
  created() {
    // 從 cookie 取出 token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    // console.log(token);
    // token 加到 headers
    this.$http.defaults.headers.common.Authorization = token;
    const api = `${process.env.VUE_APP_API}api/user/check`;
    this.$http.post(api, this.user)
      .then((res) => {
        // console.log(res);
        // 如果登入失敗就轉到login頁面
        if (!res.data.success) {
          this.$router.push('/login');
        }
      })
  }
}
</script>
