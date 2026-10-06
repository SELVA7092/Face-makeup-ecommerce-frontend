import api from "./api";

// Add product
export const addProduct = async (productData) => {
  try {
    console.log("========== SENDING PRODUCT ==========");
    console.log(productData);

    const response = await api.post(
      "/seller/add-product",
      productData
    );

    console.log("========== BACKEND RESPONSE ==========");
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    console.error("Status:", error.response?.status);
    console.error("Response:", error.response?.data);
    throw error;
  }
};