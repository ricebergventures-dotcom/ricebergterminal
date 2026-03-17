export type Sector = 'SpaceTech' | 'AI' | 'BioTech' | 'Health' | 'CleanTech' | 'Other';
export type Stage = 'Pre-Seed' | 'Seed' | 'Series A';
export type PipelineStatus = 'Screening' | 'First Meeting' | 'Due Diligence' | 'IC Review';

export interface Company {
  id: string;
  name: string;
  sector: Sector;
  stage: Stage;
  checkSize: string;
  status: 'Active' | 'Watch' | 'Exited';
  geography: string;
  foundedYear: number;
  founders: string[];
  lastUpdate: string;
  description: string;
}

export interface LPAccount {
  id: string;
  name: string;
  commitment: number;
  called: number;
  remaining: number;
  distributions: number;
}

export interface QuarterlyData {
  quarter: string;
  dealsReviewed: number;
  dealsClosed: number;
}

export interface PipelineCompany {
  id: string;
  name: string;
  sector: Sector;
  stage: Stage;
  source: string;
  pipelineStatus: PipelineStatus;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  email: string;
  accessLevel: 'admin' | 'owner' | 'lp';
  status: 'Active' | 'Inactive';
}

export interface ActivityEntry {
  id: string;
  timestamp: string;
  text: string;
  entity?: string;
}

export interface LPDocument {
  id: string;
  name: string;
  type: string;
  date: string;
  size: string;
}

export const PORTFOLIO_COMPANIES: Company[] = [
  {
    id: '1',
    name: 'EtherealX',
    sector: 'SpaceTech',
    stage: 'Seed',
    checkSize: '$500K',
    status: 'Active',
    geography: 'Europe',
    foundedYear: 2021,
    founders: ['Marcus Veil', 'Lena Kroft'],
    lastUpdate: 'Q1 2025 — Closed $4M seed round. Launch vehicle test completed successfully.',
    description: 'Next-generation micro-satellite propulsion systems for LEO constellations.',
  },
  {
    id: '2',
    name: 'Manas TuSpace',
    sector: 'SpaceTech',
    stage: 'Pre-Seed',
    checkSize: '$250K',
    status: 'Active',
    geography: 'India',
    foundedYear: 2022,
    founders: ['Arjun Manas', 'Priya Tulsidas'],
    lastUpdate: 'Feb 2025 — MoU signed with ISRO for launch services partnership.',
    description: 'Space-as-a-service orbital logistics platform for emerging markets.',
  },
  {
    id: '3',
    name: 'Signatur Bio',
    sector: 'BioTech',
    stage: 'Seed',
    checkSize: '$400K',
    status: 'Active',
    geography: 'Europe',
    foundedYear: 2020,
    founders: ['Dr. Helena Mur', 'Prof. Sven Larsen'],
    lastUpdate: 'Jan 2025 — Phase I trial enrollment complete, results Q3 2025.',
    description: 'Precision oncology diagnostics using epigenetic biomarker signatures.',
  },
  {
    id: '4',
    name: 'Keyron',
    sector: 'AI',
    stage: 'Seed',
    checkSize: '$350K',
    status: 'Active',
    geography: 'US',
    foundedYear: 2022,
    founders: ['Yael Orin', 'Dax Thornton'],
    lastUpdate: 'Mar 2025 — Enterprise pilot with 3 Fortune 500 companies.',
    description: 'AI-native infrastructure security and threat detection platform.',
  },
  {
    id: '5',
    name: 'Surf Therapeutics',
    sector: 'Health',
    stage: 'Seed',
    checkSize: '$300K',
    status: 'Active',
    geography: 'US',
    foundedYear: 2021,
    founders: ['Dr. Camille Ross', 'James Nakamura'],
    lastUpdate: 'Feb 2025 — FDA pre-IND meeting scheduled for Q2 2025.',
    description: 'Surfactant-based drug delivery for pulmonary conditions.',
  },
  {
    id: '6',
    name: 'Sleepiz',
    sector: 'Health',
    stage: 'Seed',
    checkSize: '$275K',
    status: 'Active',
    geography: 'Europe',
    foundedYear: 2019,
    founders: ['Florian Dütschler', 'Ana Casagrande'],
    lastUpdate: 'Q4 2024 — CE mark received, expanding to 5 new hospital systems.',
    description: 'Non-contact sleep diagnostics for sleep apnea using radar technology.',
  },
  {
    id: '7',
    name: 'Swisspod',
    sector: 'Other',
    stage: 'Seed',
    checkSize: '$200K',
    status: 'Active',
    geography: 'Europe',
    foundedYear: 2020,
    founders: ['Olivier Rihs', 'Sebastien Lonati'],
    lastUpdate: 'Jan 2025 — Hyperloop test track operational, 400+ km/h achieved.',
    description: 'Hyperloop propulsion and infrastructure for next-gen ground transit.',
  },
  {
    id: '8',
    name: 'BCHAR',
    sector: 'CleanTech',
    stage: 'Pre-Seed',
    checkSize: '$150K',
    status: 'Active',
    geography: 'Europe',
    foundedYear: 2022,
    founders: ['Nia Harrow', 'Theo Blankenship'],
    lastUpdate: 'Mar 2025 — Pilot with Zurich agricultural cooperative underway.',
    description: 'Biochar carbon removal and soil enrichment for regenerative agriculture.',
  },
  {
    id: '9',
    name: 'Rigor AI',
    sector: 'AI',
    stage: 'Seed',
    checkSize: '$325K',
    status: 'Active',
    geography: 'US',
    foundedYear: 2023,
    founders: ['Solène Lacroix', 'Ben Hargreaves'],
    lastUpdate: 'Feb 2025 — $6M Series A announced, Riceberg pro-rata exercised.',
    description: 'Automated compliance and regulatory intelligence for financial services.',
  },
  {
    id: '10',
    name: 'Arch0',
    sector: 'AI',
    stage: 'Pre-Seed',
    checkSize: '$200K',
    status: 'Active',
    geography: 'Europe',
    foundedYear: 2023,
    founders: ['Pascal Mireille', 'Zoë Hartmann'],
    lastUpdate: 'Jan 2025 — First enterprise contract signed with Tier-1 bank.',
    description: 'Foundation model for architectural design and structural engineering.',
  },
  {
    id: '11',
    name: 'KickSky',
    sector: 'SpaceTech',
    stage: 'Pre-Seed',
    checkSize: '$175K',
    status: 'Active',
    geography: 'India',
    foundedYear: 2022,
    founders: ['Ravi Krishnamurti', 'Aisha Bose'],
    lastUpdate: 'Q1 2025 — Spaceport partnership MoU signed with Satish Dhawan Center.',
    description: 'Launch-as-a-service platform for sub-orbital payload deployment.',
  },
];

