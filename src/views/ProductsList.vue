<template>
  <VueLoading :active="isLoading"></VueLoading>
  <div class="text-end">
    <button class="btn btn-primary" type="button" @click="openProductModal(true)">
      增加一個產品
    </button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="200">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td>{{ item.category }}</td>
        <td>{{ item.title }}</td>
        <td class="text-right">
          {{ $filters.currency(item.origin_price) }}
        </td>
        <td class="text-right">
          {{ $filters.currency(item.price) }}
        </td>
        <td>
          <span class="text-success" v-if="item.is_enabled">啟用</span>
          <span class="text-muted" v-else>未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm" @click="openProductModal(false, item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm" @click="openDelProductModel(item)">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <PagiNation :pages="pagination" @switch-pages="getProducts"></PagiNation>
  <ProductModal ref="productModal" :product="tempProduct" @update-product="updateProduct"></ProductModal>
  <DelModal ref="delModal" :item="tempProduct" @delete-product="delProduct"></DelModal>
</template>

<script>
import ProductModal from '@/components/ProductModal.vue';
import DelModal from '@/components/DelModal.vue';
import PagiNation from '@/components/PagiNation.vue';

export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      // 是否是新增商品
      isNew: false,
      isLoading: false
    }
  },
  components: {
    ProductModal,
    DelModal,
    PagiNation
  },
  inject: ['emitter'],
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      // console.log(api);
      this.isLoading = true;
      this.$http.get(api)
        .then((res) => {
          this.isLoading = false;
          if (res.data.success) {
            console.log(res.data);
            this.products = res.data.products;
            this.pagination = res.data.pagination;
          }
        })
    },
    openProductModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
      } else {
        this.tempProduct = { ...item };
      }
      this.isNew = isNew;
      const productComponent = this.$refs.productModal;
      productComponent.showModal();
    },
    updateProduct(item) {
      this.isLoading = true;
      this.tempProduct = item;
      // 新增
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = 'post';

      // 編輯
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        httpMethod = 'put';
      }

      const productComponent = this.$refs.productModal;
      this.$http[httpMethod](api, { data: this.tempProduct }).then((response) => {
        this.isLoading = false;
        console.log(response);
        productComponent.hideModal();
        // this.getProducts();
        if (response.data.success) {
          this.getProducts();
          this.emitter.emit('push-message', {
            style: 'success',
            title: '更新成功'
          });
        } else {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '更新失敗',
            content: response.data.message.join('、')
          });
        }
      });
    },
    openDelProductModel(item) {
      this.tempProduct = item;
      this.$refs.delModal.showModal();
    },
    delProduct(item) {
      this.isLoading = true;
      // console.log('delete:', item);
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
      this.$http.delete(api).then((res) => {
        this.isLoading = true;
        // console.log(res);
        this.$refs.delModal.hideModal();
        this.getProducts();
      });
    }
  },
  created() {
    this.getProducts();
  }
}
</script>
