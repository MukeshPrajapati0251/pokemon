
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedType: string;
  onTypeChange: (type: string) => void;
}

const POKEMON_TYPES = [
  "normal", "fire", "water", "electric", "grass", "ice",
  "fighting", "poison", "ground", "flying", "psychic", "bug",
  "rock", "ghost", "dragon", "dark", "steel", "fairy"
];

export const SearchBar = ({ searchTerm, onSearchChange, selectedType, onTypeChange }: SearchBarProps) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  const handleSearch = () => {
    onSearchChange(localSearchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex-col md:flex-row gap-4 items-center justify-center max-w-2xl">
      <div className="mb-4">
      <Select  value={selectedType} onValueChange={onTypeChange}>
        <SelectTrigger className="w-full md:w-48">
          <SelectValue placeholder="Select Type" />
        </SelectTrigger>
        <SelectContent className="bg-background border border-border">
          <SelectItem value="all">All Types</SelectItem>
          {POKEMON_TYPES.map((type) => (
            <SelectItem key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
        </Select>
        </div>
      <div className="flex flex-1 w-full md:w-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            type="text"
            placeholder="Search Pokémon..."
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10 w-80 bg-muted/50 border-border rounded-r-none"
          />
        </div>
        <Button 
          onClick={handleSearch}
          className="rounded-l-none px-4 bg-blue-500"
        >
          Search
        </Button>
      </div>
      
      
    </div>
  );
};
