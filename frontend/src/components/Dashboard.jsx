//import { useNavigate } from 'react-router-dom';
import { Package, User, Tags, Plus, Pen, Trash2, X } from "lucide-react";
import { useState } from "react";
import ProductModal from "./productModal";


const Dashboard = () => {
  //   const navigate = useNavigate();
   const [openProModal, setOpenProModal] = useState(false);

  return (
    <div className="min-h-screen pt-30 pb-12">
      <div className="container mx-auto px-4">
        {/* Admin Container  */}
        <section>
          <div>
            {/* Admin Header  */}
            <div className="mb-8 rounded-2xl bg-gray-50 p-6 shadow-lg shadow-gray-200">
              <h2 className="mb-1 text-[1.6rem] font-bold text-gray-700">
                Admin Dashboard
              </h2>
              <p className="text-gray-650 mb-4">
                Manage products, categories, and users
              </p>
              <div className="flex gap-6">
                <button className="flex cursor-pointer rounded-lg bg-gray-200 p-3 text-[1rem] font-medium text-black sm:px-10">
                  <Package /> Manage Products
                </button>
                <button className="flex cursor-pointer rounded-lg bg-gray-200 p-3 text-[1rem] font-medium text-black sm:px-10">
                  <Tags /> Manage Categories
                </button>
                <button className="flex cursor-pointer rounded-lg bg-gray-200 p-3 text-[1rem] font-medium text-black sm:px-10">
                  <User /> View Users
                </button>
              </div>
            </div>

            {/* Products Management Section  */}
            <div className="mb-8 rounded-2xl bg-gray-50 p-6 shadow-lg shadow-gray-200">
              <div className="flex justify-between">
                <h3 className="mb-1 text-[1.2rem] font-bold text-gray-800">
                  Products Management
                </h3>
                <button className="flex cursor-pointer rounded-lg bg-green-600 p-2 text-[1rem] font-medium text-white hover:bg-green-700 sm:px-6">
                  <Plus />
                  Add New Product
                </button>
              </div>

              <div>
                <div class="loading">Loading products...</div>
              </div>
              <div className="flex flex-col overflow-hidden rounded-2xl border border-white/5">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-b-purple-300 bg-gray-200">
                      <th className="px-6 py-4 text-[13px] font-bold tracking-widest text-purple-800 uppercase">
                        Name
                      </th>
                      <th className="px-6 py-4 text-[13px] font-bold tracking-widest text-purple-800 uppercase">
                        Description
                      </th>
                      <th className="px-6 py-4 text-[13px] font-bold tracking-widest text-purple-800 uppercase">
                        Category
                      </th>
                      <th className="px-6 py-4 text-[13px] font-bold tracking-widest text-purple-800 uppercase">
                        Price
                      </th>
                      <th className="px-6 py-4 text-[13px] font-bold tracking-widest text-purple-800 uppercase">
                        Stock
                      </th>
                      <th className="px-6 py-4 text-center text-[13px] font-bold tracking-widest text-purple-800 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-b-purple-300 hover:bg-gray-100">
                      <td className="px-6 py-4">Table</td>
                      <td className="px-6 py-4"> table of ckitchen</td>
                      <td className="px-6 py-4">furniture</td>
                      <td className="px-6 py-4">$454</td>
                      <td className="px-6 py-4">120</td>
                      <td className="flex items-center justify-center gap-2 px-6 py-4">
                        <button
                          className="rounded-lg p-2 text-purple-800 transition-all hover:bg-emerald-500/10 hover:text-emerald-400"
                          title="Edit"
                          onClick={() => {setOpenProModal(true)}}
                        >
                          <Pen size={16} />
                        </button>
                        {openProModal && <ProductModal closeProModal={setOpenProModal} />}
                        <button
                          className="rounded-lg p-2 text-purple-800 transition-all hover:bg-red-500/10 hover:text-red-400"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Categories Management Section */}
            <div>
              <div>
                <h3>Categories Management</h3>
                <button>
                  <Plus /> Add New Category
                </button>
              </div>

              <div>
                <div class="loading">Loading categories...</div>
              </div>
            </div>

            {/* Users Section */}
            <div>
              <h3>Users List</h3>
              <div>
                <div class="loading">Loading users...</div>
              </div>
            </div>
          </div>
        </section>

       

        {/* Add/Edit Category Modal */}
        <div>
          <div>
            <span>&times;</span>
            <h2>Add New Category</h2>
            <form>
              <div class="form-group">
                <label htmlFor="categoryName">Category Name *</label>
                <input type="text" required />
              </div>
              <input type="hidden" id="categoryId" />
              <button type="submit">Save Category</button>
              <button type="button">Cancel</button>
            </form>
          </div>
        </div>
        {/* Header */}
        {/* <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-6xl font-bold mb-4 bg-clip-text text-black">
            Browse Categories
          </h1>
        </div> */}

        {/* Back Button */}
        {/* <div className="text-center mt-12">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center space-x-2 bg-slate-800/50 backdrop-blur-lg text-black px-6 py-3 rounded-lg hover:bg-slate-700/50 transition-all duration-300 border border-purple-500/30"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Shop</span>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
