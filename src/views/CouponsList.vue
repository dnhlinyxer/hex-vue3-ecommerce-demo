<template>
  <VueLoading :active="isLoading"></VueLoading>
  <div>
    <div class="text-end mt-4">
      <button class="btn btn-primary" @click="openCouponModal">
        新增優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
      <tr>
        <th>名稱</th>
        <th>折扣百分比</th>
        <th>到期日</th>
        <th>是否啟用</th>
        <th>編輯</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(cou, key) in coupons" :key="key">
        <td>{{ cou.title }}</td>
        <td>{{ cou.percent }}%</td>
        <td>{{ $filters.date(cou.due_date) }}</td>
        <td>
          <span v-if="cou.is_enabled" class="text-success">啟用</span>
          <span v-else class="text-muted">未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm">編輯</button>
            <button class="btn btn-outline-danger btn-sm">刪除</button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <CouponModal ref="couponModal" :coupon="tempCoupon" @update-coupon="updateCoupon"></CouponModal>
</template>

<script>
import CouponModal from '@/components/CouponModal.vue';

export default {
  data() {
    return {
      coupons: [],
      tempCoupon: {
        // title: '',
        // is_enabled: 0,
        // percent: 100,
        // due_date: 0,
        // code: ''
      },
      isLoading: false,
      isNew: false
    }
  },
  components: {
    CouponModal
  },
  methods: {
    getCoupons(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`;
      this.isLoading = true;
      this.$http.get(api)
        .then((res) => {
          this.isLoading = false;
          if (res.data.success) {
            console.log(res.data);
            this.coupons = res.data.coupons;
          }
        })
    },
    openCouponModal() {
      this.$refs.couponModal.showModal();
    },
    updateCoupon(item) {
      // console.log(item);
      // console.log(typeof item.due_date);
      // console.log(typeof item.percent);
      this.tempCoupon = item;
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`;
      const coupomComponent = this.$refs.couponModal;
      this.$http.post(api, { data: item }).then((res) => {
        this.isLoading = false;
        console.log(res);
        coupomComponent.hideModal();
        if (res.data.success) {
          this.getCoupons();
        }
      });
    }
  },
  mounted() {
    this.getCoupons();
  }
}
</script>
