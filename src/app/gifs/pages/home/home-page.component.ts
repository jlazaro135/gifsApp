import { Component, Input } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {


  constructor(private GifsService: GifsService){}

  public firstGifPage: number = 0;
  public lastGifPage: number = this.firstGifPage + 10


  get gifListLength() {
    return this.GifsService.gifList.length
  }

  get gifs() : Gif[] {
    return this.GifsService.gifList.slice(this.firstGifPage, this.lastGifPage)
  }

  previousPage(){
    if( this.firstGifPage === 0 )return
    this.firstGifPage -= 10;
    this.lastGifPage -= 10;
    this.GifsService.gifList.slice(this.firstGifPage, this.lastGifPage)
  }

  nextPage(){
    if( this.lastGifPage >= this.GifsService.gifList.length)return
    this.firstGifPage += 10;
    this.lastGifPage += 10;
    this.GifsService.gifList.slice(this.firstGifPage, this.lastGifPage)
  }

  gifsLength(){
    return this.GifsService.gifList.length
  }
}