export const LP_ACCOUNTS: LPAccount[] = [
  { id: 'lp1', name: 'Jordan Miles', commitment: 2000000, called: 1400000, remaining: 600000, distributions: 180000 },
  { id: 'lp2', name: 'Taylor Reed', commitment: 3500000, called: 2450000, remaining: 1050000, distributions: 420000 },
  { id: 'lp3', name: 'Morgan Capital', commitment: 5000000, called: 3200000, remaining: 1800000, distributions: 640000 },
  { id: 'lp4', name: 'Atlas Family Office', commitment: 7500000, called: 5250000, remaining: 2250000, distributions: 1050000 },
];

export const QUARTERLY_DATA: QuarterlyData[] = [
  { quarter: 'Q2 2023', dealsReviewed: 34, dealsClosed: 2 },
  { quarter: 'Q3 2023', dealsReviewed: 41, dealsClosed: 3 },
  { quarter: 'Q4 2023', dealsReviewed: 38, dealsClosed: 1 },
  { quarter: 'Q1 2024', dealsReviewed: 52, dealsClosed: 2 },
  { quarter: 'Q2 2024', dealsReviewed: 47, dealsClosed: 2 },
  { quarter: 'Q3 2024', dealsReviewed: 60, dealsClosed: 1 },
];

export const PIPELINE_COMPANIES: PipelineCompany[] = [
  { id: 'p1', name: 'NovaPulse Energy', sector: 'CleanTech', stage: 'Seed', source: 'Referral', pipelineStatus: 'Due Diligence' },
  { id: 'p2', name: 'Quanten Systems', sector: 'AI', stage: 'Pre-Seed', source: 'Inbound', pipelineStatus: 'First Meeting' },
  { id: 'p3', name: 'Verdant Genomics', sector: 'BioTech', stage: 'Seed', source: 'Conference', pipelineStatus: 'IC Review' },
  { id: 'p4', name: 'Orbital Mesh', sector: 'SpaceTech', stage: 'Pre-Seed', source: 'AngelList', pipelineStatus: 'Screening' },
  { id: 'p5', name: 'ClearCarbon', sector: 'CleanTech', stage: 'Seed', source: 'Referral', pipelineStatus: 'Due Diligence' },
  { id: 'p6', name: 'NeuroLink AI', sector: 'AI', stage: 'Seed', source: 'YC', pipelineStatus: 'First Meeting' },
];

