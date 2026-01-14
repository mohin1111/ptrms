import type { ExchangeCode } from '@/types'

// Client Names
export const CLIENT_NAMES = [
  'Sharma Trading Co.',
  'Patel Investments',
  'Kumar Securities',
  'Singh Capital',
  'Gupta Holdings',
  'Mehta Partners',
  'Agarwal Finance',
  'Jain Traders',
  'Reddy Enterprises',
  'Iyer Wealth',
  'Nair Capital',
  'Verma Securities',
  'Kapoor Trading',
  'Malhotra Investments',
  'Bhatia & Co.',
  'Saxena Holdings',
  'Tiwari Finance',
  'Pillai Traders',
  'Menon Capital',
  'Desai Securities',
  'Rao Investments',
  'Hegde Partners',
  'Kulkarni Trading',
  'Shetty Finance',
  'Pai Capital',
  'Nayak Securities',
  'Gowda Holdings',
  'Srinivas Traders',
  'Prasad Finance',
  'Murthy Capital',
  'Retail Client 001',
  'Retail Client 002',
  'Retail Client 003',
  'Institutional Trader A',
  'Institutional Trader B',
  'HNI Portfolio 1',
  'HNI Portfolio 2',
  'Prop Trading Desk',
  'Algorithmic Systems',
  'Quant Fund Alpha',
]

// Usernames
export const USERNAMES = [
  { id: 'USR001', name: 'rms_admin', role: 'ADMIN' as const },
  { id: 'USR002', name: 'dealer_mumbai_01', role: 'DEALER' as const },
  { id: 'USR003', name: 'dealer_mumbai_02', role: 'DEALER' as const },
  { id: 'USR004', name: 'dealer_delhi_01', role: 'DEALER' as const },
  { id: 'USR005', name: 'rms_analyst', role: 'RMS' as const },
  { id: 'USR006', name: 'support_01', role: 'SUPPORT' as const },
  { id: 'USR007', name: 'trading_desk_hq', role: 'DEALER' as const },
  { id: 'USR008', name: 'risk_manager', role: 'RMS' as const },
  { id: 'USR009', name: 'dealer_bangalore_01', role: 'DEALER' as const },
  { id: 'USR010', name: 'dealer_chennai_01', role: 'DEALER' as const },
  { id: 'USR011', name: 'compliance_officer', role: 'ADMIN' as const },
  { id: 'USR012', name: 'operations_head', role: 'RMS' as const },
]

