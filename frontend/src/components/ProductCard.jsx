import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const ProductCard = ({ product, index = 0, onAddToCart }) => {
  const isOutOfStock = product.quantity === 0;

  return (
    <div
      className="group animate-fadeInUp relative w-full max-w-[300px] overflow-hidden transition-all duration-300"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Product Image */}
      <Link
        to={`/product/${product._id}`}
        aria-label={`View ${product.name}`}
        className="relative block aspect-[5/6] overflow-hidden rounded-[2px] bg-[#EFEAE2] outline-none focus-visible:ring-2 focus-visible:ring-[#1C2331] focus-visible:ring-offset-2"
      >
        {product.image?.url ? (
          <img
            src={product.image.url}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.045]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200 text-xs text-gray-500">
            No Img
          </div>
        )}

        {/* Hover overlay */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Stock badge */}
        {isOutOfStock && (
          <span className="absolute top-3 left-3 bg-[#FAF7F2]/95 px-2.5 py-1 text-[10px] font-medium tracking-[0.14em] text-[#1C2331]">
            OUT OF STOCK
          </span>
        )}
      </Link>

      {/* Product Details */}
      <div className="pt-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-inverse-surface text-[16px] tracking-[0.06em] transition-colors">
            {product.name.toUpperCase()}
          </h3>
        </Link>

        <p className="line-clamp-1 text-[12.5px] text-outline capitalize">
          {product.description}
        </p>

        <div className="flex justify-between">
          <p className="text-inverse-surface mt-1.5 text-[16px]">
            ${product.price.toFixed(2)}
          </p>

          <button
            type="button"
            onClick={() => onAddToCart(product._id)}
            disabled={isOutOfStock}
            aria-label={
              isOutOfStock
                ? `${product.name} is out of stock`
                : `Add ${product.name} to cart`
            }
            className={`rounded-2xl border px-3.5 tracking-[0.18em] transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none ${
              !isOutOfStock
                ? "border-inverse-surface text-inverse-surface hover:bg-inverse-surface hover:text-surface focus-visible:ring-inverse-surface"
                : "cursor-not-allowed border-[#D8D2C6] text-[#B8B2A6]"
            }`}
          >
            <ShoppingCart className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;