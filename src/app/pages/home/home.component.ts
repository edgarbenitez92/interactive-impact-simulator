import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';

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
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private sidebarService = inject(SidebarService);

  isSidebarOpen = computed(() => this.sidebarService.isSidebarOpen());

  toggleSidebar() {
    this.sidebarService.isSidebarOpen.update(value => value = false);
  }
}
