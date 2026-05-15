"use client";
import Link from "next/link";
import teamMembers from "../data/teamMembers"
import { useState, useRef } from "react";



const CARD_HEIGHT = 420;

const ArrowIcon = () => (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
);

function MemberCard({ member, cardState, onAdvance, isActive }) {
    // step 2 click anywhere closes
    const handleClick = () => onAdvance();

    return (
        <div
            onClick={handleClick}
            style={{
                height: CARD_HEIGHT,
                width: cardState === 0 ? 100 : 280,
                transition: "width 0.5s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s",
                flexShrink: 0,
                background: "#fff",
                borderRadius: 18,
                border: cardState === 0 && isActive ? "2px solid #07ba92" : "1px solid #e5e7eb",
                overflow: "hidden",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                boxShadow: cardState > 0 ? "0 12px 36px rgba(26,108,255,0.14)" : "none",
            }}
        >
            {/* STATE 0: COLLAPSED */}
            {cardState === 0 && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%", padding: "16px 8px" }}>
                    {/* Arrow always at top */}
                    <div style={{ width: 36, height: 36, background: "#07ba92", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <ArrowIcon />
                    </div>

                    {/* Name + role pinned to bottom-center, baseline aligned */}
                    <div style={{ flex: 1, display: "flex", flexDirection: "row", alignItems: "flex-end", justifyContent: "center", gap: 5, overflow: "hidden", margin: "10px 0" }}>
                        <div style={{
                            writingMode: "vertical-rl",
                            textOrientation: "mixed",
                            transform: "rotate(180deg)",
                            fontFamily: "'Bebas Neue', sans-serif",
                            fontSize: 14,
                            letterSpacing: "0.05em",
                            color: "#111",
                            whiteSpace: "nowrap",
                            fontWeight: 900,
                            // align baseline: both divs share alignItems flex-end so they bottom-align
                        }}>
                            {member.name}
                        </div>
                        <div style={{
                            writingMode: "vertical-rl",
                            textOrientation: "mixed",
                            transform: "rotate(180deg)",
                            fontSize: 10,
                            color: "#9ca3af",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            maxHeight: 80,
                        }}>
                            {member.role}
                        </div>
                    </div>

                    {/* Avatar always at bottom */}
                    <div style={{ width: 44, height: 44, borderRadius: "50%", overflow: "hidden", border: "2px solid #07ba92", flexShrink: 0 }}>
                        <img src={member.avatar} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                </div>
            )}

            {/* STATE 1: EXPANDED PHOTO */}
            {cardState === 1 && (
                <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: 10 }}>
                    <div style={{ display: "flex", justifyContent: "flex-end", flexShrink: 0, marginBottom: 8 }}>
                        <div style={{ width: 36, height: 36, background: "#07ba92", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <ArrowIcon />
                        </div>
                    </div>
                    <div style={{ position: "relative", flex: 1, overflow: "hidden", borderRadius: 12 }}>
                        <img src={member.photo} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
                        <div style={{ position: "absolute", bottom: 10, left: 10, right: 10, borderRadius: 12, padding: "8px 10px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.9)", backdropFilter: "blur(6px)" }}>
                            <div style={{ minWidth: 0, flex: 1, marginRight: 8 }}>
                                <div style={{ fontWeight: 700, fontSize: 11, color: "#111", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{member.name}</div>
                                <div style={{ fontSize: 10, color: "#6b7280", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{member.role}</div>
                            </div>
                            <Link href="#" onClick={(e) => e.stopPropagation()} style={{ width: 32, height: 32, background: "#07ba92", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 700, textDecoration: "none", flexShrink: 0 }}>
                                in
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* STATE 2: BIO — clicking anywhere closes */}
            {cardState === 2 && (
                <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: 20 }}>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: "#07ba92", lineHeight: 1.1, marginBottom: 4 }}>
                        {member.name}
                    </div>
                    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b7280", marginBottom: 8 }}>
                        {member.role}
                    </div>
                    <div style={{ width: 28, height: 2, background: "#07ba92", borderRadius: 2, marginBottom: 12 }} />
                    <div style={{ fontSize: 11, color: "#4b5563", lineHeight: 1.65, flex: 1, overflowY: "auto", whiteSpace: "pre-line", paddingRight: 4 }}>
                        {member.bio}
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12, paddingTop: 10, borderTop: "1px solid #f3f4f6" }}>
                        <div style={{ width: 40, height: 40, borderRadius: "50%", overflow: "hidden", border: "2px solid #e5e7eb" }}>
                            <img src={member.avatar} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function TeamPage() {
    const gridRef = useRef(null);
    const cardRefs = useRef([]);
    const [activeDash, setActiveDash] = useState(0);
    const [openId, setOpenId] = useState(null);
    const [openStep, setOpenStep] = useState(0);

    const handleAdvance = (id) => {
        if (openId !== id) {
            // open at step 1, highlight its dash
            setOpenId(id);
            setOpenStep(1);
            setActiveDash(id);
        } else if (openStep === 1) {
            setOpenStep(2);
        } else {
            // step 2 → close
            setOpenId(null);
            setOpenStep(0);
        }
    };

    const getCardState = (id) => (openId !== id ? 0 : openStep);

    const updateDashes = () => {
        const container = gridRef.current;
        if (!container) return;
        // only update dash from scroll if no card is open
        if (openId !== null) return;
        const center = container.scrollLeft + container.clientWidth / 2;
        let closestIdx = 0;
        let closestDist = Infinity;
        cardRefs.current.forEach((card, i) => {
            if (!card) return;
            const dist = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
            if (dist < closestDist) { closestDist = dist; closestIdx = i; }
        });
        setActiveDash(closestIdx);
    };

    const scrollToCard = (i) => {
        const container = gridRef.current;
        const card = cardRefs.current[i];
        if (!container || !card) return;
        container.scrollTo({
            left: card.offsetLeft - container.clientWidth / 2 + card.offsetWidth / 2,
            behavior: "smooth",
        });
        setActiveDash(i);
    };

    return (
        <div style={{ margin: "32px 40px", fontFamily: "'DM Sans', sans-serif" }}>
            {/* outer row: sidebar + right column, same height */}
            <div
                className="flex-col md:flex-row"
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 24,
                    maxWidth: 1280,
                    margin: "0 auto",
                    alignItems: "stretch",
                }}
            >

                {/* LEFT SIDEBAR — stretches to match right column height */}
                <div style={{
                    width: "100%",
                    maxWidth: 300,
                    flexShrink: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 12
                }}>
                    <div style={{
                        background: "#fff",
                        borderRadius: 16,
                        border: "1px solid #e5e7eb",
                        padding: "20px 22px"
                    }}>
                        <div style={{
                            fontFamily: "'Bebas Neue', sans-serif",
                            fontSize: 40,
                            color: "#07ba92",
                            lineHeight: 1
                        }}>25+
                        </div>
                        <div style={{
                            fontSize: 10,
                            fontWeight: 700,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "#111",
                            marginTop: 4
                        }}>Top-Class Professionals
                        </div>
                    </div>

                    <div style={{
                        background: "#fff",
                        borderRadius: 16,
                        border: "1px solid #e5e7eb",
                        padding: "20px 22px"
                    }}>
                        <div style={{
                            fontFamily: "'Bebas Neue', sans-serif",
                            fontSize: 40,
                            color: "#07ba92",
                            lineHeight: 1
                        }}>10M+
                        </div>
                        <div style={{
                            fontSize: 12,
                            fontWeight: 700,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "#111",
                            marginTop: 4
                        }}>Assets Under Management
                        </div>
                        <div style={{
                            fontSize: 12,
                            color: "#9ca3af",
                            marginTop: 2
                        }}>USD
                        </div>
                    </div>

                    {/* TEAM card fills remaining height */}
                    <div style={{
                        background: "#fff",
                        borderRadius: 16,
                        border: "1px solid #e5e7eb",
                        padding: "20px 22px",
                        flex: 1
                    }}>
                        <div style={{
                            fontFamily: "'Bebas Neue', sans-serif",
                            fontSize: 40,
                            color: "#07ba92",
                            marginBottom: 8
                        }}>TEAM
                        </div>
                        <p style={{
                            fontSize: 12,
                            color: "#6b7280",
                            lineHeight: 1.6,
                            margin: 0
                        }}>
                            Our team unites financial
                            expertise and advanced
                            technology to create a secure
                            and
                            autonomous ecosystem. We focus
                            on developing AI-driven models,
                            building and
                            maintaining a robust platform,
                            and crafting innovative trading
                            strategies.
                        </p>
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    minWidth: 0
                }}>
                    {/* cards row */}
                    <div
                        ref={gridRef}
                        onScroll={updateDashes}
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 10,
                            // baseline-align all collapsed cards so names/roles sit at the same level
                            alignItems: "flex-end",
                            overflowX: "auto",
                            scrollbarWidth: "none",
                            WebkitOverflowScrolling: "touch",
                            paddingBottom: 8,
                            flex: 1,
                        }}
                    >
                        {teamMembers.map((member, i) => (
                            <div
                                key={member.id}
                                ref={(el) => {
                                    cardRefs.current[i] = el;
                                }}
                                style={{flexShrink: 0}}
                            >
                                <MemberCard
                                    member={member}
                                    cardState={getCardState(member.id)}
                                    onAdvance={() => handleAdvance(member.id)}
                                    isActive={activeDash === member.id}
                                />
                            </div>
                        ))}
                    </div>

                    {/* DASH INDICATOR — active dash = open card or scrolled-to card */}
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 6,
                        alignItems: "center"
                    }}>
                        {teamMembers.map((_, i) => (
                            <div
                                key={i}
                                onClick={() => scrollToCard(i)}
                                style={{
                                    height: 4,
                                    borderRadius: 4,
                                    cursor: "pointer",
                                    transition: "all 0.3s",
                                    flex: activeDash === i ? 2 : 1,
                                    background: activeDash === i ? "#07ba92" : "#e5e7eb",
                                }}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

// "use client";
// import Link from "next/link";
// import { useState, useRef } from "react";
//
// const teamMembers = [
//     { id: 0, name: "CHINEDU EDWARD MAKAMA", role: "Chairman & Managing Director", photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=580&fit=crop&crop=top", avatar: "https://ui-avatars.com/api/?name=CE+Makama&background=07ba92&color=fff&size=80", bio: "Chinedu brings executive leadership in fintech and asset management. He founded ARTEMIS ATELIER with a mission to democratize intelligent financial tools for everyone.\n\nPreviously, he held senior roles overseeing multi-billion dollar portfolios and drove digital transformation initiatives." },
//     { id: 1, name: "Tobi Awojobi", role: "Executive Director, Operations & Business Development", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=580&fit=crop&crop=top", avatar: "https://ui-avatars.com/api/?name=Tobi+A&background=07ba92&color=fff&size=80", bio: "Tobi Awojobi is a business development and operations leader with a focus on driving growth, strategic partnerships, and market expansion. At ARTEMIS ATELIER LTD, he oversees operations and business development." },
//     { id: 2, name: "Vaughan Harris", role: "Independent Director (Growth Strategy)", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=580&fit=crop&crop=top", avatar: "https://ui-avatars.com/api/?name=Vaughan+H&background=07ba92&color=fff&size=80", bio: "Vaughan Harris is a growth strategist with expertise in Building Information Modelling (BIM) and digital construction systems. At ARTEMIS ATELIER LTD, he provides strategic guidance on growth and innovation." },
//     { id: 3, name: "Raphael Adeyemi", role: "Independent Director (Investment Strategy)", photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=580&fit=crop&crop=top", avatar: "https://ui-avatars.com/api/?name=Raphael+A&background=07ba92&color=fff&size=80", bio: "Raphael brings deep expertise in market microstructure, liquidity provision, and trading infrastructure. His focus on execution speed and compliance has made significant impact in the sector." },
//     { id: 4, name: "Ken Coertzeee", role: "Director (Design Implementation) / Head of Design (Partnership)", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=580&fit=crop&crop=top", avatar: "https://ui-avatars.com/api/?name=Ken+C&background=07ba92&color=fff&size=80", bio: "Ken Coertzeee is an experienced architect delivering complex, large-scale developments. At ARTEMIS ATELIER LTD, he leads design implementation and oversees partnerships." },
//     { id: 5, name: "Chief Bayo Morakinyo", role: "Independent Director (Investment Strategy)", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=580&fit=crop&crop=top", avatar: "https://ui-avatars.com/api/?name=Bayo+M&background=07ba92&color=fff&size=80", bio: "Chief Bayo Morakinyo brings decades of investment leadership and strategic oversight. He provides independent guidance on portfolio management and market positioning for ARTEMIS ATELIER LTD." },
//     { id: 6, name: "Junior Ejiro", role: "Independent Director (Investment Strategy)", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=580&fit=crop&crop=top", avatar: "https://ui-avatars.com/api/?name=Junior+E&background=07ba92&color=fff&size=80", bio: "Junior Ejiro serves as an Independent Director focused on investment strategy, contributing expertise in financial markets and portfolio oversight to the ARTEMIS ATELIER board." },
//     { id: 7, name: "Dr. Engr Amanze", role: "Independent Director (Advisory)", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=580&fit=crop&crop=top", avatar: "https://ui-avatars.com/api/?name=Dr+Amanze&background=07ba92&color=fff&size=80", bio: "Dr. Engr Amanze provides independent advisory guidance to ARTEMIS ATELIER LTD, bringing deep technical and engineering expertise to support the company's strategic direction and innovation goals." },
// ];
//
// const CARD_HEIGHT = 420;
//
// const ArrowIcon = () => (
//     <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
//     </svg>
// );
//
// function MemberCard({ member, cardState, onAdvance, isActive }) {
//     // step 2 click anywhere closes
//     const handleClick = () => onAdvance();
//
//     return (
//         <div
//             onClick={handleClick}
//             style={{
//                 height: CARD_HEIGHT,
//                 width: cardState === 0 ? 100 : 280,
//                 transition: "width 0.5s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s",
//                 flexShrink: 0,
//                 background: "#fff",
//                 borderRadius: 18,
//                 border: cardState === 0 && isActive ? "2px solid #07ba92" : "1px solid #e5e7eb",
//                 overflow: "hidden",
//                 cursor: "pointer",
//                 display: "flex",
//                 flexDirection: "column",
//                 boxShadow: cardState > 0 ? "0 12px 36px rgba(26,108,255,0.14)" : "none",
//             }}
//         >
//             {/* STATE 0: COLLAPSED */}
//             {cardState === 0 && (
//                 <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%", padding: "16px 8px" }}>
//                     {/* Arrow always at top */}
//                     <div style={{ width: 36, height: 36, background: "#07ba92", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
//                         <ArrowIcon />
//                     </div>
//
//                     {/* Name + role pinned to bottom-center, baseline aligned */}
//                     <div style={{ flex: 1, display: "flex", flexDirection: "row", alignItems: "flex-end", justifyContent: "center", gap: 5, overflow: "hidden", margin: "10px 0" }}>
//                         <div style={{
//                             writingMode: "vertical-rl",
//                             textOrientation: "mixed",
//                             transform: "rotate(180deg)",
//                             fontFamily: "'Bebas Neue', sans-serif",
//                             fontSize: 14,
//                             letterSpacing: "0.05em",
//                             color: "#111",
//                             whiteSpace: "nowrap",
//                             fontWeight: 900,
//                             // align baseline: both divs share alignItems flex-end so they bottom-align
//                         }}>
//                             {member.name}
//                         </div>
//                         <div style={{
//                             writingMode: "vertical-rl",
//                             textOrientation: "mixed",
//                             transform: "rotate(180deg)",
//                             fontSize: 12,
//                             color: "#9ca3af",
//                             whiteSpace: "nowrap",
//                             overflow: "hidden",
//                             maxHeight: 100,
//                         }}>
//                             {member.role}
//                         </div>
//                     </div>
//
//                     {/* Avatar always at bottom */}
//                     <div style={{ width: 44, height: 44, borderRadius: "50%", overflow: "hidden", border: "2px solid #e5e7eb", flexShrink: 0 }}>
//                         <img src={member.avatar} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//                     </div>
//                 </div>
//             )}
//
//             {/* STATE 1: EXPANDED PHOTO */}
//             {cardState === 1 && (
//                 <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: 10 }}>
//                     <div style={{ display: "flex", justifyContent: "flex-end", flexShrink: 0, marginBottom: 8 }}>
//                         <div style={{ width: 36, height: 36, background: "#07ba92", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                             <ArrowIcon />
//                         </div>
//                     </div>
//                     <div style={{ position: "relative", flex: 1, overflow: "hidden", borderRadius: 12 }}>
//                         <img src={member.photo} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
//                         <div style={{ position: "absolute", bottom: 10, left: 10, right: 10, borderRadius: 12, padding: "8px 10px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.9)", backdropFilter: "blur(6px)" }}>
//                             <div style={{ minWidth: 0, flex: 1, marginRight: 8 }}>
//                                 <div style={{ fontWeight: 700, fontSize: 11, color: "#111", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{member.name}</div>
//                                 <div style={{ fontSize: 10, color: "#6b7280", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{member.role}</div>
//                             </div>
//                             <Link href="#" onClick={(e) => e.stopPropagation()} style={{ width: 32, height: 32, background: "#07ba92", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 700, textDecoration: "none", flexShrink: 0 }}>
//                                 in
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             )}
//
//             {/* STATE 2: BIO — clicking anywhere closes */}
//             {cardState === 2 && (
//                 <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: 20 }}>
//                     <div style={{ fontFamily: "'Bebas" +
//                             " Neue', sans-serif", fontSize: 24, color: "#07ba92", lineHeight: 1.1, marginBottom: 4 }}>
//                         {member.name}
//                     </div>
//                     <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b7280", marginBottom: 8 }}>
//                         {member.role}
//                     </div>
//                     <div style={{ width: 28, height: 2, background: "#07ba92", borderRadius: 2, marginBottom: 12 }} />
//                     <div style={{ fontSize: 11, color: "#4b5563", lineHeight: 1.65, flex: 1, overflowY: "auto", whiteSpace: "pre-line", paddingRight: 4 }}>
//                         {member.bio}
//                     </div>
//                     <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12, paddingTop: 10, borderTop: "1px solid #f3f4f6" }}>
//                         <div style={{ width: 40, height: 40, borderRadius: "50%", overflow: "hidden", border: "2px solid #e5e7eb" }}>
//                             <img src={member.avatar} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }
//
// export default function TeamPage() {
//     const gridRef = useRef(null);
//     const cardRefs = useRef([]);
//     const [activeDash, setActiveDash] = useState(0);
//     const [openId, setOpenId] = useState(null);
//     const [openStep, setOpenStep] = useState(0);
//
//     const handleAdvance = (id) => {
//         if (openId !== id) {
//             // open at step 1, highlight its dash
//             setOpenId(id);
//             setOpenStep(1);
//             setActiveDash(id);
//         } else if (openStep === 1) {
//             setOpenStep(2);
//         } else {
//             // step 2 → close
//             setOpenId(null);
//             setOpenStep(0);
//         }
//     };
//
//     const getCardState = (id) => (openId !== id ? 0 : openStep);
//
//     const updateDashes = () => {
//         const container = gridRef.current;
//         if (!container) return;
//         // only update dash from scroll if no card is open
//         if (openId !== null) return;
//         const center = container.scrollLeft + container.clientWidth / 2;
//         let closestIdx = 0;
//         let closestDist = Infinity;
//         cardRefs.current.forEach((card, i) => {
//             if (!card) return;
//             const dist = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
//             if (dist < closestDist) { closestDist = dist; closestIdx = i; }
//         });
//         setActiveDash(closestIdx);
//     };
//
//     const scrollToCard = (i) => {
//         const container = gridRef.current;
//         const card = cardRefs.current[i];
//         if (!container || !card) return;
//         container.scrollTo({
//             left: card.offsetLeft - container.clientWidth / 2 + card.offsetWidth / 2,
//             behavior: "smooth",
//         });
//         setActiveDash(i);
//     };
//
//     return (
//         <div style={{ margin: "32px 40px", fontFamily: "'DM Sans', sans-serif" }}>
//             {/* outer row: sidebar + right column, same height */}
//             <div style={{ display: "flex", gap: 24, maxWidth: 1280, margin: "0 auto", alignItems: "stretch" }}>
//
//                 {/* LEFT SIDEBAR — stretches to match right column height */}
//                 <div style={{ width: 200, flexShrink: 0, display: "flex", flexDirection: "column", gap: 12 }}>
//                     <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", padding: "20px 22px" }}>
//                         <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color: "07ba92", lineHeight: 1 }}>25+</div>
//                         <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#111", marginTop: 4 }}>Top-Class Professionals</div>
//                     </div>
//
//                     <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", padding: "20px 22px" }}>
//                         <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color: "#07ba92", lineHeight: 1 }}>10M+</div>
//                         <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#111", marginTop: 4 }}>Assets Under Management</div>
//                         <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 2 }}>USD</div>
//                     </div>
//
//                     {/* TEAM card fills remaining height */}
//                     <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", padding: "20px 22px", flex: 1 }}>
//                         <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color: "#07ba92", marginBottom: 8 }}>TEAM</div>
//                         <p style={{ fontSize: 11, color: "#6b7280", lineHeight: 1.6, margin: 0 }}>
//                             Our team unites financial expertise and advanced technology to create a secure and
//                             autonomous ecosystem. We focus on developing AI-driven models, building and
//                             maintaining a robust platform, and crafting innovative trading strategies.
//                         </p>
//                     </div>
//                 </div>
//
//                 {/* RIGHT COLUMN */}
//                 <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, minWidth: 0 }}>
//                     {/* cards row */}
//                     <div
//                         ref={gridRef}
//                         onScroll={updateDashes}
//                         style={{
//                             display: "flex",
//                             flexDirection: "row",
//                             gap: 10,
//                             // baseline-align all collapsed cards so names/roles sit at the same level
//                             alignItems: "flex-end",
//                             overflowX: "auto",
//                             scrollbarWidth: "none",
//                             WebkitOverflowScrolling: "touch",
//                             paddingBottom: 8,
//                             flex: 1,
//                         }}
//                     >
//                         {teamMembers.map((member, i) => (
//                             <div
//                                 key={member.id}
//                                 ref={(el) => { cardRefs.current[i] = el; }}
//                                 style={{ flexShrink: 0 }}
//                             >
//                                 <MemberCard
//                                     member={member}
//                                     cardState={getCardState(member.id)}
//                                     onAdvance={() => handleAdvance(member.id)}
//                                     isActive={activeDash === member.id}
//                                 />
//                             </div>
//                         ))}
//                     </div>
//
//                     {/* DASH INDICATOR — active dash = open card or scrolled-to card */}
//                     <div style={{ display: "flex", flexDirection: "row", gap: 6, alignItems: "center" }}>
//                         {teamMembers.map((_, i) => (
//                             <div
//                                 key={i}
//                                 onClick={() => scrollToCard(i)}
//                                 style={{
//                                     height: 4,
//                                     borderRadius: 4,
//                                     cursor: "pointer",
//                                     transition: "all 0.3s",
//                                     flex: activeDash === i ? 2 : 1,
//                                     background: activeDash === i ? "#07ba92" : "#e5e7eb",
//                                 }}
//                             />
//                         ))}
//                     </div>
//                 </div>
//
//             </div>
//         </div>
//     );
// }
//
