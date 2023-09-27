import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-card-list',
  templateUrl: './card-list.component.html',
})
export class CardListComponent {
  @Input()
  public gifs: Gif[] = [];

  constructor(private GifsService: GifsService){}

  tags(){
    console.log(this.GifsService.tagsHistory)
    return this.GifsService.tagsHistory
  }
}
