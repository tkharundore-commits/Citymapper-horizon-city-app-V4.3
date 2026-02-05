 import { Discovery } from "@/types/discovery";
import { Star, Euro, Ticket, Heart, Coffee, ShoppingBag, Book, Utensils, Landmark, Sandwich } from "lucide-react";
 
 interface DiscoveryCardProps {
   discovery: Discovery;
   onClick: () => void;
 }
 
 const iconMap: Record<string, React.ElementType> = {
   coffee: Coffee,
   store: ShoppingBag,
   book: Book,
   utensils: Utensils,
   landmark: Landmark,
  hamburger: Sandwich,
 };
 
 export function DiscoveryCard({ discovery, onClick }: DiscoveryCardProps) {
   const IconComponent = iconMap[discovery.icon] || Coffee;
 
   return (
     <div
       onClick={onClick}
       className={`bg-gradient-to-br from-muted/30 to-white rounded-2xl p-5 cursor-pointer transition-all duration-300 border-2 border-border relative overflow-hidden hover:translate-x-2 hover:shadow-lg hover:border-[hsl(162,94%,39%)] group ${
         discovery.visited ? "opacity-70 border-green-500" : ""
       }`}
     >
       {/* Left accent bar */}
       <div
         className={`absolute top-0 left-0 w-1 h-full transform origin-top transition-transform duration-300 ${
           discovery.visited ? "scale-y-100 bg-green-500" : "scale-y-0 bg-[hsl(162,94%,39%)] group-hover:scale-y-100"
         }`}
       />
 
       <div className="flex justify-between items-start mb-3">
         <div
           className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg"
           style={{ background: discovery.color }}
         >
           <IconComponent className="w-6 h-6" />
         </div>
         <div className="flex flex-col items-end gap-2">
           <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md">
             {discovery.order}
           </span>
           <span className="text-sm font-semibold text-[hsl(162,94%,39%)] bg-[hsl(162,94%,39%,0.1)] px-3 py-1 rounded-full">
             {discovery.distance}
           </span>
         </div>
       </div>
 
       <h4 className="font-['Outfit'] font-bold text-lg mb-2 text-foreground">
         {discovery.name}
       </h4>
       <p className="text-sm text-muted-foreground leading-relaxed mb-3">
         {discovery.description}
       </p>
 
       <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
         <span className="flex items-center gap-1">
           <Star className="w-3.5 h-3.5 text-[hsl(162,94%,39%)]" />
           {discovery.rating}
         </span>
         <span className="flex items-center gap-1">
           {discovery.price === "Gratuit" ? (
             <Ticket className="w-3.5 h-3.5 text-[hsl(162,94%,39%)]" />
           ) : (
             <Euro className="w-3.5 h-3.5 text-[hsl(162,94%,39%)]" />
           )}
           {discovery.price}
         </span>
         <span className="flex items-center gap-1">
           <Heart className="w-3.5 h-3.5 text-[hsl(162,94%,39%)]" />
           {discovery.likes}
         </span>
       </div>
     </div>
   );
 }