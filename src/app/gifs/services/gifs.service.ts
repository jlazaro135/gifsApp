import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[] = []

  private _tagsHistory: string[] = [];
  private apiKey:     string = 'rpXdkPYYa0Or8yf1Pvl812dFqgtbNUMW';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient ) {
    this.loadLocalStorage();

  }

  get tagsHistory(){
    return [...this._tagsHistory]
  }

  private organizeTagHistory(tag: string){
    tag = tag.toLowerCase();

    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter(oldTag => oldTag !== tag)
    }
    this._tagsHistory.unshift(tag)
    this._tagsHistory = this._tagsHistory.splice(0,10)
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }

  private loadLocalStorage(): void {
    if(!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!)
    this.loadFirsTag()
  }

  private loadFirsTag(){
    return this.apiRequestGifs(this._tagsHistory[0])
  }

  searchTag(tag: string): void{
    if (tag.length === 0 )return;
    this.organizeTagHistory(tag);
    this.apiRequestGifs(tag);

  }

  apiRequestGifs(tag:string){
    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('q', tag )
    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params: params })
    .subscribe((res) => {
      this.gifList = res.data
    });
  }

  gifUrl(url: string): string{
    let imgUrl = `https://media.giphy.com/media/${url}/giphy.gif`
    return imgUrl
  }
}
