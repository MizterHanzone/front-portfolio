import { Link } from 'react-router-dom';
import profileImage from '../assets/images/about-2.jpeg';

const bgBeige = '#EAE7D8';
const archBlue = '#A8DADC';
const textDark = '#333333';

export default function CoverLetterPage() {
  return (
    <div
      className="min-h-screen font-sans antialiased"
      style={{ backgroundColor: bgBeige, color: textDark }}
    >
      <div className="mx-auto max-w-5xl px-6 py-10 md:py-14">
        {/* Header: same as CV – name+bio | photo+name | contact */}
        <header className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 pb-10 border-b-2 border-black/10">
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

          <div className="flex flex-col items-center justify-start">
            <div className="relative inline-block">
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
              <p
                className="text-center text-sm mt-3 font-serif"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif', color: textDark }}
              >
                MARIA CLARKSON
              </p>
            </div>
          </div>

          <div className="md:flex md:flex-col md:justify-center md:items-end">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: textDark }}>
              CONTACT ME
            </h3>
            <ul className="space-y-0 w-full max-w-xs">
              <li className="flex items-center gap-3 py-3 border-b border-black/15">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-white">
                  <PhoneIcon className="w-4 h-4" />
                </span>
                <span className="text-sm">+1 202-555-0175</span>
              </li>
              <li className="flex items-center gap-3 py-3 border-b border-black/15">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-white">
                  <EmailIcon className="w-4 h-4" />
                </span>
                <span className="text-sm">mariaclarkson@gmail.com</span>
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

        {/* Main body: SEND TO left, letter content right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pt-8">
          {/* Left: SEND TO – recipient & sender */}
          <div className="md:col-span-4 space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: textDark }}>
              SEND TO
            </h3>
            <ul className="space-y-0 text-sm">
              <li className="flex items-start gap-3 py-3 border-b border-black/15">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black/80 text-white mt-0.5">
                  <PersonIcon className="w-4 h-4" />
                </span>
                <div>
                  <p className="font-medium">Mr. Nestor Frieses</p>
                  <p className="text-black/70">Position in Company</p>
                </div>
              </li>
              <li className="flex items-center gap-3 py-3 border-b border-black/15">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black/80 text-white">
                  <PhoneIcon className="w-4 h-4" />
                </span>
                <span>Phone: 023-456-700</span>
              </li>
              <li className="flex items-center gap-3 py-3 border-b border-black/15">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black/80 text-white">
                  <EmailIcon className="w-4 h-4" />
                </span>
                <span>Email: nestorfriesen@gmail.com</span>
              </li>
              <li className="flex items-start gap-3 py-3 border-b border-black/15">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black/80 text-white mt-0.5">
                  <BuildingIcon className="w-4 h-4" />
                </span>
                <div>
                  <p className="font-medium">The Company Inc</p>
                  <p className="text-black/70 text-xs">123 Street Name, Town/City State/Country Post/Zip</p>
                </div>
              </li>
              <li className="flex items-start gap-3 py-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black/80 text-white mt-0.5">
                  <PersonIcon className="w-4 h-4" />
                </span>
                <div>
                  <p className="font-medium">Maria Clarkson</p>
                  <p className="text-black/70">Graphic Designer</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Right: letter content */}
          <div className="md:col-span-8">
            <p className="text-sm text-right mb-6" style={{ color: textDark }}>
              15 September 2021
            </p>
            <p className="text-sm mb-4">Dear Ms. Nathes,</p>
            <div className="text-sm leading-relaxed text-justify space-y-4" style={{ color: textDark }}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </p>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                architecto beatae vitae dicta sunt explicabo.
              </p>
            </div>
            <p className="text-sm mt-8 mb-2">Best Regards,</p>
            <p className="text-sm font-medium">Maria Clarkson</p>
            <p className="text-sm text-black/70 mb-4">Graphic Designer</p>
            <p
              className="text-2xl font-signature italic"
              style={{ fontFamily: 'cursive', color: textDark }}
            >
              Maria Clarkson
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-primary/10 text-center flex flex-wrap justify-center gap-4">
          <Link
            to="/cv"
            className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border border-black/20 hover:bg-black/5 transition-colors"
            style={{ color: textDark }}
          >
            View CV
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border border-black/20 hover:bg-black/5 transition-colors"
            style={{ color: textDark }}
          >
            ← Back to portfolio
          </Link>
        </div>
      </div>
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

function PersonIcon({ className = '' }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`shrink-0 ${className}`}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function BuildingIcon({ className = '' }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`shrink-0 ${className}`}>
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
      <path d="M10 6h4" />
      <path d="M10 10h4" />
      <path d="M10 14h4" />
    </svg>
  );
}
