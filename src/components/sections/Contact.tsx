import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import type { ContactItem } from '../../types';
import { PortfolioIconSvg } from '../../utils/icons';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

// ── EmailJS config ────────────────────────────────────────────────────────────
// 1. Sign up at https://www.emailjs.com (free)
// 2. Create a Service (Gmail) → copy the Service ID below
// 3. Create a Template with variables {{from_name}}, {{from_email}}, {{message}} → copy Template ID
// 4. Copy your Public Key from Account → API Keys
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // ← replace
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // ← replace
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // ← replace
// ─────────────────────────────────────────────────────────────────────────────

interface ContactProps {
  contact: ContactItem[];
}

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function Contact({ contact }: ContactProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const validate = (fd: FormData) => {
    const e: typeof errors = {};
    if (!String(fd.get('from_name')).trim())    e.name    = 'Name is required';
    const em = String(fd.get('from_email') ?? '');
    if (!em.includes('@'))                       e.email   = 'Valid email required';
    if (!String(fd.get('message')).trim())       e.message = 'Message is required';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    const fd = new FormData(formRef.current);
    const errs = validate(fd);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus('sending');
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY);
      setStatus('sent');
      formRef.current.reset();
    } catch {
      setStatus('error');
    }
  };

  const inputClass = (err?: string) =>
    `w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 font-mono`;
  const inputStyle = (err?: string): React.CSSProperties => ({
    background:  'var(--bg-card)',
    border:      `1px solid ${err ? '#ef4444' : 'var(--border)'}`,
    color:       'var(--text-primary)',
  });

  return (
    <section id="contact" className="section px-6 py-24 max-[480px]:px-4 max-[480px]:py-16">
      <div className="mx-auto w-full max-w-5xl">

        <h2 className="reveal font-display text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Get in Touch
          <div className="mt-2 h-0.5 w-12" style={{ background: 'var(--sky)' }} />
        </h2>
        <p className="reveal mb-12 text-sm" style={{ color: 'var(--text-muted)' }}>
          Have a question or want to collaborate? I'd love to hear from you.
        </p>

        <div className="reveal grid md:grid-cols-[1fr_320px] gap-12">

          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            <div>
              <label className="font-mono text-xs uppercase tracking-widest mb-2 block" style={{ color: 'var(--text-muted)' }}>
                Name
              </label>
              <input name="from_name" type="text" placeholder="Your name" className={inputClass(errors.name)} style={inputStyle(errors.name)} />
              {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
            </div>

            <div>
              <label className="font-mono text-xs uppercase tracking-widest mb-2 block" style={{ color: 'var(--text-muted)' }}>
                Email
              </label>
              <input name="from_email" type="email" placeholder="your@email.com" className={inputClass(errors.email)} style={inputStyle(errors.email)} />
              {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
            </div>

            <div>
              <label className="font-mono text-xs uppercase tracking-widest mb-2 block" style={{ color: 'var(--text-muted)' }}>
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                placeholder="Tell me about your project..."
                className={`${inputClass(errors.message)} resize-none`}
                style={inputStyle(errors.message)}
              />
              {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="inline-flex items-center gap-2 self-start px-7 py-3 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-60 hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, var(--sky) 0%, #0ea5e9 100%)',
                color: '#07090f',
                boxShadow: '0 6px 24px rgba(56,189,248,0.22)',
              }}
            >
              {status === 'sending' ? 'Sending…' : <><Send size={14} /> Send Message</>}
            </button>

            {status === 'sent' && (
              <p className="flex items-center gap-2 text-sm text-green-400">
                <CheckCircle size={15} /> Message sent — I'll be in touch soon!
              </p>
            )}
            {status === 'error' && (
              <p className="flex items-center gap-2 text-sm text-red-400">
                <AlertCircle size={15} /> Something went wrong. Try emailing me directly.
              </p>
            )}
          </form>

          {/* Contact links */}
          <div className="flex flex-col gap-4">
            {contact.map((item, i) => (
              <a
                key={i}
                href={item.url}
                target={item.url.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 group"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-glow)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                }}
              >
                <div className="w-9 h-9 flex items-center justify-center rounded-lg flex-shrink-0" style={{ background: 'var(--sky-dim)' }}>
                  <PortfolioIconSvg name={item.icon} className="w-4 h-4" style={{ color: 'var(--sky)' } as React.CSSProperties} />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest mb-0.5" style={{ color: 'var(--text-muted)' }}>{item.label}</p>
                  <p className="text-sm font-medium group-hover:text-[var(--sky)] transition-colors" style={{ color: 'var(--text-primary)' }}>{item.value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}