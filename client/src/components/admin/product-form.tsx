import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import type { Category, Product, InsertProduct } from "@shared/schema";

// Form validation schema
const productFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(100, "Nome muito longo"),
  slug: z.string().min(1, "Slug é obrigatório").max(100, "Slug muito longo")
    .regex(/^[a-z0-9-]+$/, "Slug deve conter apenas letras minúsculas, números e hífens"),
  description: z.string().optional(),
  categoryId: z.number().min(1, "Categoria é obrigatória"),
  active: z.boolean().default(true),
  featured: z.boolean().default(false),
});

type ProductFormData = z.infer<typeof productFormSchema>;

interface ProductFormProps {
  product?: Product;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function ProductForm({ product, onSuccess, onCancel }: ProductFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [images, setImages] = useState<string[]>(product?.images || []);
  const [imageInput, setImageInput] = useState("");

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: product?.name || "",
      slug: product?.slug || "",
      description: product?.description || "",
      categoryId: product?.categoryId || 0,
      active: product?.active ?? true,
      featured: product?.featured ?? false,
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertProduct) => {
      const response = await apiRequest("POST", "/api/products", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({
        title: "Produto criado com sucesso!",
        description: "O produto foi adicionado ao catálogo.",
      });
      onSuccess?.();
    },
    onError: () => {
      toast({
        title: "Erro ao criar produto",
        description: "Verifique os dados e tente novamente.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: Partial<InsertProduct>) => {
      const response = await apiRequest("PUT", `/api/products/${product!.id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      queryClient.invalidateQueries({ queryKey: ["/api/products", product!.slug] });
      toast({
        title: "Produto atualizado com sucesso!",
        description: "As alterações foram salvas.",
      });
      onSuccess?.();
    },
    onError: () => {
      toast({
        title: "Erro ao atualizar produto",
        description: "Verifique os dados e tente novamente.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ProductFormData) => {
    const productData = {
      ...data,
      images,
    };

    if (product) {
      updateMutation.mutate(productData);
    } else {
      createMutation.mutate(productData);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove accents
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .trim()
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-"); // Replace multiple hyphens with single hyphen
  };

  const handleNameChange = (name: string) => {
    form.setValue("name", name);
    if (!product) { // Only auto-generate slug for new products
      const slug = generateSlug(name);
      form.setValue("slug", slug);
    }
  };

  const addImage = () => {
    if (imageInput.trim() && !images.includes(imageInput.trim())) {
      setImages([...images, imageInput.trim()]);
      setImageInput("");
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const isValidImageUrl = (url: string) => {
    try {
      new URL(url);
      return url.match(/\.(jpg|jpeg|png|gif|webp)$/i) !== null;
    } catch {
      return false;
    }
  };

  return (
    <Card className="bg-gray-800 border-gray-600">
      <CardHeader>
        <CardTitle className="text-gold">
          {product ? "Editar Produto" : "Novo Produto"}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name" className="text-light-gray">Nome do Produto *</Label>
              <Input
                id="name"
                {...form.register("name")}
                onChange={(e) => handleNameChange(e.target.value)}
                className="mt-2 bg-gray-700 border-gray-600 text-white focus:border-gold"
                placeholder="Ex: Conjunto Elegance"
              />
              {form.formState.errors.name && (
                <p className="text-red-400 text-sm mt-1">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="slug" className="text-light-gray">Slug (URL) *</Label>
              <Input
                id="slug"
                {...form.register("slug")}
                className="mt-2 bg-gray-700 border-gray-600 text-white focus:border-gold"
                placeholder="conjunto-elegance"
              />
              {form.formState.errors.slug && (
                <p className="text-red-400 text-sm mt-1">{form.formState.errors.slug.message}</p>
              )}
            </div>
          </div>

          {/* Category */}
          <div>
            <Label className="text-light-gray">Categoria *</Label>
            <Select
              value={form.watch("categoryId").toString()}
              onValueChange={(value) => form.setValue("categoryId", parseInt(value))}
            >
              <SelectTrigger className="mt-2 bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.categoryId && (
              <p className="text-red-400 text-sm mt-1">{form.formState.errors.categoryId.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-light-gray">Descrição</Label>
            <Textarea
              id="description"
              {...form.register("description")}
              rows={4}
              className="mt-2 bg-gray-700 border-gray-600 text-white focus:border-gold resize-none"
              placeholder="Descreva os detalhes do produto, tecidos, acabamentos..."
            />
          </div>

          {/* Images */}
          <div>
            <Label className="text-light-gray">Imagens do Produto</Label>
            <div className="mt-2 space-y-4">
              <div className="flex gap-2">
                <Input
                  value={imageInput}
                  onChange={(e) => setImageInput(e.target.value)}
                  placeholder="URL da imagem (https://...)"
                  className="bg-gray-700 border-gray-600 text-white focus:border-gold"
                />
                <Button
                  type="button"
                  onClick={addImage}
                  disabled={!imageInput.trim() || !isValidImageUrl(imageInput)}
                  className="bg-gold text-charcoal hover:bg-yellow-300"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Adicionar
                </Button>
              </div>
              
              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Produto ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-gray-600"
                        onError={(e) => {
                          e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjMzc0MTUxIi8+CjxwYXRoIGQ9Ik0xMiA5VjEzTTEyIDE3SDE2TDEyIDEzSDhMMTIgMTdaIiBzdHJva2U9IiM2QjcyODAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=';
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      {index === 0 && (
                        <Badge className="absolute bottom-1 left-1 bg-gold text-charcoal text-xs">
                          Principal
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              {images.length === 0 && (
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                  <ImageIcon className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-500">Nenhuma imagem adicionada</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Cole URLs de imagens para exibir o produto
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Status Options */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
              <div>
                <Label className="text-light-gray font-medium">Produto Ativo</Label>
                <p className="text-sm text-gray-400">Visível no site para clientes</p>
              </div>
              <Switch
                checked={form.watch("active")}
                onCheckedChange={(checked) => form.setValue("active", checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
              <div>
                <Label className="text-light-gray font-medium">Produto em Destaque</Label>
                <p className="text-sm text-gray-400">Aparece na seção de destaques</p>
              </div>
              <Switch
                checked={form.watch("featured")}
                onCheckedChange={(checked) => form.setValue("featured", checked)}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-600">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Cancelar
              </Button>
            )}
            <Button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="bg-gold text-charcoal hover:bg-yellow-300 font-semibold"
            >
              {createMutation.isPending || updateMutation.isPending
                ? "Salvando..."
                : product
                ? "Atualizar Produto"
                : "Criar Produto"
              }
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
