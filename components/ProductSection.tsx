
import React from 'react';
import { Product, CategoryType } from '../types';
import ProductCard from './ProductCard';

interface ProductSectionProps {
  title: CategoryType | string;
  products: Product[];
  onProductClick?: (product: Product) => void;
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, products, onProductClick }) => {
  if (products.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-100">{title}</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {products.map(p => (
          <ProductCard key={p.id} product={p} onClick={onProductClick} />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
