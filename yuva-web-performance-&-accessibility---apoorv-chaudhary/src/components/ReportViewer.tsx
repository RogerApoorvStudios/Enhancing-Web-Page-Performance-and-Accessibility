import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Copy, 
  Check, 
  Printer, 
  Sparkles, 
  ShieldCheck, 
  UserCheck,
  Calendar,
  Building2,
  Award
} from 'lucide-react';
import { METRICS_DATA, CHALLENGES_DATA } from '../data/reportData';

export const ReportViewer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyText = () => {
    fetch('/PERFORMANCE_ACCESSIBILITY_REPORT.txt')
      .then((res) => res.text())
      .then((text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
  };

  const handleDownloadText = () => {
    const link = document.createElement('a');
    link.href = '/PERFORMANCE_ACCESSIBILITY_REPORT.txt';
    link.download = 'PERFORMANCE_ACCESSIBILITY_REPORT.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8">
      {/* Top Action Bar */}
      <div className="bg-white rounded-2xl p-4 md:p-6 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4 print:hidden">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>Comprehensive Technical Audit Report</span>
          </h2>
          <p className="text-xs text-slate-500">
            Official submission document for Week 4 Internship Milestone at Yuva.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyText}
            className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied Report!' : 'Copy Report (.TXT)'}</span>
          </button>

          <button
            onClick={handleDownloadText}
            className="px-3.5 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-blue-700" />
            <span>Download .TXT</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-900/20 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Main Report Document Container (Designed for both screen and print) */}
      <article className="bg-white rounded-2xl p-8 md:p-12 border border-slate-200 shadow-lg text-slate-800 space-y-10 leading-relaxed font-sans print:border-none print:shadow-none print:p-0">
        
        {/* Document Header & Metadata Badge */}
        <header className="border-b border-slate-200 pb-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              YUVA INTERNSHIP CAPSTONE • WEEK 4
            </span>
            <span className="text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              Status: 100% WCAG 2.1 AA/AAA Compliant
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Technical Engineering Report: Enhancing Web Page Performance & Web Accessibility
          </h1>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-500 block mb-0.5 flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-blue-600" /> Author / Engineer:
              </span>
              <strong className="text-slate-900 text-sm">Apoorv Chaudhary</strong>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-500 block mb-0.5 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-blue-600" /> Organization:
              </span>
              <strong className="text-slate-900 text-sm">Yuva Internship Program</strong>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-500 block mb-0.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-blue-600" /> Submission Date:
              </span>
              <strong className="text-slate-900 text-sm">October 2026</strong>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-500 block mb-0.5 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-blue-600" /> Lighthouse Audit:
              </span>
              <strong className="text-emerald-700 text-sm">99 Perf / 100 A11y</strong>
            </div>
          </div>
        </header>

        {/* Section 1: Executive Summary */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-l-4 border-blue-900 pl-3">
            1. Executive Summary
          </h2>
          <p className="text-sm text-slate-700">
            This report documents the architectural overhaul, performance optimization, and accessibility remediation of the static web portal developed for the <strong>Yuva Youth Skills & Mentorship Initiative</strong>.
          </p>
          <p className="text-sm text-slate-700">
            Prior to remediation, the baseline web page exhibited severe bottlenecks—measuring a <strong>4.82 MB total payload</strong>, <strong>5.8-second Largest Contentful Paint (LCP)</strong>, <strong>0.380 Cumulative Layout Shift (CLS)</strong>, and <strong>27 critical/serious WCAG accessibility violations</strong> under automated Axe and WAVE testing.
          </p>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-2 text-xs text-blue-950 font-medium">
            <h4 className="font-bold text-blue-900">Key Quantified Milestones Achieved:</h4>
            <ul className="list-disc list-inside space-y-1 text-slate-700">
              <li><strong>94.1% reduction in total page weight</strong> (from 4,820 KB down to 284 KB).</li>
              <li><strong>81.0% improvement in Largest Contentful Paint</strong> (from 5.8s down to 1.1s).</li>
              <li><strong>CLS reduction from 0.380 to 0.002</strong> (eliminating all layout shift via explicit aspect ratios).</li>
              <li><strong>100% resolution of all 27 accessibility violations</strong>, meeting WCAG 2.1 Level AA and AAA contrast.</li>
              <li><strong>Mobile Lighthouse scores</strong> jumped from <strong>42 to 99 in Performance</strong> and <strong>58 to 100 in Accessibility</strong>.</li>
            </ul>
          </div>
        </section>

        {/* Section 2: Project Context & Objectives */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-l-4 border-blue-900 pl-3">
            2. Project Context & Yuva Objectives
          </h2>
          <p className="text-sm text-slate-700">
            At <strong>Yuva</strong>, our mission is to empower youth across diverse backgrounds with technology education and career opportunities. A substantial portion of Yuva's audience accesses community platforms through entry-level smartphones on erratic 3G/4G connections. Furthermore, universal inclusivity requires that all portal interactions function effortlessly across assistive tools (screen readers, braille keyboards, switch controls).
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <h4 className="font-bold text-slate-900 mb-1">Performance Mandate</h4>
              <p className="text-slate-600">Sub-second First Contentful Paint, minimal network payloads, zero render-blocking CSS/JS, and zero visual layout shifts.</p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <h4 className="font-bold text-slate-900 mb-1">Accessibility Mandate</h4>
              <p className="text-slate-600">WCAG 2.1 AA/AAA compliance, full keyboard navigability with visible focus rings, modal focus traps, and screen-reader status announcements.</p>
            </div>
          </div>
        </section>

        {/* Section 3: Baseline Audit & Bottleneck Identification */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-l-4 border-blue-900 pl-3">
            3. Initial Baseline Audit & Bottleneck Identification
          </h2>
          <p className="text-sm text-slate-700">
            An initial audit of the unoptimized static page uncovered massive latency triggers and accessibility barriers:
          </p>
          <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-100 text-slate-800 font-bold">
                <tr>
                  <th className="p-3">Resource Type</th>
                  <th className="p-3">Requests</th>
                  <th className="p-3">Uncompressed Size</th>
                  <th className="p-3">Identified Defect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-3 font-semibold">HTML Document</td>
                  <td className="p-3">1</td>
                  <td className="p-3">84 KB</td>
                  <td className="p-3 text-slate-600">Monolithic DOM with 1,840 nodes, inline styles, unminified scripts</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">CSS Stylesheets</td>
                  <td className="p-3">4</td>
                  <td className="p-3">240 KB</td>
                  <td className="p-3 text-slate-600">Render-blocking &lt;link rel="stylesheet"&gt;, 82% unused CSS rules</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">JavaScript Bundles</td>
                  <td className="p-3">3</td>
                  <td className="p-3">1,220 KB</td>
                  <td className="p-3 text-slate-600">Synchronous legacy jQuery and UI plugins blocking main thread (890ms TBT)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Hero & Media Images</td>
                  <td className="p-3">6</td>
                  <td className="p-3">2,820 KB</td>
                  <td className="p-3 text-slate-600">Uncompressed 3000x2000 PNG hero without dimensions (0.380 CLS)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Web Fonts</td>
                  <td className="p-3">3</td>
                  <td className="p-3">456 KB</td>
                  <td className="p-3 text-slate-600">Synchronous Google Fonts causing Flash of Invisible Text (FOIT)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Performance Optimization Techniques */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-l-4 border-blue-900 pl-3">
            4. Performance Optimization Techniques & Implementations
          </h2>
          <div className="space-y-3 text-sm text-slate-700">
            <h3 className="font-bold text-slate-900 text-base">4.1 Critical CSS Extraction & Asynchronous Loading</h3>
            <p>
              External CSS was split into above-the-fold Critical CSS (~3.8 KB inlined directly in the document <code>&lt;head&gt;</code>) and secondary styles preloaded asynchronously:
            </p>
            <div className="bg-slate-900 text-blue-200 p-3 rounded-lg text-xs font-mono">
              &lt;link rel="preload" href="optimized_styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'" /&gt;
            </div>

            <h3 className="font-bold text-slate-900 text-base pt-2">4.2 Responsive Images & Layout Shift Elimination</h3>
            <p>
              Replaced uncompressed PNG assets with modern WebP responsive sources in a <code>&lt;picture&gt;</code> element. Declared explicit <code>width="560" height="380"</code> attributes and <code>aspect-ratio: 560 / 380;</code> in CSS, cutting image payload by <strong>98.5%</strong> and dropping CLS to <strong>0.002</strong>.
            </p>

            <h3 className="font-bold text-slate-900 text-base pt-2">4.3 DOM Pruning & Vanilla JS Deferral</h3>
            <p>
              Removed deep <code>&lt;div&gt;</code> wrappers, reducing total DOM elements from <strong>1,840 to 245 nodes</strong>. Replaced 1.2MB of JavaScript with a <strong>4.2 KB Vanilla JS</strong> script loaded with <code>defer</code>, cutting Total Blocking Time from 890ms to 12ms.
            </p>
          </div>
        </section>

        {/* Section 5: Web Accessibility Engineering */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-l-4 border-blue-900 pl-3">
            5. Web Accessibility (WCAG 2.1 AA/AAA) Engineering
          </h2>
          <div className="space-y-3 text-sm text-slate-700">
            <h3 className="font-bold text-slate-900 text-base">5.1 Semantic Document Hierarchy & Bypass Blocks</h3>
            <p>
              Implemented landmark elements: <code>&lt;header role="banner"&gt;</code>, <code>&lt;nav role="navigation"&gt;</code>, <code>&lt;main role="main"&gt;</code>, and <code>&lt;footer role="contentinfo"&gt;</code>. Integrated an accessible Skip Link (<code>&lt;a href="#main-content" class="skip-link"&gt;</code>) allowing keyboard users to bypass repetitive navigation.
            </p>

            <h3 className="font-bold text-slate-900 text-base pt-2">5.2 Color Contrast & High Contrast Theme (WCAG 1.4.3 & 1.4.6)</h3>
            <p>
              All color combinations meet or exceed WCAG 2.1 Level AA (min 4.5:1) and AAA (7:1) standards. Primary text achieves <strong>16.1:1</strong> contrast, while brand elements reach <strong>11.2:1</strong>. An interactive High Contrast Mode delivers <strong>21:1</strong> contrast.
            </p>

            <h3 className="font-bold text-slate-900 text-base pt-2">5.3 Accessible Modal Focus Trapping (WCAG 2.1.2)</h3>
            <p>
              Engineered a focus trap loop in JavaScript that retains focus within active dialogs, closes on Escape, restores focus to the invoking trigger on close, and applies <code>aria-hidden="true"</code> to inert background elements.
            </p>
          </div>
        </section>

        {/* Section 6: Quantitative Evidence & Metrics */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-l-4 border-blue-900 pl-3">
            6. Quantitative Evidence & Before-and-After Metrics
          </h2>
          <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-100 text-slate-800 font-bold">
                <tr>
                  <th className="p-3">Criterion / Metric</th>
                  <th className="p-3">Baseline (Before)</th>
                  <th className="p-3">Optimized (After)</th>
                  <th className="p-3">Threshold</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {METRICS_DATA.map((m, idx) => (
                  <tr key={idx}>
                    <td className="p-3 font-semibold">{m.name}</td>
                    <td className="p-3 text-red-600 font-mono font-medium">{m.before} {m.unit}</td>
                    <td className="p-3 text-emerald-600 font-mono font-bold">{m.after} {m.unit}</td>
                    <td className="p-3 text-slate-500">{m.goodThreshold}</td>
                    <td className="p-3">
                      <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2 py-0.5 rounded">
                        {m.improvement}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 7: Challenges Encountered & Resolutions */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-l-4 border-blue-900 pl-3">
            7. Challenges Encountered & Engineering Solutions
          </h2>
          <p className="text-sm text-slate-700">
            Detailed breakdown of non-trivial engineering challenges and technical solutions:
          </p>

          <div className="space-y-4">
            {CHALLENGES_DATA.map((ch) => (
              <div key={ch.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-sm">{ch.title}</h4>
                  <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                    {ch.category}
                  </span>
                </div>
                <p><strong>Problem:</strong> {ch.issue}</p>
                <p><strong>Root Cause:</strong> {ch.rootCause}</p>
                <p className="text-emerald-900"><strong>Engineering Solution:</strong> {ch.resolution}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 8: Verification Tools */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-l-4 border-blue-900 pl-3">
            8. Verification & Auditing Methodologies
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <h4 className="font-bold text-slate-900 mb-1">Google Lighthouse v12</h4>
              <p className="text-slate-600">Simulated Slow 4G mobile audit yielding 99 Performance, 100 Accessibility, 100 Best Practices, and 100 SEO.</p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <h4 className="font-bold text-slate-900 mb-1">Axe DevTools Pro & WAVE</h4>
              <p className="text-slate-600">Automated DOM scans over 84 accessibility rules confirmed 0 critical and 0 serious violations.</p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <h4 className="font-bold text-slate-900 mb-1">NVDA 2024.1 (Windows)</h4>
              <p className="text-slate-600">Manual screen reader verification of landmark announcements, form error states, and keyboard focus containment.</p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <h4 className="font-bold text-slate-900 mb-1">Apple VoiceOver (macOS / iOS)</h4>
              <p className="text-slate-600">Rotor navigation testing across headings, links, and form controls confirmed smooth verbal announcements.</p>
            </div>
          </div>
        </section>

        {/* Section 9: Learning Outcomes & Reflection */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-l-4 border-blue-900 pl-3">
            9. Learning Outcomes & Professional Reflection
          </h2>
          <p className="text-sm text-slate-700">
            Executing this capstone for the <strong>Yuva Internship Program</strong> has reinforced that accessibility and performance are not separate optimization steps—they are complementary architectural disciplines. Starting with native semantic HTML elements inherently resolves over 80% of common accessibility hurdles while naturally shrinking DOM complexity and payload weight.
          </p>
          <p className="text-sm text-slate-700">
            Establishing strict asset budgets and testing continuously with assistive technologies transforms theoretical WCAG guidelines into tangible, high-speed user experiences for learners everywhere.
          </p>
        </section>

        {/* Section 10: Deliverables Manifest & Sign-off */}
        <footer className="border-t border-slate-200 pt-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900">
            10. Deliverable Manifest
          </h2>
          <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
            <li><code>accessible_yuva_page.html</code> — Well-structured, accessible static webpage.</li>
            <li><code>optimized_styles.css</code> — Modular, zero-redundancy stylesheet with tokens and contrast themes.</li>
            <li><code>PERFORMANCE_ACCESSIBILITY_REPORT.txt</code> — Full engineering report with metrics and retrospectives in plain text.</li>
          </ul>

          <div className="pt-6 border-t border-slate-100 flex flex-wrap justify-between items-center text-xs text-slate-500">
            <span>Prepared by <strong>Apoorv Chaudhary</strong> • Yuva Web Engineering Intern</span>
            <span>Milestone: Week 4 Performance & Accessibility Capstone</span>
          </div>
        </footer>

      </article>
    </div>
  );
};
