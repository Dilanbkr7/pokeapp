
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pokemon-list',
    pathMatch: 'full'
  },
  {
    path: 'pokemon-list',
    loadComponent: () =>
      import('./pages/pokemon-list/pokemon-list.page')
        .then(m => m.PokemonListPage)
  },
  {
    path: '**',
    redirectTo: 'pokemon-list'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
