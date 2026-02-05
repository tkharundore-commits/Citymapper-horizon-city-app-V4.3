 import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from "@/components/ui/select";
 import { cities } from "@/data/cities";
 
 interface CitySelectorProps {
   value: string;
   onChange: (value: string) => void;
 }
 
 export function CitySelector({ value, onChange }: CitySelectorProps) {
   return (
     <Select value={value} onValueChange={onChange}>
       <SelectTrigger className="w-full border-2 border-border rounded-xl focus:border-[hsl(162,94%,39%)] focus:ring-[hsl(162,94%,39%,0.1)]">
         <SelectValue placeholder="Sélectionner une ville" />
       </SelectTrigger>
       <SelectContent className="bg-white border border-border rounded-xl shadow-lg z-[100]">
         {cities.map((city) => (
           <SelectItem key={city.id} value={city.id} className="cursor-pointer hover:bg-muted/50">
             <div className="flex items-center gap-2">
               <span className="text-lg">{city.id === "paris" ? "🇫🇷" : "🇬🇷"}</span>
               <span>{city.name}, {city.country}</span>
             </div>
           </SelectItem>
         ))}
       </SelectContent>
     </Select>
   );
 }