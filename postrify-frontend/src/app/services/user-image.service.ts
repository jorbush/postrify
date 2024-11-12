import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserImageService {
  private imageUpdateSource = new BehaviorSubject<void>(undefined);
  imageUpdated$ = this.imageUpdateSource.asObservable();

  notifyImageUpdate() {
    this.imageUpdateSource.next();
  }
}
