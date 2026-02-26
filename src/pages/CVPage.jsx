import { Link } from 'react-router-dom';
import profileImage from '../assets/images/about-2.jpeg';

const accent = '#c4a84a';
const bgBeige = '#EAE7D8';
const archBlue = '#A8DADC';
const textDark = '#333333';

export default function CVPage() {
  return (
    <div
      className="min-h-screen font-sans antialiased"
      style={{ backgroundColor: bgBeige, color: textDark }}
    >
      <div className="mx-auto max-w-5xl px-6 py-10 md:py-14">
        {/* Header: three columns – name+summary | photo+title | contact */}
        <header className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 pb-10 border-b-2 border-black/10">
          {/* Left: name + professional summary */}
          <div className="md:flex md:flex-col md:justify-center">
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-serif tracking-tight mb-6"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif', color: textDark }}
            >
              MARIA CLARKSON
            </h1>
            <p
              className="text-sm md:text-base leading-relaxed max-w-md"
              style={{ color: textDark, opacity: 0.9 }}
            >
              A graphic designer is a professional within the graphic design and graphic arts industry
              who assembles together images, typography, or motion graphics to create a piece of design.
              A graphic designer creates the graphics primarily for published, printed or electronic
              media.
            </p>
          </div>

          {/* Middle: profile picture in arch + small name + oval job title */}
          <div className="flex flex-col items-center justify-start">
            <div className="relative inline-block">
              {/* Arch-shaped profile picture */}
              <div
                className="w-36 h-44 md:w-44 md:h-56 overflow-hidden flex items-center justify-center"
                style={{
                  backgroundColor: archBlue,
                  borderRadius: '50% 50% 48% 48% / 45% 45% 55% 55%',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                }}
              >
                <img
                  src={profileImage}
                  alt=""
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Small name below picture */}
              <p
                className="text-center text-sm mt-3 font-serif"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif', color: textDark }}
              >
                MARIA CLARKSON
              </p>
            </div>
          </div>

          {/* Right: CONTACT ME with circular icons and dividers */}
          <div className="md:flex md:flex-col md:justify-center md:items-end">
            <h3
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: textDark }}
            >
              CONTACT ME
            </h3>
            <ul className="space-y-0 w-full max-w-xs">
              <li className="flex items-center gap-3 py-3 border-b border-black/15">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-white">
                  <PhoneIcon className="w-4 h-4" />
                </span>
                <span className="text-sm">Phone: +1-202-555-0175</span>
              </li>
              <li className="flex items-center gap-3 py-3 border-b border-black/15">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-white">
                  <EmailIcon className="w-4 h-4" />
                </span>
                <span className="text-sm">Email: maria.clarkson@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 py-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-white">
                  <AddressIcon className="w-4 h-4" />
                </span>
                <span className="text-sm">Address: 123 Street Name, Town/City</span>
              </li>
            </ul>
          </div>
        </header>

        {/* Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 pt-8">
          {/* Left column */}
          <div className="space-y-8">
            <Section title="AWARDS">
              <Entry
                year="2018"
                title="Name of Award"
                sub="Organization Name / Location"
                desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor."
              />
              <Entry
                year="2020"
                title="Name of Award"
                sub="Organization Name / Location"
                desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor."
              />
            </Section>

            <Section title="LANGUAGES">
              <RatingItem label="English" filled={5} total={5} accent={accent} />
              <RatingItem label="French" filled={3} total={5} accent={accent} />
              <RatingItem label="Spanish" filled={2} total={5} accent={accent} />
            </Section>

            <Section title="REFERENCES">
              <RefItem
                name="Alison Baker"
                company="Company Name"
                position="Position of reference"
                contact="T: +1-234-567-8900  E: email@example.com  A: Address"
              />
              <RefItem
                name="Christian Ferguson"
                company="Company Name"
                position="Position of reference"
                contact="T: +1-234-567-8900  E: email@example.com  A: Address"
              />
            </Section>
          </div>

          {/* Right column */}
          <div className="space-y-8">
            <Section title="WORK EXPERIENCES">
              <Entry
                year="2015-2020"
                title="Enter Your Job Position Here"
                sub="Company Name / Location"
                desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              />
              <Entry
                year="2015-2018"
                title="Enter Your Job Position Here"
                sub="Company Name / Location"
                desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              />
              <Entry
                year="2014-2016"
                title="Enter Your Job Position Here"
                sub="Company Name / Location"
                desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod."
              />
            </Section>

            <Section title="EDUCATION">
              <Entry
                year="2013-2015"
                title="Master's degree, Your Major"
                sub="Name of College / University"
                desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              />
              <Entry
                year="2000-2012"
                title="Bachelor's degree, Your Major"
                sub="Name of College / University"
                desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              />
            </Section>

            <div className="grid grid-cols-2 gap-6">
              <Section title="HARD SKILLS">
                <RatingItem label="Adobe InDesign" filled={5} total={5} accent={accent} />
                <RatingItem label="Adobe Illustrator" filled={4} total={5} accent={accent} />
                <RatingItem label="Adobe Photoshop" filled={3} total={5} accent={accent} />
                <RatingItem label="Adobe After Effects" filled={4} total={5} accent={accent} />
                <RatingItem label="Adobe XD" filled={5} total={5} accent={accent} />
              </Section>
              <Section title="SOFT SKILLS">
                <RatingItem label="Problem Solving" filled={4} total={5} accent={accent} />
                <RatingItem label="Critical Thinking" filled={4} total={5} accent={accent} />
                <RatingItem label="Flexibility" filled={5} total={5} accent={accent} />
                <RatingItem label="Teamwork" filled={4} total={5} accent={accent} />
                <RatingItem label="Leadership" filled={3} total={5} accent={accent} />
              </Section>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-primary/10 text-center flex flex-wrap justify-center gap-4">
          <Link
            to="/cover-letter"
            className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border border-primary/30 text-primary hover:bg-primary/5 transition-colors"
          >
            Cover Letter
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border border-primary/30 text-primary hover:bg-primary/5 transition-colors"
          >
            ← Back to portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section>
      <h2 className="text-xs font-bold uppercase tracking-wider text-primary mb-4">{title}</h2>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function Entry({ year, title, sub, desc }) {
  return (
    <div>
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-200/80 text-xs font-medium text-primary mb-2">
        <span>{year}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
      <h3 className="font-bold text-primary text-sm">{title}</h3>
      <p className="text-xs text-primary/70 mb-1">{sub}</p>
      <p className="text-xs text-primary/80 leading-relaxed">{desc}</p>
    </div>
  );
}

function RatingItem({ label, filled, total = 5, accent }) {
  return (
    <div className="flex items-center justify-between gap-2 py-0.5">
      <span className="text-sm text-primary">{label}</span>
      <div className="flex gap-0.5">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full shrink-0"
            style={{
              backgroundColor: i < filled ? '#222' : accent,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function RefItem({ name, company, position, contact }) {
  return (
    <div className="text-xs text-primary/85 space-y-0.5">
      <p className="font-bold text-primary">{name}</p>
      <p>{company}</p>
      <p>{position}</p>
      <p className="text-primary/70">{contact}</p>
    </div>
  );
}

function PhoneIcon({ className = '' }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`shrink-0 ${className}`}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function EmailIcon({ className = '' }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`shrink-0 ${className}`}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}

function AddressIcon({ className = '' }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`shrink-0 ${className}`}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
