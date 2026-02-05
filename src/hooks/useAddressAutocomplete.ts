 import { useState, useCallback } from "react";
 import { AddressSuggestion } from "@/types/discovery";
 
 export function useAddressAutocomplete(city: string) {
   const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
   const [isLoading, setIsLoading] = useState(false);
 
   const searchAddresses = useCallback(
     async (query: string) => {
       if (query.length < 3) {
         setSuggestions([]);
         return;
       }
 
       setIsLoading(true);
       try {
         const cityName = city === "paris" ? "Paris, France" : "Athens, Greece";
         const response = await fetch(
           `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
             query + ", " + cityName
           )}&limit=5&addressdetails=1`
         );
         const data = await response.json();
         setSuggestions(data);
       } catch (error) {
         console.error("Error fetching addresses:", error);
         setSuggestions([]);
       } finally {
         setIsLoading(false);
       }
     },
     [city]
   );
 
   const clearSuggestions = useCallback(() => {
     setSuggestions([]);
   }, []);
 
   return { suggestions, isLoading, searchAddresses, clearSuggestions };
 }