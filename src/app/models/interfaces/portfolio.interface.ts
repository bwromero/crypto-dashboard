export enum AccountType {
    MAIN = 'Main Account',
    TRADING = 'Trading Account',
    MARGIN = 'Margin Account',
    FUTURES = 'Futures Account'
}

export interface PortfolioItem {
    amount: number;
    currency: string;
    accountType: AccountType;
} 