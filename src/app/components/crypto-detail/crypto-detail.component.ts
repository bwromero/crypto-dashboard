import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { CryptoData } from '../models';
import { CryptoService, CoinGeckoDetailData } from '../../services/crypto.service';
import { LucideAngularModule, Info } from 'lucide-angular';

@Component({
  selector: 'app-crypto-detail',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './crypto-detail.component.html',
  styles: []
})
export class CryptoDetailComponent implements OnInit, OnDestroy {
  readonly Info = Info;
  cryptoId: string = '';
  crypto: CryptoData | null = null;
  cryptoDetail: CoinGeckoDetailData | null = null;
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

    this.subscription = forkJoin({
      basic: this.cryptoService.getCryptoById(id),
      detail: this.cryptoService.getCryptoDetailById(id)
    }).subscribe({
      next: (data) => {
        this.crypto = data.basic;
        this.cryptoDetail = data.detail;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = `Failed to load cryptocurrency data: ${err.message}`;
        this.isLoading = false;
        console.error('Error loading crypto:', err);
      }
    });
  }

  getExplorerName(url: string): string {
    if (url.includes('etherscan')) return 'Etherscan';
    if (url.includes('blockchair')) return 'Blockchair';
    if (url.includes('ethplorer')) return 'Ethplorer';
    if (url.includes('oklink')) return 'Oklink';
    if (url.includes('bscscan')) return 'BscScan';
    if (url.includes('polygonscan')) return 'PolygonScan';
    return 'Explorer';
  }

  getContractAddress(): string | null {
    if (!this.cryptoDetail?.platforms) return null;
    const platforms = this.cryptoDetail.platforms;
    return platforms['ethereum'] || platforms['binance-smart-chain'] || platforms['polygon-pos'] || null;
  }

  shortenAddress(address: string): string {
    if (address.length <= 16) return address;
    return `${address.slice(0, 6)}...${address.slice(-8)}`;
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Address copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  }
}

