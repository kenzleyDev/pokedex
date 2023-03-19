import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface PokeListResponse{
  created: string,
  modified: string,
  name: string,
  pokemon: any[],
  resource_uri: string
}

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {
  private url = 'https://dev.treinaweb.com.br/pokeapi/';
  pokeList = [];

  constructor(
    private http: HttpClient
  ) { }

  listAll(){
    this.http.get<PokeListResponse>(`${this.url}/pokedex/1`)
      .subscribe(
        response => {
          response.pokemon.forEach(pokemon => {
            pokemon.number = this.getNumberFromUrl(pokemon.resource_uri);
          })
          this.pokeList = this.sortPokemon(response.pokemon)
            .filter(pokemon => pokemon.number < 1000)
            .slice(0,9);
        }
      )
  }


  getPokemon(number: number): Observable<any> {
    return this.http.get(`${this.url}/pokemon/${number}`);
  }

  private getNumberFromUrl(url){
    return parseInt(url.replace(/.*\/(\d+)\/$/, '$1'));
  }

  private sortPokemon(pokemonList){
    return pokemonList.sort((a, b) => {
      return (a.number > b.number ? 1 : -1);
    })
  }


}
