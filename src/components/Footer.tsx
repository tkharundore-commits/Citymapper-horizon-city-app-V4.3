 import { MapPin, Apple, Play } from "lucide-react";
 
 export function Footer() {
   return (
     <footer className="bg-[hsl(222,47%,11%)] text-[hsl(215,20%,65%)] py-16 px-8">
       <div className="max-w-7xl mx-auto">
         {/* CTA Section */}
         <div className="text-center mb-16 pb-12 border-b border-white/10">
           <h2 className="font-['Outfit'] text-3xl md:text-4xl font-bold mb-6 text-white">
             Prêt à redécouvrir{" "}
             <span className="bg-gradient-to-r from-[hsl(162,94%,39%)] to-[hsl(162,94%,45%)] bg-clip-text text-transparent">
               votre ville
             </span>{" "}
             ?
           </h2>
           <p className="text-lg mb-8 text-[hsl(215,20%,65%)]">
             Téléchargez Citymapper Horizon et transformez vos trajets en aventures
           </p>
           <div className="flex flex-wrap gap-4 justify-center">
             <a
               href="#"
               className="flex items-center gap-3 px-6 py-4 bg-white text-[hsl(222,47%,11%)] rounded-full font-semibold hover:-translate-y-1 transition-transform shadow-lg"
             >
               <Apple className="w-6 h-6" />
               App Store
             </a>
             <a
               href="#"
               className="flex items-center gap-3 px-6 py-4 bg-white text-[hsl(222,47%,11%)] rounded-full font-semibold hover:-translate-y-1 transition-transform shadow-lg"
             >
               <Play className="w-6 h-6" />
               Google Play
             </a>
           </div>
         </div>
 
         {/* Footer Grid */}
         <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
           <div className="md:col-span-1">
             <div className="flex items-center gap-3 font-['Outfit'] text-xl font-extrabold text-white mb-4">
               <MapPin className="w-8 h-8 text-[hsl(162,94%,39%)]" />
               Citymapper Horizon
             </div>
             <p className="italic mb-4">
               Vivre la ville, pas seulement la traverser.
             </p>
             <p className="text-sm">
               Explorez sans limites et découvrez les pépites cachées de votre ville sur chaque trajet.
             </p>
           </div>
 
           <div>
             <h4 className="font-['Outfit'] font-bold text-white mb-6">Produit</h4>
             <ul className="space-y-3">
               <li><a href="#" className="hover:text-[hsl(162,94%,39%)] transition-colors">Fonctionnalités</a></li>
               <li><a href="#" className="hover:text-[hsl(162,94%,39%)] transition-colors">Itinéraires</a></li>
               <li><a href="#" className="hover:text-[hsl(162,94%,39%)] transition-colors">API</a></li>
             </ul>
           </div>
 
           <div>
             <h4 className="font-['Outfit'] font-bold text-white mb-6">Entreprise</h4>
             <ul className="space-y-3">
               <li><a href="#" className="hover:text-[hsl(162,94%,39%)] transition-colors">À propos</a></li>
               <li><a href="#" className="hover:text-[hsl(162,94%,39%)] transition-colors">Carrières</a></li>
               <li><a href="#" className="hover:text-[hsl(162,94%,39%)] transition-colors">Presse</a></li>
             </ul>
           </div>
 
           <div>
             <h4 className="font-['Outfit'] font-bold text-white mb-6">Légal</h4>
             <ul className="space-y-3">
               <li><a href="#" className="hover:text-[hsl(162,94%,39%)] transition-colors">Confidentialité</a></li>
               <li><a href="#" className="hover:text-[hsl(162,94%,39%)] transition-colors">CGU</a></li>
               <li><a href="#" className="hover:text-[hsl(162,94%,39%)] transition-colors">Cookies</a></li>
             </ul>
           </div>
         </div>
 
         <div className="pt-8 border-t border-white/10 text-center text-sm">
           <p>© 2026 Citymapper Horizon. Tous droits réservés. Propulsé par l'innovation et la passion de la ville.</p>
         </div>
       </div>
     </footer>
   );
 }