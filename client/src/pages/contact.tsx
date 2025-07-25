import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Phone, Mail, MapPin, Instagram, MessageSquare } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato em breve.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    },
    onError: () => {
      toast({
        title: "Erro ao enviar mensagem",
        description: "Tente novamente ou entre em contato pelo WhatsApp.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-charcoal to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-gold">
            Entre em Contato
          </h1>
          <p className="text-xl text-light-gray max-w-3xl mx-auto">
            Estamos prontas para criar a peça dos seus sonhos. Fale conosco e comece sua jornada de exclusividade.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="font-serif text-3xl font-bold mb-8 text-gold">
                Informações de Contato
              </h2>
              
              <div className="space-y-6 mb-12">
                {/* WhatsApp */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                    <Phone className="text-charcoal text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gold">WhatsApp</h4>
                    <a 
                      href="https://wa.me/5549991981559" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-light-gray hover:text-gold transition-colors duration-200"
                    >
                      (49) 99198-1559
                    </a>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                    <Instagram className="text-charcoal text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gold">Instagram</h4>
                    <a 
                      href="https://instagram.com/ateliemarciawaltrick" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-light-gray hover:text-gold transition-colors duration-200"
                    >
                      @ateliemarciawaltrick
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                    <Mail className="text-charcoal text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gold">Email</h4>
                    <a 
                      href="mailto:contato@ateliemarciawaltrick.com.br" 
                      className="text-light-gray hover:text-gold transition-colors duration-200"
                    >
                      contato@ateliemarciawaltrick.com.br
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                    <MapPin className="text-charcoal text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gold">Localização</h4>
                    <p className="text-light-gray">Santa Catarina, Brasil</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="font-semibold text-gold mb-4">Siga-nos nas Redes Sociais</h4>
                <div className="flex space-x-4">
                  <a 
                    href="https://instagram.com/ateliemarciawaltrick" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gold hover:text-charcoal transition-all duration-200"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://wa.me/5549991981559" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gold hover:text-charcoal transition-all duration-200"
                  >
                    <MessageSquare className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="bg-gray-800 border-gray-600">
                <CardContent className="p-8">
                  <h3 className="font-serif text-2xl font-bold mb-8 text-gold">
                    Envie uma Mensagem
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-light-gray">Nome Completo</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-2 bg-gray-700 border-gray-600 text-white focus:border-gold"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-light-gray">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-2 bg-gray-700 border-gray-600 text-white focus:border-gold"
                        placeholder="seu@email.com"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone" className="text-light-gray">WhatsApp (opcional)</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-2 bg-gray-700 border-gray-600 text-white focus:border-gold"
                        placeholder="(49) 99999-9999"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="message" className="text-light-gray">Mensagem</Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="mt-2 bg-gray-700 border-gray-600 text-white focus:border-gold resize-none"
                        placeholder="Conte-nos sobre a peça que você tem em mente..."
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      size="lg"
                      disabled={contactMutation.isPending}
                      className="w-full bg-gold text-charcoal hover:bg-yellow-300 font-semibold"
                    >
                      {contactMutation.isPending ? "Enviando..." : "Enviar Mensagem"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Google Maps */}
          <div className="mt-16">
            <h3 className="font-serif text-2xl font-bold mb-8 text-gold text-center">
              Nossa Localização
            </h3>
            <Card className="bg-gray-800 border-gray-600 overflow-hidden">
              <div className="w-full h-96 flex items-center justify-center text-medium-gray">
                <div className="text-center">
                  <MapPin className="w-16 h-16 mx-auto mb-4 text-gold" />
                  <p className="text-lg font-medium">Mapa será integrado aqui</p>
                  <p className="text-sm mt-2">Santa Catarina, Brasil</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
