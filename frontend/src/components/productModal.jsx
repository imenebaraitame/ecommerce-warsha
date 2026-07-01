import { useState, useEffect } from "react";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { API_ENDPOINTS } from "../config/api";
import axios from 'axios';



function ProductModal({ product, closeProModal, refreshProducts }) {

    const [categories, setCategories] = useState([]);
    const [imagePreview, setImagePreview] = useState(product?.image?.url || null);
    const [formData, setFormData] = useState({
        name: product?.name || "",
        price: product?.price || "",
        category: product?.category || "",
        description: product?.description || "",
        quantity: product?.quantity || "",
        image: null
    }
    );
    const [imageRemoved, setImageRemoved] = useState(false)
    const isEditMode = Boolean(product);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(values => ({ ...values, [name]: value }));
    }

    const fetchCategories = async () => {
        try {
            const response = await axios.get(API_ENDPOINTS.CATEGORIES);
            setCategories(response.data);
        } catch (err) {
            console.error("Error fetching categories:", err);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
       //Todo: validate file type
       //Todo: validate file size
       setFormData(values => ({ ...values, image: file })); 
       if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
       }
    }

    const removeImage = () => {
        setFormData(values => ({ ...values, image: null }));
        setImagePreview(null);
        setImageRemoved(true);
        // Reset the file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
             // Create FormData object for file upload
            const submitData = new FormData();
            submitData.append('name', formData.name);
            submitData.append('price', Number(formData.price));
            submitData.append('category', formData.category);
            submitData.append('description', formData.description);
            submitData.append('quantity', Number(formData.quantity));

            if (formData.image) {
                submitData.append('image', formData.image);
            } else if (isEditMode && imageRemoved) {
                submitData.append('removeImage', 'true');
            }
            
            if (isEditMode) {
                await axios.put(API_ENDPOINTS.PRODUCT_BY_ID(product._id), submitData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                );
            } else {
                await axios.post(API_ENDPOINTS.PRODUCTS, submitData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }
                refreshProducts();
                closeProModal(false);   
        } catch (e) {
            console.error("Error submitting product:", e);
        }
    }


    return (
        <div className="bg-opacity-25 fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/50 sm:p-6">
            <div className="relative w-full max-w-125 overflow-hidden rounded-4xl border border-white/10 bg-white p-7 shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between">
                    <h2 className="mb-6 text-[1.4rem] font-bold">
                        {isEditMode ? "Edit Product" : "Add New Product"}
                    </h2>
                    <button
                        className="text-black hover:text-purple-700"
                        onClick={() => closeProModal(false)}
                    >
                        <X />
                    </button>
                </div>
                <form action="POST" onSubmit={handleSubmit} onKeyDown={(e) => e.key === "Enter"} className="space-y-6">
                    <div className="flex flex-col">
                        <label
                            htmlFor="productTitle"
                            className="text-[1.1rem] font-medium"
                        >
                            Name *
                        </label>
                        <input
                            type="text"
                            required
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="h-12 w-full rounded-lg border-2 border-purple-700/20 pr-6 pl-10 text-[17px] font-bold text-black outline-purple-600 transition-all"
                        />
                    </div>
                    <div class="form-group">
                        <label
                            htmlFor="productPrice"
                            className="text-[1.1rem] font-medium"
                        >
                            Price *
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            step="0.01"
                            min="0"
                            required
                            className="h-12 w-full rounded-lg border-2 border-purple-700/20 pr-6 pl-10 text-[17px] font-bold text-black outline-purple-600 transition-all"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="productCategory"
                            className="text-[1.1rem] font-medium"
                        >
                            Category *
                        </label>
                        <select
                            required
                            id="category-select"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option value=""> Select a category</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat.name}>{cat.name}</option>
                            ))}

                        </select>
                    </div>
                    <div className="form-group">
                        <label
                            htmlFor="productDescription"
                            className="text-[1.1rem] font-medium"
                        >
                            Description *
                        </label>
                        <textarea
                            type="text"
                            required
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="h-20 w-full rounded-lg border-2 border-purple-700/20 pr-6 pl-10 text-[17px] font-bold text-black outline-purple-600 transition-all"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="productQuantity"
                            className="text-[1.1rem] font-medium"
                        >
                            Quantity *
                        </label>
                        <input
                            type="number"
                            min="0"
                            required
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            className="h-12 w-full rounded-lg border-2 border-purple-700/20 pr-6 pl-10 text-[17px] font-bold text-black outline-purple-600 transition-all"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="productImage"
                            className="text-[1.1rem] font-medium mb-2 block"
                        >
                            Product Image
                        </label>
                        
                        {!imagePreview ? (
                            /*  No image — show upload area*/
                            <div className="border-2 border-dashed border-purple-700/20 rounded-lg p-6 text-center hover:border-purple-700/40 transition-colors">
                                <label htmlFor="imageInput" className="cursor-pointer">
                                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                                    <p className="text-sm text-gray-600 mb-1">
                                        Click to upload or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        PNG, JPG, WEBP up to 5MB
                                    </p>
                                </label>
                                <input
                                    id="imageInput"
                                    type="file"
                                    accept="image/*"
                                    name="image"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </div>
                        ) : (
                            // Has image (existing or newly picked) — show preview
                            <div className="relative border-2 border-purple-700/20 rounded-lg p-4">
                                <img 
                                    src={imagePreview} 
                                    alt="Preview" 
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                                <p className="text-sm text-gray-600 mt-2 text-center">
                                    {formData.image?.name || (isEditMode && "Current image")}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="w-40 rounded-lg bg-purple-500 p-2 text-white font-medium text-[1.1rem] cursor-pointer  hover:bg-purple-700"
                        >
                            {isEditMode ? "Update product" : "Save product"}
                        </button>
                        <button
                            type="button"
                            className=" w-40 text-purple rounded-lg border-2 border-purple-700 text-[1.1rem] font-medium hover:bg-gray-200"
                            onClick={() => closeProModal(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductModal  