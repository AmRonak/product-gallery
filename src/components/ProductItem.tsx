import { memo } from "react";

interface ProductItemProps {
  product: {
    id: number;
    title: string;
    thumbnailUrl: string;
  };
  onClick: () => void;
}

const ProductItem = memo(({ product, onClick }: ProductItemProps) => {
  return (
    <div
      className="product-item bg-white rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-300 cursor-pointer"
      onClick={onClick}
    >
      <img
        src={product.thumbnailUrl}
        alt={product.title}
        loading="lazy"
        className="rounded-t-lg w-full h-48 object-cover"
      />
      <div className="p-4">
        <p className="text-center text-lg font-semibold text-gray-800">
          {product.title}
        </p>
      </div>
    </div>
  );
});

export default ProductItem;
