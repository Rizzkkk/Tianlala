/**
 * Brand and contact details.
 *
 * Anything marked TODO is a deliberate placeholder. It renders as a visible
 * "to be confirmed" badge rather than invented data, so nothing fake can ship.
 * The Philippines details (0919-007-6060, the Makati address) must NOT be
 * carried over — this is the Saudi entity.
 */

export const site = {
  name: "TIANLALA",
  url: "https://tianlala.sa", // TODO: confirm production domain
  vatRate: 0.15,

  contact: {
    phone: null as string | null, // TODO: Saudi contact number
    email: null as string | null, // TODO: Saudi enquiries email
    franchiseEmail: process.env.FRANCHISE_INBOX ?? null,
  },

  legal: {
    commercialRegistration: null as string | null, // TODO: CR number
    vatNumber: null as string | null, // TODO: VAT registration number
  },

  social: {
    instagram: "https://www.instagram.com/tianlalasaudi/",
    tiktok: null as string | null, // TODO: confirm Saudi TikTok handle
  },

  /** Where customers can order today, until first-party ordering exists. */
  delivery: {
    hungerstation:
      "https://hungerstation.com/sa-en/qc/102913/TIANLALA/branch/riyadh~dubiyah~184687",
  },
} as const;

export type Branch = {
  slug: string;
  name: { en: string; ar: string };
  city: { en: string; ar: string };
  district: { en: string; ar: string };
  /** Full street address. `null` renders the "confirming" state. */
  address: { en: string; ar: string } | null;
  mapsUrl: string | null;
  hours: string | null;
};

/**
 * TODO: replace with the confirmed branch list.
 * Only Al Olaya is known, and only at district level from the delivery
 * listing — the street address has not been verified, so it stays null.
 */
export const branches: Branch[] = [
  {
    slug: "al-olaya-riyadh",
    name: { en: "Al Olaya", ar: "العليا" },
    city: { en: "Riyadh", ar: "الرياض" },
    district: { en: "King Fahd District", ar: "حي الملك فهد" },
    address: null,
    mapsUrl: null,
    hours: null,
  },
];
