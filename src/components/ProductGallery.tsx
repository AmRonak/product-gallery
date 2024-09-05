import { useState, useEffect, useCallback, useRef } from 'react';
import ProductItem from './ProductItem';
import Spinner from './Spinner';
import { QueryClient, QueryClientProvider } from 'react-query';

interface Product {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface ProductGalleryProps {
  onProductClick: (product: Product) => void;
  searchTerm: string;
  sortAlbum: boolean;
}

const queryClient = new QueryClient();

const ProductGallery = ({ onProductClick, searchTerm, sortAlbum }: ProductGalleryProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    setLoading(true);
    setProducts([]);
    setPage(1);
  }, [searchTerm, sortAlbum])

  useEffect(() => {
    let clearTimeOutId: number;

    const fetchPhotos = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await queryClient.fetchQuery(
          ['photos', page, searchTerm],
          async () => {
            const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&title_like=${searchTerm}&_sort=albumId`);
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();
          }, { staleTime: 500000 }
        );

        if(page === 1) {
          setProducts(data);
        } else {
          setProducts((prev) => [...prev, ...data]);
        }
        setHasMore(data.length >= 10)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm.length === 0) {
      fetchPhotos();
    } else {
      clearTimeOutId = window.setTimeout(fetchPhotos, 500);
    }

    return () => window.clearTimeout(clearTimeOutId);
  }, [page, searchTerm]);



  const lastOrderElementRef = useCallback(
    (node: Element | null) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        console.log(entries[0].isIntersecting, hasMore)
        if (
          (entries[0].isIntersecting && hasMore)
        ) {
          setPage((previousPage) => previousPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasMore, loading]
  );

  if (products.length === 0 && loading) {
    return <Spinner />
  }

  if (error) {
    return (
      <div className='flex justify-center items-center'>
        <p className="text-red-500 font-medium text-3xl">Error: {error}</p>
      </div>
    );
  }

  if(products.length === 0) {
    return (
      <div className='flex justify-center items-center'>
        <p>No data found</p>
      </div>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <div key={product.id} ref={lastOrderElementRef}>
              <ProductItem
                key={product.id}
                product={product}
                onClick={() => onProductClick(product)}
                />
            </div>
          ))}
        </div>
          <div>
            {products.length !== 0 && loading && (<Spinner />)}
          </div>
      </div>
    </QueryClientProvider>
  );
};

export default ProductGallery;