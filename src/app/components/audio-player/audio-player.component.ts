import { Component, computed, inject } from '@angular/core';

import { AudioPlayerService } from '../../services/audio-player.service';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [],
  templateUrl: './audio-player.component.html',
  styleUrl: './audio-player.component.scss'
})
export class AudioPlayerComponent {
  private readonly audioPlayerService = inject(AudioPlayerService);

  isAudioMuted = computed(() => this.audioPlayerService.isMuted$());

  toggleMute(event: Event): void {
    event.stopPropagation();
    this.audioPlayerService.toggleMute();
  }
}
