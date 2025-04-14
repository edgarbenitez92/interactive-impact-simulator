import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideService, Slide } from '../../services/slide.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {
  slides: Slide[] = [];
  currentIndex: number = 0;

  constructor(private slideService: SlideService) { }

  ngOnInit(): void {
    this.slides = this.slideService.getSlides();
    this.slideService.currentSlideIndex$.subscribe(index => {
      this.currentIndex = index;
    });
  }

  navigateToSlide(index: number): void {
    this.slideService.navigateToSlide(index);
  }

  isActiveSlide(index: number): boolean {
    return index === this.currentIndex;
  }
}
