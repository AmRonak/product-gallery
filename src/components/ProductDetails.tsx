import { useState } from 'react';

interface ProductDetailsProps {
  product: {
    id: number;
    title: string;
    url: string;
  };
  onClose: () => void;
}

const ProductDetails = ({ product, onClose }: ProductDetailsProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-lg w-full relative p-10 z-50">
        <div className='absolute top-1 right-2'>
            <button
              className="text-blue-700 hover:text-red-500 font-semibold"
              onClick={onClose}
            >
              Close
            </button>
        </div>
        <div className="w-full h-64 rounded-lg mb-4 bg-gray-200 flex items-center justify-center relative overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
          )}
          <img
            src={product.url}
            alt={product.title}
            className={`w-full h-64 object-cover rounded-lg ${imageLoaded ? 'block' : 'hidden'}`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
