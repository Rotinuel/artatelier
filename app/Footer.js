"use client";

import Link from "next/link";

const footerLinks = {
  Products: [
    { label: "EX-AI Bot", href: "#" },
    { label: "Flash Loans", href: "#" },
    { label: "Zeus AI Bot", href: "#" },
    { label: "Cards", href: "#" },
    { label: "Subscription", href: "#" },
    { label: "Neo-Bank", href: "#" },
    { label: "Exchange", href: "#" },
    { label: "Token", href: "#" },
  ],
  Company: [
    { label: "About Artemis", href: "#" },
    { label: "Contacts", href: "#" },
    { label: "Team", href: "#" },
    { label: "Ecosystem", href: "#" },
    { label: "Media Center", href: "#" },
  ],
  "Legal Info": [
    { label: "Terms of services", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "AML/KYC Policy", href: "#" },
    { label: "Risk Warning", href: "#" },
  ],
  Community: [
    { label: "Telegram", href: "#", icon: "telegram" },
    { label: "YouTube", href: "#", icon: "youtube" },
    { label: "Instagram", href: "#", icon: "instagram" },
    { label: "Twitter", href: "#", icon: "twitter" },
  ],
  Support: [
    {
      label: "support@artemisatelier.com",
      href: "mailto:support@artemisatelier.com",
    },
  ],
};

const TelegramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
    <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const iconComponents = {
  telegram: TelegramIcon,
  youtube: YouTubeIcon,
  instagram: InstagramIcon,
  twitter: TwitterIcon,
};

