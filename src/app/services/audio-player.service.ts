import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService {

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
