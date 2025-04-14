import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Slide {
  id: number;
  title: string;
  content: string;
  background: string;
  textColor?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SlideService {
  private slides: Slide[] = [
    {
      id: 1,
      title: 'The Amazon is the world\'s largest rain forest.',
      content: 'Introduction slide about the importance of the Amazon rain forest.',
      background: 'assets/images/amazon1.jpg',
      textColor: 'white'
    },
    {
      id: 2,
      title: 'Deforestation in the Amazon',
      content: 'Information about the causes and impact of deforestation in the Amazon.',
      background: 'assets/images/deforestation.jpg',
      textColor: 'white'
    },
    {
      id: 3,
      title: 'Biodiversity',
      content: 'The Amazon is home to countless species of plants and animals.',
      background: 'assets/images/biodiversity.jpg',
      textColor: 'white'
    },
    {
      id: 4,
      title: 'Climate Impact',
      content: 'The Amazon plays a crucial role in regulating global climate.',
      background: 'assets/images/climate.jpg',
      textColor: 'white'
    },
    {
      id: 5,
      title: 'Conservation Efforts',
      content: 'What can be done to protect the Amazon rainforest.',
      background: 'assets/images/conservation.jpg',
      textColor: 'white'
    }
  ];

  private currentSlideIndexSubject = new BehaviorSubject<number>(0);
  private isTransitioningSubject = new BehaviorSubject<boolean>(false);

  constructor() { }

  get currentSlideIndex$(): Observable<number> {
    return this.currentSlideIndexSubject.asObservable();
  }

  get isTransitioning$(): Observable<boolean> {
    return this.isTransitioningSubject.asObservable();
  }

  get currentSlideIndex(): number {
    return this.currentSlideIndexSubject.getValue();
  }

  get slidesCount(): number {
    return this.slides.length;
  }

  getSlides(): Slide[] {
    return this.slides;
  }

  getCurrentSlide(): Slide {
    return this.slides[this.currentSlideIndex];
  }

  navigateToSlide(index: number): void {
    if (index >= 0 && index < this.slides.length && index !== this.currentSlideIndex) {
      this.isTransitioningSubject.next(true);

      // Simulate transition delay
      setTimeout(() => {
        this.currentSlideIndexSubject.next(index);

        // Reset transition state after animation
        setTimeout(() => {
          this.isTransitioningSubject.next(false);
        }, 500);
      }, 300);
    }
  }

  navigateNext(): void {
    const nextIndex = (this.currentSlideIndex + 1) % this.slides.length;
    this.navigateToSlide(nextIndex);
  }

  navigatePrevious(): void {
    const prevIndex = (this.currentSlideIndex - 1 + this.slides.length) % this.slides.length;
    this.navigateToSlide(prevIndex);
  }
}
