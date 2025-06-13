
"use client"
import { useState, useEffect } from "react";
import { PokemonCard } from "./components/PokemonCard";
import { SearchBar } from "./components/SearchBar";
import { PokemonDetail } from "./components/PokemonDetail";

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
}

const HomePage = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  // Fetch initial Pokémon data (first 151 for performance)
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const promises = [];
        for (let i = 1; i <= 151; i++) {
          promises.push(
            fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
              .then(res => res.json())
          );
        }
        const results = await Promise.all(promises);
        setPokemon(results);
        setFilteredPokemon(results);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  // Filter Pokémon based on search term and type
  useEffect(() => {
    let filtered = pokemon;

    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType && selectedType !== "all") {
      filtered = filtered.filter(p => 
        p.types.some(t => t.type.name === selectedType)
      );
    }

    setFilteredPokemon(filtered);
  }, [searchTerm, selectedType, pokemon]);

  if (selectedPokemon) {
    return (
      <PokemonDetail 
        pokemon={selectedPokemon} 
        onBack={() => setSelectedPokemon(null)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
        />

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-8">
            {filteredPokemon.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                onClick={() => setSelectedPokemon(pokemon)}
              />
            ))}
          </div>
        )}

        {!loading && filteredPokemon.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              No Pokémon found matching your criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
