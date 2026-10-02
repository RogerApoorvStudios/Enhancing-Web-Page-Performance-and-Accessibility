import React, { useState } from 'react';
import { 
  FileCode, 
  Copy, 
  Check, 
  Download, 
  Eye, 
  ExternalLink,
  Code2,
  FileText,
  Search
} from 'lucide-react';
import { DELIVERABLE_HTML_CODE, DELIVERABLE_CSS_CODE, DELIVERABLE_REPORT_CODE } from '../data/rawDeliverables';

export const CodeStudio: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<'html' | 'css' | 'report'>('html');
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fileConfig = {
    html: {
      name: 'accessible_yuva_page.html',
      title: 'HTML Deliverable (Accessible Webpage)',
      size: '12.4 KB',
      lang: 'html',
      badge: 'Deliverable 1',
      code: DELIVERABLE_HTML_CODE,
      downloadPath: '/accessible_yuva_page.html'
    },
    css: {
      name: 'optimized_styles.css',
      title: 'CSS Deliverable (Streamlined Stylesheet)',
      size: '6.8 KB',
      lang: 'css',
      badge: 'Deliverable 2',
      code: DELIVERABLE_CSS_CODE,
      downloadPath: '/optimized_styles.css'
    },
    report: {
      name: 'PERFORMANCE_ACCESSIBILITY_REPORT.txt',
      title: 'Report Deliverable (Technical Audit Report)',
      size: '18.4 KB',
      lang: 'text',
      badge: 'Deliverable 3',
      code: DELIVERABLE_REPORT_CODE,
      downloadPath: '/PERFORMANCE_ACCESSIBILITY_REPORT.txt'
    }
  };

  const current = fileConfig[selectedFile];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = current.downloadPath;
    link.download = current.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const lines = current.code.split('\n');
  const filteredLines = searchQuery.trim()
    ? lines.filter(l => l.toLowerCase().includes(searchQuery.toLowerCase()))
    : lines;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Studio Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-900 px-2.5 py-0.5 rounded-full text-xs font-bold mb-2">
            <Code2 className="w-3.5 h-3.5" />
            Deliverables Studio & Source Inspector
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Yuva Internship Project Deliverables
          </h2>
          <p className="text-xs text-slate-500">
            Directly inspect, copy, or download the required HTML, CSS, and Technical Report deliverables.
          </p>
        </div>

        {/* File Selectors */}
        <div className="flex flex-wrap items-center gap-2">
          {(['html', 'css', 'report'] as const).map((key) => {
            const f = fileConfig[key];
            const isSelected = selectedFile === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setSelectedFile(key);
                  setSearchQuery('');
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-900 text-white border-blue-900 shadow-md shadow-blue-900/20'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <FileCode className="w-4 h-4" />
                <span>{f.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                  isSelected ? 'bg-blue-800 text-blue-200' : 'bg-slate-200 text-slate-600'
                }`}>
                  {f.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Code Inspector Box */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
        {/* Code Bar */}
        <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-mono text-blue-400 font-bold flex items-center gap-1.5">
              <FileCode className="w-4 h-4" /> {current.name}
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400 font-mono">{current.size}</span>
            <span className="text-slate-500">|</span>
            <span className="text-emerald-400 font-medium">{lines.length} lines</span>
          </div>

          {/* Search inside code */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search file content..."
                className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg pl-8 pr-3 py-1 focus:outline-none focus:border-blue-500 w-44 sm:w-56"
              />
            </div>

            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Copy code"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              title="Download deliverable file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>

            {selectedFile === 'html' && (
              <a
                href="/accessible_yuva_page.html"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-semibold flex items-center gap-1.5 transition-colors"
                title="Open HTML in browser tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Preview</span>
              </a>
            )}
          </div>
        </div>

        {/* Code Content Area with Line Numbers */}
        <div className="p-4 overflow-x-auto max-h-[600px] font-mono text-xs text-slate-300 leading-relaxed scrollbar-thin">
          <pre className="table w-full">
            <tbody>
              {filteredLines.map((line, index) => (
                <tr key={index} className="hover:bg-slate-900/60">
                  <td className="w-10 pr-4 text-right text-slate-600 select-none text-[11px]">
                    {index + 1}
                  </td>
                  <td className="whitespace-pre">{line}</td>
                </tr>
              ))}
            </tbody>
          </pre>
        </div>
      </div>
    </div>
  );
};
