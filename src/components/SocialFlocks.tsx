 import { Users, MessageCircle } from "lucide-react";
 import { useState, useEffect } from "react";
 
 const flockMessages = [
   'Sophie: "Le café Kitsuné est génial !"',
   'Thomas: "La Galerie Vivienne est magnifique 📸"',
   'Lucas: "Je suis à la librairie, rejoignez-moi !"',
   'Marie: "Le fallafel est à tomber ! 🥙"',
   'Sophie: "RDV au musée Carnavalet ?"',
   'Thomas: "J\'arrive à Chez Janou dans 5 min"',
 ];
 
 export function SocialFlocks() {
   const [messageIndex, setMessageIndex] = useState(0);
 
   useEffect(() => {
     const interval = setInterval(() => {
       setMessageIndex((prev) => (prev + 1) % flockMessages.length);
     }, 5000);
     return () => clearInterval(interval);
   }, []);
 
   return (
    <div className="absolute bottom-6 left-6 bg-card/98 backdrop-blur-xl rounded-2xl p-4 max-w-[320px] shadow-lg border border-border z-[500]">
       <h4 className="font-['Outfit'] font-bold text-primary flex items-center gap-2 mb-3">
         <Users className="w-5 h-5" />
         Votre Flock (4 en ligne)
       </h4>
       <div className="flex gap-3 mb-3">
         {[1, 2, 3, 4].map((i) => (
           <div key={i} className="relative">
             <img
               src={`https://i.pravatar.cc/150?img=${i}`}
               alt={`Member ${i}`}
               className="w-11 h-11 rounded-full border-3 border-white shadow-md cursor-pointer hover:scale-110 transition-transform"
             />
             {i !== 3 && (
               <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[hsl(var(--success))] border-2 border-card rounded-full" />
             )}
           </div>
         ))}
       </div>
       <div className="bg-muted px-4 py-3 rounded-xl text-sm text-muted-foreground flex items-center gap-2">
         <MessageCircle className="w-4 h-4 flex-shrink-0" />
         <span>{flockMessages[messageIndex]}</span>
       </div>
     </div>
   );
 }