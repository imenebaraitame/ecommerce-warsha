
import { X } from "lucide-react";

function productModal({ closeProModal }) {
    
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
                <form className="space-y-6">
                    <div className="flex flex-col">
                        <label
                            htmlFor="bookTitle"
                            className="text-[1.1rem] font-medium"
                        >
                            Title *
                        </label>
                        <input
                            type="text"
                            required
                            className="h-12 w-full rounded-lg border-2 border-purple-700/20 pr-6 pl-10 text-[17px] font-bold text-black outline-purple-600 transition-all"
                        />
                    </div>
                    <div class="form-group">
                        <label
                            htmlFor="bookAuthor"
                            className="text-[1.1rem] font-medium"
                        >
                            Author *
                        </label>
                        <input
                            type="text"
                            required
                            className="h-12 w-full rounded-[8px] border-2 border-purple-700/20 pr-6 pl-10 text-[17px] font-bold text-black outline-purple-600 transition-all"
                        />
                    </div>
                    <div class="form-group">
                        <label
                            htmlFor="bookPrice"
                            className="text-[1.1rem] font-medium"
                        >
                            Price *
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            required
                            className="h-12 w-full rounded-[8px] border-2 border-purple-700/20 pr-6 pl-10 text-[17px] font-bold text-black outline-purple-600 transition-all"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="bookCategory"
                            className="text-[1.1rem] font-medium"
                        >
                            Category *
                        </label>
                        <select required>
                            <option value="">Select Category</option>
                        </select>
                    </div>
                    <div>
                        <label
                            htmlFor="bookQuantity"
                            className="text-[1.1rem] font-medium"
                        >
                            Quantity *
                        </label>
                        <input
                            type="number"
                            min="0"
                            required
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

export default productModal  