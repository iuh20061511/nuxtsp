<template>
  <v-container>
    <v-row class="align-center mb-2">
      <v-col cols="12">
        <add-product
          style="position: absolute; right: 7%; top: 10px"
        ></add-product>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="products"
          item-key="id"
          class="elevation-1 table"
        >
          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="(product, index) in items" :key="product.id">
                <td>{{ index + 1 }}</td>
                <td>
                  <img
                    :src="getFullImageUrl(product.image)"
                    alt="Image"
                    class="p-2"
                    style="width: 60px; height: auto"
                  />
                </td>
                <td>{{ product.name }}</td>
                <td>{{ product.price | currency }}</td>
                <td>
                  <div class="d-flex">
                    <edit-product
                      class="m-1"
                      :product-id="product.id"
                    ></edit-product>
                    <v-btn
                      class="m-1"
                      @click="deleteproduct(product.id)"
                      color="red"
                      small
                      >Delete</v-btn
                    >
                    <detail-product-vue
                      class="m-1"
                      :product-id="product.id"
                    ></detail-product-vue>
                  </div>
                </td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AddProduct from "../../components/Products/AddProduct.vue";
import DetailProductVue from "../../components/Products/DetailProduct.vue";
import EditProduct from "../../components/Products/EditProduct.vue";

export default {
  components: {
    AddProduct,
    EditProduct,
    DetailProductVue,
  },
  computed: {
    ...mapState(["products"]),
  },
  created() {
    this.getProducts();
  },
  methods: {
    ...mapActions(["getProducts"]),

    getFullImageUrl(imagePath) {
      return `http://127.0.0.1:8000/storage/${imagePath}`;
    },
    viewProductDetail(productId) {
      this.$store.dispatch("getProductDetail", productId);
    },
    deleteProduct(productId) {
      this.$store.dispatch("deleteProduct", productId);
    },
  },
  filters: {
    currency(value) {
      if (!value) return "";
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },
  },
};
</script>
