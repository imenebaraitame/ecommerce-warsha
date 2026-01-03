import { useEffect, useState } from "react";
import axios, { CanceledError } from "axios";

function Home() {
    const [products, setProducts] = useState([]);
    const [errors, setErrors] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        // axios.get('http://localhost:5000/api/products/', { signal: controller.signal })
        axios.get('https://fakestoreapi.com/products', { signal: controller.signal })
            .then(res => setProducts(res.data)
            )
            .catch(err => {
                if (err instanceof CanceledError) return
                setErrors(err.message)
            })

        return () => controller.abort();
    }, []);

    return (
        <>
            <section className="flex flex-col min-w-0  pt-[80px] overflow-x-hidden">
                <header className=" fixed top-0 w-full h-[80px] border-b border-[hsla(143, 58%, 12%, 0.10)] px-8 flex items-center justify-between bg-[#0f172a]/80 backdrop-blur-md z-40">
                    <div>
                        <h1 className="text-white font-bold text-xl">Ecommerce</h1>
                    </div>
                    <div>
                        <button className="text-white font-bold text-xl">cart</button>
                    </div>
                </header>
            </section>
            <section>
                <h1>List product</h1>
                <div>
                    {errors && <p>{errors} </p>}
                    <ul>
                        {products.map((product) => (
                            <li key={product.id}>
                                {product.title} 
                            </li>
                        ))}
                    </ul>
                </div>

            </section>
        </>

    );
}
export default Home;