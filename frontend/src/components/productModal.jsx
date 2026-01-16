import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { API_ENDPOINTS } from "../config/api";
import axios from 'axios';



function ProductModal({ closeProModal, refreshProducts }) {

    const [categories, setCategories] = useState([]);
    const [inputValues, setInputValues] = useState({
        name: "",
        price: "",
        category: "",
        description: "",
        quantity: ""
    }
    );
    
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputValues(values => ({ ...values, [name]: value }));
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


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(API_ENDPOINTS.PRODUCTS, {
                ...inputValues,
                price: Number(inputValues.price),
                quantity: Number(inputValues.quantity),
            }, {
                headers: { "Content-Type": "application/json" },
            })
                // .then((response) => {
                //     console.log(response);
                // });
                refreshProducts();
                closeProModal(false);   
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <div className="bg-opacity-25 fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/50 sm:p-6">
            <div className="relative w-full max-w-125 overflow-hidden rounded-4xl border border-white/10 bg-white p-7 shadow-2xl">
                <div className="flex justify-between">
                    <h2 className="mb-6 text-[1.4rem] font-bold">Add New Product</h2>
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
                            value={inputValues.name}
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
                            value={inputValues.price}
                            onChange={handleChange}
                            step="0.01"
                            min="0"
                            required
                            className="h-12 w-full rounded-[8px] border-2 border-purple-700/20 pr-6 pl-10 text-[17px] font-bold text-black outline-purple-600 transition-all"
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
                            value={inputValues.category}
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
                            value={inputValues.description}
                            onChange={handleChange}
                            className="h-20 w-full rounded-[8px] border-2 border-purple-700/20 pr-6 pl-10 text-[17px] font-bold text-black outline-purple-600 transition-all"
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
                            value={inputValues.quantity}
                            onChange={handleChange}
                            className="h-12 w-full rounded-[8px] border-2 border-purple-700/20 pr-6 pl-10 text-[17px] font-bold text-black outline-purple-600 transition-all"
                        />
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="w-40 rounded-lg bg-purple-500 p-2 text-white font-medium text-[1.1rem] cursor-pointer  hover:bg-purple-700"
                        >
                            Save product
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