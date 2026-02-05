 export interface Discovery {
   id: number;
   name: string;
   coords: [number, number];
   icon: string;
   category: "cafe" | "culture" | "food";
   description: string;
   distance: string;
   order: string;
   rating: number;
   price: string;
   likes: number;
   visited: boolean;
   color: string;
 }
 
 export interface AddressSuggestion {
   display_name: string;
   lat: string;
   lon: string;
   place_id: number;
 }