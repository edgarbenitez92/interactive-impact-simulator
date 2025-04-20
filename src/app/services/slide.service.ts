import { computed, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
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
    }
  ];

  private currentSlideIndexSubject = new BehaviorSubject<number>(1);
  private isTransitioningSubject = new BehaviorSubject<boolean>(false);

  currentSlideIndex = toSignal(this.currentSlideIndex$, { initialValue: 1 });
  slidesCount = computed(() => this.slides.length);
  getCurrentSlide = computed(() => this.slides.find(slide => slide.id === this.currentSlideIndex()));

  constructor() {
    // Ensure that the initial index corresponds with the first slide
    this.navigateToSlide(1);
  }

  get currentSlideIndex$(): Observable<number> {
    return this.currentSlideIndexSubject.asObservable();
  }

  get isTransitioning$(): Observable<boolean> {
    return this.isTransitioningSubject.asObservable();
  }

  getSlides(): Slide[] {
    return this.slides;
  }

  navigateToSlide(index: number): void {
    // Validate that the index corresponds to an existing slide
    const targetSlide = this.slides.find(slide => slide.id === index);
    if (targetSlide && index !== this.currentSlideIndex()) {
      this.isTransitioningSubject.next(true);
      this.currentSlideIndexSubject.next(index);

      // Reset transition state after animation
      setTimeout(() => {
        this.isTransitioningSubject.next(false);
      }, 800); // Match the transition duration in CSS
    }
  }

  navigateNext(): void {
    const currentIndex = this.currentSlideIndex();
    const currentSlideIndex = this.slides.findIndex(slide => slide.id === currentIndex);
    if (currentSlideIndex < this.slides.length - 1) {
      this.navigateToSlide(this.slides[currentSlideIndex + 1].id);
    } else {
      this.navigateToSlide(this.slides[0].id);
    }
  }

  navigatePrevious(): void {
    const currentIndex = this.currentSlideIndex();
    const currentSlideIndex = this.slides.findIndex(slide => slide.id === currentIndex);
    if (currentSlideIndex > 0) {
      this.navigateToSlide(this.slides[currentSlideIndex - 1].id);
    } else {
      this.navigateToSlide(this.slides[this.slides.length - 1].id);
    }
  }
}
