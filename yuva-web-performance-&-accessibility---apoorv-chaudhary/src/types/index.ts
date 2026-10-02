export type ActiveTab = 'preview' | 'metrics' | 'report' | 'code';

export type PreviewMode = 'optimized' | 'unoptimized';

export interface MetricComparison {
  name: string;
  category: 'core-web-vitals' | 'lighthouse' | 'payload' | 'accessibility';
  before: number | string;
  after: number | string;
  unit: string;
  improvement: string;
  goodThreshold: string;
  status: 'passed' | 'warning' | 'failed';
  description: string;
}

export interface ChallengeItem {
  id: string;
  title: string;
  category: 'Performance' | 'Accessibility' | 'Layout Shift' | 'Screen Reader';
  issue: string;
  rootCause: string;
  resolution: string;
  codeSnippet?: string;
  wcagRef?: string;
}

export interface DeliverableFile {
  name: string;
  filename: string;
  language: 'html' | 'css' | 'markdown';
  size: string;
  description: string;
  content: string;
}
