import { EraHistoryData } from '../components/EraInfo/EraInfoModal.types';

export const ERA_HISTORY_DATA: EraHistoryData[] = [
  {
    name: '昭和',
    startYear: 1926,
    endYear: 1989,
    description: '昭和天皇の時代',
    historicalBackground: '昭和天皇の在位期間で、戦前・戦中・戦後の激動の時代を含む最も長い年号。'
  },
  {
    name: '平成',
    startYear: 1989,
    endYear: 2019,
    description: '平成天皇の時代',
    historicalBackground: '平成天皇の在位期間で、バブル経済の崩壊から長期不況、そして復興に向けた時代。'
  },
  {
    name: '令和',
    startYear: 2019,
    endYear: null,
    description: '現在の年号',
    historicalBackground: '現在の天皇の在位期間で、新しい時代の始まりを告げる年号。'
  }
];