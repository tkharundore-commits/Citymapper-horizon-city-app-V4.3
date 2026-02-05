 import { Navigation, Maximize2, Route } from "lucide-react";
 
 interface MapControlsProps {
   onMyLocation: () => void;
   onResetView: () => void;
   onShowRoute: () => void;
 }
 
 export function MapControls({ onMyLocation, onResetView, onShowRoute }: MapControlsProps) {
   return (
     <div className="absolute top-6 right-6 flex flex-col gap-3 z-[500]">
       <button
         onClick={onMyLocation}
         className="w-12 h-12 bg-white/95 backdrop-blur-sm border border-border rounded-xl flex items-center justify-center cursor-pointer transition-all text-primary hover:bg-primary hover:text-white hover:scale-110 shadow-md"
         title="Ma position"
       >
         <Navigation className="w-5 h-5" />
       </button>
       <button
         onClick={onResetView}
         className="w-12 h-12 bg-white/95 backdrop-blur-sm border border-border rounded-xl flex items-center justify-center cursor-pointer transition-all text-primary hover:bg-primary hover:text-white hover:scale-110 shadow-md"
         title="Vue d'ensemble"
       >
         <Maximize2 className="w-5 h-5" />
       </button>
       <button
         onClick={onShowRoute}
         className="w-12 h-12 bg-white/95 backdrop-blur-sm border border-border rounded-xl flex items-center justify-center cursor-pointer transition-all text-primary hover:bg-primary hover:text-white hover:scale-110 shadow-md"
         title="Afficher l'itinéraire"
       >
         <Route className="w-5 h-5" />
       </button>
     </div>
   );
 }