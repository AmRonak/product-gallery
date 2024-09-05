import React, { Suspense, useState } from 'react';
import ProductGallery from './components/ProductGallery';
import ProductDetails from './components/ProductDetails';
import Spinner from './components/Spinner';
import SearchBar from './components/SearchBar';

type productType = {
  albumId : number
  id : number
  thumbnailUrl : string
  title : string
  url : string
}

const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState(null as productType | null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortAlbum, setSortAlbum] = useState(false);

  const handleProductClick = (product: productType) => {
    setSelectedProduct(product);
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null);
  };

  const handleSortClick = () => {
    setSortAlbum(true);
  }
  
  const handleResetSortClick = () => {
    setSortAlbum(false);
  }

  return (
    <div className="App min-h-screen bg-gray-100 p-8 relative">
      <h1 className="text-center text-4xl font-extrabold text-blue-700 mb-10">
        Product Gallery
      </h1>
      <div className='flex justify-center items-center gap-4 p-10 my-10 flex-wrap'>
        <div>
        <SearchBar onSearch={setSearchTerm} />
        </div>
        <div className='flex justify-center items-center gap-4 flex-wrap'>
          <button
            type="button"
            className={`w-max text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 ${sortAlbum ? 'border-solid border-red-600 border-2 ' : ''}`}
            onClick={handleSortClick}
          >
            Sort By Album
          </button>
          <button
            type="button"
            className="w-max text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
            onClick={handleResetSortClick}
          >
            Default Sort
          </button>
        </div>
      </div>
      <ProductGallery onProductClick={handleProductClick} searchTerm={searchTerm} sortAlbum={sortAlbum} />
      {selectedProduct && (
        <Suspense fallback={<Spinner />}>
          <ProductDetails product={selectedProduct} onClose={handleCloseDetails} />
        </Suspense>
      )}
    </div>
  );
};

export default App;
