// app/project/[id]/page.js
import ProjectDetails from '@/components/project/ProjectDetails';
import { getProjectDetails } from '@/services/project';

export default async function ProjectPage({ params }) {
  // Ensure params.id is properly accessed
  if (!params || typeof params.id === 'undefined') {
    console.error('No ID provided in params');
    return <ProjectDetails project={null} />;
  }
  
  try {
    // Convert to string explicitly in case id is not a string
    const projectId = String(params.id);
    const project = await getProjectDetails(projectId);
    return <ProjectDetails project={project} />;
  } catch (error) {
    console.error('Error in ProjectPage:', error);
    return <ProjectDetails project={null} />;
  }
}