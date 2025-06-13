
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

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

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: () => void;
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

export const PokemonCard = ({ pokemon, onClick }: PokemonCardProps) => {
  return (
    <Card 
      className=" transition-all duration-200 hover:scale-105 hover:shadow-lg bg-card border-border m-0"
      
    >
      <CardHeader className="text-center">
        <div className="h-48 mx-auto ">
          {pokemon.sprites.front_default ? (
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="h-48 bg-gray-300"></div>
          )}
        </div>        
      </CardHeader>
      <CardContent className="bg-muted">
        <CardTitle className="text-lg font-semibold text-card-foreground">
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </CardTitle>
        <div className="cursor-pointer text-blue-600 mt-8" onClick={onClick}>
          Details
        </div>
      </CardContent>
    </Card>
  );
};
