<template>
  <div>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: mapState(["products"]),

  created() {
    this.getproducts();
  },
  methods: {
    ...mapActions(["getproducts"]),
  },
};
</script>