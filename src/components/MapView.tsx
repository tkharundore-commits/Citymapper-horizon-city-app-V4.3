 import { useEffect, useRef, useMemo } from "react";
 import L from "leaflet";
 import "leaflet/dist/leaflet.css";
 import { Discovery } from "@/types/discovery";
 import { MapControls } from "./MapControls";
 import { RouteSuggestion } from "./RouteSuggestion";
 import { SocialFlocks } from "./SocialFlocks";
 
 interface MapViewProps {
   city: string;
   discoveries: Discovery[];
   startCoords?: [number, number];
   endCoords?: [number, number];
   onDiscoveryClick: (discovery: Discovery) => void;
   centerCoords: [number, number];
   zoom: number;
 }
 
 const iconMap: Record<string, string> = {
   coffee: "☕",
   store: "🛍️",
   book: "📚",
   utensils: "🍽️",
   landmark: "🏛️",
   hamburger: "🍔",
 };
 
 export function MapView({
   discoveries,
   startCoords,
   endCoords,
   onDiscoveryClick,
   centerCoords,
   zoom,
 }: MapViewProps) {
   const mapRef = useRef<L.Map | null>(null);
   const mapContainerRef = useRef<HTMLDivElement>(null);
   const markersRef = useRef<Record<number, L.Marker>>({});
   const routeLineRef = useRef<L.Polyline | null>(null);
 
   // Initialize map
   useEffect(() => {
     if (!mapContainerRef.current || mapRef.current) return;
 
     mapRef.current = L.map(mapContainerRef.current).setView(centerCoords, zoom);
 
     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
       attribution: "© OpenStreetMap contributors",
       maxZoom: 19,
     }).addTo(mapRef.current);
 
     return () => {
       if (mapRef.current) {
         mapRef.current.remove();
         mapRef.current = null;
       }
     };
   }, []);
 
   // Update center when city changes
   useEffect(() => {
     if (mapRef.current) {
       mapRef.current.setView(centerCoords, zoom);
     }
   }, [centerCoords, zoom]);
 
   // Create custom icon
   const createCustomIcon = (emoji: string, color: string) => {
     return L.divIcon({
       html: `<div class="custom-icon" style="background: ${color}">${emoji}</div>`,
       className: "",
       iconSize: [40, 40],
       iconAnchor: [20, 20],
     });
   };
 
   // Memoize route points
   const routePoints = useMemo(() => {
     const points: [number, number][] = [];
     if (startCoords) points.push(startCoords);
     points.push(...discoveries.map((d) => d.coords));
     if (endCoords) points.push(endCoords);
     return points;
   }, [startCoords, endCoords, discoveries]);
 
   // Update markers and route
   useEffect(() => {
     if (!mapRef.current) return;
 
     // Clear existing markers
     Object.values(markersRef.current).forEach((marker) => marker.remove());
     markersRef.current = {};
 
     // Remove existing route
     if (routeLineRef.current) {
       routeLineRef.current.remove();
       routeLineRef.current = null;
     }
 
     // Add start marker
     if (startCoords) {
       L.marker(startCoords, {
         icon: createCustomIcon("🚩", "linear-gradient(135deg, #10B981, #059669)"),
       })
         .addTo(mapRef.current)
         .bindPopup('<div class="font-bold text-primary">Départ</div>');
     }
 
     // Add end marker
     if (endCoords) {
       L.marker(endCoords, {
         icon: createCustomIcon("📍", "linear-gradient(135deg, #EF4444, #DC2626)"),
       })
         .addTo(mapRef.current)
         .bindPopup('<div class="font-bold text-primary">Arrivée</div>');
     }
 
     // Add discovery markers
     discoveries.forEach((discovery) => {
       const marker = L.marker(discovery.coords, {
         icon: createCustomIcon(iconMap[discovery.icon] || "📍", discovery.color),
       })
         .addTo(mapRef.current!)
         .bindPopup(`
           <div class="font-bold text-primary mb-1">${discovery.name}</div>
           <div class="text-sm text-muted-foreground">${discovery.description}</div>
         `);
 
       marker.on("click", () => {
         onDiscoveryClick(discovery);
       });
 
       markersRef.current[discovery.id] = marker;
     });
 
     // Draw route line if we have points
     if (routePoints.length > 1) {
       routeLineRef.current = L.polyline(routePoints, {
         color: "#1C7293",
         weight: 4,
         opacity: 0.8,
         dashArray: "10, 5",
       }).addTo(mapRef.current);
     }
   }, [discoveries, startCoords, endCoords, routePoints, onDiscoveryClick]);
 
   const handleMyLocation = () => {
     if (!mapRef.current) return;
     if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition((position) => {
         const userLocation: [number, number] = [
           position.coords.latitude,
           position.coords.longitude,
         ];
         mapRef.current!.setView(userLocation, 16);
         L.marker(userLocation, {
           icon: createCustomIcon("👤", "linear-gradient(135deg, #F59E0B, #D97706)"),
         })
           .addTo(mapRef.current!)
           .bindPopup('<div class="font-bold text-primary">Vous êtes ici</div>')
           .openPopup();
       });
     }
   };
 
   const handleResetView = () => {
     if (!mapRef.current || !routeLineRef.current) return;
     mapRef.current.fitBounds(routeLineRef.current.getBounds(), { padding: [50, 50] });
   };
 
   const handleShowRoute = () => {
     if (!mapRef.current || !routeLineRef.current) return;
     mapRef.current.fitBounds(routeLineRef.current.getBounds(), { padding: [50, 50] });
     setTimeout(() => {
       routeLineRef.current?.setStyle({ color: "#02C39A", weight: 5 });
       setTimeout(() => {
         routeLineRef.current?.setStyle({ color: "#1C7293", weight: 4 });
       }, 1000);
     }, 500);
   };
 
   // Expose method to focus on discovery
   useEffect(() => {
     // @ts-ignore
     window.focusOnDiscovery = (discoveryId: number) => {
       const marker = markersRef.current[discoveryId];
       if (marker && mapRef.current) {
         const discovery = discoveries.find((d) => d.id === discoveryId);
         if (discovery) {
           mapRef.current.setView(discovery.coords, 17);
           marker.openPopup();
         }
       }
     };
   }, [discoveries]);
 
   return (
     <main className="relative rounded-3xl overflow-hidden shadow-lg h-[calc(100vh-120px)] sticky top-[100px]">
       <div ref={mapContainerRef} className="w-full h-full" />
       <MapControls
         onMyLocation={handleMyLocation}
         onResetView={handleResetView}
         onShowRoute={handleShowRoute}
       />
       <RouteSuggestion gemsCount={discoveries.length} />
       <SocialFlocks />
     </main>
   );
 }