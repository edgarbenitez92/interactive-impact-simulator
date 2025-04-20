import { Component, HostListener, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { SlideComponent } from '../slide/slide.component';
import { SlideService, Slide } from '../../services/slide.service';

@Component({
  selector: 'app-slide-container',
  standalone: true,
  imports: [SlideComponent],
  templateUrl: './slide-container.component.html',
  styleUrl: './slide-container.component.scss'
})
export class SlideContainerComponent {
  private readonly slideService = inject(SlideService);

  slides: Slide[] = this.slideService.getSlides();

  currentIndex = toSignal(this.slideService.currentSlideIndex$);

  isTransitioning = toSignal(this.slideService.isTransitioning$, { initialValue: false });
  touchStartY = signal(0);
  touchEndY = signal(0);

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (this.isTransitioning()) return;

    if (event.key === 'ArrowDown' || event.key === 'PageDown') {
      this.slideService.navigateNext();
    } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
      this.slideService.navigatePrevious();
    }
  }

  @HostListener('wheel', ['$event'])
  handleWheel(event: WheelEvent): void {
    event.preventDefault();
    if (this.isTransitioning()) return;

    if (event.deltaY > 0) {
      this.slideService.navigateNext();
    } else if (event.deltaY < 0) {
      this.slideService.navigatePrevious();
    }
  }

  @HostListener('touchstart', ['$event'])
  handleTouchStart(event: TouchEvent): void {
    this.touchStartY.set(event.touches[0].clientY);
  }

  @HostListener('touchend', ['$event'])
  handleTouchEnd(event: TouchEvent): void {
    if (this.isTransitioning()) return;

    this.touchEndY.set(event.changedTouches[0].clientY);
    const touchDiff = this.touchStartY() - this.touchEndY();

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
    return this.slides[index].id === this.currentIndex();
  }

  isPreviousSlide(index: number): boolean {
    const currentSlideIndex = this.slides.findIndex(slide => slide.id === this.currentIndex());
    return index === currentSlideIndex - 1;
  }

  isNextSlide(index: number): boolean {
    const currentSlideIndex = this.slides.findIndex(slide => slide.id === this.currentIndex());
    return index === currentSlideIndex + 1;
  }
}