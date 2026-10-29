'use client';

import { useState, type FormEvent } from 'react';

const serviceOptions = ['Creative', 'Production', 'Events', 'Social', 'Not sure yet'];
const budgetOptions = ['Under $10k', '$10k – $25k', '$25k – $50k', '$50k+'];

type Status = 'idle' | 'sending' | 'sent' | 'error';

function ChipGroup({ legend, name, options }: { legend: string; name: string; options: string[] }) {
  return (
    <fieldset className="field">
      <legend className="label">{legend}</legend>
      <div className="chip-row">
        {options.map((option) => (
          <label key={option} className="chip">
            <input type="radio" name={name} value={option} />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    setError('');

    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(body.error || 'Something went wrong. Try again in a moment.');
      form.reset();
      setStatus('sent');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Try again in a moment.');
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="form-sent" role="status">
        <h2 className="display">
          Got it. <em>Talk soon.</em>
        </h2>
        <p>We read every inquiry and reply within two business days.</p>
        <button type="button" className="link-underline" onClick={() => setStatus('idle')}>
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate={false}>
      <div className="field">
        <label className="label" htmlFor="name">
          Your name
        </label>
        <input id="name" name="name" type="text" autoComplete="name" required placeholder="Full name" />
      </div>

      <div className="field-row">
        <div className="field">
          <label className="label" htmlFor="email">
            Email
          </label>
          <input id="email" name="email" type="email" autoComplete="email" required placeholder="you@email.com" />
        </div>
        <div className="field">
          <label className="label" htmlFor="project">
            Artist or project name
          </label>
          <input id="project" name="project" type="text" placeholder="Who's this for?" />
        </div>
      </div>

      <ChipGroup legend="What do you need?" name="service" options={serviceOptions} />
      <ChipGroup legend="Budget range" name="budget" options={budgetOptions} />

      <div className="field">
        <label className="label" htmlFor="message">
          Tell us about it
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder="Project details, timeline, links to reference..."
        />
      </div>

      {/* Honeypot: real people never see or fill this */}
      <div className="hp" aria-hidden="true">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button type="submit" className="btn-solid" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send inquiry'}
      </button>

      <p className="form-error" role="alert">
        {status === 'error' ? error : ''}
      </p>
    </form>
  );
}
