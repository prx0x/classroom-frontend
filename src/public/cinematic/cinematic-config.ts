export interface CinematicSceneMeta {
  id: string;
  index: number;
  label: string;
  code: string;
  title: string;
  subtitle: string;
  coordinates: string;
  startProgress: number;
  endProgress: number;
}

export const CINEMATIC_SCENES: CinematicSceneMeta[] = [
  {
    id: "establishing",
    index: 1,
    label: "Establishing",
    code: "SCENE 01",
    title: "Ranpur Permanent Campus Vista",
    subtitle: "Central Academic Complex & Quadrangle Grounds",
    coordinates: "25°05'N 75°50'E • RANPUR, KOTA • ELEV 271M",
    startProgress: 0.0,
    endProgress: 0.22,
  },
  {
    id: "entrance",
    index: 2,
    label: "Approach",
    code: "SCENE 02",
    title: "Approaching The Central Portico",
    subtitle: "The Main Academic Entrance & Senate Colonnade",
    coordinates: "CENTRAL PAVILION • NORTH ENTRANCE",
    startProgress: 0.2,
    endProgress: 0.44,
  },
  {
    id: "rotunda",
    index: 3,
    label: "Core Pillars",
    code: "SCENE 03",
    title: "Technological Pillars & Research",
    subtitle: "Computing Centers, VLSI Labs & Information Commons",
    coordinates: "ACADEMIC WINGS A-C • COMPUTING NAVE",
    startProgress: 0.42,
    endProgress: 0.68,
  },
  {
    id: "exploration",
    index: 4,
    label: "Departments",
    code: "SCENE 04",
    title: "Engineering Disciplines & Innovation",
    subtitle: "CSE, AI & Data Engineering, and ECE Laboratories",
    coordinates: "RESEARCH HUBS • ADVANCED HARDWARE LABS",
    startProgress: 0.65,
    endProgress: 0.86,
  },
  {
    id: "identity",
    index: 5,
    label: "Identity",
    code: "SCENE 05",
    title: "Institute of National Importance",
    subtitle: "Work is Worship • JoSAA / CSAB Admissions",
    coordinates: "PERMANENT CAMPUS SUMMIT • RANPUR",
    startProgress: 0.84,
    endProgress: 1.0,
  },
];

export const CINEMATIC_CONFIG = {
  desktopScrollHeight: "500vh",
  tabletScrollHeight: "380vh",
  scrubDuration: 1.0,
  cameraPerspective: "1200px",
  initialCameraZ: 0,
  maxCameraDepth: -1800,
};
