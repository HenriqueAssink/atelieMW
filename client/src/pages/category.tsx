import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import ProductCard from "@/components/product-card";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import type { Category, Product } from "@shared/schema";

export default function Category() {
  const { slug } = useParams();

  const { data: category, isLoading: categoryLoading, error: categoryError } = useQuery<Category>({
    queryKey: ["/api/categories", slug],
  });

  const { data: products = [], isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    enabled: !!category,
  });

  if (categoryLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-light-gray">Carregando categoria...</p>
        </div>
      </div>
    );
  }

  if (categoryError || !category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md mx-4 bg-gray-800 border-gray-600">
          <CardContent className="pt-6">
            <div className="flex mb-4 gap-2">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <h1 className="text-2xl font-bold text-white">Categoria não encontrada</h1>
            </div>
            <p className="mt-4 text-sm text-light-gray">
              A categoria solicitada não foi encontrada.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const categoryProducts = products.filter(product => product.categoryId === category.id);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-charcoal to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-gold">
              Coleção {category.name}
            </h1>
            <p className="text-xl text-light-gray max-w-3xl mx-auto mb-8">
              {category.description}
            </p>
            <div className="bg-gold/10 border border-gold/20 rounded-lg p-6 max-w-4xl mx-auto">
              <p className="text-light-gray font-medium">
                <strong className="text-gold">Importante:</strong> Os modelos abaixo são nossa inspiração. 
                Cada peça é confeccionada sob medida especialmente para você.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {productsLoading ? (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-xl overflow-hidden animate-pulse">
                  <div className="w-full h-64 bg-gray-700"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 bg-gray-700 rounded mb-4"></div>
                    <div className="h-10 bg-gray-700 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : categoryProducts.length === 0 ? (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <AlertCircle className="h-16 w-16 text-gold mx-auto mb-6" />
                <h3 className="text-2xl font-serif font-bold text-gold mb-4">
                  Em breve novos modelos
                </h3>
                <p className="text-light-gray mb-8">
                  Estamos preparando lindos modelos para esta categoria. 
                  Entre em contato conosco para saber mais sobre nossas criações personalizadas.
                </p>
                <button 
                  className="bg-gold text-charcoal px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors duration-200"
                  onClick={() => window.open('https://wa.me/5549991981559', '_blank')}
                >
                  <i className="fab fa-whatsapp mr-2"></i>
                  Falar com a Estilista
                </button>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
