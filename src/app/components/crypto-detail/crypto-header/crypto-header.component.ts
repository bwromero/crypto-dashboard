import { Component, Input, signal } from '@angular/core';
import { CoinGeckoDetailData } from '../../../services/crypto.service';
import { CryptoData } from '../../shared/models';

import {
  LucideAngularModule,
  Info,
  Star,
  SquareArrowOutUpRight,
  BadgeCheck,
  Copy,
} from 'lucide-angular';
import { DomainPipe } from '../../shared/pipes/domain/domain.pipe';
import { SocialPipe } from '../../shared/pipes/social/social.pipe';
import { ShortenAddressPipe } from '../../shared/pipes/shorten-address/shorten-address.pipe';
import { CommonModule } from '@angular/common';
export type Link = {
  name: string;
  url: string;
};

export enum SocialLinkName {
  Twitter = 'Twitter',
  Reddit = 'Reddit',
  Telegram = 'Telegram',
  GitHub = 'GitHub',
  Bitbucket = 'Bitbucket',
}

export enum ExplorerName {
  Etherscan = 'etherscan',
  Blockchair = 'blockchair',
  Ethplorer = 'ethplorer',
  Oklink = 'oklink',
  BscScan = 'bscScan',
  PolygonScan = 'polygonScan',
  Explorer = 'explorer',
}

@Component({
    selector: 'app-crypto-header',
    imports: [
        CommonModule,
        LucideAngularModule,
        DomainPipe,
        SocialPipe,
        ShortenAddressPipe,
    ],
    standalone: true,
    templateUrl: './crypto-header.component.html',
    styles: ``
})
export class CryptoHeaderComponent {
  @Input() cryptoDetail: CoinGeckoDetailData | null = null;
  @Input() crypto?: CryptoData | null = null;

  count = signal(0);

  increment() {
    this.count.set(this.count() + 1);
  }

  readonly Info = Info;
  readonly Star = Star;
  readonly SquareArrowOutUpRight = SquareArrowOutUpRight;
  readonly BadgeCheck = BadgeCheck;
  readonly Copy = Copy;

  get socialLinks() {
    if (!this.cryptoDetail?.links) return [];

    const { links } = this.cryptoDetail;

    const social: Link[] = [];
    // Twitter
    if (links.twitter_screen_name)
      social.push({
        name: 'Twitter',
        url: `https://twitter.com/${links.twitter_screen_name}`,
      });

    // Reddit
    if (links.subreddit_url)
      social.push({ name: 'Reddit', url: links.subreddit_url });

    // Telegram
    if (links.telegram_channel_identifier)
      social.push({
        name: 'Telegram',
        url: `https://t.me/${links.telegram_channel_identifier}`,
      });

    // You can add more (Twitch, etc.) similarly

    if (links.repos_url.github)
      social.push({
        name: 'GitHub',
        url: `https://github.com/${links.repos_url.github}`,
      });

    if (links.repos_url.bitbucket)
      social.push({
        name: 'Bitbucket',
        url: `https://bitbucket.com/${links.repos_url.bitbucket}`,
      });

    return social;
  }

  get explorers() {
    if (!this.cryptoDetail?.links) return [];
    const { links } = this.cryptoDetail;

    const explorers: Link[] = [];

    if (links.blockchain_site.some(url => url.includes(ExplorerName.Etherscan)))
      explorers.push({
        name: ExplorerName.Etherscan,
        url: links.blockchain_site.find(url => url.includes(ExplorerName.Etherscan)) || '',
      });
    if (links.blockchain_site.some(url => url.includes(ExplorerName.Oklink)))
      explorers.push({
        name: ExplorerName.Oklink,
        url: links.blockchain_site.find(url => url.includes(ExplorerName.Oklink)) || '',
      });
    if (links.blockchain_site.some(url => url.includes(ExplorerName.BscScan)))
      explorers.push({
        name: ExplorerName.BscScan,
        url: links.blockchain_site.find(url => url.includes(ExplorerName.BscScan)) || '',
      });
    if (links.blockchain_site.some(url => url.includes(ExplorerName.PolygonScan)))
      explorers.push({
        name: ExplorerName.PolygonScan,
        url:
          links.blockchain_site.find(url => url.includes(ExplorerName.PolygonScan)) ||
          '',
      });
    return explorers;
  }

  copyToClipboard(string: string) {
    if (!string) return;
    navigator.clipboard
      .writeText(string)
      .then(() => {
        console.log('Address copied to clipboard');
      })
      .catch((err) => {
        console.error('Failed to copy:', err);
      });
  }
}
