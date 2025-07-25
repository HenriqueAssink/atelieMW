import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Clock, Scissors, Sparkles } from "lucide-react";
import { generateWhatsAppMessage } from "@/lib/whatsapp";
import type { Product } from "@shared/schema";

export default function ProductDetail() {
  const { slug } = useParams();

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ["/api/products", slug],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-light-gray">Carregando produto...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <Card className="w-full max-w-md mx-4 bg-gray-800 border-gray-600">
          <CardContent className="pt-6">
            <div className="flex mb-4 gap-2">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <h1 className="text-2xl font-bold text-white">Produto não encontrado</h1>
            </div>
            <p className="mt-4 text-sm text-light-gray">
              O produto solicitado não foi encontrado.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleWhatsAppOrder = () => {
    const message = generateWhatsAppMessage(product.name);
    window.open(`https://wa.me/5549991981559?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleInstagramContact = () => {
    window.open('https://instagram.com/ateliemarciawaltrick', '_blank');
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="relative mb-6">
              <img 
                src={product.images && product.images.length > 0 
                  ? product.images[0] 
                  : 'https://images.unsplash.com/photo-1571513800374-df1bbe650e56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800'
                }
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl"
              />
              {product.featured && (
                <Badge className="absolute top-4 left-4 bg-gold text-charcoal">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Destaque
                </Badge>
              )}
            </div>
            
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-3 gap-3">
                {product.images.slice(1, 4).map((image, index) => (
                  <img 
                    key={index}
                    src={image}
                    alt={`${product.name} - ${index + 2}`}
                    className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="font-serif text-4xl font-bold text-gold mb-6">{product.name}</h1>
            
            <div className="prose prose-invert max-w-none mb-8">
              <p className="text-light-gray text-lg leading-relaxed">
                {product.description || `Este modelo exclusivo combina elegância e conforto, confeccionado com materiais de alta qualidade. 
                Cada peça é cuidadosamente personalizada para realçar sua beleza natural, com atenção especial ao caimento 
                e aos detalhes que fazem toda a diferença.`}
              </p>
            </div>
            
            <div className="space-y-6 mb-8">
              <Card className="bg-gray-800 border-gray-600">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gold mb-4 flex items-center">
                    <Scissors className="w-5 h-5 mr-2" />
                    Características
                  </h3>
                  <ul className="text-light-gray space-y-2">
                    <li>• Tecidos premium importados</li>
                    <li>• Confecção 100% sob medida</li>
                    <li>• Acabamento artesanal</li>
                    <li className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gold" />
                      Tempo de confecção: 15-20 dias
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-600">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gold mb-4 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Personalização Disponível
                  </h3>
                  <ul className="text-light-gray space-y-2">
                    <li>• Escolha de cores e tecidos</li>
                    <li>• Ajustes para seu tipo de corpo</li>
                    <li>• Detalhes exclusivos sob consulta</li>
                    <li>• Acompanhamento durante todo o processo</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-4">
              <Button 
                size="lg" 
                className="w-full bg-gold text-charcoal hover:bg-yellow-300 font-semibold text-lg py-6"
                onClick={handleWhatsAppOrder}
              >
                <i className="fab fa-whatsapp mr-2 text-xl"></i>
                Encomendar via WhatsApp
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full border-gold text-gold hover:bg-gold hover:text-charcoal font-semibold py-4"
                onClick={handleInstagramContact}
              >
                <i className="fab fa-instagram mr-2 text-xl"></i>
                Chamar no Instagram
              </Button>
            </div>
            
            <div className="mt-8 p-6 bg-gold/10 border border-gold/20 rounded-xl">
              <p className="text-light-gray text-center">
                <strong className="text-gold">Importante:</strong> Este modelo é nossa inspiração. 
                Sua peça será confeccionada exclusivamente para você, respeitando suas medidas e preferências.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
