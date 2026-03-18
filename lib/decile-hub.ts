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
    internal_id: string;
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
  updated_at: string;
  short_description?: string;
  company_url?: string;
  prospectable_id?: number;
  stage?: { id: number; name: string };
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
export interface OrgDetail {
  id: number;
  name: string;
  company_url: string | null;
  short_description: string | null;
  founder: string | null;
  people: Array<{ first_name: string; last_name: string; title?: string; email?: string }>;
}

export async function getOrganization(id: number): Promise<OrgDetail> {
  const res = await dhFetch(`/organizations/${id}`);
  return res.data;
}

export interface PortfolioCompany extends Prospect {
  org?: OrgDetail;
}

export async function getPortfolioCompaniesWithDetails(): Promise<PortfolioCompany[]> {
  const pipeline = await getPipelineByName('Portfolio');
  if (!pipeline) return [];
  const prospects = await getProspects(pipeline.id, 50);

  // Fetch org details in parallel using prospectable_id from the prospect
  const orgDetails = await Promise.all(
    prospects.map(p =>
      p.prospectable_id
        ? getOrganization(p.prospectable_id).catch(() => undefined)
        : Promise.resolve(undefined)
    )
  );

  return prospects.map((p, i) => ({ ...p, org: orgDetails[i] }));
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

// ── Dashboard stats (real data only) ─────────────────────────────────────────
export async function getDashboardStats() {
  const [account, pipelines] = await Promise.all([
    getAccount(),
    getPipelines(),
  ]);

  const portfolioPipeline = pipelines.find(p => p.name === 'Portfolio');
  const dealsPipeline = pipelines.find(p => p.name === 'Deals');
  const lpPipeline = pipelines.find(p => p.internal_id === 'Limited Partners');

  const [portfolioRes, dealsRes, lpRes] = await Promise.all([
    portfolioPipeline ? dhFetch(`/pipeline_prospects?pipeline_id=${portfolioPipeline.id}&per_page=100`) : { data: [] },
    dealsPipeline     ? dhFetch(`/pipeline_prospects?pipeline_id=${dealsPipeline.id}&per_page=100`)     : { data: [] },
    lpPipeline        ? dhFetch(`/pipeline_prospects?pipeline_id=${lpPipeline.id}&per_page=100`)        : { data: [] },
  ]);

  return {
    targetFundSize: account.fund_1_target_fund_size,
    currency: account.currency,
    portfolioCount: (portfolioRes.data || []).length,
    dealsCount: (dealsRes.data || []).length,
    lpCount: (lpRes.data || []).length,
  };
}

// ── Recent activity (last updated prospects across all pipelines) ──────────────
export interface ActivityItem {
  id: number;
  name: string;
  pipeline_name: string;
  stage_name: string | null;
  updated_at: string;
  created_at: string;
}

export async function getRecentActivity(limit = 8): Promise<ActivityItem[]> {
  // Pull from Portfolio + Deals pipelines for recent activity
  const pipelines = await getPipelines();
  const relevantIds = pipelines
    .filter(p => ['Portfolio', 'Deals'].includes(p.name))
    .map(p => p.id);

  const results = await Promise.all(
    relevantIds.map(id => dhFetch(`/pipeline_prospects?pipeline_id=${id}&per_page=50`))
  );

  const pipelineMap = Object.fromEntries(pipelines.map(p => [p.id, p.name]));

  const all: ActivityItem[] = results.flatMap((res, i) =>
    (res.data || []).map((p: { id: number; name: string; stage: { name: string } | null; updated_at: string; created_at: string }) => ({
      id: p.id,
      name: p.name,
      pipeline_name: pipelineMap[relevantIds[i]] || '',
      stage_name: p.stage?.name || null,
      updated_at: p.updated_at,
      created_at: p.created_at,
    }))
  );

  return all
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, limit);
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
