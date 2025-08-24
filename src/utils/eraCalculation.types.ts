export interface EraConversionResult {
  success: boolean;
  eraName?: string;
  eraYear?: number;
  fullText?: string;
  error?: string;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}