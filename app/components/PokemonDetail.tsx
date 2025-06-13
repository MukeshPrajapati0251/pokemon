
import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader,  } from "../components/ui/card";
import { ArrowLeft } from "lucide-react";
import { joinPokemonFields } from "@/utils";

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

interface PokemonDetailProps {
  pokemon: Pokemon;
  onBack: () => void;
}

interface DetailedPokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    back_default: string;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
}

const TYPE_COLORS: { [key: string]: string } = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-blue-200",
  fighting: "bg-red-700",
  poison: "bg-purple-500",
  ground: "bg-yellow-600",
  flying: "bg-indigo-400",
  psychic: "bg-pink-500",
  bug: "bg-green-400",
  rock: "bg-yellow-800",
  ghost: "bg-purple-700",
  dragon: "bg-indigo-700",
  dark: "bg-gray-800",
  steel: "bg-gray-500",
  fairy: "bg-pink-300",
};

export const PokemonDetail = ({ pokemon, onBack }: PokemonDetailProps) => {
  const [detailedPokemon, setDetailedPokemon] = useState<DetailedPokemon | null>(null);
  const [loading, setLoading] = useState(true);

  const { types,
    stats,
    abilities,
    moves,} = joinPokemonFields(detailedPokemon)

  useEffect(() => {
    const fetchDetailedPokemon = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);
        const data = await response.json();
        setDetailedPokemon(data);
      } catch (error) {
        console.error("Error fetching detailed Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetailedPokemon();
  }, [pokemon.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!detailedPokemon) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Failed to load Pokémon details</p>
      </div>
    );
  }

  console.log(detailedPokemon,'detailedPokemon');
  

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button 
          onClick={onBack} 
          variant="outline" 
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="max-w-2xl mx-auto">
          <Card className="bg-card border-border">
            <CardHeader className="text-center">
              <div className="max-h-96 mx-auto mb-4 bg-green-400 rounded-lg flex items-center justify-center overflow-hidden">
                {detailedPokemon.sprites.front_default ? (
                  <img
                    src={detailedPokemon.sprites.front_default}
                    alt={detailedPokemon.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="max-h-96 bg-green-400"></div>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="flex">
                <span className="text-sm font-bold">
                  Name: 
                </span>
                <span className="text-sm text-card-foreground ml-2">{detailedPokemon.name.charAt(0).toUpperCase() + detailedPokemon.name.slice(1)}</span>
              </div>
              <div className="flex">
                <span className="text-sm font-bold">
                  Type: 
                </span>
                <span className="text-sm text-card-foreground ml-2">{types}</span>
              </div>
              <div className="flex">
                <span className="text-sm font-bold">
                  Status: 
                </span>
                <span className="text-sm text-card-foreground ml-2">{stats}</span>
              </div>
              <div className="flex">
                <span className="text-sm font-bold">
                  Abilities: 
                </span>
                <span className="text-sm text-card-foreground ml-2">{abilities}</span>
              </div>
              <div className="flex">
                <span className="text-sm font-bold">
                  Some Moves: 
                </span>
                <span className="text-sm text-card-foreground ml-2">{moves}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
