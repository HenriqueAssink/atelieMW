import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "@/components/product-card";
import { Link } from "wouter";
import { ArrowRight, Scissors, Heart, Star } from "lucide-react";
import type { Category, Product } from "@shared/schema";

export default function Home() {
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: featuredProducts = [] } = useQuery<Product[]>({
    queryKey: ["/api/products/featured"],
  });

  const { data: homeContent } = useQuery({
    queryKey: ["/api/content/home_hero"],
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat hero-overlay"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')`
          }}
        />
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="mb-6">
            <span className="font-serif text-4xl md:text-6xl font-bold text-gold">Mw</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Ateliê Márcia Waltrick
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-gold font-medium mb-8">
            Porque cada corpo merece exclusividade!
          </p>
          <p className="text-lg md:text-xl text-light-gray mb-12 max-w-3xl mx-auto leading-relaxed">
            {(homeContent as any)?.content || "Confecção sob medida de lingeries e moda praia, criadas especialmente para valorizar o que você tem de único."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categoria/lingerie">
              <Button size="lg" className="bg-gold text-charcoal hover:bg-yellow-300 font-semibold text-lg px-8 py-4">
                Ver Coleções
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-gold text-gold hover:bg-gold hover:text-charcoal font-semibold text-lg px-8 py-4"
              onClick={() => window.open('https://wa.me/5549991981559', '_blank')}
            >
              <i className="fab fa-whatsapp mr-2"></i>
              Fale Conosco
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-b from-charcoal to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-8 text-gold">
                Nosso Ateliê
              </h2>
              <p className="text-lg text-light-gray mb-6 leading-relaxed">
                No Ateliê Márcia Waltrick, cada peça é uma obra de arte personalizada. 
                Trabalhamos com confecção própria, criando lingeries e moda praia sob medida 
                que valorizam a beleza única de cada cliente.
              </p>
              <p className="text-lg text-light-gray mb-8 leading-relaxed">
                Nossa especialidade é entender seu corpo, seus gostos e criar peças que 
                proporcionam conforto, elegância e autoestima. Porque você merece muito 
                mais que produtos de massa.
              </p>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold">10+</div>
                  <div className="text-sm text-medium-gray">Anos de experiência</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold">500+</div>
                  <div className="text-sm text-medium-gray">Clientes satisfeitas</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold">100%</div>
                  <div className="text-sm text-medium-gray">Sob medida</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Ateliê de confecção com tecidos e materiais de alta qualidade" 
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -right-6 bg-gold text-charcoal p-6 rounded-xl shadow-xl">
                <Scissors className="text-2xl mb-2" />
                <div className="font-semibold">Confecção Própria</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-gold">
              Nossas Especialidades
            </h2>
            <p className="text-xl text-light-gray max-w-3xl mx-auto">
              Cada categoria é pensada para valorizar sua beleza natural com peças exclusivas e personalizadas
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {categories.map((category) => (
              <Link key={category.id} href={`/categoria/${category.slug}`}>
                <Card className="group relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 hover:scale-105 transition-all duration-500 cursor-pointer border-gray-600">
                  <div className="relative">
                    <img 
                      src={category.slug === 'lingerie' 
                        ? 'https://images.unsplash.com/photo-1594822113149-ad4e0ac2e7c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
                        : 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
                      }
                      alt={`Coleção ${category.name}`}
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-transparent"></div>
                    <CardContent className="absolute bottom-0 left-0 p-8">
                      <h3 className="font-serif text-3xl font-bold mb-3 text-gold">{category.name}</h3>
                      <p className="text-light-gray mb-4">{category.description}</p>
                      <div className="inline-flex items-center text-gold font-semibold group-hover:translate-x-2 transition-transform duration-300">
                        Ver Coleção <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-b from-gray-800 to-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-gold">
              Como Funciona
            </h2>
            <p className="text-xl text-light-gray max-w-3xl mx-auto">
              Um processo simples e personalizado para criar a peça perfeita para você
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-comments text-charcoal text-2xl"></i>
              </div>
              <h3 className="font-serif text-xl font-bold mb-4 text-gold">1. Contato</h3>
              <p className="text-light-gray">
                Entre em contato pelo WhatsApp ou Instagram para conversar sobre o modelo desejado.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-ruler text-charcoal text-2xl"></i>
              </div>
              <h3 className="font-serif text-xl font-bold mb-4 text-gold">2. Medidas</h3>
              <p className="text-light-gray">
                Agendamos um encontro para tirar suas medidas e definir todos os detalhes da personalização.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Scissors className="text-charcoal text-2xl" />
              </div>
              <h3 className="font-serif text-xl font-bold mb-4 text-gold">3. Confecção</h3>
              <p className="text-light-gray">
                Sua peça é confeccionada com todo cuidado e atenção aos detalhes em nosso ateliê.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-gift text-charcoal text-2xl"></i>
              </div>
              <h3 className="font-serif text-xl font-bold mb-4 text-gold">4. Entrega</h3>
              <p className="text-light-gray">
                Receba sua peça exclusiva, feita especialmente para você, com a qualidade Márcia Waltrick.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-20 bg-charcoal">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-gold">
                Destaques
              </h2>
              <p className="text-xl text-light-gray max-w-3xl mx-auto">
                Confira alguns dos nossos modelos mais populares
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
