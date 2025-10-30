import { Component, Input } from '@angular/core';
import { CoinGeckoDetailData } from '../../../services/crypto.service';
import { CryptoData } from '../../models';
import { DecimalPipe } from '@angular/common';
import { LucideAngularModule, Info, Star } from 'lucide-angular';
import { JsonPipe } from '@angular/common';
import { DomainPipe } from '../../shared/pipes/domain.pipe';

export type SocialLink = {
  name: string;
  url: string;
}

export enum SocialLinkName {
  Twitter = 'Twitter',
  Reddit = 'Reddit',
  Telegram = 'Telegram',
  GitHub = 'GitHub',
  Bitbucket = 'Bitbucket',
}

@Component({
  selector: 'app-crypto-header',
  standalone: true,
  imports: [DecimalPipe, LucideAngularModule, JsonPipe, DomainPipe],
  templateUrl: './crypto-header.component.html',
  styles: ``
})
export class CryptoHeaderComponent {
  @Input() cryptoDetail: CoinGeckoDetailData | null = null;
  @Input() crypto?: CryptoData | null = null;

  readonly Info = Info;
  readonly Star = Star;

  get socialLinks() {
    if (!this.cryptoDetail?.links) return [];

    const { links } = this.cryptoDetail;

    const social: SocialLink[] = [];
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
}

