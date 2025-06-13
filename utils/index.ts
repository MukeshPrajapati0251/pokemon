import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Joins the names from types, stats, abilities, and the first 7 moves from a Pokémon object.
 * @param pokemon - The Pokémon data object.
 * @returns An object with joined strings for each category.
 */
type PokemonType = {
  type: { name: string }
};

type PokemonStat = {
  stat: { name: string }
};

type PokemonAbility = {
  ability: { name: string }
};

type PokemonMove = {
  move: { name: string }
};

type Pokemon = {
  types?: PokemonType[];
  stats?: PokemonStat[];
  abilities?: PokemonAbility[];
  moves?: PokemonMove[];
};

type JoinedFields = {
  types: string;
  stats: string;
  abilities: string;
  moves: string;
};

export function joinPokemonFields(pokemon: Pokemon): JoinedFields {
  // Join type names
  const types = (pokemon?.types || [])
    .map((t) => t.type?.name)
    .filter(Boolean)
    .join(', ');

  // Join stat names
  const stats = (pokemon?.stats || [])
    .map((s) => s.stat?.name)
    .filter(Boolean)
    .join(', ');

  // Join ability names
  const abilities = (pokemon?.abilities || [])
    .map((a) => a.ability?.name)
    .filter(Boolean)
    .join(', ');

  // Join first 7 move names
  const moves = (pokemon?.moves || [])
    .slice(0, 7)
    .map((m) => m.move?.name)
    .filter(Boolean)
    .join(', ');

  return {
    types,
    stats,
    abilities,
    moves,
  };
}