function ProductsColumn({ links }) {
  return (
    <div className="flex flex-col gap-y-0.5">
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="text-[12px] leading-[1.8] text-gray-600 hover:text-[#07ba92] transition-colors duration-150"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

function StandardColumn({ links }) {
  return (
    <div className="flex flex-col">
      {links.map((link) => {
        const Icon = link.icon ? iconComponents[link.icon] : null;
        return (
          <Link
            key={link.label}
            href={link.href}
            className="flex items-center gap-1.5 text-[12px] leading-[1.8] text-gray-600 hover:text-[#07ba92] transition-colors duration-150 break-all"
          >
            {Icon && (
              <span className="text-gray-500">
                <Icon />
              </span>
            )}
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}

export default function Footer() {
  return (
    <footer
      className="bg-gray-100"
      style={{ fontFamily: "'DM Sans', sans-serif", padding: "clamp(16px, 4vw, 40px) clamp(16px, 4vw, 40px) 0" }}
    >
      {/* max-w centers the card on wide screens */}
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div className="bg-white rounded-3xl" style={{ padding: "clamp(24px, 4vw, 48px)" }}>

          {/*
            Layout:
            - Mobile  (<md): brand block full-width, then links in a 2-col grid
            - Desktop (≥md): brand block left, links right in a flex row
          */}
          <div className="flex flex-col md:flex-row md:gap-12 md:items-start">

            {/* ── Brand ── */}
            <div className="mb-8 md:mb-0 md:w-52 lg:w-56 shrink-0">
              <div
                className="text-[16px] text-[#07ba92] mb-3.5 tracking-widest"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                ARTEMIS ATELIER
              </div>

              <p className="text-[12px] text-gray-500 leading-relaxed mb-4">
                Copyright 2026. Artemis Atelier Ltd.
                <br />
                All rights reserved.
              </p>

              <p className="text-[12px] text-gray-500 leading-relaxed mb-2.5">
                Address: 123 Business District,
                <br />
                Lagos, Nigeria
              </p>

              <p className="text-[12px] text-gray-500">
                Certificate No.: AA-2024-001
              </p>
            </div>

            {/* ── Link columns ── */}
            {/*
              Mobile : 2-column grid so columns pair nicely
              Tablet : 3-column grid
              Desktop: flex row (original layout) — all 5 columns in one line
            */}
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-row gap-8 lg:gap-10">

              {/* Products */}
              <div className="min-w-0">
                <div className="text-[14px] font-bold text-[#07ba92] mb-3">
                  Products
                </div>
                <ProductsColumn links={footerLinks.Products} />
              </div>

              {/* Company */}
              <div className="min-w-0">
                <div className="text-[14px] font-bold text-[#07ba92] mb-3">
                  Company
                </div>
                <StandardColumn links={footerLinks.Company} />
              </div>

              {/* Legal Info */}
              <div className="min-w-0">
                <div className="text-[14px] font-bold text-[#07ba92] mb-3">
                  Legal Info
                </div>
                <StandardColumn links={footerLinks["Legal Info"]} />
              </div>

              {/* Community */}
              <div className="min-w-0">
                <div className="text-[14px] font-bold text-[#07ba92] mb-3">
                  Community
                </div>
                <StandardColumn links={footerLinks.Community} />
              </div> 

              {/* Support */}
              <div className="min-w-0">
                <div className="text-[14px] font-bold text-[#07ba92] mb-3">
                  Support
                </div>
                <StandardColumn links={footerLinks.Support} />
              </div>

            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// "use client";

// import Link from "next/link";

// const footerLinks = {
//   Products: [
//     { label: "EX-AI Bot", href: "#" },
//     { label: "Flash Loans", href: "#" },
//     { label: "Zeus AI Bot", href: "#" },
//     { label: "Cards", href: "#" },
//   ],
//   Company: [
//     { label: "About Artemis", href: "#" },
//     { label: "Contacts", href: "#" },
//     { label: "Team", href: "#" },
//     { label: "Ecosystem", href: "#" },
//     { label: "Media Center", href: "#" },
//   ],
//   "Legal Info": [
//     { label: "Terms of services", href: "#" },
//     { label: "Privacy Policy", href: "#" },
//     { label: "AML/KYC Policy", href: "#" },
//     { label: "Risk Warning", href: "#" },
//   ],
//   Community: [
//     { label: "Telegram", href: "#", icon: "telegram" },
//     { label: "YouTube", href: "#", icon: "youtube" },
//     { label: "Instagram", href: "#", icon: "instagram" },
//     { label: "Twitter", href: "#", icon: "twitter" },
//   ],
//   Support: [
//     {
//       label: "support@artemisatelier.com",
//       href: "mailto:support@artemisatelier.com",
//     },
//   ],
// };

// const TelegramIcon = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
//     <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
//   </svg>
// );

// const YouTubeIcon = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
//     <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
//   </svg>
// );

// const InstagramIcon = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
//     <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
//   </svg>
// );

// const TwitterIcon = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
//     <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
//   </svg>
// );

// const iconComponents = {
//   telegram: TelegramIcon,
//   youtube: YouTubeIcon,
//   instagram: InstagramIcon,
//   twitter: TwitterIcon,
// };

// function ProductsColumn({ links }) {
//   return (
//     <div className="grid grid-cols-2 gap-x-5 gap-y-0.5">
//       {links.map((link) => (
//         <Link
//           key={link.label}
//           href={link.href}
//           className="text-[12px] leading-[1.8] text-gray-600 hover:text-[#07ba92] transition-colors duration-150 whitespace-nowrap"
//         >
//           {link.label}
//         </Link>
//       ))}
//     </div>
//   );
// }

// function StandardColumn({ links }) {
//   return (
//     <div className="flex flex-col">
//       {links.map((link) => {
//         const Icon = link.icon ? iconComponents[link.icon] : null;
//         return (
//           <Link
//             key={link.label}
//             href={link.href}
//             className="flex items-center gap-1.5 text-[12px] leading-[1.8] text-gray-600 hover:text-[#07ba92] transition-colors duration-150 break-all"
//           >
//             {Icon && (
//               <span className="text-gray-500">
//                 <Icon />
//               </span>
//             )}
//             {link.label}
//           </Link>
//         );
//       })}
//     </div>
//   );
// }

// export default function Footer() {
//   return (
//     <footer
//       className="bg-gray-100"
//       style={{ fontFamily: "'DM Sans', sans-serif", padding: "clamp(16px, 4vw, 40px) clamp(16px, 4vw, 40px) 0" }}
//     >
//       {/* max-w centers the card on wide screens */}
//       <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
//         <div className="bg-white rounded-3xl" style={{ padding: "clamp(24px, 4vw, 48px)" }}>

//           {/*
//             Layout:
//             - Mobile  (<md): brand block full-width, then links in a 2-col grid
//             - Desktop (≥md): brand block left, links right in a flex row
//           */}
//           <div className="flex flex-col md:flex-row md:gap-12 md:items-start">

//             {/* ── Brand ── */}
//             <div className="mb-8 md:mb-0 md:w-52 lg:w-56 shrink-0">
//               <div
//                 className="text-[16px] text-[#07ba92] mb-3.5 tracking-widest"
//                 style={{ fontFamily: "'Bebas Neue', sans-serif" }}
//               >
//                 ARTEMIS ATERLIER
//               </div>

//               <p className="text-[12px] text-gray-500 leading-relaxed mb-4">
//                 Copyright 2026. Artemis Atelier Ltd.
//                 <br />
//                 All rights reserved.
//               </p>

//               <p className="text-[12px] text-gray-500 leading-relaxed mb-2.5">
//                 Address: 123 Business District,
//                 <br />
//                 Lagos, Nigeria
//               </p>

//               <p className="text-[12px] text-gray-500">
//                 Certificate No.: AA-2024-001
//               </p>
//             </div>

//             {/* ── Link columns ── */}
//             {/*
//               Mobile : 2-column grid so columns pair nicely
//               Tablet : 3-column grid
//               Desktop: flex row (original layout) — all 5 columns in one line
//             */}
//             <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-row gap-8 lg:gap-10">

//               {/* Products */}
//               <div className="col-span-1 sm:col-span-2 lg:col-span-auto min-w-0">
//                 <div className="text-[14px] font-bold text-[#07ba92] mb-3">
//                   Products
//                 </div>
//                 <ProductsColumn links={footerLinks.Products} />
//               </div>

//               {/* Company */}
//               <div className="min-w-0">
//                 <div className="text-[14px] font-bold text-[#07ba92] mb-3">
//                   Company
//                 </div>
//                 <StandardColumn links={footerLinks.Company} />
//               </div>

//               {/* Legal Info */}
//               <div className="min-w-0">
//                 <div className="text-[14px] font-bold text-[#07ba92] mb-3">
//                   Legal Info
//                 </div>
//                 <StandardColumn links={footerLinks["Legal Info"]} />
//               </div>

//               {/* Community */}
//               <div className="min-w-0">
//                 <div className="text-[14px] font-bold text-[#07ba92] mb-3">
//                   Community
//                 </div>
//                 <StandardColumn links={footerLinks.Community} />
//               </div>

//               {/* Support */}
//               <div className="min-w-0">
//                 <div className="text-[14px] font-bold text-[#07ba92] mb-3">
//                   Support
//                 </div>
//                 <StandardColumn links={footerLinks.Support} />
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

