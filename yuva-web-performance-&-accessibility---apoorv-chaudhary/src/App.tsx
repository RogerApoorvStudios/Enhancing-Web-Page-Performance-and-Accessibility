/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Yuva Web Performance & Accessibility Suite
 * Author: Apoorv Chaudhary (Intern at Yuva)
 */

import React, { useState } from 'react';
import { ActiveTab } from './types';
import { Header } from './components/Header';
import { LivePreview } from './components/LivePreview';
import { MetricsDashboard } from './components/MetricsDashboard';
import { ReportViewer } from './components/ReportViewer';
import { CodeStudio } from './components/CodeStudio';
import { 
  CheckCircle2, 
  Download, 
  ExternalLink, 
  FileCode, 
  FileText, 
  Sparkles, 
  ShieldCheck,
  Building,
  Heart
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('preview');
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const handlePrintReport = () => {
    setActiveTab('report');
    setTimeout(() => {
      window.print();
    }, 300);
  };

  const handleDownloadAll = () => {
    // Download HTML
    const linkHtml = document.createElement('a');
    linkHtml.href = '/accessible_yuva_page.html';
    linkHtml.download = 'accessible_yuva_page.html';
    document.body.appendChild(linkHtml);
    linkHtml.click();
    document.body.removeChild(linkHtml);

    // Download CSS
    setTimeout(() => {
      const linkCss = document.createElement('a');
      linkCss.href = '/optimized_styles.css';
      linkCss.download = 'optimized_styles.css';
      document.body.appendChild(linkCss);
      linkCss.click();
      document.body.removeChild(linkCss);
    }, 250);

    // Download Text Report
    setTimeout(() => {
      const linkTxt = document.createElement('a');
      linkTxt.href = '/PERFORMANCE_ACCESSIBILITY_REPORT.txt';
      linkTxt.download = 'PERFORMANCE_ACCESSIBILITY_REPORT.txt';
      document.body.appendChild(linkTxt);
      linkTxt.click();
      document.body.removeChild(linkTxt);
    }, 500);

    setDownloadNotice('All 3 deliverable files (HTML, CSS, Report TXT) downloaded successfully!');
    setTimeout(() => setDownloadNotice(null), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onPrintReport={handlePrintReport}
        onDownloadAll={handleDownloadAll}
      />

      {/* Download Alert Notice */}
      {downloadNotice && (
        <div className="bg-emerald-600 text-white px-4 py-2.5 text-xs font-bold text-center flex items-center justify-center gap-2 shadow-md">
          <CheckCircle2 className="w-4 h-4" />
          <span>{downloadNotice}</span>
        </div>
      )}

      {/* Main View Area */}
      <main className="flex-1 py-6">
        {activeTab === 'preview' && <LivePreview />}
        {activeTab === 'metrics' && <MetricsDashboard />}
        {activeTab === 'report' && <ReportViewer />}
        {activeTab === 'code' && <CodeStudio />}
      </main>

      {/* Footer Landmark with Yuva Internship Attribution */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-8 px-4 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 font-bold text-slate-200 text-sm">
              <span>Yuva Web Performance & Accessibility Capstone</span>
              <span className="bg-blue-600/30 text-blue-300 border border-blue-500/40 px-2 py-0.5 rounded text-[10px]">
                Week 4 Task
              </span>
            </div>
            <p className="text-slate-400">
              Developed by <strong>Apoorv Chaudhary</strong> for the <strong>Yuva Internship Program</strong>.
            </p>
            <p className="text-[11px] text-slate-500">
              Optimized static webpage • Streamlined CSS • Comprehensive Technical Audit Report • WCAG 2.1 AA/AAA
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <a
              href="/accessible_yuva_page.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
            >
              <FileCode className="w-3.5 h-3.5 text-blue-400" />
              <span>HTML Deliverable</span>
            </a>
            <span className="text-slate-700">•</span>
            <a
              href="/optimized_styles.css"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
            >
              <FileCode className="w-3.5 h-3.5 text-indigo-400" />
              <span>CSS Deliverable</span>
            </a>
            <span className="text-slate-700">•</span>
            <a
              href="/PERFORMANCE_ACCESSIBILITY_REPORT.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>Report Deliverable (.TXT)</span>
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-slate-800 text-center text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2">
          <span>&copy; 2026 Yuva Youth Skills & Mentorship Initiative. All rights reserved.</span>
          <span className="flex items-center gap-1 justify-center">
            Crafted with accessibility, semantic standards, and sub-second performance.
          </span>
        </div>
      </footer>
    </div>
  );
}
