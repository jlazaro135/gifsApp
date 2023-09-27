import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
})
export class LazyImageComponent implements OnInit{
  @Input()
  public url!: string;

  @Input()
  public alt!: string;

  @Input()
  public height!: string;

  @Input()
  public width!: string;

  aspectRatio(){
    return (parseFloat(this.width)/parseFloat(this.height)).toFixed(0);
  }

  public hasLoaded: boolean = false;

  ngOnInit(): void {
    if(!this.url) throw new Error('URL property is required');
  }

  onLoad(){
    this.hasLoaded = true
  }
}
