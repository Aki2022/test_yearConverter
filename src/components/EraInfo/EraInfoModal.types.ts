export interface EraHistoryData {
  name: string;
  startYear: number;
  endYear: number | null;
  description: string;
  historicalBackground: string;
}

export interface EraInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  eraData: EraHistoryData;
}

export interface EraListProps {
  onEraClick: (era: EraHistoryData) => void;
}