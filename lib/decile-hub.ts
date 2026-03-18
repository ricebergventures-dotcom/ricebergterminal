const BASE = process.env.DECILE_HUB_BASE_URL || 'https://riceberg.decilehub.com/api/v1';
const KEY  = process.env.DECILE_HUB_API_KEY  || '';

async function dhFetch(path: string) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { Authorization: KEY },
    next: { revalidate: 300 }, // cache 5 min
  });
  if (!res.ok) throw new Error(`Decile Hub ${path}: ${res.status}`);
  return res.json();
}

// ── Account ──────────────────────────────────────────────────────────────────
export async function getAccount() {
  return dhFetch('/accounts') as Promise<{
    id: string;
    name: string;
    fund_1_thesis: string;
    fund_1_target_fund_size: number;
    website: string;
    currency: string;
    avatar_url: string;
  }>;
}

// ── Pipelines ─────────────────────────────────────────────────────────────────
export async function getPipelines() {
  return dhFetch('/pipelines') as Promise<Array<{
    id: string;
    name: string;
    allowed_prospect_types: string[];
  }>>;
}

export async function getPipelineByName(name: string) {
  const all = await getPipelines();
  return all.find(p => p.name.toLowerCase() === name.toLowerCase());
}

// ── Prospects ─────────────────────────────────────────────────────────────────
export interface Prospect {
  id: number;
  name: string;
  stage_name: string | null;
  pipeline_name: string | null;
  pipeline_id: string;
  type: string;
  created_at: string;
  short_description?: string;
  company_url?: string;
  data?: Record<string, unknown>;
}

export async function getProspects(pipelineId: string, perPage = 50): Promise<Prospect[]> {
  const res = await dhFetch(`/pipeline_prospects?pipeline_id=${pipelineId}&per_page=${perPage}`);
  return res.data || [];
}

export async function getPortfolioCompanies(): Promise<Prospect[]> {
  const pipeline = await getPipelineByName('Portfolio');
  if (!pipeline) return [];
  return getProspects(pipeline.id, 50);
}

export async function getDealFlowCompanies(): Promise<Prospect[]> {
  // Try the "Deals" pipeline first
  const pipelines = await getPipelines();
  const dealsPipeline = pipelines.find(p => p.name === 'Deals');
  if (!dealsPipeline) return [];
  return getProspects(dealsPipeline.id, 100);
}

// ── Organizations ──────────────────────────────────────────────────────────────
export async function getOrganization(id: number) {
  return dhFetch(`/organizations/${id}`);
}

// ── People ─────────────────────────────────────────────────────────────────────
export interface Person {
  id: number;
  first_name: string;
  last_name: string;
  email: string | null;
  title?: string;
  created_at: string;
}

export async function getPeople(perPage = 100): Promise<Person[]> {
  const res = await dhFetch(`/people?per_page=${perPage}`);
  return res.data || [];
}

// ── Files ──────────────────────────────────────────────────────────────────────
export interface DhFile {
  id: string;
  name: string;
  extension: string;
  created_at: string;
  file_size?: number;
}

export async function getFiles(perPage = 30): Promise<DhFile[]> {
  const res = await dhFetch(`/files?per_page=${perPage}`);
  return res.data || [];
}
