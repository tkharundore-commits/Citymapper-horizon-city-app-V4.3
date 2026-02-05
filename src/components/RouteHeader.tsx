 import { Clock, Footprints, Gem } from "lucide-react";
 
 interface RouteHeaderProps {
   title: string;
   subtitle: string;
   duration: string;
   distance: string;
   gemsCount: number;
 }
 
 export function RouteHeader({
   title,
   subtitle,
   duration,
   distance,
   gemsCount,
 }: RouteHeaderProps) {
   return (
     <div className="bg-gradient-to-r from-primary to-[hsl(197,72%,30%)] text-white p-6 rounded-2xl mb-6">
       <h2 className="font-['Outfit'] text-xl font-bold mb-2">{title}</h2>
       <p className="opacity-90 text-sm mb-4">{subtitle}</p>
       <div className="flex gap-6">
         <div className="flex items-center gap-2">
           <Clock className="w-4 h-4 text-[hsl(162,94%,39%)]" />
           <span className="text-sm">{duration}</span>
         </div>
         <div className="flex items-center gap-2">
           <Footprints className="w-4 h-4 text-[hsl(162,94%,39%)]" />
           <span className="text-sm">{distance}</span>
         </div>
         <div className="flex items-center gap-2">
           <Gem className="w-4 h-4 text-[hsl(162,94%,39%)]" />
           <span className="text-sm">{gemsCount} pépites</span>
         </div>
       </div>
     </div>
   );
 }