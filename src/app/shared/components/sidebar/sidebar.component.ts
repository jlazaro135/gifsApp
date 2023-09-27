import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor( private GifsService: GifsService ){}

  get tags(): string[]{
    return this.GifsService.tagsHistory;
  };

  getGifs(tag: string): void{
    this.GifsService.apiRequestGifs(tag)
  }

}
