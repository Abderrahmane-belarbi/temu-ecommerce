import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

type ProductItemProp = {
  product: Product;
};
export default function ProductItem({ product }: ProductItemProp) {
  return (
    <div className="bg-white rounded-lg overflow-hidden relative">
      <div className="absolute top-2 right-2 z-10">
        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
          HOT
        </span>
      </div>
      <div className="relative h-40 w-full">
        {product.image && (
          <Image
            src={urlFor(product.image).url()}
            alt={product.title || "product-image"}
            fill
            className="object-contain p-2"
            loading="lazy" // we dont want to block the website because the image is loading
          />
        )}
      </div>

      <div className="p-4">
        <h3 className="text-sm font-medium line-clamp-2 h-10 mb-1">
          {product.title}
        </h3>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-red-500">
              ${(product.price || 0).toFixed(2)}
            </span>
            <span className="text-sm text-gray-400 line-through">
              ${((product.price || 0) * 1.2).toFixed(2)}
            </span>
          </div>
          <div className="text-xs text-red-700 font-semibold mb-2">
            {100 +
              Math.abs(
                product._id
                  .split("")
                  .reduce((acc, char) => acc + char.charCodeAt(0), 0) % 500
              )}
            + sold in last 24h
          </div>
          <Link className="w-full text-center bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 rounded-full text-sm font-bold hover:brightness-110 transition-all cursor-pointer"
            href={`/product/${product._id}`}
          >
            GRAB IT NOW!
          </Link>
          <div className="text-xs text-red-500 text-center mt-1 animate-pulse">Limited time offer!</div>
        </div>
      </div>
    </div>
  );
}
