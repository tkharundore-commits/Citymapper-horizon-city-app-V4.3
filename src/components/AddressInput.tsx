 import { useState, useRef, useEffect } from "react";
 import { Input } from "@/components/ui/input";
 import { MapPin, Circle, Loader2 } from "lucide-react";
 import { useAddressAutocomplete } from "@/hooks/useAddressAutocomplete";
 import { AddressSuggestion } from "@/types/discovery";
 
 interface AddressInputProps {
   type: "departure" | "destination";
   value: string;
   onChange: (value: string, coords?: [number, number]) => void;
   city: string;
   placeholder?: string;
 }
 
 export function AddressInput({
   type,
   value,
   onChange,
   city,
   placeholder,
 }: AddressInputProps) {
   const [inputValue, setInputValue] = useState(value);
   const [showSuggestions, setShowSuggestions] = useState(false);
   const { suggestions, isLoading, searchAddresses, clearSuggestions } =
     useAddressAutocomplete(city);
   const inputRef = useRef<HTMLInputElement>(null);
   const containerRef = useRef<HTMLDivElement>(null);
 
   useEffect(() => {
     const handleClickOutside = (event: MouseEvent) => {
       if (
         containerRef.current &&
         !containerRef.current.contains(event.target as Node)
       ) {
         setShowSuggestions(false);
       }
     };
     document.addEventListener("mousedown", handleClickOutside);
     return () => document.removeEventListener("mousedown", handleClickOutside);
   }, []);
 
   useEffect(() => {
     setInputValue(value);
   }, [value]);
 
   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const newValue = e.target.value;
     setInputValue(newValue);
     searchAddresses(newValue);
     setShowSuggestions(true);
   };
 
   const handleSelectSuggestion = (suggestion: AddressSuggestion) => {
     const coords: [number, number] = [
       parseFloat(suggestion.lat),
       parseFloat(suggestion.lon),
     ];
     setInputValue(suggestion.display_name.split(",")[0]);
     onChange(suggestion.display_name.split(",")[0], coords);
     setShowSuggestions(false);
     clearSuggestions();
   };
 
   const isDeparture = type === "departure";
 
   return (
     <div ref={containerRef} className="relative">
       <div className="relative">
         <div
           className={`absolute left-3 top-1/2 -translate-y-1/2 ${
             isDeparture ? "text-green-500" : "text-red-500"
           }`}
         >
           {isDeparture ? (
             <Circle className="w-4 h-4 fill-current" />
           ) : (
             <MapPin className="w-4 h-4" />
           )}
         </div>
         <Input
           ref={inputRef}
           type="text"
           value={inputValue}
           onChange={handleInputChange}
           onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
           placeholder={placeholder || (isDeparture ? "Départ" : "Destination")}
           className="pl-10 pr-10 py-3 border-2 border-border rounded-xl focus:border-[hsl(162,94%,39%)] focus:ring-[hsl(162,94%,39%,0.1)] transition-all"
         />
         {isLoading && (
           <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" />
         )}
       </div>
 
       {showSuggestions && suggestions.length > 0 && (
         <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-xl shadow-lg z-50 overflow-hidden">
           {suggestions.map((suggestion) => (
             <button
               key={suggestion.place_id}
               type="button"
               onClick={() => handleSelectSuggestion(suggestion)}
               className="w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors text-sm border-b border-border last:border-b-0"
             >
               <div className="flex items-center gap-2">
                 <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                 <span className="line-clamp-1">{suggestion.display_name}</span>
               </div>
             </button>
           ))}
         </div>
       )}
     </div>
   );
 }