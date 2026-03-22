import { useState, useEffect } from 'react';
import {
  getProfileCached,
  telegramHref,
  phoneHref,
  mailtoHref,
  type Profile,
} from '../../services/profile/profile.service';

const contactIconClass = 'shrink-0';

type ContactLinkState = {
  telegram: string;
  phone: string;
  mailto: string;
};

const fallbackContacts: ContactLinkState = {
  telegram: 'https://t.me/sokhankheav',
  phone: 'tel:+0000000000',
  mailto: 'mailto:hello@example.com',
};

function TelegramIcon() {
  return (
    <svg className={contactIconClass} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 5L2 12.5l7 2 3 7 3.5-9.5L21 5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M12 14.5l9-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className={contactIconClass} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className={contactIconClass} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const btnClass =
  'inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-primary text-white hover:text-white shadow-sm transition-transform hover:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary/30';

function contactsFromProfile(p: Profile): ContactLinkState {
  return {
    telegram: p.telegram ? telegramHref(p.telegram) : fallbackContacts.telegram,
    phone: p.phone ? phoneHref(p.phone) : fallbackContacts.phone,
    mailto: p.email ? mailtoHref(p.email) : fallbackContacts.mailto,
  };
}

type ContactButtonsProps = {
  /** Extra classes for the wrapper (e.g. `justify-center`). */
  className?: string;
  /**
   * When passed (including `null` while loading), links are derived from profile — no extra fetch.
   * Omit to load contact links via {@link getProfileCached} inside this component (e.g. header).
   */
  profile?: Profile | null;
};

export default function ContactButtons({ className = '', profile }: ContactButtonsProps) {
  const [contacts, setContacts] = useState(fallbackContacts);

  useEffect(() => {
    if (profile !== undefined) {
      setContacts(profile ? contactsFromProfile(profile) : fallbackContacts);
      return;
    }
    getProfileCached().then((p) => {
      if (!p) return;
      setContacts(contactsFromProfile(p));
    });
  }, [profile]);

  return (
    <div
      className={`flex items-center gap-1.5 md:gap-2 shrink-0 ${className}`.trim()}
      role="group"
      aria-label="Contact"
    >
      <a
        href={contacts.telegram}
        target="_blank"
        rel="noopener noreferrer"
        className={btnClass}
        aria-label="Telegram"
      >
        <TelegramIcon />
      </a>
      <a
        href={contacts.phone}
        className={btnClass}
        aria-label="Call phone"
      >
        <PhoneIcon />
      </a>
      <a
        href={contacts.mailto}
        className={btnClass}
        aria-label="Send email"
      >
        <EmailIcon />
      </a>
    </div>
  );
}
