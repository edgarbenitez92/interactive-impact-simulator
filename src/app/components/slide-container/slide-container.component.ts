import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideComponent } from '../slide/slide.component';
import { SlideService, Slide } from '../../services/slide.service';

@Component({
  selector: 'app-slide-container',
  standalone: true,
  imports: [CommonModule, SlideComponent],
  templateUrl: './slide-container.component.html',
  styleUrl: './slide-container.component.scss'
})
export class SlideContainerComponent implements OnInit {
  slides: Slide[] = [];
  currentIndex: number = 0;
  isTransitioning: boolean = false;
  touchStartY: number = 0;
  touchEndY: number = 0;
  wheelDebounceTimer: any = null;
  isWheelEnabled: boolean = true;

  constructor(private slideService: SlideService) { }

  ngOnInit(): void {
    this.slides = this.slideService.getSlides();
    this.slideService.currentSlideIndex$.subscribe(index => {
      this.currentIndex = index;
    });
    this.slideService.isTransitioning$.subscribe(transitioning => {
      this.isTransitioning = transitioning;
    });
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (this.isTransitioning) return;

    if (event.key === 'ArrowDown' || event.key === 'PageDown') {
      this.slideService.navigateNext();
    } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
      this.slideService.navigatePrevious();
    }
  }

  @HostListener('wheel', ['$event'])
  handleWheel(event: WheelEvent): void {
    if (this.isTransitioning || !this.isWheelEnabled) return;

    // Disable wheel for a short time to prevent multiple triggers
    this.isWheelEnabled = false;

    if (event.deltaY > 0) {
      this.slideService.navigateNext();
    } else if (event.deltaY < 0) {
      this.slideService.navigatePrevious();
    }

    // Re-enable wheel after a delay
    setTimeout(() => {
      this.isWheelEnabled = true;
    }, 1000);
  }

  @HostListener('touchstart', ['$event'])
  handleTouchStart(event: TouchEvent): void {
    this.touchStartY = event.touches[0].clientY;
  }

  @HostListener('touchend', ['$event'])
  handleTouchEnd(event: TouchEvent): void {
    if (this.isTransitioning) return;

    this.touchEndY = event.changedTouches[0].clientY;

    const touchDiff = this.touchStartY - this.touchEndY;

    // Use a threshold to detect intentional swipes
    if (Math.abs(touchDiff) > 50) {
      if (touchDiff > 0) {
        // Swipe up - go to next slide
        this.slideService.navigateNext();
      } else {
        // Swipe down - go to previous slide
        this.slideService.navigatePrevious();
      }
    }
  }

  isActiveSlide(index: number): boolean {
    return index === this.currentIndex;
  }

  isPreviousSlide(index: number): boolean {
    return (index === this.currentIndex - 1) ||
      (this.currentIndex === 0 && index === this.slides.length - 1);
  }

  isNextSlide(index: number): boolean {
    return (index === this.currentIndex + 1) ||
      (this.currentIndex === this.slides.length - 1 && index === 0);
  }
}
