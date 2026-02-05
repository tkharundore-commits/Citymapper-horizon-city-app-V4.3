 import { Lightbulb } from "lucide-react";
 
 interface RouteSuggestionProps {
   gemsCount: number;
 }
 
 export function RouteSuggestion({ gemsCount }: RouteSuggestionProps) {
   return (
     <div className="absolute top-6 left-6 bg-white/98 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-border max-w-[280px] flex items-center gap-4 z-[500]">
       <div className="w-12 h-12 bg-gradient-to-br from-[hsl(162,94%,39%)] to-[hsl(162,94%,45%)] rounded-xl flex items-center justify-center text-white flex-shrink-0">
         <Lightbulb className="w-6 h-6" />
       </div>
       <div>
         <h4 className="font-['Outfit'] font-bold text-primary text-sm">
           Itinéraire intelligent
         </h4>
         <p className="text-xs text-muted-foreground">
           {gemsCount} pépites locales découvertes sur votre trajet
         </p>
       </div>
     </div>
   );
 }