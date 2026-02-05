 import { Wand2 } from "lucide-react";
 
 interface FloatingActionProps {
   onClick: () => void;
 }
 
 export function FloatingAction({ onClick }: FloatingActionProps) {
   return (
     <button
       onClick={onClick}
       className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-[hsl(162,94%,39%)] to-[hsl(162,94%,45%)] rounded-full flex items-center justify-center text-white text-2xl cursor-pointer shadow-lg animate-pulse-glow transition-transform hover:scale-110 hover:rotate-90 z-[1001]"
       title="Smart Itinerary"
     >
       <Wand2 className="w-7 h-7" />
     </button>
   );
 }