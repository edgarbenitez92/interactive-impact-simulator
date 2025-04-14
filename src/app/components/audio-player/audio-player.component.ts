import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audio-player.component.html',
  styleUrl: './audio-player.component.scss'
})
export class AudioPlayerComponent implements OnInit {
  isMuted: boolean = false;
  audioElement: HTMLAudioElement | null = null;

  constructor() { }

  ngOnInit(): void {
    // Create audio element
    this.audioElement = new Audio();
    this.audioElement.src = 'assets/audio/ambient.mp3'; // Replace with your audio file
    this.audioElement.loop = true;
    this.audioElement.volume = 0.3;

    // Auto-play requires user interaction first in most browsers
    document.addEventListener('click', () => {
      if (this.audioElement && !this.isMuted) {
        this.audioElement.play()
          .catch(error => console.error('Audio playback failed:', error));
      }
    }, { once: true });
  }

  toggleMute(): void {
    if (!this.audioElement) return;

    this.isMuted = !this.isMuted;

    if (this.isMuted) {
      this.audioElement.pause();
    } else {
      this.audioElement.play()
        .catch(error => console.error('Audio playback failed:', error));
    }
  }
}
