import { MetricComparison, ChallengeItem } from '../types';

export const METRICS_DATA: MetricComparison[] = [
  {
    name: 'Mobile Lighthouse Performance',
    category: 'lighthouse',
    before: 42,
    after: 99,
    unit: '/ 100',
    improvement: '+135.7%',
    goodThreshold: '>= 90',
    status: 'passed',
    description: 'Measured under simulated Slow 4G network with 4x CPU slowdown.'
  },
  {
    name: 'Mobile Lighthouse Accessibility',
    category: 'lighthouse',
    before: 58,
    after: 100,
    unit: '/ 100',
    improvement: '+72.4%',
    goodThreshold: '100',
    status: 'passed',
    description: '100% adherence to all automated WCAG 2.1 AA/AAA rules.'
  },
  {
    name: 'Best Practices',
    category: 'lighthouse',
    before: 64,
    after: 100,
    unit: '/ 100',
    improvement: '+56.2%',
    goodThreshold: '>= 90',
    status: 'passed',
    description: 'Secure connections, modern image formats, doctype, and error-free console.'
  },
  {
    name: 'SEO & Discoverability',
    category: 'lighthouse',
    before: 72,
    after: 100,
    unit: '/ 100',
    improvement: '+38.8%',
    goodThreshold: '>= 90',
    status: 'passed',
    description: 'Structured Data (Schema.org), meta tags, descriptive title, and legible font sizes.'
  },
  {
    name: 'Largest Contentful Paint (LCP)',
    category: 'core-web-vitals',
    before: 5.8,
    after: 1.1,
    unit: 's',
    improvement: '-81.0%',
    goodThreshold: '< 2.5s',
    status: 'passed',
    description: 'Time until the largest above-the-fold content element becomes visible.'
  },
  {
    name: 'Cumulative Layout Shift (CLS)',
    category: 'core-web-vitals',
    before: 0.380,
    after: 0.002,
    unit: '',
    improvement: '-99.5%',
    goodThreshold: '< 0.100',
    status: 'passed',
    description: 'Quantifies unexpected visual layout shifts during page loading.'
  },
  {
    name: 'First Contentful Paint (FCP)',
    category: 'core-web-vitals',
    before: 3.4,
    after: 0.7,
    unit: 's',
    improvement: '-79.4%',
    goodThreshold: '< 1.8s',
    status: 'passed',
    description: 'Time when browser first renders DOM text, image, or canvas content.'
  },
  {
    name: 'Total Blocking Time (TBT)',
    category: 'core-web-vitals',
    before: 890,
    after: 12,
    unit: 'ms',
    improvement: '-98.6%',
    goodThreshold: '< 200ms',
    status: 'passed',
    description: 'Total time between FCP and Time to Interactive when main thread was blocked.'
  },
  {
    name: 'Interaction to Next Paint (INP)',
    category: 'core-web-vitals',
    before: 240,
    after: 45,
    unit: 'ms',
    improvement: '-81.2%',
    goodThreshold: '< 200ms',
    status: 'passed',
    description: 'Responsiveness latency across all tap, click, and keypress user interactions.'
  },
  {
    name: 'Total Transferred Payload',
    category: 'payload',
    before: 4820,
    after: 284,
    unit: 'KB',
    improvement: '-94.1%',
    goodThreshold: '< 500 KB',
    status: 'passed',
    description: 'Total weight of all network assets transferred across the wire.'
  },
  {
    name: 'Hero Image Asset Size',
    category: 'payload',
    before: 2820,
    after: 42,
    unit: 'KB',
    improvement: '-98.5%',
    goodThreshold: '< 100 KB',
    status: 'passed',
    description: 'Uncompressed 2.8MB PNG converted to responsive WebP with srcset.'
  },
  {
    name: 'Axe Automated Violations',
    category: 'accessibility',
    before: 27,
    after: 0,
    unit: 'issues',
    improvement: '-100%',
    goodThreshold: '0',
    status: 'passed',
    description: 'Violations across WCAG 2.1 Level A and AA automated rules.'
  }
];

