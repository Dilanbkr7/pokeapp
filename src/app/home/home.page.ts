import { Component, OnInit } from '@angular/core';
import { PokemonService, Pokemon } from '../services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  pokemonList: Pokemon[] = [];
  filteredPokemon: Pokemon[] = [];
  loading = true;
  error = '';

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.getPokemons(50).subscribe({
      next: (response) => {
        this.pokemonList = response.results;
        this.filteredPokemon = response.results;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar Pokémon:', err);
        this.error = 'No se pudieron cargar los Pokémon. Revisa tu conexión.';
        this.loading = false;
      },
    });
  }

  searchPokemon(event: any): void {
    const search = (event.detail.value || '').toLowerCase().trim();

    this.filteredPokemon = this.pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search)
    );
  }

  getPokemonId(url: string): string {
    return url.split('/').filter(Boolean).pop() || '';
  }

  getPokemonImage(url: string): string {
    const id = this.getPokemonId(url);
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }
}
