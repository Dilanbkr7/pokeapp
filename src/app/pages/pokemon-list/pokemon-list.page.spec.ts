
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';

import { PokemonListPage } from './pokemon-list.page';
import { PokemonService } from '../../services/pokemon.service';

describe('PokemonListPage', () => {
  let component: PokemonListPage;
  let fixture: ComponentFixture<PokemonListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonListPage],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: PokemonService,
          useValue: {
            getPokemons: () =>
              of({
                count: 0,
                next: null,
                previous: null,
                results: [],
              }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