export const TEAM_MEMBERS: TeamMember[] = [
  { id: 't1', name: 'Alex Riceberg', title: 'Managing Partner', email: 'admin@riceberg.vc', accessLevel: 'admin', status: 'Active' },
  { id: 't2', name: 'Sam Founder', title: 'General Partner', email: 'founder@riceberg.vc', accessLevel: 'owner', status: 'Active' },
  { id: 't3', name: 'Priya Nair', title: 'Principal', email: 'priya@riceberg.vc', accessLevel: 'owner', status: 'Active' },
  { id: 't4', name: 'Luca Ferretti', title: 'Associate', email: 'luca@riceberg.vc', accessLevel: 'owner', status: 'Active' },
  { id: 't5', name: 'Sofia Andersen', title: 'CFO', email: 'sofia@riceberg.vc', accessLevel: 'admin', status: 'Active' },
  { id: 't6', name: 'James Wu', title: 'Analyst', email: 'james@riceberg.vc', accessLevel: 'owner', status: 'Inactive' },
];

export const ACTIVITY_FEED: ActivityEntry[] = [
  { id: 'a1', timestamp: '09:42', text: 'New deal added to pipeline:', entity: 'NeuroLink AI' },
  { id: 'a2', timestamp: '08:17', text: 'Capital call notice sent to 4 LPs' },
  { id: 'a3', timestamp: 'Yesterday', text: 'Portfolio update logged for', entity: 'Rigor AI' },
  { id: 'a4', timestamp: 'Yesterday', text: 'IC meeting notes uploaded for', entity: 'Verdant Genomics' },
  { id: 'a5', timestamp: 'Mon', text: 'New LP onboarded:', entity: 'Atlas Family Office' },
  { id: 'a6', timestamp: 'Mon', text: 'Pro-rata exercised in', entity: 'Rigor AI' },
  { id: 'a7', timestamp: 'Fri', text: 'Q1 2025 report distributed to all LPs' },
];

export const LP_DOCUMENTS: LPDocument[] = [
  { id: 'd1', name: 'Q4 2024 Investor Report', type: 'PDF', date: 'Feb 15, 2025', size: '2.4 MB' },
  { id: 'd2', name: 'Capital Call Notice — Tranche 3', type: 'PDF', date: 'Jan 28, 2025', size: '384 KB' },
  { id: 'd3', name: '2024 K-1 Tax Document', type: 'PDF', date: 'Jan 15, 2025', size: '1.1 MB' },
  { id: 'd4', name: 'Annual Meeting Deck 2024', type: 'PDF', date: 'Dec 10, 2024', size: '8.7 MB' },
  { id: 'd5', name: 'Fund I — LPA Amendment', type: 'PDF', date: 'Oct 3, 2024', size: '640 KB' },
];

export const SECTOR_ALLOCATION = [
  { name: 'SpaceTech', value: 31, color: '#7DD3E8' },
  { name: 'AI', value: 25, color: '#A78BFA' },
  { name: 'Health', value: 18, color: '#FB7185' },
  { name: 'BioTech', value: 12, color: '#4ADE80' },
  { name: 'CleanTech', value: 8, color: '#2DD4BF' },
  { name: 'Other', value: 6, color: '#A1A1AA' },
];

export const GEO_DISTRIBUTION = [
  { name: 'Europe', value: 45 },
  { name: 'India', value: 28 },
  { name: 'US', value: 15 },
  { name: 'Other', value: 12 },
];
