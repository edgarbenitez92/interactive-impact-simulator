import { Component, computed, inject, OnInit } from '@angular/core';
import { AudioPlayerService } from '../../services/audio-player.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [],
  templateUrl: './audio-player.component.html',
  styleUrl: './audio-player.component.scss'
})
export class AudioPlayerComponent implements OnInit {
  private readonly audioPlayerService = inject(AudioPlayerService);

  isAudioMuted = computed(() => this.audioPlayerService.isMuted$());

  ngOnInit(): void {
    console.log('Audio Player initialized - simulated mode');
  }

  toggleMute(event: Event): void {
    event.stopPropagation();
    this.audioPlayerService.toggleMute();
  }
}
