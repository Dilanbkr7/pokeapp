
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { PokemonService } from '../../services/pokemon.service';

interface Pokemon {
  name: string;
  url: string;
}

interface GalleryImage {
  url: string;
  label: string;
}

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.page.html',
  styleUrls: ['./pokemon-list.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class PokemonListPage implements OnInit, OnDestroy {

  pokemons: Pokemon[] = [];
  filteredPokemons: Pokemon[] = [];

  selectedPokemon: any = null;
  galleryImages: GalleryImage[] = [];
  expandedImage: GalleryImage | null = null;

  loading = true;
  loadingDetails = false;
  error = '';
  detailError = '';

  audioPlaying = false;
  audioMessage = '';
  private audioPlayer: HTMLAudioElement | null = null;

  compareMode = false;
  compareNameA = 'pikachu';
  compareNameB = 'charizard';

  comparePokemonA: any = null;
  comparePokemonB: any = null;

  compareLoading = false;
  compareError = '';

  comparisonStats = [
    { key: 'hp', label: 'PS' },
    { key: 'attack', label: 'Ataque' },
    { key: 'defense', label: 'Defensa' },
    { key: 'special-attack', label: 'Ataque especial' },
    { key: 'special-defense', label: 'Defensa especial' },
    { key: 'speed', label: 'Velocidad' }
  ];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.fetchPokemons();
  }

  ngOnDestroy(): void {
    this.stopCry();
  }

  fetchPokemons(): void {
    this.loading = true;
    this.error = '';

    this.pokemonService.getPokemons(50).subscribe({
      next: response => {
        this.pokemons = response.results;
        this.filteredPokemons = response.results;
        this.loading = false;
      },
      error: error => {
        console.error('Error de PokéAPI:', error);
        this.error = 'No se pudieron cargar los Pokémon. Comprueba tu conexión.';
        this.loading = false;
      }
    });
  }

  searchPokemon(event: any): void {
    const search = (event.detail.value || '')
      .toLowerCase()
      .trim();

    this.filteredPokemons = this.pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(search)
    );
  }

  getPokemonId(url: string): string {
    return url.split('/').filter(Boolean).pop() || '';
  }

  getPokemonImage(url: string): string {
    const id = this.getPokemonId(url);

    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }

  openPokemon(pokemon: Pokemon): void {
    const id = this.getPokemonId(pokemon.url);

    this.stopCry();

    this.compareMode = false;
    this.selectedPokemon = null;
    this.galleryImages = [];
    this.expandedImage = null;
    this.detailError = '';
    this.audioMessage = '';
    this.loadingDetails = true;

    this.pokemonService.getPokemonDetails(id).subscribe({
      next: details => {
        this.selectedPokemon = details;
        this.galleryImages = this.buildGallery(details);
        this.loadingDetails = false;
      },
      error: error => {
        console.error('Error al cargar detalles:', error);
        this.detailError = 'No se pudieron cargar los detalles. Intenta nuevamente.';
        this.loadingDetails = false;
      }
    });
  }

  closeDetails(): void {
    this.stopCry();

    this.selectedPokemon = null;
    this.galleryImages = [];
    this.expandedImage = null;
    this.detailError = '';
    this.audioMessage = '';
    this.loadingDetails = false;
  }

  getOfficialArtwork(pokemon: any): string {
    return pokemon?.sprites?.other?.['official-artwork']?.front_default
      || pokemon?.sprites?.front_default
      || '';
  }

  buildGallery(pokemon: any): GalleryImage[] {
    const sprites = pokemon.sprites;
    const id = pokemon.id;

    const candidates: GalleryImage[] = [
      {
        url: sprites?.other?.['official-artwork']?.front_default,
        label: 'Ilustración oficial'
      },
      {
        url: sprites?.front_default,
        label: 'Vista frontal'
      },
      {
        url: sprites?.back_default,
        label: 'Vista posterior'
      },
      {
        url: sprites?.front_shiny,
        label: 'Versión variocolor'
      },
      {
        url: sprites?.back_shiny,
        label: 'Posterior variocolor'
      },
      {
        url: sprites?.other?.home?.front_default,
        label: 'Ilustración alternativa'
      },
      {
        url: sprites?.other?.home?.front_shiny,
        label: 'Alternativa variocolor'
      },
      {
        url: sprites?.other?.dream_world?.front_default,
        label: 'Dream World'
      },
      {
        url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        label: 'Sprite clásico'
      },
      {
        url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`,
        label: 'Sprite posterior'
      },
      {
        url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`,
        label: 'Sprite variocolor'
      }
    ];

    const seen = new Set<string>();
    const unique: GalleryImage[] = [];

    for (const image of candidates) {
      if (image.url && !seen.has(image.url)) {
        seen.add(image.url);
        unique.push(image);
      }
    }

    return unique;
  }

  playCry(): void {
    const cryUrl = this.selectedPokemon?.cries?.latest
      || this.selectedPokemon?.cries?.legacy;

    if (!cryUrl) {
      this.audioMessage = 'Este Pokémon no tiene sonido disponible.';
      return;
    }

    this.stopCry();
    this.audioMessage = '';

    this.audioPlayer = new Audio(cryUrl);
    this.audioPlaying = true;

    this.audioPlayer.onended = () => {
      this.audioPlaying = false;
      this.audioPlayer = null;
    };

    this.audioPlayer.onerror = () => {
      this.audioPlaying = false;
      this.audioPlayer = null;
      this.audioMessage = 'No se pudo cargar el sonido.';
    };

    this.audioPlayer.play().catch(error => {
      console.error('Error de audio:', error);
      this.audioPlaying = false;
      this.audioPlayer = null;
      this.audioMessage = 'No se pudo reproducir el sonido.';
    });
  }

  stopCry(): void {
    if (this.audioPlayer) {
      this.audioPlayer.pause();
      this.audioPlayer.currentTime = 0;
      this.audioPlayer.onended = null;
      this.audioPlayer.onerror = null;
      this.audioPlayer = null;
    }

    this.audioPlaying = false;
  }

  openImage(image: GalleryImage): void {
    this.expandedImage = image;
  }

  closeImage(): void {
    this.expandedImage = null;
  }

  hideBrokenImage(event: Event, image: GalleryImage): void {
    const element = event.target as HTMLImageElement;
    const parent = element.closest('.gallery-item') as HTMLElement | null;

    if (parent) {
      parent.style.display = 'none';
    }
  }

  openCompareMode(): void {
    this.stopCry();

    this.selectedPokemon = null;
    this.galleryImages = [];
    this.expandedImage = null;

    this.compareMode = true;
    this.compareError = '';
    this.comparePokemonA = null;
    this.comparePokemonB = null;
  }

  closeCompareMode(): void {
    this.compareMode = false;
    this.compareLoading = false;
    this.compareError = '';
    this.comparePokemonA = null;
    this.comparePokemonB = null;
  }

  runComparison(): void {
    if (!this.compareNameA || !this.compareNameB) {
      this.compareError = 'Selecciona dos Pokémon.';
      return;
    }

    if (this.compareNameA === this.compareNameB) {
      this.compareError = 'Selecciona dos Pokémon diferentes.';
      return;
    }

    this.compareLoading = true;
    this.compareError = '';
    this.comparePokemonA = null;
    this.comparePokemonB = null;

    forkJoin({
      first: this.pokemonService.getPokemonDetails(this.compareNameA),
      second: this.pokemonService.getPokemonDetails(this.compareNameB)
    }).subscribe({
      next: result => {
        this.comparePokemonA = result.first;
        this.comparePokemonB = result.second;
        this.compareLoading = false;
      },
      error: error => {
        console.error('Error de comparación:', error);
        this.compareError = 'No se pudo completar la comparación.';
        this.compareLoading = false;
      }
    });
  }

  getCompareStat(pokemon: any, statName: string): number {
    const stat = pokemon?.stats?.find(
      (item: any) => item.stat.name === statName
    );

    return stat?.base_stat ?? 0;
  }

  getStatPercentage(value: number): number {
    return Math.min((value / 200) * 100, 100);
  }

  getStatColor(statName: string): string {
    const colors: Record<string, string> = {
      hp: '#36d399',
      attack: '#ff7373',
      defense: '#60a5fa',
      'special-attack': '#c084fc',
      'special-defense': '#fbbf24',
      speed: '#22d3ee'
    };

    return colors[statName] || '#ffd54f';
  }

  formatStatName(name: string): string {
    const names: Record<string, string> = {
      hp: 'PS',
      attack: 'Ataque',
      defense: 'Defensa',
      'special-attack': 'Ataque especial',
      'special-defense': 'Defensa especial',
      speed: 'Velocidad'
    };

    return names[name] || name;
  }

  formatName(name: string): string {
    return name.replace(/-/g, ' ');
  }
}
