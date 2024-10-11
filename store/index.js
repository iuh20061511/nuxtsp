import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const state = () => ({
  products: [],
  productDetail: null,
});

export const actions = {
  async getProducts({ commit }) {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/products', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      commit('SET_PRODUCTS', response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  },
  async getProductDetail({ commit }, productId) {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      commit('SET_PRODUCT_DETAIL', response.data.data);
    } catch (error) {
      console.error('Error fetching product detail:', error);
    }
  },
  async addProduct({ commit }, newProduct) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Lấy CSRF token từ cookie hoặc meta tag
      const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

      const response = await axios.post('http://127.0.0.1:8000/api/products/', newProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken, // Thêm CSRF token vào header
        },
      });

      commit('ADD_PRODUCT', response.data);
    } catch (error) {
      console.error('Error while adding product:', error.response ? error.response.data : error.message);
    }
  }
}
export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products;
  },
  SET_PRODUCT_DETAIL(state, productDetail) {
    state.productDetail = productDetail;
  },
  ADD_PRODUCT(state, newProduct) {
    state.products.unshift(newProduct); // Sửa tên biến từ `todos` sang `products`
  },
};

export const getters = {
  getProducts: (state) => state.products,
  getProductDetail: (state) => state.productDetail,
};
