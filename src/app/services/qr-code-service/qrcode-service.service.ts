// src/app/services/qr-code/qr-code.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {
  private baseUrl: string = 'https://your-app.com'; // or get from environment

  /**
   * Generates a unique session ID for QR code authentication
   */
  generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Generates QR code data URL for authentication
   * @param sessionId - Optional session ID, will generate one if not provided
   * @param type - Type of QR code (e.g., 'auth', 'confirmation')
   */
  generateQRCodeData(sessionId?: string, type: 'auth' | 'confirmation' = 'auth'): {
    sessionId: string;
    qrCodeData: string;
  } {
    const id = sessionId || this.generateSessionId();
    const endpoint = type === 'auth' ? 'auth/qr' : 'confirmation/qr';
    const qrCodeData = `${this.baseUrl}/${endpoint}?session=${id}`;
    
    return {
      sessionId: id,
      qrCodeData: qrCodeData
    };
  }

  /**
   * Refreshes/regenerates a QR code
   */
  refreshQRCode(type: 'auth' | 'confirmation' = 'auth'): {
    sessionId: string;
    qrCodeData: string;
  } {
    return this.generateQRCodeData(undefined, type);
  }
}