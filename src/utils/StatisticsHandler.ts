export type StatisticsType = {
  min: number;
  max: number;
  avg: number;
  mid: number;
  dist: Record<number, number>;
};

export class StatisticsHanlder {
  //데이터는 내림차순 정렬 되어 있을 것으로 가정.
  static getStatistics<T>(
    data: T[],
    recordKey: string,
    roundPoint: number,
  ): StatisticsType {
    if (data.length === 0) {
      return {
        min: 0,
        max: 0,
        avg: 0,
        mid: 0,
        dist: {},
      };
    }
    const min = data[data.length - 1][recordKey];
    const max = data[0][recordKey];
    const avg =
      data.reduce((acc, cur) => acc + cur[recordKey], 0) / data.length;
    const mid = data[Math.floor(data.length / 2)][recordKey];
    const dist: Record<number, number> = data.reduce((acc, cur) => {
      const key: number = Number(cur[recordKey].toFixed(roundPoint));
      acc[key] = acc[key] ? acc[key] + 1 : 1;
      return acc;
    }, {} as Record<number, number>);
    return { min, max, avg, mid, dist };
  }
}
