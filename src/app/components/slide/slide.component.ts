import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Slide } from '../../services/slide.service';

@Component({
  selector: 'app-slide',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slide.component.html',
  styleUrl: './slide.component.scss'
})
export class SlideComponent implements OnInit {
  @Input() slide!: Slide;
  @Input() isActive: boolean = false;
  @Input() isNext: boolean = false;
  @Input() isPrevious: boolean = false;
  @Input() isTransitioning: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  getSlideClasses(): Record<string, boolean> {
    return {
      'slide': true,
      'active': this.isActive,
      'next': this.isNext,
      'previous': this.isPrevious,
      'transitioning': this.isTransitioning
    };
  }

  getBackgroundImageStyle(): Record<string, string> {
    return {
      'background-image': `url(${this.slide.background})`
    };
  }
}