// Symbols by Exchange
export const SYMBOLS: Record<ExchangeCode, Array<{ symbol: string; name: string; sector?: string; type?: string }>> = {
  NSEEQ: [
    { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', sector: 'Energy' },
    { symbol: 'TCS', name: 'Tata Consultancy Services', sector: 'IT' },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', sector: 'Banking' },
    { symbol: 'INFY', name: 'Infosys Ltd', sector: 'IT' },
    { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', sector: 'Banking' },
    { symbol: 'HINDUNILVR', name: 'Hindustan Unilever', sector: 'FMCG' },
    { symbol: 'SBIN', name: 'State Bank of India', sector: 'Banking' },
    { symbol: 'BHARTIARTL', name: 'Bharti Airtel', sector: 'Telecom' },
    { symbol: 'ITC', name: 'ITC Ltd', sector: 'FMCG' },
    { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank', sector: 'Banking' },
    { symbol: 'LT', name: 'Larsen & Toubro', sector: 'Infrastructure' },
    { symbol: 'AXISBANK', name: 'Axis Bank', sector: 'Banking' },
    { symbol: 'ASIANPAINT', name: 'Asian Paints', sector: 'Consumer' },
    { symbol: 'MARUTI', name: 'Maruti Suzuki', sector: 'Automobile' },
    { symbol: 'TITAN', name: 'Titan Company', sector: 'Consumer' },
    { symbol: 'SUNPHARMA', name: 'Sun Pharma', sector: 'Pharma' },
    { symbol: 'BAJFINANCE', name: 'Bajaj Finance', sector: 'NBFC' },
    { symbol: 'WIPRO', name: 'Wipro Ltd', sector: 'IT' },
    { symbol: 'ULTRACEMCO', name: 'UltraTech Cement', sector: 'Cement' },
    { symbol: 'NESTLEIND', name: 'Nestle India', sector: 'FMCG' },
  ],
  NSEFO: [
    { symbol: 'NIFTY', name: 'Nifty 50 Index', type: 'INDEX' },
    { symbol: 'BANKNIFTY', name: 'Bank Nifty Index', type: 'INDEX' },
    { symbol: 'FINNIFTY', name: 'Fin Nifty Index', type: 'INDEX' },
    { symbol: 'MIDCPNIFTY', name: 'Midcap Nifty', type: 'INDEX' },
    { symbol: 'RELIANCE', name: 'Reliance Futures', type: 'STOCK' },
    { symbol: 'TCS', name: 'TCS Futures', type: 'STOCK' },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Futures', type: 'STOCK' },
    { symbol: 'INFY', name: 'Infosys Futures', type: 'STOCK' },
    { symbol: 'ICICIBANK', name: 'ICICI Bank Futures', type: 'STOCK' },
    { symbol: 'SBIN', name: 'SBI Futures', type: 'STOCK' },
    { symbol: 'AXISBANK', name: 'Axis Bank Futures', type: 'STOCK' },
    { symbol: 'KOTAKBANK', name: 'Kotak Bank Futures', type: 'STOCK' },
    { symbol: 'LT', name: 'L&T Futures', type: 'STOCK' },
    { symbol: 'TATAMOTORS', name: 'Tata Motors Futures', type: 'STOCK' },
    { symbol: 'TATASTEEL', name: 'Tata Steel Futures', type: 'STOCK' },
  ],
  NSECD: [
    { symbol: 'USDINR', name: 'US Dollar / Indian Rupee', type: 'CDS' },
    { symbol: 'EURINR', name: 'Euro / Indian Rupee', type: 'CDS' },
    { symbol: 'GBPINR', name: 'British Pound / Indian Rupee', type: 'CDS' },
    { symbol: 'JPYINR', name: 'Japanese Yen / Indian Rupee', type: 'CDS' },
  ],
  MCX: [
    { symbol: 'GOLD', name: 'Gold', type: 'COMMODITY' },
    { symbol: 'GOLDM', name: 'Gold Mini', type: 'COMMODITY' },
    { symbol: 'GOLDPETAL', name: 'Gold Petal', type: 'COMMODITY' },
    { symbol: 'SILVER', name: 'Silver', type: 'COMMODITY' },
    { symbol: 'SILVERM', name: 'Silver Mini', type: 'COMMODITY' },
    { symbol: 'CRUDEOIL', name: 'Crude Oil', type: 'COMMODITY' },
    { symbol: 'NATURALGAS', name: 'Natural Gas', type: 'COMMODITY' },
    { symbol: 'COPPER', name: 'Copper', type: 'COMMODITY' },
    { symbol: 'ZINC', name: 'Zinc', type: 'COMMODITY' },
    { symbol: 'ALUMINIUM', name: 'Aluminium', type: 'COMMODITY' },
    { symbol: 'LEAD', name: 'Lead', type: 'COMMODITY' },
    { symbol: 'NICKEL', name: 'Nickel', type: 'COMMODITY' },
  ],
}

// Sectors
export const SECTORS = [
  'Banking',
  'IT',
  'FMCG',
  'Pharma',
  'Energy',
  'Automobile',
  'Infrastructure',
  'Telecom',
  'Consumer',
  'NBFC',
  'Cement',
  'Metals',
]

// Alert Messages by Type
export const ALERT_MESSAGES: Record<string, string[]> = {
  MARGIN_BREACH: [
    'Margin utilization exceeded {threshold}%',
    'Client margin at {value}% - immediate attention required',
    'Margin shortfall detected - ₹{value} required',
  ],
  MTM_LOSS: [
    'MTM loss exceeds ₹{value} threshold',
    'Significant unrealized loss detected',
    'Day MTM loss crossed warning level',
  ],
  POSITION_LIMIT: [
    'Position limit {value}% of allowed maximum',
    'Concentrated position in {symbol}',
    'Single scrip exposure exceeds limit',
  ],
  COLLATERAL_SHORTFALL: [
    'Collateral shortfall of ₹{value}',
    'Pledge collateral value declined',
    'Additional collateral required',
  ],
  GREEK_THRESHOLD: [
    'Delta exposure exceeds threshold',
    'Gamma risk at elevated levels',
    'Vega exposure requires monitoring',
  ],
  EXPOSURE_LIMIT: [
    'Total exposure exceeds approved limit',
    'Segment-wise exposure breach',
    'Cross-exchange exposure elevated',
  ],
  SQUARE_OFF_PENDING: [
    'Square-off deadline approaching',
    'Pending square-off for expiry',
    'Physical delivery obligation',
  ],
  CONCENTRATION_LIMIT: [
    'Portfolio concentration in {symbol} at {value}%',
    'Sector concentration exceeds limit',
    'Single client exposure too high',
  ],
}

// Strike Price Ranges by Symbol
export const STRIKE_RANGES: Record<string, { min: number; max: number; step: number }> = {
  NIFTY: { min: 20000, max: 26000, step: 50 },
  BANKNIFTY: { min: 42000, max: 52000, step: 100 },
  FINNIFTY: { min: 19000, max: 24000, step: 50 },
  RELIANCE: { min: 2400, max: 3200, step: 20 },
  TCS: { min: 3600, max: 4400, step: 20 },
  HDFCBANK: { min: 1500, max: 1900, step: 10 },
  INFY: { min: 1600, max: 2000, step: 10 },
}

// Default LTP Ranges
export const LTP_RANGES: Record<string, { min: number; max: number }> = {
  NIFTY: { min: 22000, max: 24000 },
  BANKNIFTY: { min: 46000, max: 50000 },
  RELIANCE: { min: 2700, max: 3000 },
  TCS: { min: 3800, max: 4200 },
  HDFCBANK: { min: 1600, max: 1800 },
  USDINR: { min: 83, max: 84 },
  GOLD: { min: 72000, max: 75000 },
  CRUDEOIL: { min: 6500, max: 7500 },
}
