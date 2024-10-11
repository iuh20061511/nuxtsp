<template>
  <v-container class="py-5">
    <v-row class="mt-5" justify="center" align="center">
      <v-col
        v-for="(product, index) in products"
        :key="index"
        cols="12"
        md="6"
        lg="3"
        xl="3"
        class="mb-5"
      >
        <v-card class="h-100">
          <v-img
            :src="getFullImageUrl(product.image)"
            alt="Product Image"
            height="200"
          ></v-img>
          <v-card-title class="text-center">{{ product.name }}</v-card-title>
          <v-card-subtitle class="text-center">
            {{ product.price }}
          </v-card-subtitle>
          <v-card-actions class="justify-center">
            <v-btn
              outlined
              color="primary"
              @click="viewProductOptions(product)"
            >
              View options
            </v-btn>
            <v-btn
              v-if="product.isSale"
              outlined
              color="primary"
              @click="addToCart(product)"
            >
              Add to cart
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["products"]),
  },

  created() {
    this.getproducts();
  },

  methods: {
    ...mapActions(["getproducts"]),

    getFullImageUrl(imagePath) {
      return `http://127.0.0.1:8000/storage/${imagePath}`;
    },
  },
};
</script>

<style scoped>
.text-decoration-line-through {
  text-decoration: line-through;
}
</style>