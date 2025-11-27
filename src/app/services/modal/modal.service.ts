import { computed, Injectable, signal } from '@angular/core';

export type ModalType = 'language' | 'settings' | 'notifications' | 'currency' | 'menu';

export interface ModalOption {
    label: string;
    value: string;
    icon?: string;
    flag?: string; // For language selector
    symbol?: string; // For currency selector
    checked?: boolean; // For settings toggles
}

export interface NotificationItem {
    id: string;
    title: string;
    message: string;
    icon?: string;
    time?: string;
    read?: boolean;
}


export interface ModalConfig {
    type: ModalType;
    title?: string;
    options?: ModalOption[];
    notifications?: NotificationItem[];
    settings?: ModalOption[];
    data?: any;
}

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    private _isOpen = signal<boolean>(false);
    private _config = signal<ModalConfig | null>(null)

    readonly isOpen = this._isOpen.asReadonly();
    readonly config = this._config.asReadonly();

    open(config: ModalConfig) {
        this._config.set(config);
        this._isOpen.set(true);
        document.body.classList.add('overflow-hidden');
    }

    close() {
        this._isOpen.set(false);
        document.body.classList.remove('overflow-hidden');
        setTimeout(() => {
            this._config.set(null);
        }, 300);
    }
}
