import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CryptoData } from '../models';

@Component({
  selector: 'app-crypto-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crypto-detail.component.html',
  styles: []
})
export class CryptoDetailComponent implements OnInit {
  cryptoId: string = '';
  crypto: CryptoData | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cryptoId = params['id'];
      console.log('Crypto ID:', this.cryptoId);
    });
  }
}

