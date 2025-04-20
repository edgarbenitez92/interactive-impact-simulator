import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AudioPlayerComponent } from '../audio-player/audio-player.component';
import { AudioPlayerService } from '../../services/audio-player.service';
import { SidebarService } from '../../services/sidebar.service';
import { Slide } from '../../services/slide.service';
import { SlideService } from '../../services/slide.service';

interface Category {
  name: string;
  slides: number[];
  audio: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  imports: [MatSidenavModule, AudioPlayerComponent],
})
export class SidebarComponent implements OnInit {
  private readonly destroyRef$ = inject(DestroyRef);
  private readonly sidebarService = inject(SidebarService);
  private readonly audioPlayerService = inject(AudioPlayerService);
  private readonly slideService = inject(SlideService);

  slides: Slide[] = this.slideService.getSlides();
  isExpanded = computed(() => this.sidebarService.isSidebarOpen());

  isAudioMuted = computed(() => this.audioPlayerService.isMuted$());

  currentIndex = signal(0);

  categories: Category[] = [
    {
      name: 'The Amazon and Climate',
      slides: [1],
      audio: 'assets/audio/river.mp3'
    },
    {
      name: 'People of the Amazon',
      slides: [2],
      audio: 'assets/audio/birds.mp3'
    },
    {
      name: 'Biodiversity',
      slides: [3],
      audio: 'assets/audio/ambient.mp3'
    },
    {
      name: 'How to Reduce and Reverse Deforestation',
      slides: [4],
      audio: 'assets/audio/spring.mp3'
    }
  ];

  ngOnInit(): void {
    this.loadInitialAudio();
    this.subsToCurrentSlideIndex();
    this.stablishInitialSlide();
  }

  stablishInitialSlide(): void {
    const currentSlide = this.slideService.getCurrentSlide();
    if (currentSlide) {
      this.currentIndex.set(currentSlide.id);
    }
  }

  loadInitialAudio(): void {
    const initialCategory = this.categories[0];
    if (initialCategory) {
      this.audioPlayerService.loadAudio(initialCategory.audio);
    }
  }

  subsToCurrentSlideIndex(): void {
    this.slideService.currentSlideIndex$
      .pipe(takeUntilDestroyed(this.destroyRef$))
      .subscribe(index => {
        this.currentIndex.set(index);

        // Search for the category that contains the current slide
        const currentCategory = this.categories.find(category =>
          category.slides.includes(index)
        );

        if (currentCategory) {
          this.audioPlayerService.loadAudio(currentCategory.audio);
        }
      });
  }

  toggleSidebar(): void {
    if (!this.isExpanded()) {
      this.sidebarService.isSidebarOpen.update(value => value = true);
    }
  }

  navigateToSlide(index: number): void {
    if (!this.isExpanded()) return;

    this.slideService.navigateToSlide(index);

    setTimeout(() => {
      this.sidebarService.isSidebarOpen.update(value => value = false);
    }, 0);
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
