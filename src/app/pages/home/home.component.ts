import { CommonModule } from '@angular/common';
import { Component, computed, HostListener, inject, signal, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';

import { AudioPlayerComponent } from '../../components/audio-player/audio-player.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { SlideContainerComponent } from '../../components/slide-container/slide-container.component';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    SidebarComponent,
    SlideContainerComponent,
    AudioPlayerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  private sidebarService = inject(SidebarService);

  isSidebarOpen = computed(() => this.sidebarService.isSidebarOpen());

  toggleSidebar() {
    this.sidebarService.isSidebarOpen.update(value => value = false);
    console.log(this.sidebarService.isSidebarOpen());
  }
}
