 import { Grid3X3, Coffee, Palette, Utensils } from "lucide-react";
 
 interface FilterTabsProps {
   activeFilter: string;
   onFilterChange: (filter: string) => void;
 }
 
 const filters = [
   { id: "all", label: "Tout", icon: Grid3X3 },
   { id: "cafe", label: "Cafés", icon: Coffee },
   { id: "culture", label: "Culture", icon: Palette },
   { id: "food", label: "Resto", icon: Utensils },
 ];
 
 export function FilterTabs({ activeFilter, onFilterChange }: FilterTabsProps) {
   return (
     <div className="flex gap-2 overflow-x-auto pb-2">
       {filters.map((filter) => {
         const Icon = filter.icon;
         const isActive = activeFilter === filter.id;
         return (
           <button
             key={filter.id}
             onClick={() => onFilterChange(filter.id)}
             className={`px-4 py-2 rounded-full border-2 font-medium text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
               isActive
                 ? "bg-[hsl(162,94%,39%)] text-white border-[hsl(162,94%,39%)]"
                 : "bg-white text-muted-foreground border-border hover:border-[hsl(162,94%,39%)] hover:text-[hsl(162,94%,39%)]"
             }`}
           >
             <Icon className="w-4 h-4" />
             {filter.label}
           </button>
         );
       })}
     </div>
   );
 }