import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { CategoryForm } from "./category-form";
import { Trash2, FolderOpen, FolderX } from "lucide-react";
import type { Category } from "@shared/schema";

export function CategoryManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest(`/api/categories/${id}`, "DELETE"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/categories"] });
      toast({
        title: "Categoria removida",
        description: "A categoria foi removida com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: "Erro ao remover categoria. Verifique se não há produtos associados.",
        variant: "destructive",
      });
    },
  });

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gold">Gerenciar Categorias</h2>
          <div className="h-10 w-32 bg-gray-700 animate-pulse rounded"></div>
        </div>
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-700 animate-pulse rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gold">Gerenciar Categorias</h2>
          <p className="text-sm text-light-gray mt-1">
            Adicione, edite ou remova categorias. As categorias aparecem automaticamente no menu do site.
          </p>
        </div>
        <CategoryForm />
      </div>

      {categories.length === 0 ? (
        <Card className="bg-gray-800 border-gray-600">
          <CardContent className="p-8 text-center">
            <FolderX className="mx-auto h-12 w-12 text-gray-500 mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Nenhuma categoria encontrada</h3>
            <p className="text-gray-400 mb-4">
              Crie sua primeira categoria para começar a organizar seus produtos.
            </p>
            <CategoryForm />
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {categories.map((category) => (
            <Card key={category.id} className="bg-gray-800 border-gray-600">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <FolderOpen className="h-6 w-6 text-gold" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-medium text-white truncate">
                          {category.name}
                        </h3>
                        <Badge 
                          variant={category.active ? "default" : "secondary"}
                          className={category.active ? "bg-green-600 text-white" : "bg-gray-600 text-gray-300"}
                        >
                          {category.active ? "Ativa" : "Inativa"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">
                        Slug: /{category.slug}
                      </p>
                      {category.description && (
                        <p className="text-sm text-light-gray mt-2 line-clamp-2">
                          {category.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CategoryForm category={category} />
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-gray-800 border-gray-600">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-gold">Confirmar exclusão</AlertDialogTitle>
                          <AlertDialogDescription className="text-light-gray">
                            Tem certeza que deseja excluir a categoria "{category.name}"? 
                            Esta ação não pode ser desfeita e pode afetar produtos associados.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="border-gray-600 text-white hover:bg-gray-700">
                            Cancelar
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(category.id)}
                            className="bg-red-600 text-white hover:bg-red-700"
                            disabled={deleteMutation.isPending}
                          >
                            {deleteMutation.isPending ? "Excluindo..." : "Excluir"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}