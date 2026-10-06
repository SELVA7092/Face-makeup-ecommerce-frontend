import { useState } from "react";
import { addProduct } from "../../api/seller";
import "./Addproduct.css";

const initialForm = {
  name: "",
  category: "",
  brand: "",
  price: "",
  stock: "",
  sku: "",
  imageUrls: [""],
  description: "",
};

function Addproduct() {
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setMessage(null);
  };

  const handleImageUrlChange = (index, value) => {
    setFormData((current) => ({
      ...current,
      imageUrls: current.imageUrls.map((imageUrl, imageIndex) =>
        imageIndex === index ? value : imageUrl
      ),
    }));
    setMessage(null);
  };

  const addImageUrl = () => {
    setFormData((current) => ({
      ...current,
      imageUrls: [...current.imageUrls, ""],
    }));
  };

  const removeImageUrl = (index) => {
    setFormData((current) => ({
      ...current,
      imageUrls: current.imageUrls.filter(
        (_, imageIndex) => imageIndex !== index
      ),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const product = {
      ...formData,
      imageUrls: formData.imageUrls
        .map((imageUrl) => imageUrl.trim())
        .filter(Boolean),
      imageUrl: formData.imageUrls.find((imageUrl) => imageUrl.trim())?.trim() || "",
      price: Number(formData.price),
      stock: Number(formData.stock),
    };

    try {
      await addProduct(product);
      setFormData(initialForm);
      setMessage({
        type: "success",
        text: "Product added successfully.",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          error.message ||
          "Unable to add the product. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="add-product-page">
      <div className="add-product-heading">
        <div>
          <p className="add-product-eyebrow">PRODUCT CATALOG</p>
          <h2>Add a new product</h2>
          <p>Fill in the details below to list a product in your store.</p>
        </div>
        <span className="add-product-heading-icon" aria-hidden="true">
          +
        </span>
      </div>

      <form className="add-product-form" onSubmit={handleSubmit}>
        <div className="add-product-form-heading">
          <div>
            <h3>Product information</h3>
            <p>Fields marked with * are required.</p>
          </div>
        </div>

        <div className="add-product-fields">
          <label className="add-product-field">
            <span>Product name <b>*</b></span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Velvet Matte Lipstick"
              maxLength={120}
              required
            />
          </label>

          <label className="add-product-field">
            <span>Category <b>*</b></span>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              <option value="Makeup">Makeup</option>
              <option value="Skincare">Skincare</option>
              <option value="Haircare">Haircare</option>
              <option value="Beauty Tools">Beauty tools</option>
              <option value="Fragrance">Fragrance</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label className="add-product-field">
            <span>Brand</span>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Brand name"
              maxLength={80}
            />
          </label>

          <label className="add-product-field">
            <span>SKU</span>
            <input
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              placeholder="e.g. LIP-001"
              maxLength={64}
            />
          </label>

          <label className="add-product-field">
            <span>Price (₹) <b>*</b></span>
            <div className="add-product-input-prefix">
              <span aria-hidden="true">₹</span>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                min="0.01"
                step="0.01"
                required
              />
            </div>
          </label>

          <label className="add-product-field">
            <span>Available stock <b>*</b></span>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="0"
              min="0"
              step="1"
              required
            />
          </label>

          <div className="add-product-image-fields add-product-field-full">
            <div className="add-product-image-fields-heading">
              <div>
                <span>Product image URLs</span>
                <small>Add one or more publicly accessible image URLs.</small>
              </div>
              <button type="button" onClick={addImageUrl}>
                + Add image
              </button>
            </div>
            {formData.imageUrls.map((imageUrl, index) => (
              <div className="add-product-image-row" key={index}>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(event) =>
                    handleImageUrlChange(index, event.target.value)
                  }
                  placeholder={`https://example.com/product-image-${index + 1}.jpg`}
                  aria-label={`Product image URL ${index + 1}`}
                />
                {formData.imageUrls.length > 1 && (
                  <button
                    type="button"
                    className="add-product-remove-image"
                    onClick={() => removeImageUrl(index)}
                    aria-label={`Remove image URL ${index + 1}`}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            {formData.imageUrls.some((imageUrl) => imageUrl.trim()) && (
              <div className="add-product-image-preview">
                {formData.imageUrls
                  .map((imageUrl) => imageUrl.trim())
                  .filter(Boolean)
                  .map((imageUrl, index) => (
                    <img
                      key={`${imageUrl}-${index}`}
                      src={imageUrl}
                      alt={`Product preview ${index + 1}`}
                    />
                  ))}
              </div>
            )}
          </div>

          <label className="add-product-field add-product-field-full">
            <span>Description <b>*</b></span>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the product, its key features, and how to use it."
              rows="5"
              maxLength={2000}
              required
            />
            <small>{formData.description.length}/2000 characters</small>
          </label>
        </div>

        {message && (
          <p
            className={`add-product-message ${message.type}`}
            role={message.type === "error" ? "alert" : "status"}
          >
            {message.text}
          </p>
        )}

        <div className="add-product-actions">
          <button
            type="button"
            className="add-product-reset"
            onClick={() => {
              setFormData(initialForm);
              setMessage(null);
            }}
            disabled={isSubmitting}
          >
            Clear form
          </button>
          <button
            type="submit"
            className="add-product-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding product..." : "Add product"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default Addproduct;
