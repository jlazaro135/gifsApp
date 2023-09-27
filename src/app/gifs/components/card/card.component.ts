import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector    : 'gifs-card',
  templateUrl : './card.component.html',
  styleUrls   : ['./card.component.css']
})
export class CardComponent {
  @Input()
  public gif!: Gif
  public isCopied: boolean= false

  constructor(private GifsService: GifsService){}

  @ViewChild('myButton')
  public button!: ElementRef<HTMLInputElement>;

  copyUrl():void{
    this.toggleText()
    navigator.clipboard.writeText(this.url(this.gif.id))
  }

  private toggleText(): void{
    const oldText = this.button.nativeElement.innerText;
    const newText = '¡Enlace copiado!';
    this.button.nativeElement.innerText = newText;
    this.isCopied = true;
    setTimeout(() => {
      this.button.nativeElement.innerText = oldText;
      this.isCopied = false;
    }, 2000)

  }

  private url(url: string): string{
    return `https://media.giphy.com/media/${url}/giphy.gif`
  }

}
