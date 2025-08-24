export interface YearConverterProps {
  className?: string;
  onConvert?: (result: ConversionResult) => void;
}

export interface ConversionResult {
  westernYear: number;
  eraName: string;
  eraYear: number;
  fullText: string;
}

export interface YearConverterState {
  inputValue: string;
  conversionResult: ConversionResult | null;
  error: string | null;
  isLoading: boolean;
}