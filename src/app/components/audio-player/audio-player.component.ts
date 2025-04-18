import { Component, OnInit, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private isMutedSubject = new BehaviorSubject<boolean>(true);

  get isMuted$() {
    return this.isMutedSubject.asObservable();
  }

  get isMuted() {
    return this.isMutedSubject.value;
  }

  toggleMute() {
    this.isMutedSubject.next(!this.isMutedSubject.value);
    console.log(`Audio ${this.isMuted ? 'muted' : 'unmuted'}`);
  }

  setMuted(isMuted: boolean) {
    this.isMutedSubject.next(isMuted);
    console.log(`Audio set to ${isMuted ? 'muted' : 'unmuted'}`);
  }
}

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audio-player.component.html',
  styleUrl: './audio-player.component.scss'
})
export class AudioPlayerComponent implements OnInit {
  // No necesitamos crear un elemento de audio real para este ejemplo
  constructor(public audioService: AudioService) { }

  ngOnInit(): void {
    console.log('Audio Player initialized - simulated mode');
  }

  toggleMute(): void {
    this.audioService.toggleMute();
  }
}
