// Static enrichment for portfolio companies sourced from riceberg.vc and public sources.
// Keyed by normalized company name (lowercase, no punctuation).

export type Sector = 'SpaceTech' | 'AI' | 'BioTech' | 'Health' | 'CleanTech' | 'DeepTech' | 'Other';

export interface CompanyEnrichment {
  website: string;
  description: string;
  sector: Sector;
  stage: string;
  highlight?: string;
}

function key(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

const RAW: Array<{ names: string[]; data: CompanyEnrichment }> = [
  {
    names: ['EtherealX', 'Ethereal Exploration Guild Private Limited', 'Ethereal X'],
    data: {
      website: 'https://etherealx.space',
      description: 'Aerospace company designing and manufacturing next-generation reusable launch vehicles and spacecraft with vertical landing capabilities.',
      sector: 'SpaceTech',
      stage: 'Seed',
      highlight: '$26.3M raised · Bangalore, India',
    },
  },
  {
    names: ['Swisspod Technologies SA', 'Swisspod'],
    data: {
      website: 'https://swisspod.com',
      description: 'EPFL spinoff developing fully-electric Hyperloop pods for high-speed, carbon-neutral transportation. Broke world record for longest hyperloop trial in 2024.',
      sector: 'DeepTech',
      stage: 'Series A',
      highlight: 'World record hyperloop trial · Colorado infrastructure',
    },
  },
  {
    names: ['Signatur Biosciences', 'Signatur Bio'],
    data: {
      website: 'https://signatur.bio',
      description: 'Molecular diagnostics platform converting standard qPCR machines into precision cancer detection tools. OncoSignatur Breast enables decentralised breast cancer prognostic testing.',
      sector: 'BioTech',
      stage: 'Seed',
      highlight: '$7.5M raised · UK-based · Founded 2022',
    },
  },
  {
    names: ['Keyron'],
    data: {
      website: 'https://keyron.com',
      description: "Developing ForePass® — the world's first non-invasive, fully reversible gastric bypass device to treat Type 2 Diabetes, NASH, and obesity via endoscopic implant.",
      sector: 'Health',
      stage: 'Pre-clinical',
      highlight: 'Clinical trials launching in South America',
    },
  },
  {
    names: ['Surf Therapeutics Inc', 'Surf Therapeutics'],
    data: {
      website: 'https://surftherapeutics.com',
      description: 'Clinical-stage company pioneering non-invasive ultrasound neuromodulation (SUSTAIN™) for immune-related disorders including inflammatory arthritis and ankylosing spondylitis.',
      sector: 'Health',
      stage: 'Clinical',
      highlight: '$6M raised · Positive first-in-human data',
    },
  },
  {
    names: ['California Perovskite Technology Inc', 'California Perovskite Technology Inc.', 'CPTI'],
    data: {
      website: 'https://cpti.co',
      description: 'Nanomaterials company developing next-generation perovskite solar cells (29% lab efficiency) for satellites, drones, EVTOLs, wearables, and IoT — 75% more energy output than silicon.',
      sector: 'CleanTech',
      stage: 'Seed',
      highlight: '29% efficiency · 10× longer lifespan than silicon',
    },
  },
  {
    names: ['Shell India Markets Private Limited'],
    data: {
      website: 'https://shell.com',
      description: 'Green propulsion engine developer for satellites, operating under Shell\'s innovation and deep tech investment initiative in Bangalore.',
      sector: 'SpaceTech',
      stage: 'Seed',
      highlight: 'Shell Technology Centre Bangalore',
    },
  },
  {
    names: ['Manastu Space'],
    data: {
      website: 'https://manastuspace.com',
      description: 'Deep tech space startup developing green propulsion systems for small satellites using hydrogen peroxide-based thrusters.',
      sector: 'SpaceTech',
      stage: 'Seed',
    },
  },
  {
    names: ['Kicksky'],
    data: {
      website: 'https://kicksky.space',
      description: 'Space technology startup building next-generation small satellite systems.',
      sector: 'SpaceTech',
      stage: 'Pre-seed',
    },
  },
  {
    names: ['Sleepiz'],
    data: {
      website: 'https://sleepiz.com',
      description: 'Medical device company using radar-based contactless monitoring to diagnose sleep apnea and other sleep disorders from the comfort of home.',
      sector: 'Health',
      stage: 'Seed',
    },
  },
  {
    names: ['BChar'],
    data: {
      website: 'https://bchar.earth',
      description: 'CleanTech startup producing biochar for carbon sequestration and soil enhancement, converting agricultural waste into a carbon-negative product.',
      sector: 'CleanTech',
      stage: 'Pre-seed',
    },
  },
  {
    names: ['Rigor AI'],
    data: {
      website: 'https://linkedin.com/company/rigor-ai/',
      description: 'AI startup developing rigorous evaluation and testing frameworks for large language models and AI systems.',
      sector: 'AI',
      stage: 'Pre-seed',
    },
  },
  {
    names: ['Arch0'],
    data: {
      website: 'https://arch0.com',
      description: 'Deep tech startup operating in the architecture and construction space with AI-driven design and automation tools.',
      sector: 'AI',
      stage: 'Pre-seed',
    },
  },
];

// Build lookup map
const ENRICHMENT_MAP = new Map<string, CompanyEnrichment>();
for (const entry of RAW) {
  for (const name of entry.names) {
    ENRICHMENT_MAP.set(key(name), entry.data);
  }
}

export function getEnrichment(name: string): CompanyEnrichment | undefined {
  return ENRICHMENT_MAP.get(key(name));
}
