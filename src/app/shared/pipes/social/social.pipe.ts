import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'social',
  standalone: true, // 👈 if you're using standalone components
})
export class SocialPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const lower = value.toLowerCase();

    // Common social media domains
    const map: Record<string, string> = {
      'twitter.com': 'Twitter',
      'x.com': 'Twitter',
      'facebook.com': 'Facebook',
      'reddit.com': 'Reddit',
      't.me': 'Telegram',
      'telegram.me': 'Telegram',
      'linkedin.com': 'LinkedIn',
      'youtube.com': 'YouTube',
      'github.com': 'GitHub',
      'discord.gg': 'Discord',
      'discord.com': 'Discord',
      'twitch.tv': 'Twitch',
      'instagram.com': 'Instagram',
    };

    // Try to match any of the known domains
    for (const domain of Object.keys(map)) {
      if (lower.includes(domain)) return map[domain];
    }

    // Fallback → just show the domain
    try {
      const url = new URL(value);
      return url.hostname.replace(/^www\./, '');
    } catch {
      return value;
    }
  }
}
