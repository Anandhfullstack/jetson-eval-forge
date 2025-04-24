// ── src/utils/parseJsonMetrics.ts ──
export interface RawMetric {
    metric: string;
    [percentile: string]: number;
  }
  
  export interface PivotedMetric {
    metric: string;
    series: { name: string; value: number }[];
  }
  
  /**
   * Fetches a JSON file at `url` with shape { metrics: RawMetric[] }
   * and calls `setter` with PivotedMetric[] ready for your BarChart.
   */
  export async function parseJsonMetrics(
    url: string,
    setter: (data: PivotedMetric[]) => void
  ) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const { metrics } = (await res.json()) as { metrics: RawMetric[] };
  
      // deduce which keys are your percentiles (everything but "metric")
      const percentileKeys = Object.keys(metrics[0] || {}).filter(k => k !== 'metric');
  
      const pivoted = metrics.map(m => ({
        metric: m.metric,
        series: percentileKeys.map(p => ({
          name: p,
          value: m[p],
        })),
      }));
  
      setter(pivoted);
    } catch (err) {
      console.error(`Error loading JSON ${url}:`, err);
    }
  }
  