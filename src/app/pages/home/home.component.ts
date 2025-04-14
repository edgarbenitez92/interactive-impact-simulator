import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideContainerComponent } from '../../components/slide-container/slide-container.component';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { AudioPlayerComponent } from '../../components/audio-player/audio-player.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, SlideContainerComponent, NavigationComponent, AudioPlayerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor() { }
}
