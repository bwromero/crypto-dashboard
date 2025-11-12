import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private readonly _isLoggedIn = signal(false);
  readonly isLoggedIn = computed(() => this._isLoggedIn())

  constructor() { }

  login() {
    this._isLoggedIn.set(true);
  }
  logout() {
    this._isLoggedIn.set(false);
  }
}
