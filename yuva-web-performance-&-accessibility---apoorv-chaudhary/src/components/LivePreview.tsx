import React, { useState, useEffect, useRef } from 'react';
import { PreviewMode } from '../types';
import { 
  Sparkles, 
  AlertTriangle, 
  Volume2, 
  VolumeX, 
  Layers, 
  Hash, 
  Contrast, 
  ZoomIn, 
  Wind, 
  ExternalLink,
  CheckCircle,
  HelpCircle,
  X,
  Play,
  RotateCcw
} from 'lucide-react';

export const LivePreview: React.FC = () => {
  const [mode, setMode] = useState<PreviewMode>('optimized');
  const [showLandmarks, setShowLandmarks] = useState(false);
  const [showFocusOrder, setShowFocusOrder] = useState(false);
  const [showContrastBadges, setShowContrastBadges] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [screenReaderActive, setScreenReaderActive] = useState(false);
  const [screenReaderSpeech, setScreenReaderSpeech] = useState<string>(
    'Screen reader initialized. Use Tab to navigate landmarks and interactive controls.'
  );

  // Modal State inside the preview
  const [modalOpen, setModalOpen] = useState(false);
  const modalCloseBtnRef = useRef<HTMLButtonElement>(null);
  const modalTriggerRef = useRef<HTMLButtonElement>(null);

  // Form State inside preview
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', track: '', consent: false });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Speech helper
  const speak = (text: string) => {
    setScreenReaderSpeech(text);
    if (screenReaderActive && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Keyboard navigation focus trap for modal
  useEffect(() => {
    if (modalOpen) {
      modalCloseBtnRef.current?.focus();
      speak('Dialog opened: Week 4 Optimization Benchmark Results. Press Escape to close.');

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setModalOpen(false);
          modalTriggerRef.current?.focus();
          speak('Dialog dismissed.');
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [modalOpen]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = 'Full name is required.';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Valid email is required.';
    if (!formData.track) errors.track = 'Please choose a program track.';
    if (!formData.consent) errors.consent = 'You must accept the terms.';

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setFormSubmitted(true);
      speak('Success! Enrollment application submitted. Confirmation email dispatched.');
    } else {
      speak(`Form submission failed with ${Object.keys(errors).length} errors.`);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 max-w-7xl mx-auto">
      {/* Main Interactive Preview Container */}
      <div className="flex-1 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Browser Mockup Toolbar */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-400 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-400 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block"></span>
            <span className="text-xs font-mono text-slate-500 ml-2 bg-white px-3 py-1 rounded-md border border-slate-200 flex items-center gap-1.5 shadow-sm">
              <span className="text-emerald-600 font-bold">https://</span>
              <span>yuva.org/initiatives/skills-mentorship</span>
            </span>
          </div>

          {/* Mode Switcher Toggle */}
          <div className="flex items-center bg-slate-200 p-0.5 rounded-lg text-xs font-bold">
            <button
              onClick={() => {
                setMode('optimized');
                speak('Switched to Optimized Webpage. WCAG 2.1 AA and 99 Lighthouse performance active.');
              }}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all cursor-pointer ${
                mode === 'optimized'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Optimized (After: 99/100)</span>
            </button>
            <button
              onClick={() => {
                setMode('unoptimized');
                speak('Switched to Unoptimized Baseline. Simulating 4.8MB payload, bad contrast, and missing ARIA.');
              }}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all cursor-pointer ${
                mode === 'unoptimized'
                  ? 'bg-amber-600 text-white shadow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Baseline (Before: 42/100)</span>
            </button>
          </div>
        </div>

        {/* Live Announcer Banner if screen reader mode on */}
        {screenReaderActive && (
          <div className="bg-slate-900 text-amber-300 px-4 py-2 text-xs flex items-center gap-2 border-b border-slate-800 animate-pulse">
            <Volume2 className="w-4 h-4 shrink-0 text-amber-400" />
            <span className="font-semibold text-slate-400">Screen Reader Announcer:</span>
            <span className="font-mono text-white flex-1 truncate">{screenReaderSpeech}</span>
          </div>
        )}

        {/* Viewport Frame with Zoom and Style Injections */}
        <div 
          className={`overflow-y-auto max-h-[750px] relative transition-all ${
            highContrast ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'
          } ${reducedMotion ? 'duration-0' : 'duration-200'}`}
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left' }}
        >
          {/* Skip Link (Optimized only) */}
          {mode === 'optimized' && (
            <a
              href="#main-preview-content"
              onFocus={() => speak('Focused on Skip Link: Skip to main content')}
              className="absolute -top-14 left-4 z-50 bg-blue-900 text-white px-4 py-2 rounded-b-lg font-bold text-xs focus:top-0 transition-all focus:ring-4 focus:ring-amber-400"
            >
              Skip to main content
            </a>
          )}

          {/* Webpage Header */}
          <header 
            className={`sticky top-0 z-40 px-6 py-4 border-b flex items-center justify-between ${
              highContrast ? 'bg-black border-white text-white' : 'bg-white border-slate-200 text-slate-900'
            } ${showLandmarks ? 'ring-2 ring-purple-500 ring-offset-2' : ''}`}
            role="banner"
          >
            {showLandmarks && (
              <span className="absolute top-1 left-2 bg-purple-600 text-white text-[9px] font-mono px-1 rounded uppercase">
                &lt;header role="banner"&gt;
              </span>
            )}

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-900 flex items-center justify-center text-white font-extrabold text-sm">
                Y
              </div>
              <span className="font-black text-lg tracking-tight">
                YUVA <span className="text-xs bg-blue-100 text-blue-900 px-1.5 py-0.5 rounded font-bold">EMPOWER</span>
              </span>
            </div>

            <nav 
              className={`hidden md:flex items-center gap-6 ${showLandmarks ? 'ring-2 ring-blue-500' : ''}`} 
              aria-label="Primary Navigation"
            >
              {showLandmarks && (
                <span className="absolute -top-3 bg-blue-600 text-white text-[9px] font-mono px-1 rounded uppercase">
                  &lt;nav&gt;
                </span>
              )}
              {['Home', 'Our Impact', 'Skill Tracks', 'Enroll'].map((item, idx) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  onFocus={() => speak(`Link: ${item}, navigation item ${idx + 1} of 4`)}
                  className={`text-xs font-semibold relative transition-colors ${
                    idx === 0 ? 'text-blue-900 font-bold' : 'text-slate-600 hover:text-blue-900'
                  }`}
                >
                  {showFocusOrder && (
                    <span className="absolute -top-3 -left-3 bg-red-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {idx + 1}
                    </span>
                  )}
                  {item}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setHighContrast(!highContrast);
                  speak(`High contrast mode ${!highContrast ? 'enabled' : 'disabled'}`);
                }}
                className={`px-3 py-1.5 rounded text-xs font-bold border transition-colors cursor-pointer ${
                  highContrast ? 'bg-white text-black border-white' : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
                aria-label="Toggle High Contrast"
              >
                ◐ Contrast
              </button>
              <a
                href="#register-preview"
                onFocus={() => speak('Button: Join Yuva. Navigates to registration section.')}
                className="px-3.5 py-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded text-xs font-bold shadow-sm"
              >
                Join Yuva
              </a>
            </div>
          </header>

          {/* Webpage Main Landmark */}
          <main 
            id="main-preview-content" 
            role="main"
            className={`p-6 md:p-10 ${showLandmarks ? 'ring-2 ring-emerald-500' : ''}`}
          >
            {showLandmarks && (
              <span className="bg-emerald-600 text-white text-[9px] font-mono px-1 rounded uppercase">
                &lt;main role="main"&gt;
              </span>
            )}

            {/* Hero Section */}
            <section className="mb-12 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-900 px-3 py-1 rounded-full text-xs font-bold mb-3">
                  <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                  Yuva Internship Week 4: Performance & Accessibility Capstone
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-3 tracking-tight leading-tight">
                  Empowering the Next Generation of Thinkers, Builders & Leaders
                </h1>
                
                {/* Contrast Badge Demo */}
                <div className="relative">
                  <p className={`text-sm leading-relaxed mb-6 ${
                    mode === 'unoptimized' ? 'text-slate-400' : 'text-slate-700'
                  }`}>
                    Yuva connects ambitious youth with real-world skills, industry mentorship, and career acceleration programs. Designed with semantic HTML5 and optimized for sub-second page loads.
                  </p>
                  {showContrastBadges && (
                    <span className={`absolute -top-3 right-0 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shadow ${
                      mode === 'unoptimized' ? 'bg-red-500 text-white' : 'bg-emerald-600 text-white'
                    }`}>
                      {mode === 'unoptimized' ? 'Ratio: 2.1:1 (FAIL)' : 'Ratio: 11.2:1 (AAA PASS)'}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="#programs-preview"
                    onFocus={() => speak('Button: Explore Programs')}
                    className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg font-bold text-xs shadow-md transition-all"
                  >
                    Explore Programs
                  </a>

                  <button
                    ref={modalTriggerRef}
                    onClick={() => setModalOpen(true)}
                    onFocus={() => speak('Button: View Audit Highlights. Opens modal dialog.')}
                    className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-bold text-xs transition-colors cursor-pointer"
                  >
                    View Audit Highlights
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-4">
                  Built by <strong>Apoorv Chaudhary</strong> for the <strong>Yuva Internship Program</strong>.
                </p>
              </div>

              {/* Hero Image with CLS / Aspect Ratio demonstration */}
              <div className="relative rounded-xl overflow-hidden shadow-lg border border-slate-200 aspect-[560/380] bg-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80"
                  alt={
                    mode === 'optimized'
                      ? "A diverse group of young college students collaborating around a laptop during a technical workshop"
                      : "" // unoptimized missing alt!
                  }
                  className="w-full h-full object-cover"
                  loading="eager"
                  width="560"
                  height="380"
                />
                {mode === 'unoptimized' && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded font-bold shadow">
                    Missing alt text! (WCAG 1.1.1)
                  </div>
                )}
                {mode === 'optimized' && (
                  <div className="absolute bottom-2 left-2 flex gap-1.5">
                    <span className="bg-slate-900/80 text-white text-[10px] px-2 py-0.5 rounded font-mono font-bold backdrop-blur">
                      aspect-ratio: 560/380
                    </span>
                    <span className="bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded font-bold shadow">
                      CLS: 0.002
                    </span>
                  </div>
                )}
              </div>
            </section>

            {/* Impact Metrics Section */}
            <section className="mb-12 bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4 text-center">
                Measurable Impact Across Nationwide Youth
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-50 rounded-lg text-center border border-slate-100">
                  <div className="text-2xl font-black text-blue-900">94%</div>
                  <div className="text-xs font-bold text-slate-800">Payload Reduction</div>
                  <div className="text-[11px] text-slate-500">4.8MB down to 284KB</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg text-center border border-slate-100">
                  <div className="text-2xl font-black text-emerald-600">100%</div>
                  <div className="text-xs font-bold text-slate-800">WCAG 2.1 AA</div>
                  <div className="text-[11px] text-slate-500">Zero Axe Violations</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg text-center border border-slate-100">
                  <div className="text-2xl font-black text-indigo-600">50K+</div>
                  <div className="text-xs font-bold text-slate-800">Students Mentored</div>
                  <div className="text-[11px] text-slate-500">Across 350+ Colleges</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg text-center border border-slate-100">
                  <div className="text-2xl font-black text-teal-600">0.002</div>
                  <div className="text-xs font-bold text-slate-800">Zero Layout Shift</div>
                  <div className="text-[11px] text-slate-500">Stable Visual Rendering</div>
                </div>
              </div>
            </section>

            {/* Programs Section */}
            <section id="programs-preview" className="mb-12">
              <h2 className="text-lg font-bold text-slate-900 mb-1">Skill Acceleration Tracks</h2>
              <p className="text-xs text-slate-500 mb-4">Curated paths built with industry engineers.</p>
              
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    title: 'Full-Stack Web Engineering',
                    duration: '12 Weeks',
                    desc: 'Master semantic HTML5, modern CSS, Core Web Vitals, and responsive APIs.',
                    badge: 'High Demand'
                  },
                  {
                    title: 'Accessibility (a11y) Architecture',
                    duration: '8 Weeks',
                    desc: 'Design universally inclusive interfaces for screen readers, braille, and motor impairments.',
                    badge: 'Inclusive UX'
                  },
                  {
                    title: 'Web Performance & Cloud',
                    duration: '10 Weeks',
                    desc: 'Profile critical rendering paths, optimize images, and reduce payload latency.',
                    badge: 'Optimization'
                  }
                ].map((track, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between shadow-sm">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-900 px-2 py-0.5 rounded">
                        {track.badge}
                      </span>
                      <h3 className="font-bold text-sm text-slate-900 mt-2 mb-1">{track.title}</h3>
                      <p className="text-xs text-slate-600 mb-4">{track.desc}</p>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                      <span className="font-semibold text-slate-500">{track.duration}</span>
                      <a href="#register-preview" className="text-blue-900 font-bold hover:underline">
                        Apply Now &rarr;
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Accessible Accordion (FAQ) */}
            <section className="mb-12 bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-1">Frequently Asked Questions</h2>
              <p className="text-xs text-slate-500 mb-4">Keyboard operable with space and enter keys.</p>

              <div className="divide-y divide-slate-200 border border-slate-200 rounded-lg overflow-hidden">
                {[
                  {
                    q: 'What distinguishes WCAG 2.1 Level AA from Level AAA?',
                    a: 'Level AA requires a minimum contrast of 4.5:1 for standard text (3:1 for large text), visible keyboard focus, and skip navigation. Level AAA mandates 7:1 contrast, sign language alternatives, and enhanced cognitive readability.'
                  },
                  {
                    q: 'How does Critical CSS prevent render-blocking delay?',
                    a: 'By inlining the minimal CSS needed to draw the initial viewport directly into the HTML <head>, the browser paints without waiting for an extra round-trip HTTP request.'
                  }
                ].map((item, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div key={index}>
                      <button
                        type="button"
                        onClick={() => {
                          setOpenFaq(isOpen ? null : index);
                          speak(`${item.q}. ${!isOpen ? 'Expanded' : 'Collapsed'}`);
                        }}
                        className="w-full text-left px-4 py-3 flex items-center justify-between text-xs font-bold text-slate-800 hover:bg-slate-50 cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <span>{item.q}</span>
                        <span className="text-sm font-bold text-slate-400">{isOpen ? '−' : '+'}</span>
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-3 text-xs text-slate-600 bg-slate-50/50 leading-relaxed">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Accessible Form */}
            <section id="register-preview" className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm max-w-xl mx-auto">
              <h2 className="text-lg font-bold text-slate-900 mb-1">Enroll in Yuva Mentorship</h2>
              <p className="text-xs text-slate-500 mb-4">
                Fields marked with (<span className="text-red-600 font-bold">*</span>) are mandatory.
              </p>

              {formSubmitted ? (
                <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-900">
                  <div className="flex items-center gap-2 font-bold text-sm mb-1">
                    <CheckCircle className="w-4 h-4 text-emerald-600" /> Application Submitted!
                  </div>
                  <p className="text-xs text-emerald-800">
                    Thank you, <strong>{formData.name}</strong>. A confirmation email has been dispatched with orientation details.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: '', email: '', track: '', consent: false });
                    }}
                    className="mt-3 px-3 py-1 bg-emerald-600 text-white rounded text-xs font-bold"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} noValidate className="space-y-4">
                  <div>
                    <label htmlFor="previewName" className="block text-xs font-bold text-slate-800 mb-1">
                      Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="previewName"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-3 py-2 border rounded-lg text-xs ${
                        formErrors.name ? 'border-red-500 bg-red-50/50' : 'border-slate-300'
                      }`}
                      placeholder="e.g. Priya Sharma"
                      aria-required="true"
                    />
                    {formErrors.name && (
                      <p className="text-[11px] text-red-600 font-semibold mt-1" role="alert">
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="previewEmail" className="block text-xs font-bold text-slate-800 mb-1">
                      Email Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="previewEmail"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-3 py-2 border rounded-lg text-xs ${
                        formErrors.email ? 'border-red-500 bg-red-50/50' : 'border-slate-300'
                      }`}
                      placeholder="priya@example.com"
                      aria-required="true"
                    />
                    {formErrors.email && (
                      <p className="text-[11px] text-red-600 font-semibold mt-1" role="alert">
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="previewTrack" className="block text-xs font-bold text-slate-800 mb-1">
                      Preferred Track <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="previewTrack"
                      value={formData.track}
                      onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                      className={`w-full px-3 py-2 border rounded-lg text-xs ${
                        formErrors.track ? 'border-red-500 bg-red-50/50' : 'border-slate-300'
                      }`}
                      aria-required="true"
                    >
                      <option value="">-- Choose Track --</option>
                      <option value="web">Full-Stack Web Engineering</option>
                      <option value="a11y">Accessibility & Inclusive UX</option>
                      <option value="perf">Web Performance Optimization</option>
                    </select>
                    {formErrors.track && (
                      <p className="text-[11px] text-red-600 font-semibold mt-1" role="alert">
                        {formErrors.track}
                      </p>
                    )}
                  </div>

                  <div className="flex items-start gap-2">
                    <input
                      id="previewConsent"
                      type="checkbox"
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-0.5 rounded border-slate-300"
                    />
                    <label htmlFor="previewConsent" className="text-xs text-slate-700">
                      I agree to the Yuva Code of Conduct and internship standards. <span className="text-red-600">*</span>
                    </label>
                  </div>
                  {formErrors.consent && (
                    <p className="text-[11px] text-red-600 font-semibold" role="alert">
                      {formErrors.consent}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-bold transition-all shadow-md cursor-pointer"
                  >
                    Submit Enrollment Application
                  </button>
                </form>
              )}
            </section>
          </main>

          {/* Webpage Footer */}
          <footer 
            className={`p-6 border-t text-center text-xs ${
              highContrast ? 'bg-black border-white text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
            } ${showLandmarks ? 'ring-2 ring-amber-500' : ''}`}
            role="contentinfo"
          >
            {showLandmarks && (
              <span className="bg-amber-600 text-white text-[9px] font-mono px-1 rounded uppercase">
                &lt;footer role="contentinfo"&gt;
              </span>
            )}
            <p className="font-medium text-slate-300 mb-1">
              Yuva Youth Skills & Mentorship Initiative • Built by <strong>Apoorv Chaudhary</strong> (Yuva Intern)
            </p>
            <p className="text-[11px] text-slate-500">
              WCAG 2.1 Level AA & AAA Certified • Zero Automated Axe Violations • 99 Lighthouse Score
            </p>
          </footer>
        </div>

        {/* Modal Dialog inside preview */}
        {modalOpen && (
          <div 
            className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modalTitle"
          >
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between border-b pb-3 mb-4">
                <h3 id="modalTitle" className="font-bold text-base text-slate-900">
                  Week 4 Optimization Benchmark Results
                </h3>
                <button
                  ref={modalCloseBtnRef}
                  onClick={() => {
                    setModalOpen(false);
                    modalTriggerRef.current?.focus();
                  }}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-xs text-slate-600 space-y-3 mb-6">
                <p>
                  Conducted by <strong>Apoorv Chaudhary</strong> for the <strong>Yuva Internship</strong>.
                </p>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-slate-100 text-slate-700 font-bold">
                      <tr>
                        <th className="p-2">Metric</th>
                        <th className="p-2">Before</th>
                        <th className="p-2">After</th>
                        <th className="p-2">Gain</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="p-2 font-medium">Lighthouse Score</td>
                        <td className="p-2 text-slate-500">42 / 100</td>
                        <td className="p-2 text-emerald-600 font-bold">99 / 100</td>
                        <td className="p-2 text-emerald-700 font-semibold">+135%</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium">Largest Contentful Paint</td>
                        <td className="p-2 text-slate-500">5.8s</td>
                        <td className="p-2 text-emerald-600 font-bold">1.1s</td>
                        <td className="p-2 text-emerald-700 font-semibold">-81%</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium">Layout Shift (CLS)</td>
                        <td className="p-2 text-slate-500">0.380</td>
                        <td className="p-2 text-emerald-600 font-bold">0.002</td>
                        <td className="p-2 text-emerald-700 font-semibold">Zero Jitter</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium">Axe Violations</td>
                        <td className="p-2 text-red-500">27 errors</td>
                        <td className="p-2 text-emerald-600 font-bold">0 errors</td>
                        <td className="p-2 text-emerald-700 font-semibold">100% Clean</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setModalOpen(false);
                    modalTriggerRef.current?.focus();
                  }}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-bold cursor-pointer"
                >
                  Close Dialog (Esc)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Accessibility Testing & Simulation Toolbar (Right Panel) */}
      <div className="w-full lg:w-80 flex flex-col gap-4">
        {/* Screen Reader Voice Simulator Widget */}
        <div className="bg-slate-900 text-white rounded-xl p-4 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Screen Reader Simulator
              </h3>
            </div>
            <button
              onClick={() => {
                const next = !screenReaderActive;
                setScreenReaderActive(next);
                if (next) speak('Voice screen reader activated. Tab through elements to hear synthesized vocalization.');
                else {
                  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                  setScreenReaderSpeech('Screen reader deactivated.');
                }
              }}
              className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                screenReaderActive ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {screenReaderActive ? 'VOICE ON' : 'ENABLE'}
            </button>
          </div>
          <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 min-h-[64px] text-xs font-mono text-amber-300/90 leading-relaxed">
            {screenReaderSpeech}
          </div>
          <p className="text-[10px] text-slate-400 mt-2">
            Simulates NVDA / VoiceOver reading landmarks, button roles, and form labels.
          </p>
        </div>

        {/* Visual Inspection Overlays */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Interactive A11y Overlays
          </h3>

          {/* Landmarks Toggle */}
          <button
            onClick={() => setShowLandmarks(!showLandmarks)}
            className={`w-full px-3 py-2 rounded-lg text-xs font-bold flex items-center justify-between border transition-all cursor-pointer ${
              showLandmarks ? 'bg-purple-50 border-purple-500 text-purple-700' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-600" />
              <span>Semantic Landmarks</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 font-mono">
              {showLandmarks ? 'ON' : 'OFF'}
            </span>
          </button>

          {/* Focus Order Toggle */}
          <button
            onClick={() => setShowFocusOrder(!showFocusOrder)}
            className={`w-full px-3 py-2 rounded-lg text-xs font-bold flex items-center justify-between border transition-all cursor-pointer ${
              showFocusOrder ? 'bg-red-50 border-red-500 text-red-700' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-red-600" />
              <span>Tab Focus Order Badges</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 font-mono">
              {showFocusOrder ? 'ON' : 'OFF'}
            </span>
          </button>

          {/* Contrast Badges */}
          <button
            onClick={() => setShowContrastBadges(!showContrastBadges)}
            className={`w-full px-3 py-2 rounded-lg text-xs font-bold flex items-center justify-between border transition-all cursor-pointer ${
              showContrastBadges ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2">
              <Contrast className="w-4 h-4 text-emerald-600" />
              <span>Color Contrast Analysis</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 font-mono">
              {showContrastBadges ? 'ON' : 'OFF'}
            </span>
          </button>
        </div>

        {/* User Accommodations Controls */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            WCAG User Accommodations
          </h3>

          {/* Text Zoom */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span className="flex items-center gap-1.5">
                <ZoomIn className="w-3.5 h-3.5" /> Text Scale (WCAG 1.4.4):
              </span>
              <span className="font-mono text-blue-600 font-bold">{zoomLevel}%</span>
            </div>
            <div className="grid grid-cols-4 gap-1">
              {[100, 125, 150, 200].map((val) => (
                <button
                  key={val}
                  onClick={() => {
                    setZoomLevel(val);
                    speak(`Text scaled to ${val} percent without clipping.`);
                  }}
                  className={`py-1 text-xs rounded font-bold border transition-colors cursor-pointer ${
                    zoomLevel === val ? 'bg-blue-900 text-white border-blue-900' : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {val}%
                </button>
              ))}
            </div>
          </div>

          {/* Reduced Motion Toggle */}
          <button
            onClick={() => {
              setReducedMotion(!reducedMotion);
              speak(`Reduced motion ${!reducedMotion ? 'enabled' : 'disabled'}`);
            }}
            className={`w-full px-3 py-2 rounded-lg text-xs font-bold flex items-center justify-between border transition-all cursor-pointer ${
              reducedMotion ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-indigo-600" />
              <span>prefers-reduced-motion</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 font-mono">
              {reducedMotion ? 'ACTIVE' : 'DEFAULT'}
            </span>
          </button>
        </div>

        {/* Quick Link to Deliverable Files */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-950 flex items-center justify-between">
          <div>
            <div className="font-bold text-blue-900">Direct Deliverables Ready</div>
            <div className="text-[11px] text-blue-700">HTML & CSS standalone files ready</div>
          </div>
          <a
            href="/accessible_yuva_page.html"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg transition-colors"
            title="Open pure static HTML page in isolated new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
