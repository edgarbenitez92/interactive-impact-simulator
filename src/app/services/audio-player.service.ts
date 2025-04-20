import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService {
  private audioElement: HTMLAudioElement;
  private currentAudioPath = signal<string>('');
  isMuted$ = signal(true);

  constructor() {
    this.audioElement = new Audio();
    this.audioElement.loop = true;
  }

  loadAudio(audioPath: string): void {
    if (this.currentAudioPath() === audioPath) return;

    this.currentAudioPath.set(audioPath);
    this.audioElement.src = audioPath;
    this.audioElement.load();

    if (!this.isMuted$()) {
      this.audioElement.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    }
  }

  toggleMute(): void {
    this.isMuted$.update(value => !value);

    if (this.isMuted$()) {
      this.audioElement.pause();
    } else {
      this.audioElement.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    }
  }

  stopAudio(): void {
    this.audioElement.pause();
    this.audioElement.currentTime = 0;
  }
}
