 import { MapPin, Menu } from "lucide-react";
 import { Button } from "@/components/ui/button";
 
 interface HeaderProps {
   onScrollToHero: () => void;
 }
 
 export function Header({ onScrollToHero }: HeaderProps) {
   return (
     <header className="sticky top-0 left-0 right-0 bg-white/98 backdrop-blur-xl border-b border-border z-50">
       <nav className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
         <a
           href="#"
           onClick={onScrollToHero}
           className="flex items-center gap-3 font-['Outfit'] text-xl font-extrabold text-primary no-underline"
         >
           <MapPin className="w-8 h-8 text-[hsl(162,94%,39%)]" />
           <span>Horizon</span>
         </a>
 
         <div className="hidden md:flex gap-8 items-center">
           <a href="#app" className="text-muted-foreground hover:text-primary transition-colors font-medium">
             Découvrir
           </a>
           <a href="#features" className="text-muted-foreground hover:text-primary transition-colors font-medium">
             Fonctionnalités
           </a>
           <a href="#itineraries" className="text-muted-foreground hover:text-primary transition-colors font-medium">
             Itinéraires
           </a>
           <a href="#api" className="text-muted-foreground hover:text-primary transition-colors font-medium">
             API
           </a>
           <a href="#premium" className="text-muted-foreground hover:text-primary transition-colors font-medium">
             Horizon+
           </a>
           <Button className="rounded-full bg-gradient-to-r from-primary to-[hsl(197,72%,30%)] hover:opacity-90">
             Télécharger
           </Button>
         </div>
 
         <Button variant="ghost" size="icon" className="md:hidden">
           <Menu className="w-6 h-6" />
         </Button>
       </nav>
     </header>
   );
 }