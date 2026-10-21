
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';

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
})
export class PokemonListPage implements OnInit {
  // LISTA DE POKÉMON
  pokemons: Pokemon[] = [];
  filteredPokemons: Pokemon[] = [];

  // DETALLES DEL POKÉMON
  selectedPokemon: any = null;
  galleryImages: GalleryImage[] = [];
  expandedImage: GalleryImage | null = null;

  // ESTADOS DE CARGA Y ERRORES
  loading = true;
  loadingDetails = false;
  error = '';
  detailError = '';

  // SONIDO DEL POKÉMON
  audioPlaying = false;
  audioMessage = '';
  private audioPlayer: HTMLAudioElement | null = null;

  // ANIMACIÓN DEL POKÉMON
  animationUrl = '';
  animationAvailable = true;

  // NIVEL 3: COMPARADOR
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
    { key: 'special-attack', label: 'At. especial' },
    { key: 'special-defense', label: 'Def. especial' },
    { key: 'speed', label: 'Velocidad' },
  ];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.fetchPokemons();
  }

  // ==========================================
  // CARGAR LA LISTA DE POKÉMON
  // ==========================================

  fetchPokemons(): void {
    this.loading = true;
    this.error = '';

    this.pokemonService.getPokemons(50).subscribe({
      next: (response) => {
        this.pokemons = response.results;
        this.filteredPokemons = response.results;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar Pokémon:', error);

        this.error = 'No se pudieron cargar los Pokémon.';
        this.loading = false;
      },
    });
  }

  // ==========================================
  // BUSCAR POKÉMON
  // ==========================================

  searchPokemon(event: any): void {
    const search = (event.detail.value || '')
      .toLowerCase()
      .trim();

    this.filteredPokemons = this.pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search)
    );
  }

  // ==========================================
  // OBTENER ID E IMAGEN
  // ==========================================

  getPokemonId(url: string): string {
    return url.split('/').filter(Boolean).pop() || '';
  }

  getPokemonImage(url: string): string {
    const id = this.getPokemonId(url);

    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }

  // ==========================================
  // ABRIR DETALLES DEL POKÉMON
  // ==========================================

  openPokemon(pokemon: Pokemon): void {
    const id = this.getPokemonId(pokemon.url);

    this.stopCry();

    this.compareMode = false;
    this.selectedPokemon = null;
    this.galleryImages = [];
    this.expandedImage = null;
    this.animationUrl = '';
    this.animationAvailable = true;
    this.loadingDetails = true;
    this.detailError = '';
    this.audioMessage = '';

    this.pokemonService.getPokemonDetails(id).subscribe({
      next: (details) => {
        this.selectedPokemon = details;
        this.galleryImages = this.buildGallery(details);

        this.animationUrl =
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${details.id}.gif`;

        this.loadingDetails = false;
      },
      error: (error) => {
        console.error('Error al cargar los detalles:', error);

        this.detailError =
          'No se pudieron cargar los detalles. Intenta de nuevo.';

        this.loadingDetails = false;
      },
    });
  }

  // ==========================================
  // CERRAR DETALLES
  // ==========================================

  closeDetails(): void {
    this.stopCry();

    this.selectedPokemon = null;
    this.galleryImages = [];
    this.expandedImage = null;
    this.animationUrl = '';
    this.animationAvailable = true;
    this.detailError = '';
    this.audioMessage = '';
  }

  // ==========================================
  // OBTENER ILUSTRACIÓN OFICIAL
  // ==========================================

  getOfficialArtwork(pokemon: any): string {
    return (
      pokemon.sprites?.other?.['official-artwork']?.front_default ||
      pokemon.sprites?.front_default ||
      ''
    );
  }

  // ==========================================
  // CONSTRUIR GALERÍA DE IMÁGENES
  // ==========================================

  buildGallery(pokemon: any): GalleryImage[] {
    const id = pokemon.id;
    const sprites = pokemon.sprites;

    const candidates: GalleryImage[] = [
      {
        url: sprites?.other?.['official-artwork']?.front_default,
        label: 'Ilustración oficial',
      },
      {
        url: sprites?.front_default,
        label: 'Vista frontal',
      },
      {
        url: sprites?.back_default,
        label: 'Vista posterior',
      },
      {
        url: sprites?.front_shiny,
        label: 'Versión variocolor',
      },
      {
        url: sprites?.back_shiny,
        label: 'Vista posterior variocolor',
      },
      {
        url: sprites?.other?.home?.front_default,
        label: 'Ilustración alternativa',
      },
      {
        url: sprites?.other?.home?.front_shiny,
        label: 'Ilustración alternativa variocolor',
      },
      {
        url: sprites?.other?.dream_world?.front_default,
        label: 'Ilustración Dream World',
      },
      {
        url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        label: 'Sprite clásico',
      },
      {
        url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`,
        label: 'Sprite posterior clásico',
      },
      {
        url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`,
        label: 'Sprite variocolor clásico',
      },
      {
        url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${id}.png`,
        label: 'Sprite posterior variocolor',
      },
    ];

    const uniqueImages: GalleryImage[] = [];
    const seen = new Set<string>();

    for (const image of candidates) {
      if (image.url && !seen.has(image.url)) {
        seen.add(image.url);
        uniqueImages.push(image);
      }
    }

    return uniqueImages;
  }

  // ==========================================
  // REPRODUCIR SONIDO
  // ==========================================

  playCry(): void {
    const cryUrl = this.selectedPokemon?.cries?.latest;

    if (!cryUrl) {
      this.audioMessage =
        'Este Pokémon no tiene un sonido disponible en la API.';
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

    this.audioPlayer.play().catch((error) => {
      console.error('Error al reproducir el sonido:', error);

      this.audioPlaying = false;
      this.audioPlayer = null;

      this.audioMessage =
        'No se pudo reproducir el sonido. Inténtalo otra vez.';
    });
  }

  // ==========================================
  // DETENER SONIDO
  // ==========================================

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

  // ==========================================
  // ABRIR Y CERRAR IMÁGENES
  // ==========================================

  openImage(image: GalleryImage): void {
    this.expandedImage = image;
  }

  closeImage(): void {
    this.expandedImage = null;
  }

  hideBrokenImage(event: Event, image: GalleryImage): void {
    const element = event.target as HTMLImageElement;
    const galleryItem = element.closest(
      '.gallery-item'
    ) as HTMLElement | null;

    if (galleryItem) {
      galleryItem.style.display = 'none';
    }
  }

  // ==========================================
  // CONTROL DE ANIMACIÓN
  // ==========================================

  onAnimationError(): void {
    this.animationAvailable = false;
  }

  // ==========================================
  // NIVEL 3: ABRIR COMPARADOR
  // ==========================================

  openCompareMode(): void {
    this.stopCry();

    this.selectedPokemon = null;
    this.galleryImages = [];
    this.expandedImage = null;
    this.animationUrl = '';
    this.animationAvailable = true;

    this.compareMode = true;
    this.compareError = '';
    this.comparePokemonA = null;
    this.comparePokemonB = null;
  }

  // ==========================================
  // NIVEL 3: CERRAR COMPARADOR
  // ==========================================

  closeCompareMode(): void {
    this.compareMode = false;
    this.compareLoading = false;
    this.compareError = '';
    this.comparePokemonA = null;
    this.comparePokemonB = null;
  }

  // ==========================================
  // NIVEL 3: COMPARAR DOS POKÉMON
  // ==========================================

  runComparison(): void {
    if (!this.compareNameA || !this.compareNameB) {
      this.compareError = 'Selecciona los dos Pokémon.';
      return;
    }

    if (this.compareNameA === this.compareNameB) {
      this.compareError =
        'Selecciona dos Pokémon diferentes.';
      return;
    }

    this.compareLoading = true;
    this.compareError = '';
    this.comparePokemonA = null;
    this.comparePokemonB = null;

    forkJoin({
      first: this.pokemonService.getPokemonDetails(
        this.compareNameA
      ),
      second: this.pokemonService.getPokemonDetails(
        this.compareNameB
      ),
    }).subscribe({
      next: (result) => {
        this.comparePokemonA = result.first;
        this.comparePokemonB = result.second;
        this.compareLoading = false;
      },
      error: (error) => {
        console.error('Error al comparar Pokémon:', error);

        this.compareError =
          'No se pudieron cargar los Pokémon. Intenta nuevamente.';

        this.compareLoading = false;
      },
    });
  }

  // ==========================================
  // NIVEL 3: OBTENER ESTADÍSTICA COMPARATIVA
  // ==========================================

  getCompareStat(pokemon: any, statName: string): number {
    const stat = pokemon?.stats?.find(
      (item: any) => item.stat.name === statName
    );

    return stat?.base_stat ?? 0;
  }

  // ==========================================
  // ESTADÍSTICAS
  // ==========================================

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
      speed: '#22d3ee',
    };

    return colors[statName] || '#36d399';
  }

  formatStatName(name: string): string {
    const names: Record<string, string> = {
      hp: 'PS',
      attack: 'Ataque',
      defense: 'Defensa',
      'special-attack': 'At. especial',
      'special-defense': 'Def. especial',
      speed: 'Velocidad',
    };

    return names[name] || name;
  }

  formatName(name: string): string {
    return name.replace('-', ' ');
  }
}
