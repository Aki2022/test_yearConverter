import { ERA_DATA } from '../data/eraData';
import { EraConversionResult, ValidationResult } from './eraCalculation.types';

export function validateYear(year: number): ValidationResult {
  if (!Number.isInteger(year)) {
    return {
      isValid: false,
      error: '整数を入力してください'
    };
  }

  if (year < 1950) {
    return {
      isValid: false,
      error: '年は1950年以降を入力してください'
    };
  }

  if (year > 2025) {
    return {
      isValid: false,
      error: '年は2025年以前を入力してください'
    };
  }

  return { isValid: true };
}

export function convertWesternToEra(year: number): EraConversionResult {
  const validation = validateYear(year);
  if (!validation.isValid) {
    return {
      success: false,
      error: validation.error
    };
  }

  // Find the appropriate era
  for (const era of ERA_DATA) {
    if (year >= era.startYear && (era.endYear === null || year <= era.endYear)) {
      const eraYear = year - era.startYear + 1;
      return {
        success: true,
        eraName: era.name,
        eraYear,
        fullText: `${era.name}${eraYear}年`
      };
    }
  }

  return {
    success: false,
    error: '該当する年号が見つかりません'
  };
}