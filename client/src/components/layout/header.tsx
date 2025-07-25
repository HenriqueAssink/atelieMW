import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Menu, X, ChevronDown } from "lucide-react";
import type { Category } from "@shared/schema";

export default function Header() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const staticNavigation = [
    { name: "Início", href: "/" },
    { name: "FAQ", href: "/faq" },
    { name: "Contato", href: "/contato" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <nav className="nav-glass fixed w-full z-50 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <div className="font-serif text-2xl font-bold text-gold">Mw</div>
            <span className="ml-3 text-lg font-medium text-white hidden sm:block">
              Ateliê Márcia Waltrick
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="space-x-6">
                {/* Static navigation items */}
                {staticNavigation.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <Link
                      href={item.href}
                      className={`transition-colors duration-200 px-3 py-2 ${
                        isActive(item.href)
                          ? "text-gold font-medium"
                          : "text-white hover:text-gold"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </NavigationMenuItem>
                ))}
                
                {/* Products dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-white hover:text-gold hover:bg-transparent focus:bg-transparent focus:text-gold data-[state=open]:text-gold data-[state=open]:bg-transparent">
                    Produtos
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:w-[300px] lg:w-[400px]">
                      {categories.map((category) => (
                        <NavigationMenuLink key={category.slug} asChild>
                          <Link
                            href={`/categoria/${category.slug}`}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none text-gold">
                              {category.name}
                            </div>
                            {category.description && (
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {category.description}
                              </p>
                            )}
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:text-gold">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-charcoal border-gray-700 w-80">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center">
                    <div className="font-serif text-xl font-bold text-gold">Mw</div>
                    <span className="ml-2 text-sm font-medium text-white">
                      Ateliê Márcia Waltrick
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:text-gold"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {/* Static navigation items */}
                  {staticNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block py-3 px-4 rounded-lg transition-colors duration-200 ${
                        isActive(item.href)
                          ? "bg-gold text-charcoal font-medium"
                          : "text-white hover:bg-gray-700 hover:text-gold"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  {/* Products section */}
                  <div className="space-y-2">
                    <div className="py-3 px-4 text-gold font-medium flex items-center">
                      Produtos
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </div>
                    <div className="ml-4 space-y-2">
                      {categories.map((category) => (
                        <Link
                          key={category.slug}
                          href={`/categoria/${category.slug}`}
                          onClick={() => setIsOpen(false)}
                          className={`block py-2 px-4 rounded-lg transition-colors duration-200 ${
                            isActive(`/categoria/${category.slug}`)
                              ? "bg-gold text-charcoal font-medium"
                              : "text-white hover:bg-gray-700 hover:text-gold"
                          }`}
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-gray-700">
                  <div className="space-y-4">
                    <Button
                      className="w-full bg-gold text-charcoal hover:bg-yellow-300 font-semibold"
                      onClick={() => {
                        window.open('https://wa.me/5549991981559', '_blank');
                        setIsOpen(false);
                      }}
                    >
                      <i className="fab fa-whatsapp mr-2"></i>
                      WhatsApp
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-gold text-gold hover:bg-gold hover:text-charcoal"
                      onClick={() => {
                        window.open('https://instagram.com/ateliemarciawaltrick', '_blank');
                        setIsOpen(false);
                      }}
                    >
                      <i className="fab fa-instagram mr-2"></i>
                      Instagram
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
