import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 py-12 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="font-serif text-2xl font-bold text-gold">Mw</div>
              <span className="ml-3 text-lg font-medium text-white">Ateliê Márcia Waltrick</span>
            </div>
            <p className="text-medium-gray mb-4 leading-relaxed">
              Confecção sob medida de lingeries e moda praia, criando peças exclusivas 
              que valorizam a beleza única de cada mulher.
            </p>
            <p className="text-gold font-medium">
              "Porque cada corpo merece exclusividade!"
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-medium-gray">
              <li>
                <Link href="/" className="hover:text-gold transition-colors duration-200">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/categoria/lingerie" className="hover:text-gold transition-colors duration-200">
                  Lingerie
                </Link>
              </li>
              <li>
                <Link href="/categoria/moda-praia" className="hover:text-gold transition-colors duration-200">
                  Moda Praia
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-gold transition-colors duration-200">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contato" className="hover:text-gold transition-colors duration-200">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gold mb-4">Contato</h4>
            <ul className="space-y-2 text-medium-gray">
              <li className="flex items-center">
                <i className="fab fa-whatsapp mr-2 text-gold"></i>
                <a 
                  href="https://wa.me/5549991981559" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors duration-200"
                >
                  (49) 99198-1559
                </a>
              </li>
              <li className="flex items-center">
                <i className="fab fa-instagram mr-2 text-gold"></i>
                <a 
                  href="https://instagram.com/ateliemarciawaltrick" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors duration-200"
                >
                  @ateliemarciawaltrick
                </a>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-2 text-gold"></i>
                <a 
                  href="mailto:contato@ateliemarciawaltrick.com.br" 
                  className="hover:text-gold transition-colors duration-200"
                >
                  contato@ateliemarciawaltrick.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-medium-gray">
          <p>&copy; {currentYear} Ateliê Márcia Waltrick. Todos os direitos reservados.</p>
          <p className="mt-2 text-sm">Desenvolvido com ❤️ para valorizar sua beleza única</p>
          <div className="mt-4">
            <Link 
              href="/admin/login" 
              className="text-xs text-gray-500 hover:text-gold transition-colors duration-200"
            >
              Área Administrativa
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
