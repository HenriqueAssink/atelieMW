import { useQuery } from "@tanstack/react-query";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Clock, Truck, Palette, HelpCircle } from "lucide-react";
import type { FaqItem } from "@shared/schema";

export default function FAQ() {
  const { data: faqItems = [], isLoading } = useQuery<FaqItem[]>({
    queryKey: ["/api/faq"],
  });

  const defaultFaqItems = [
    {
      id: 1,
      question: "Qual a diferença entre o ateliê e uma loja de lingerie?",
      answer: "No Ateliê Márcia Waltrick, não vendemos produtos prontos. Cada peça é confeccionada exclusivamente para você, com suas medidas exatas e preferências pessoais. Isso significa melhor caimento, conforto superior e a garantia de ter uma peça única que valoriza seu corpo como ele merece.",
      icon: <HelpCircle className="w-5 h-5" />
    },
    {
      id: 2,
      question: "Como faço para encomendar uma peça?",
      answer: "O processo é simples: entre em contato pelo WhatsApp ou Instagram, escolha o modelo que mais gosta, agendamos um horário para tomar suas medidas e definir os detalhes. Depois, é só aguardar sua peça exclusiva ficar pronta!",
      icon: <MessageCircle className="w-5 h-5" />
    },
    {
      id: 3,
      question: "Qual o prazo de confecção?",
      answer: "O tempo médio de confecção é de 15 a 20 dias úteis, dependendo da complexidade da peça e nossa agenda atual. Como cada item é feito artesanalmente e com cuidado especial, garantimos qualidade que vale a espera.",
      icon: <Clock className="w-5 h-5" />
    },
    {
      id: 4,
      question: "Vocês enviam para outras cidades?",
      answer: "Sim! Enviamos para todo o Brasil via Correios ou transportadora. Para clientes de outras cidades, fazemos a tomada de medidas via vídeo chamada com orientações detalhadas, garantindo o mesmo padrão de qualidade e caimento perfeito.",
      icon: <Truck className="w-5 h-5" />
    },
    {
      id: 5,
      question: "Posso escolher tecidos e cores diferentes?",
      answer: "Claro! Temos uma ampla variedade de tecidos premium e cores disponíveis. Durante a consulta, apresentamos todas as opções e te ajudamos a escolher a combinação perfeita para seu estilo e preferências pessoais.",
      icon: <Palette className="w-5 h-5" />
    }
  ];

  const displayItems = faqItems.length > 0 ? faqItems : defaultFaqItems;

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-charcoal to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-gold">
            Perguntas Frequentes
          </h1>
          <p className="text-xl text-light-gray max-w-3xl mx-auto">
            Tire suas dúvidas sobre nosso processo de confecção personalizada
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 bg-charcoal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-xl p-6 animate-pulse">
                  <div className="h-6 bg-gray-700 rounded mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <Accordion type="single" collapsible className="space-y-4">
              {displayItems.map((item, index) => (
                <AccordionItem 
                  key={item.id || index} 
                  value={`item-${item.id || index}`}
                  className="bg-gray-800 rounded-xl border border-gray-600 overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-gray-700 transition-colors duration-200 [&[data-state=open]>div>svg]:rotate-180">
                    <div className="flex items-center text-left">
                      <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        {'icon' in item ? item.icon : <HelpCircle className="w-5 h-5 text-charcoal" />}
                      </div>
                      <h3 className="font-semibold text-lg text-gold">
                        {item.question}
                      </h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="ml-14">
                      <p className="text-light-gray leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-gray-800 to-charcoal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gold/10 border-gold/20 border">
            <CardContent className="p-8 text-center">
              <h3 className="font-serif text-2xl font-bold text-gold mb-4">
                Ainda tem dúvidas?
              </h3>
              <p className="text-light-gray mb-6 leading-relaxed">
                Nossa equipe está pronta para esclarecer todas as suas questões e te ajudar 
                a criar a peça perfeita para você.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gold text-charcoal hover:bg-yellow-300 font-semibold"
                  onClick={() => window.open('https://wa.me/5549991981559', '_blank')}
                >
                  <i className="fab fa-whatsapp mr-2"></i>
                  Falar no WhatsApp
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-gold text-gold hover:bg-gold hover:text-charcoal font-semibold"
                  onClick={() => window.open('https://instagram.com/ateliemarciawaltrick', '_blank')}
                >
                  <i className="fab fa-instagram mr-2"></i>
                  Chamar no Instagram
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
