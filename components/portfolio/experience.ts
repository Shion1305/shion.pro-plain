import playstation from "~/assets/logos/playstation.svg";
import apple from "~/assets/logos/apple.svg";
import layerx from "~/assets/logos/layerx.png";
import flatt from "~/assets/logos/flatt.png";
import m3 from "~/assets/logos/m3.png";
import freee from "~/assets/logos/freee.png";
import sms from "~/assets/logos/sms.png";
import drecom from "~/assets/logos/drecom.png";
import poetics from "~/assets/logos/poetics.png";
import mercari from "~/assets/logos/mercari.png";
import chura from "~/assets/logos/chura.png";
import fastRetailing from "~/assets/logos/fast-retailing.png";

export interface Role {
  company: string;
  role: string;
  start: string;
  end?: string;
  shortDuration?: string;
  logo: string;
  logoSurface?: "monochrome" | "light";
}

export const currentRole: Role = {
  company: "Goldman Sachs",
  role: "Market Data Engineering",
  start: "2026-10",
  logo: "/goldman-sachs.svg",
  logoSurface: "monochrome",
};

// Roles and dates from https://www.wantedly.com/id/Shion1305, newest completion first.
export const internships: Role[] = [
  {
    company: "Sony Interactive Entertainment",
    role: "Software Engineering Intern · PlayStation",
    start: "2025-10",
    end: "2025-12",
    logo: playstation,
    logoSurface: "monochrome",
  },
  {
    company: "Apple",
    role: "Software Engineering Intern · AIML",
    start: "2025-01",
    end: "2025-09",
    logo: apple,
    logoSurface: "monochrome",
  },
  {
    company: "LayerX",
    role: "DevOps Engineering Intern",
    start: "2024-11",
    end: "2024-12",
    logo: layerx,
  },
  {
    company: "Flatt Security",
    role: "Security Assessment Intern",
    start: "2024-04",
    end: "2024-10",
    logo: flatt,
    logoSurface: "light",
  },
  {
    company: "M3",
    role: "Security Engineering Intern",
    start: "2024-09",
    end: "2024-09",
    shortDuration: "2 weeks",
    logo: m3,
  },
  {
    company: "freee",
    role: "Site Reliability Engineering Intern",
    start: "2024-09",
    end: "2024-09",
    shortDuration: "2 weeks",
    logo: freee,
    logoSurface: "light",
  },
  {
    company: "SMS",
    role: "Backend Engineering Intern · Platform Team",
    start: "2024-08",
    end: "2024-08",
    shortDuration: "4 weeks",
    logo: sms,
  },
  {
    company: "Drecom",
    role: "Software Engineering Intern",
    start: "2024-01",
    end: "2024-07",
    logo: drecom,
    logoSurface: "light",
  },
  {
    company: "Poetics",
    role: "Research & Development Intern",
    start: "2023-10",
    end: "2024-04",
    logo: poetics,
  },
  {
    company: "Mercari",
    role: "Backend Engineering Intern · Merpay",
    start: "2023-10",
    end: "2024-01",
    logo: mercari,
  },
  // Two-week data engineering program: https://datumstudio.jp/information/0510_churadata_summer-internship-2023/
  {
    company: "Chura Data",
    role: "Data Engineering Intern",
    start: "2023-09",
    end: "2023-09",
    shortDuration: "2 weeks",
    logo: chura,
  },
  {
    company: "Flatt Security",
    role: "Security Assessment Intern",
    start: "2023-08",
    end: "2023-09",
    // The 2023 summer program lasted five days: https://flatt.tech/magazine/entry/20231228_professional_services
    shortDuration: "5 days",
    logo: flatt,
    logoSurface: "light",
  },
  {
    company: "Fast Retailing",
    role: "Infrastructure Intern",
    start: "2023-08",
    end: "2023-08",
    shortDuration: "3 weeks",
    logo: fastRetailing,
  },
  {
    company: "Poetics",
    role: "Software Development Intern",
    start: "2022-09",
    end: "2023-07",
    logo: poetics,
  },
];

const monthLabel = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function describeTenure(role: Role, currentMonth: string) {
  const start = new Date(role.start + "-01T00:00:00Z");
  const end = new Date((role.end ?? currentMonth) + "-01T00:00:00Z");
  const period = role.end
    ? monthLabel.formatRange(start, end)
    : monthLabel.format(start) + " – present";
  // Dates have month precision. Count the calendar months covered unless a short placement has a known length.
  const months =
    (end.getUTCFullYear() - start.getUTCFullYear()) * 12 +
    end.getUTCMonth() -
    start.getUTCMonth() +
    1;
  const duration = role.shortDuration ?? (months <= 1 ? "up to 1 month" : `${months} months`);
  return { period, duration };
}
