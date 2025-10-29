import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CryptoData } from '../models';
import { CryptoService } from '../../services/crypto.service';

@Component({
  selector: 'app-crypto-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crypto-detail.component.html',
  styles: []
})
export class CryptoDetailComponent implements OnInit, OnDestroy {
  cryptoId: string = '';
  crypto: CryptoData | null = null;
  isLoading: boolean = true;
  error: string | null = null;
  private subscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private cryptoService: CryptoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cryptoId = params['id'];
      this.loadCryptoData(this.cryptoId);
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private loadCryptoData(id: string): void {
    this.isLoading = true;
    this.error = null;

    this.subscription = this.cryptoService.getCryptoById(id).subscribe({
      next: (data) => {
        this.crypto = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = `Failed to load cryptocurrency data: ${err.message}`;
        this.isLoading = false;
        console.error('Error loading crypto:', err);
      }
    });
  }
}

