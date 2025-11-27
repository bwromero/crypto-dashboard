import { computed, Injectable, signal } from '@angular/core';

export type ModalType = 'language' | 'settings' | 'notifications' | 'currency' | 'menu';

export interface ModalOption {
    label: string;
    value: string;
    icon?: string;
    flag?: string; // For language selector
    symbol?: string; // For currency selector
    checked?: boolean; // For settings toggles
    settingType?: 'selectable' | 'toggle' | 'theme'; // Type of setting
    displayValue?: string; // Display value for selectable settings (e.g., "USD", "English US")
    themeOptions?: { label: string; value: string; icon: string }[]; // For theme toggle
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
    selectedValue?: string; // Track selected value
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

    selectOption(value: string) {
        const currentConfig = this._config();
        if (currentConfig) {
            this._config.set({
                ...currentConfig,
                selectedValue: value
            });
        }
    }

    toggleSetting(settingValue: string) {
        const currentConfig = this._config();
        if (currentConfig?.settings) {
            const updatedSettings = currentConfig.settings.map(setting => 
                setting.value === settingValue 
                    ? { ...setting, checked: !setting.checked }
                    : setting
            );
            this._config.set({
                ...currentConfig,
                settings: updatedSettings
            });
        }
    }

    updateSetting(settingValue: string, updates: Partial<ModalOption>) {
        const currentConfig = this._config();
        if (currentConfig?.settings) {
            const updatedSettings = currentConfig.settings.map(setting => 
                setting.value === settingValue 
                    ? { ...setting, ...updates }
                    : setting
            );
            this._config.set({
                ...currentConfig,
                settings: updatedSettings
            });
        }
    }
}
