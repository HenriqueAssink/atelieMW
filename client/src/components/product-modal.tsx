import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Clock, Scissors } from "lucide-react";
import { generateWhatsAppMessage } from "@/lib/whatsapp";
import type { Product } from "@shared/schema";

interface ProductModalProps {
  product: Product;
  children: React.ReactNode;
}

export default function ProductModal({ product, children }: ProductModalProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  const handleWhatsAppOrder = () => {
    const message = generateWhatsAppMessage(product.name);
    window.open(`https://wa.me/5549991981559?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleInstagramContact = () => {
    window.open('https://instagram.com/ateliemarciawaltrick', '_blank');
  };

  const defaultImages = [
    'https://images.unsplash.com/photo-1571513800374-df1bbe650e56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800',
    'https://images.unsplash.com/photo-1594822113149-ad4e0ac2e7c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800',
    'https://images.unsplash.com/photo-1596753365629-d5853b69ed09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800'
  ];

  const images = product.images && product.images.length > 0 ? product.images : defaultImages;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-800 border-gray-600">
        <div className="grid md:grid-cols-2 gap-8 p-6">
          {/* Product Images */}
          <div>
            <div className="relative mb-4">
              <img 
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover rounded-xl"
              />
              {product.featured && (
                <Badge className="absolute top-4 left-4 bg-gold text-charcoal">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Destaque
                </Badge>
              )}
            </div>
            
            {images.length > 1 && (
              <div className="grid grid-cols-3 gap-2">
                {images.slice(0, 3).map((image, index) => (
                  <img 
                    key={index}
                    src={image}
                    alt={`${product.name} - ${index + 1}`}
                    className={`w-full h-20 object-cover rounded-lg cursor-pointer transition-opacity ${
                      selectedImage === index ? 'opacity-100 ring-2 ring-gold' : 'opacity-75 hover:opacity-100'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div>
            <h2 className="font-serif text-3xl font-bold text-gold mb-4">{product.name}</h2>
            <p className="text-light-gray text-lg mb-6 leading-relaxed">
              {product.description || `Este modelo exclusivo combina elegância e conforto, confeccionado com materiais de alta qualidade. 
              Cada peça é cuidadosamente personalizada para realçar sua beleza natural, com atenção especial ao caimento 
              e aos detalhes que fazem toda a diferença.`}
            </p>
            
            <div className="mb-6">
              <h3 className="font-semibold text-gold mb-3 flex items-center">
                <Scissors className="w-4 h-4 mr-2" />
                Características:
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
            </div>
            
            <div className="mb-8">
              <h3 className="font-semibold text-gold mb-3 flex items-center">
                <Sparkles className="w-4 h-4 mr-2" />
                Personalização Disponível:
              </h3>
              <ul className="text-light-gray space-y-2">
                <li>• Escolha de cores e tecidos</li>
                <li>• Ajustes para seu tipo de corpo</li>
                <li>• Detalhes exclusivos sob consulta</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <Button 
                className="w-full bg-gold text-charcoal hover:bg-yellow-300 font-semibold text-lg py-6"
                onClick={handleWhatsAppOrder}
              >
                <i className="fab fa-whatsapp mr-2"></i>Encomendar via WhatsApp
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-gold text-gold hover:bg-gold hover:text-charcoal font-semibold py-4"
                onClick={handleInstagramContact}
              >
                <i className="fab fa-instagram mr-2"></i>Chamar no Instagram
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
