export interface EraData {
  name: string;
  startYear: number;
  endYear: number | null;
  description: string;
}

export const ERA_DATA: EraData[] = [
  {
    name: '昭和',
    startYear: 1926,
    endYear: 1989,
    description: '昭和天皇の時代'
  },
  {
    name: '平成',
    startYear: 1989,
    endYear: 2019,
    description: '平成天皇の時代'
  },
  {
    name: '令和',
    startYear: 2019,
    endYear: null,
    description: '現在の年号'
  }
];