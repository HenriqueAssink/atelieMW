import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import type { Product } from "@shared/schema";
import React from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const defaultImage = product.slug?.includes('praia') 
    ? 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500'
    : 'https://images.unsplash.com/photo-1571513800374-df1bbe650e56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500';

  const imageUrl = product.images && product.images.length > 0 
    ? product.images[0] 
    : defaultImage;

  return (
    <Card className="group bg-gray-800 border-gray-600 rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer">
      <div className="relative">
        <img 
          src={imageUrl}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        {product.featured && (
          <Badge className="absolute top-2 right-2 bg-gold text-charcoal">
            <Sparkles className="w-3 h-3 mr-1" />
            Destaque
          </Badge>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </div>
      
      <CardContent className="p-6">
        <h3 className="font-serif text-xl font-bold mb-2 text-gold">{product.name}</h3>
        <p className="text-medium-gray mb-4 line-clamp-2">
          {product.description || "Peça exclusiva confeccionada sob medida"}
        </p>
        <Link href={`/produto/${product.slug}`}>
          <Button className="w-full bg-gold text-charcoal hover:bg-yellow-300 font-semibold transition-colors duration-200">
            Ver Detalhes
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
