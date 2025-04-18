import { Component, computed, DestroyRef, HostListener, inject, input, OnInit, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AudioService } from '../audio-player/audio-player.component';
import { Slide } from '../../services/slide.service';
import { SlideService } from '../../services/slide.service';
import { SidebarService } from '../../services/sidebar.service';

interface Category {
  name: string;
  slides: number[];
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  imports: [MatSidenavModule],
})
export class SidebarComponent implements OnInit {
  private readonly destroyRef$ = inject(DestroyRef);
  private readonly sidebarService = inject(SidebarService);
  public readonly audioService = inject(AudioService);
  private readonly slideService = inject(SlideService);

  slides: Slide[] = this.slideService.getSlides();
  currentIndex = signal(0);
  isExpanded = computed(() => this.sidebarService.isSidebarOpen());

  categories: Category[] = [
    { name: 'The Amazon and Climate', slides: [1] },
    { name: 'People of the Amazon', slides: [2] },
    { name: 'Biodiversity', slides: [3] },
    { name: 'How to Reduce and Reverse Deforestation', slides: [4] }
  ];

  ngOnInit(): void {
    this.subsToCurrentSlideIndex();
  }

  subsToCurrentSlideIndex(): void {
    this.slideService.currentSlideIndex$
      .pipe(takeUntilDestroyed(this.destroyRef$))
      .subscribe(index => {
        console.log('index', index);
        this.currentIndex.set(index);
      });
  }

  toggleSidebar(): void {
    if (!this.isExpanded()) {
      this.sidebarService.isSidebarOpen.update(value => value = true);
    }
  }

  navigateToSlide(index: number): void {
    if (!this.isExpanded()) return;

    console.log('navigateToSlide', index);
    this.slideService.navigateToSlide(index);

    // TODO: Establish a better way to close the sidebar after navigating to a slide
    // with the action of toggleSidebar
    setTimeout(() => {
      this.sidebarService.isSidebarOpen.update(value => value = false);
    }, 0);

    // Opcionalmente, cerrar el sidebar en móvil después de navegar
    // if (window.innerWidth < 768) {
    //   setTimeout(() => {
    //     this.sidebarService.isSidebarOpen.update(value => value = false);
    //   }, 500);
    // }
  }

  isActiveSlide(index: number): boolean {
    return index === this.currentIndex();
  }

  isActiveCategory(category: Category): boolean {
    return category.slides.includes(this.currentIndex());
  }

  toggleMute(): void {
    this.audioService.toggleMute();
  }

  // Method to calculate the relative height of the category based on the number of slides
  getCategoryHeight(category: Category): string {
    const slidesCount = category.slides.length || 1;
    return `${slidesCount * 50}px`;
  }
}
