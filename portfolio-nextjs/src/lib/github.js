// Constants from your original script.js
const GITHUB_USERNAME = 'joaopblume';
const REPOS_TO_EXCLUDE = ['timer', 'tab-news', 'vmdl', 'Estrutura_de_dados_exercicios', 'lab-natty-or-not', 'migration-oracle-sqlserver', 'binarize_image_dio', 'lab-aws-sagemaker-canvas-estoque'];
const FEATURED_REPOS = ['cloudboosting', 'oVirt-Backup', 'big-workload-ERP-CRM', 'PassiniRelojoaria'];
const MAX_REPO_AGE_YEARS = 3;

// Repository topics mapping
const REPO_TOPICS = {
  'frontend': ['react', 'vue', 'angular', 'javascript', 'html', 'css', 'frontend'],
  'backend': ['node', 'express', 'django', 'flask', 'api', 'server', 'backend', 'database', 'virtual-machine'],
  'featured': FEATURED_REPOS
};

/**
 * Fetch repositories from GitHub
 */
export async function fetchGitHubRepositories() {
  try {
    console.log('Iniciando busca de repositórios...');
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc`);
    
    console.log('Status da resposta:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Erro na resposta:', errorData);
      throw new Error(`Failed to fetch repositories: ${errorData.message || response.statusText}`);
    }
    
    const repositories = await response.json();
    console.log('Repositórios encontrados:', repositories.length);
    
    // Log para verificar o GITHUB_USERNAME
    console.log('GITHUB_USERNAME:', GITHUB_USERNAME);
    
    // Filter and sort repositories
    const filteredRepos = repositories.filter(repo => 
      !REPOS_TO_EXCLUDE.includes(repo.name) && 
      !REPOS_TO_EXCLUDE.includes(repo.description) &&
      !repo.fork && 
      !repo.archived &&
      (FEATURED_REPOS.includes(repo.name) || isRepoNew(repo.created_at))
    );
    
    // Sort: featured first, then by updated date
    filteredRepos.sort((a, b) => {
      const aFeatured = FEATURED_REPOS.includes(a.name);
      const bFeatured = FEATURED_REPOS.includes(b.name);
      
      if (aFeatured && !bFeatured) return -1;
      if (!aFeatured && bFeatured) return 1;
      
      return new Date(b.updated_at) - new Date(a.updated_at);
    });
    
    return filteredRepos;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return [];
  }
}

/**
 * Check if repo is newer than MAX_REPO_AGE_YEARS
 */
function isRepoNew(createdAt) {
  const repoDate = new Date(createdAt);
  const currentDate = new Date();
  const ageInYears = (currentDate - repoDate) / (1000 * 60 * 60 * 24 * 365.25);
  return ageInYears <= MAX_REPO_AGE_YEARS;
}

/**
 * Calculate time ago string
 */
export function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return interval === 1 ? '1 year ago' : `${interval} years ago`;
  }
  
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval === 1 ? '1 month ago' : `${interval} months ago`;
  }
  
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval === 1 ? '1 day ago' : `${interval} days ago`;
  }
  
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval === 1 ? '1 hour ago' : `${interval} hours ago`;
  }
  
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval === 1 ? '1 minute ago' : `${interval} minutes ago`;
  }
  
  return 'Just now';
}

/**
 * Filter repositories by tag
 */
export function filterRepositoriesByTag(repositories, tag) {
  if (!repositories) return [];
  
  if (tag === 'all') {
    return repositories;
  }
  
  return repositories.filter(repo => {
    // Check if repo is in the tag's list
    if (tag === 'featured' && FEATURED_REPOS.includes(repo.name)) {
      return true;
    }
    
    // Check if repo has topics that match the tag
    const repoTopics = repo.topics || [];
    const tagTopics = REPO_TOPICS[tag] || [];
    
    return repoTopics.some(topic => tagTopics.includes(topic.toLowerCase()));
  });
}

export { FEATURED_REPOS, REPO_TOPICS };