<template>
  <div>
    <v-btn @click="dialog = true" color="#4CAF50" class="m-3">
      Thêm sản phẩm mới
    </v-btn>
    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:default>
        <v-card>
          <v-card-title>
            <span class="headline">Thêm sản phẩm mới</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                v-model="product.name"
                label="Tên Sản Phẩm"
                required
                :error-messages="errors.name"
              ></v-text-field>
              <v-textarea
                v-model="product.description"
                label="Mô tả"
                required
                :error-messages="errors.description"
              ></v-textarea>
              <v-text-field
                v-model="product.price"
                label="Giá"
                type="number"
                required
                :error-messages="errors.price"
              ></v-text-field>
              <v-file-input
                v-model="product.image"
                label="Thêm Ảnh"
                accept="image/*"
                prepend-icon="mdi-camera"
                placeholder="Chọn ảnh sản phẩm"
                show-size
                :error-messages="errors.image"
              ></v-file-input>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="cancel"> Hủy </v-btn>
            <v-btn color="green darken-1" text @click="saveProduct">Lưu</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Swal from "sweetalert2";
import axios from "axios";

export default {
  data() {
    return {
      dialog: false,
      valid: false,
      product: {
        name: "",
        description: "",
        price: "",
        image: null,
      },
      errors: {
        name: "",
        description: "",
        price: "",
        image: "",
      },
    };
  },
  computed: {
    ...mapGetters(["getProducts"]),
  },
  methods: {
    cancel() {
      this.dialog = false;
      this.resetForm();
    },
    async saveProduct() {
      this.validateForm();

      if (this.hasErrors()) {
        Swal.fire({
          title: "Thông báo",
          text: "Vui lòng điền đầy đủ thông tin sản phẩm.",
          icon: "warning",
        });
        return;
      }

      try {
        const formData = new FormData();
        formData.append("name", this.product.name);
        formData.append("description", this.product.description);
        formData.append("price", this.product.price);
        formData.append("image", this.product.image);

        const token = localStorage.getItem("token");

        const response = await axios.post("/api/products", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Response:", response.data);

        this.dialog = false;
        this.resetForm();
        Swal.fire({
          title: "Thêm sản phẩm thành công",
          icon: "success",
          timer: 2000,
        });
      } catch (error) {
        console.error("Lỗi khi thêm sản phẩm:", error);
        Swal.fire({
          title: "Có lỗi xảy ra",
          text: error.response
            ? error.response.data.message
            : "Vui lòng thử lại.",
          icon: "error",
        });
      }
    },
    validateForm() {
      this.errors.name = this.product.name ? "" : "Tên sản phẩm là bắt buộc.";
      this.errors.description = this.product.description
        ? ""
        : "Mô tả là bắt buộc.";
      this.errors.price = this.product.price ? "" : "Giá là bắt buộc.";
      this.errors.image = this.product.image ? "" : "Ảnh là bắt buộc.";
    },
    hasErrors() {
      return Object.values(this.errors).some((error) => error);
    },
    resetForm() {
      this.product = {
        name: "",
        description: "",
        price: "",
        image: null,
      };
      this.errors = { name: "", description: "", price: "", image: "" };
      this.valid = false;
      console.log("Form reset to:", this.product);
    },
  },
};
</script>

<style scoped>
</style>
