import { useState, useRef, useMemo, useCallback } from "react";
import { Compass, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/HeroSection";
import { Header } from "@/components/Header";
import { AddressInput } from "@/components/AddressInput";
import { CitySelector } from "@/components/CitySelector";
import { FilterTabs } from "@/components/FilterTabs";
import { DiscoveryCard } from "@/components/DiscoveryCard";
import { RouteHeader } from "@/components/RouteHeader";
import { MapView } from "@/components/MapView";
import { StoriesBar } from "@/components/StoriesBar";
import { Footer } from "@/components/Footer";
import { FloatingAction } from "@/components/FloatingAction";
import { Discovery } from "@/types/discovery";
import {
  cities,
  parisDiscoveries,
  athensDiscoveries,
} from "@/data/cities";
import { toast } from "@/hooks/use-toast";

export default function Index() {
  const [selectedCity, setSelectedCity] = useState("paris");
  const [departure, setDeparture] = useState("");
  const [departureCoords, setDepartureCoords] = useState<[number, number] | undefined>();
  const [destination, setDestination] = useState("");
  const [destinationCoords, setDestinationCoords] = useState<[number, number] | undefined>();
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [discoveries, setDiscoveries] = useState<Discovery[]>(parisDiscoveries);
  const [hasSearched, setHasSearched] = useState(false);

  const appSectionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const currentCity = cities.find((c) => c.id === selectedCity) || cities[0];

  // Handle city change
  const handleCityChange = useCallback((cityId: string) => {
    setSelectedCity(cityId);
    setDeparture("");
    setDepartureCoords(undefined);
    setDestination("");
    setDestinationCoords(undefined);
    setDiscoveries(cityId === "paris" ? parisDiscoveries : athensDiscoveries);
    setHasSearched(false);
  }, []);

  // Handle departure change
  const handleDepartureChange = useCallback(
    (value: string, coords?: [number, number]) => {
      setDeparture(value);
      if (coords) setDepartureCoords(coords);
    },
    []
  );

  // Handle destination change
  const handleDestinationChange = useCallback(
    (value: string, coords?: [number, number]) => {
      setDestination(value);
      if (coords) setDestinationCoords(coords);
    },
    []
  );

  // Handle route search
  const handleSearchRoute = useCallback(() => {
    if (!departureCoords || !destinationCoords) {
      toast({
        title: "Adresses manquantes",
        description: "Veuillez sélectionner un départ et une destination.",
        variant: "destructive",
      });
      return;
    }

    // Filter discoveries that are "along the route" (simplified: all discoveries for now)
    const cityDiscoveries = selectedCity === "paris" ? parisDiscoveries : athensDiscoveries;
    setDiscoveries(cityDiscoveries);
    setHasSearched(true);

    toast({
      title: "Itinéraire trouvé !",
      description: `${cityDiscoveries.length} pépites découvertes sur votre trajet.`,
    });
  }, [departureCoords, destinationCoords, selectedCity]);

  // Filter discoveries
  const filteredDiscoveries = useMemo(() => {
    let filtered = discoveries;
    
    if (activeFilter !== "all") {
      filtered = filtered.filter((d) => d.category === activeFilter);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (d) =>
          d.name.toLowerCase().includes(query) ||
          d.description.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [discoveries, activeFilter, searchQuery]);

  // Handle discovery click
  const handleDiscoveryClick = useCallback((discovery: Discovery) => {
    // @ts-ignore
    window.focusOnDiscovery?.(discovery.id);
    setDiscoveries((prev) =>
      prev.map((d) => (d.id === discovery.id ? { ...d, visited: true } : d))
    );
  }, []);

  // Scroll handlers
  const scrollToApp = useCallback(() => {
    appSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollToHero = useCallback(() => {
    heroRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Handle smart itinerary
  const handleSmartItinerary = useCallback(() => {
    const cityName = selectedCity === "paris" ? "Paris" : "Athènes";
    const cityDiscoveries = selectedCity === "paris" ? parisDiscoveries : athensDiscoveries;
    
    toast({
      title: "🎯 Smart Itinerary activé !",
      description: `L'IA a généré un itinéraire optimisé avec ${cityDiscoveries.length} pépites à ${cityName}.`,
    });
  }, [selectedCity]);

  // Route info
  const routeInfo = useMemo(() => {
    if (selectedCity === "paris") {
      return {
        title: hasSearched && departure && destination
          ? `De ${departure} à ${destination}`
          : "Du Louvre au Marais",
        subtitle: "Itinéraire culturel et gastronomique",
        duration: "2h30",
        distance: "3.2 km",
      };
    }
    return {
      title: hasSearched && departure && destination
        ? `De ${departure} à ${destination}`
        : "De Monastiraki à Plaka",
      subtitle: "Découverte du cœur historique d'Athènes",
      duration: "3h00",
      distance: "2.8 km",
    };
  }, [selectedCity, hasSearched, departure, destination]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div ref={heroRef}>
        <HeroSection onScrollToApp={scrollToApp} />
      </div>

      {/* App Section */}
      <section ref={appSectionRef} id="app" className="min-h-screen bg-muted/30">
        <Header onScrollToHero={scrollToHero} />

        <div className="max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8 min-h-[calc(100vh-80px)]">
          {/* Sidebar */}
          <aside className="bg-white rounded-3xl p-6 shadow-lg overflow-y-auto max-h-[calc(100vh-120px)] lg:sticky lg:top-[100px]">
            {/* City Selector */}
            <div className="mb-4">
              <CitySelector value={selectedCity} onChange={handleCityChange} />
            </div>

            {/* Address Inputs */}
            <div className="space-y-3 mb-4">
              <AddressInput
                type="departure"
                value={departure}
                onChange={handleDepartureChange}
                city={selectedCity}
                placeholder="Adresse de départ"
              />
              <AddressInput
                type="destination"
                value={destination}
                onChange={handleDestinationChange}
                city={selectedCity}
                placeholder="Adresse de destination"
              />
              <Button
                onClick={handleSearchRoute}
                className="w-full rounded-xl py-3 bg-gradient-to-r from-[hsl(162,94%,39%)] to-[hsl(162,94%,45%)] text-[hsl(222,47%,11%)] font-semibold hover:opacity-90 transition-opacity"
              >
                <Search className="w-4 h-4 mr-2" />
                Rechercher l'itinéraire
              </Button>
            </div>

            {/* Search Box */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher un lieu, une activité..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-border rounded-xl text-base focus:outline-none focus:border-[hsl(162,94%,39%)] focus:ring-4 focus:ring-[hsl(162,94%,39%,0.1)] transition-all"
              />
            </div>

            {/* Route Header */}
            <RouteHeader
              title={routeInfo.title}
              subtitle={routeInfo.subtitle}
              duration={routeInfo.duration}
              distance={routeInfo.distance}
              gemsCount={filteredDiscoveries.length}
            />

            {/* Filter Tabs */}
            <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />

            {/* Section Title */}
            <h3 className="font-['Outfit'] text-lg font-bold text-primary flex items-center gap-2 mt-6 mb-4">
              <Compass className="w-5 h-5" />
              Pépites sur votre chemin
            </h3>

            {/* Discovery Cards */}
            <div className="space-y-4">
              {filteredDiscoveries.map((discovery) => (
                <DiscoveryCard
                  key={discovery.id}
                  discovery={discovery}
                  onClick={() => handleDiscoveryClick(discovery)}
                />
              ))}
              {filteredDiscoveries.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  Aucune pépite trouvée pour cette recherche.
                </p>
              )}
            </div>
          </aside>

          {/* Map Column */}
          <div className="flex flex-col gap-0 sticky top-[100px] h-[calc(100vh-120px)]">
            {/* Stories Bar */}
            <StoriesBar />
            {/* Map */}
            <div className="flex-1 min-h-0">
              <MapView
                city={selectedCity}
                discoveries={filteredDiscoveries}
                startCoords={departureCoords || (selectedCity === "paris" ? [48.8606, 2.3376] : [37.9755, 23.7265])}
                endCoords={destinationCoords || (selectedCity === "paris" ? [48.8575, 2.3595] : [37.9720, 23.7330])}
                onDiscoveryClick={handleDiscoveryClick}
                centerCoords={currentCity.center}
                zoom={currentCity.zoom}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Floating Action Button */}
      <FloatingAction onClick={handleSmartItinerary} />
    </div>
  );
}
