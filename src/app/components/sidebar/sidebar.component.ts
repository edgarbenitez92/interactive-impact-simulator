import { Component, computed, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { toSignal } from '@angular/core/rxjs-interop';

import { AudioPlayerComponent } from '../audio-player/audio-player.component';
import { AudioPlayerService } from '../../services/audio-player.service';
import { SidebarService } from '../../services/sidebar.service';
import { Slide } from '../../services/slide.service';
import { SlideService } from '../../services/slide.service';

interface Category {
  name: string;
  slides: number[];
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  imports: [MatSidenavModule, AudioPlayerComponent],
})
export class SidebarComponent {
  private readonly sidebarService = inject(SidebarService);
  private readonly audioPlayerService = inject(AudioPlayerService);
  private readonly slideService = inject(SlideService);

  slides: Slide[] = this.slideService.getSlides();
  isExpanded = computed(() => this.sidebarService.isSidebarOpen());

  isAudioMuted = toSignal(this.audioPlayerService.isMuted$, {
    initialValue: false
  });

  currentIndex = toSignal(this.slideService.currentSlideIndex$, {
    initialValue: 0
  });

  categories: Category[] = [
    { name: 'The Amazon and Climate', slides: [1] },
    { name: 'People of the Amazon', slides: [2] },
    { name: 'Biodiversity', slides: [3] },
    { name: 'How to Reduce and Reverse Deforestation', slides: [4] }
  ];

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
    this.audioPlayerService.toggleMute();
  }

  // Method to calculate the relative height of the category based on the number of slides
  getCategoryHeight(category: Category): string {
    const slidesCount = category.slides.length || 1;
    return `${slidesCount * 50}px`;
  }
}
