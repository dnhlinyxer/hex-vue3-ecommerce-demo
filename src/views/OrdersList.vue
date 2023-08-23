<template>
  <table class="table mt-4">
    <thead>
    <tr>
      <th>購買時間</th>
      <th>Email</th>
      <th>購買款項</th>
      <th>應付金額</th>
      <th>是否付款</th>
      <th>編輯</th>
    </tr>
    </thead>
    <tbody>
      <template>
        <tr>
          <td>時間</td>
          <td><span></span></td>
          <td>
            <ul class="list-unstyled">
              <li>
                數量：
              </li>
            </ul>
          </td>
          <td class="text-right"></td>
          <td>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox">
              <label class="form-check-label">
                <span>已付款</span>
              </label>
            </div>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm">檢視</button>
              <button class="btn btn-outline-danger btn-sm">刪除</button>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script>
export default {
  methods: {
    getOrders(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`;
      this.$http.get(api)
        .then((res) => {
          console.log(res);
        })
    }
  },
  created() {
    this.getOrders();
  }
}
</script>
