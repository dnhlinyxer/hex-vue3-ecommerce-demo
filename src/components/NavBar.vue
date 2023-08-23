<template>
  <LoaDing :active="isLoading"></LoaDing>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">商品後臺管理</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link to="/dashboard/productslist" class="nav-link">產品</router-link>
          <router-link to="/dashboard/orderslist" class="nav-link">訂單</router-link>
          <router-link to="/dashboard/couponslist" class="nav-link">優惠券</router-link>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="logout">登出</a>
          </li>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    logout() {
      const api = `${process.env.VUE_APP_API}logout`;
      this.isLoading = true;
      this.$http.post(api, this.user)
        .then((res) => {
          this.isLoading = true;
          // console.log(res);
          if (res.data.success) {
            this.$router.push('/login');
          }
        })
    }
  }
}
</script>
