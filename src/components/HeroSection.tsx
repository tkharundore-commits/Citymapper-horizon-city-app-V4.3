 import { MapPin, ChevronDown } from "lucide-react";
 import { Button } from "@/components/ui/button";
 
 interface HeroSectionProps {
   onScrollToApp: () => void;
 }
 
 export function HeroSection({ onScrollToApp }: HeroSectionProps) {
   return (
     <section className="min-h-screen bg-gradient-to-br from-[hsl(222,47%,11%)] to-[hsl(217,33%,17%)] flex flex-col justify-center items-center p-8 relative overflow-hidden">
       {/* Gradient overlays */}
       <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-[20%] left-[20%] w-[50%] h-[50%] bg-[radial-gradient(circle,hsl(162,94%,39%,0.1)_0%,transparent_50%)]" />
         <div className="absolute bottom-[20%] right-[20%] w-[50%] h-[50%] bg-[radial-gradient(circle,hsl(197,72%,35%,0.1)_0%,transparent_50%)]" />
       </div>
 
       <div className="max-w-5xl text-center relative z-10 animate-fadeInUp">
         <h1 className="font-['Outfit'] text-5xl md:text-7xl font-extrabold leading-tight mb-6 text-white">
           Redéfinir la
           <br />
           <span className="bg-gradient-to-r from-[hsl(162,94%,39%)] to-[hsl(162,94%,45%)] bg-clip-text text-transparent">
             Mobilité Urbaine
           </span>
         </h1>
         <p className="text-xl md:text-2xl text-[hsl(215,20%,65%)] mb-4 font-normal">
           Vivre la ville, pas seulement la traverser
         </p>
         <p className="text-lg md:text-xl text-[hsl(215,20%,65%)] mb-12 max-w-3xl mx-auto">
           Découvrez les pépites cachées de votre ville sur votre trajet quotidien
         </p>
         <div className="flex flex-wrap gap-6 justify-center">
           <Button
             onClick={onScrollToApp}
             className="px-8 py-6 text-lg font-semibold rounded-full bg-gradient-to-r from-[hsl(162,94%,39%)] to-[hsl(162,94%,45%)] text-[hsl(222,47%,11%)] hover:scale-105 transition-transform shadow-lg shadow-[hsl(162,94%,39%,0.3)]"
           >
             <MapPin className="w-5 h-5 mr-2" />
             Découvrir l'expérience
           </Button>
           <Button
             variant="outline"
             className="px-8 py-6 text-lg font-semibold rounded-full bg-white/10 text-white border-white/20 hover:bg-white/15 hover:border-[hsl(162,94%,39%)] backdrop-blur-sm"
           >
             Comment ça marche ?
           </Button>
         </div>
       </div>
 
       <div
         className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[hsl(215,20%,65%)] animate-bounce-slow cursor-pointer"
         onClick={onScrollToApp}
       >
         <ChevronDown className="w-8 h-8" />
       </div>
     </section>
   );
 }