export const CHALLENGES_DATA: ChallengeItem[] = [
  {
    id: 'c1',
    title: 'Flash of Unstyled Content (FOUC) vs. Critical CSS Inlining',
    category: 'Performance',
    issue: 'Extracting all non-critical styles into an asynchronous stylesheet caused an unsightly 200ms visual flash (FOUC) where elements rearranged jarringly.',
    rootCause: 'Certain structural container paddings, font metrics, and button dimension variables were mistakenly deferred along with non-structural cosmetics.',
    resolution: 'Established a strict Critical CSS boundary rule: all CSS governing above-the-fold layout geometry, typography reset, skip link, and header shell are inlined in <style> (<4KB). Only below-the-fold grids, shadows, and modals remain in async CSS.',
    codeSnippet: `<style>
  /* Inlined critical viewport shell (<4KB) */
  html { font-family: system-ui, -apple-system; line-height: 1.6; }
  .skip-link { position: absolute; top: -100px; }
  .site-header { position: sticky; top: 0; }
</style>
<link rel="preload" href="optimized_styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'" />`,
    wcagRef: 'Core Web Vitals - FCP / CLS'
  },
  {
    id: 'c2',
    title: 'Cumulative Layout Shift (CLS) on Responsive Media Elements',
    category: 'Layout Shift',
    issue: 'On mobile viewports (375px–414px), the hero image caused a major layout jump (CLS of 0.14) when loading, pushing the text content abruptly down.',
    rootCause: 'Relying exclusively on CSS height: auto without explicit aspect ratio declaration left the browser unable to reserve layout box height during HTML stream parsing.',
    resolution: 'Configured modern CSS aspect-ratio: 560 / 380 on the image wrapper and declared matching physical width="560" and height="380" HTML attributes directly on the <img> tag.',
    codeSnippet: `<div class="visual-wrapper" style="aspect-ratio: 560 / 380;">
  <picture>
    <source srcset="hero-600.webp" media="(max-width: 767px)" />
    <img src="hero-fallback.jpg" width="560" height="380" loading="eager" fetchpriority="high" />
  </picture>
</div>`,
    wcagRef: 'Core Web Vitals - CLS (<0.100 threshold)'
  },
  {
    id: 'c3',
    title: 'Accessible Modal Focus Trap & Screen Reader Virtual Cursor Leak',
    category: 'Screen Reader',
    issue: 'When the modal opened, keyboard focus could escape the modal boundaries into the underlying background page on Tab. Furthermore, VoiceOver and NVDA virtual cursors continued reading background headings.',
    rootCause: 'Placing autofocus on a modal button alone does not isolate keyboard focus loops or assistive technology reading trees.',
    resolution: 'Engineered a bidirectional focus trap loop in JavaScript capturing Tab and Shift+Tab, set aria-modal="true" on the dialog, and dynamically toggled aria-hidden="true" on the underlying <main> container.',
    codeSnippet: `modal.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
  if (e.key === 'Tab') {
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }
});`,
    wcagRef: 'WCAG 2.1.2 No Keyboard Trap & WCAG 2.4.3 Focus Order'
  },
  {
    id: 'c4',
    title: 'Accessible Form Validation Without Jarring Voice Interruption',
    category: 'Accessibility',
    issue: 'Standard browser tooltips fail screen readers, while aggressive JavaScript alert dialogs jarringly cut off active speech synthesis.',
    rootCause: 'Validation errors lacked programmatic linkage to their respective input fields.',
    resolution: 'Paired novalidate with aria-describedby pointing to persistent error message containers. Set aria-invalid="true" dynamically on invalid fields, and channeled non-disruptive feedback through an aria-live="polite" live announcer.',
    codeSnippet: `<label for="fullName">Full Name <span class="required">*</span></label>
<input id="fullName" aria-required="true" aria-describedby="nameHelp nameError" />
<span id="nameError" class="form-error" role="alert" hidden></span>
<div id="liveAnnouncer" class="sr-only" role="status" aria-live="polite"></div>`,
    wcagRef: 'WCAG 3.3.1 Error Identification & WCAG 4.1.3 Status Messages'
  },
  {
    id: 'c5',
    title: 'Third-Party Web Fonts Causing Flash of Invisible Text (FOIT)',
    category: 'Performance',
    issue: 'Synchronous external Google Fonts caused an 800ms text blanking period on slow 3G mobile connections, penalizing both LCP and user perception.',
    rootCause: 'External font downloads blocked text rendering while the font file was being fetched from a third-party origin.',
    resolution: 'Switched to a modern system font stack with fallback font metric matching, combined with font-display: swap and preconnect hints for any remote typefaces.',
    codeSnippet: `html {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}`,
    wcagRef: 'WCAG 1.4.12 Text Spacing & Core Web Vitals LCP'
  }
];

export const CONTRAST_SAMPLES = [
  {
    foreground: '#1E3A8A',
    background: '#FFFFFF',
    sampleText: 'Primary Brand Blue on White Background',
    ratio: '11.2 : 1',
    status: 'AAA Passed',
    wcagLevel: 'WCAG AAA (Enhanced >= 7:1)'
  },
  {
    foreground: '#0F172A',
    background: '#F8FAFC',
    sampleText: 'Slate Dark 900 Body Text on Slate 50 Surface',
    ratio: '16.1 : 1',
    status: 'AAA Passed',
    wcagLevel: 'WCAG AAA (Enhanced >= 7:1)'
  },
  {
    foreground: '#334155',
    background: '#FFFFFF',
    sampleText: 'Muted Slate Secondary Text on White',
    ratio: '8.4 : 1',
    status: 'AAA Passed',
    wcagLevel: 'WCAG AAA (Enhanced >= 7:1)'
  },
  {
    foreground: '#B91C1C',
    background: '#FFFFFF',
    sampleText: 'Validation Error Text on White',
    ratio: '5.9 : 1',
    status: 'AA Passed',
    wcagLevel: 'WCAG AA (Normal >= 4.5:1)'
  },
  {
    foreground: '#15803D',
    background: '#FFFFFF',
    sampleText: 'Success Feedback Green on White',
    ratio: '5.2 : 1',
    status: 'AA Passed',
    wcagLevel: 'WCAG AA (Normal >= 4.5:1)'
  },
  {
    foreground: '#94A3B8',
    background: '#F1F5F9',
    sampleText: 'BASELINE (Before): Faint Gray on Tint (Unoptimized)',
    ratio: '2.1 : 1',
    status: 'FAILED',
    wcagLevel: 'FAILS WCAG AA (Requires >= 4.5:1)'
  }
];
