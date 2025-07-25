import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import ProductForm from "@/components/admin/product-form";
import { CategoryManagement } from "@/components/admin/category-management";
import { Package, Users, ShoppingCart, FileText, LogOut, Edit, Trash2, Plus } from "lucide-react";
import type { Product, Category, Order } from "@shared/schema";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { user, logout } = useAuth();

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: orders = [] } = useQuery<Order[]>({
    queryKey: ["/api/orders"],
  });

  if (!user) {
    setLocation("/admin/login");
    return null;
  }

  const handleLogout = () => {
    logout();
    setLocation("/admin/login");
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "Aguardando", className: "bg-blue-600" },
      in_production: { label: "Em Produção", className: "bg-yellow-600" },
      completed: { label: "Concluído", className: "bg-green-600" },
      cancelled: { label: "Cancelado", className: "bg-red-600" },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return (
      <Badge className={`${config.className} text-white`}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-charcoal pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-gold">
              Painel Administrativo
            </h1>
            <p className="text-light-gray mt-2">
              Bem-vinda, {user.username}!
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-600">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-light-gray">Total de Produtos</p>
                  <p className="text-2xl font-bold text-gold">{products.length}</p>
                </div>
                <Package className="w-8 h-8 text-gold" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-600">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-light-gray">Categorias</p>
                  <p className="text-2xl font-bold text-gold">{categories.length}</p>
                </div>
                <FileText className="w-8 h-8 text-gold" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-600">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-light-gray">Pedidos Ativos</p>
                  <p className="text-2xl font-bold text-gold">
                    {orders.filter(o => o.status !== 'completed' && o.status !== 'cancelled').length}
                  </p>
                </div>
                <ShoppingCart className="w-8 h-8 text-gold" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-600">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-light-gray">Total de Pedidos</p>
                  <p className="text-2xl font-bold text-gold">{orders.length}</p>
                </div>
                <Users className="w-8 h-8 text-gold" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="bg-gray-800 border-gray-600">
            <TabsTrigger value="products" className="data-[state=active]:bg-gold data-[state=active]:text-charcoal">
              Produtos
            </TabsTrigger>
            <TabsTrigger value="categories" className="data-[state=active]:bg-gold data-[state=active]:text-charcoal">
              Categorias
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-gold data-[state=active]:text-charcoal">
              Pedidos
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-gold data-[state=active]:text-charcoal">
              Conteúdo
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card className="bg-gray-800 border-gray-600">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-gold">Gerenciar Produtos</CardTitle>
                  <Button className="bg-gold text-charcoal hover:bg-yellow-300">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Produto
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="pb-4 text-gold">Nome</th>
                        <th className="pb-4 text-gold">Categoria</th>
                        <th className="pb-4 text-gold">Status</th>
                        <th className="pb-4 text-gold">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-b border-gray-700">
                          <td className="py-4 text-light-gray">{product.name}</td>
                          <td className="py-4 text-light-gray">
                            {categories.find(c => c.id === product.categoryId)?.name || 'N/A'}
                          </td>
                          <td className="py-4">
                            <Badge className={product.active ? "bg-green-600" : "bg-red-600"}>
                              {product.active ? "Ativo" : "Inativo"}
                            </Badge>
                          </td>
                          <td className="py-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="ghost" className="text-gold hover:text-yellow-300">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories">
            <CategoryManagement />
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card className="bg-gray-800 border-gray-600">
              <CardHeader>
                <CardTitle className="text-gold">Fila de Pedidos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id} className="bg-gray-700 border-gray-600">
                      <CardContent className="p-6 flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold text-light-gray">{order.customerName}</h4>
                          <p className="text-medium-gray">
                            Pedido #{order.id} - {new Date(order.createdAt!).toLocaleDateString('pt-BR')}
                          </p>
                          {order.notes && (
                            <p className="text-sm text-light-gray mt-1">{order.notes}</p>
                          )}
                        </div>
                        <div className="flex items-center space-x-4">
                          {getStatusBadge(order.status || 'pending')}
                          <Button size="sm" variant="ghost" className="text-gold hover:text-yellow-300">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content">
            <Card className="bg-gray-800 border-gray-600">
              <CardHeader>
                <CardTitle className="text-gold">Editar Conteúdo das Páginas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h4 className="font-semibold text-gold mb-4">Página Inicial - Texto Principal</h4>
                    <textarea 
                      className="w-full h-32 px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-gold focus:outline-none transition-colors duration-200 resize-none" 
                      placeholder="Texto que aparece na página inicial..."
                      defaultValue="No Ateliê Márcia Waltrick, cada peça é uma obra de arte personalizada..."
                    />
                  </div>
                  
                  <Button className="bg-gold text-charcoal hover:bg-yellow-300 font-semibold">
                    Salvar Alterações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
