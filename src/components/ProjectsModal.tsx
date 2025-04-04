import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../styles/theme';

interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background: ${({ theme }) => theme.colors.terminalBackground};
  border-radius: 8px;
  padding: 20px;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${theme.spacing.sm};
  right: ${theme.spacing.sm};
  background: transparent;
  border: 1px solid ${theme.colors.terminal};
  color: ${theme.colors.terminal};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  cursor: pointer;
  border-radius: 4px;
  font-family: ${theme.fonts.mono};

  &:hover {
    background: ${theme.colors.terminal};
    color: ${theme.colors.background};
  }
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.lg};
`;

const ProjectCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ProjectTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 12px;
`;

const ProjectLink = styled(motion.a)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  padding: 4px 8px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
  }
`;

const ProjectDescription = styled.p`
  margin-bottom: 16px;
  line-height: 1.6;
`;

const ProjectTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const TechTag = styled.span`
  background: ${({ theme }) => theme.colors.primary}22;
  color: ${({ theme }) => theme.colors.primary};
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 8px 16px;
  margin-bottom: 20px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-family: 'Fira Code', monospace;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}33;
  }
`;

const ProjectsModal: React.FC<ProjectsModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const projects = [
    {
      title: 'Steer - Training Companion',
      description: 'Created a course management platform adopted by ADP teams, featuring user authentication (JWT) and performance tracking, reducing onboarding time by 20%.',
      technologies: ['React.js', 'Node.js', 'MySQL', 'Redis', 'Docker'],
      githubLink: 'https://github.com/joshualead/steer'
    },
    {
      title: 'LUCAS - Personal Assistant',
      description: 'Built an API-integrated virtual assistant automating 10 daily tasks, saving users ~2 hours weekly.',
      technologies: ['Python', 'Tkinter'],
      githubLink: 'https://github.com/joshualead/lucas'
    },
    {
      title: 'Data Analyzer',
      description: 'Designed a windmill site selection tool, cutting analysis time by 30% with custom data models.',
      technologies: ['Python', 'Pandas', 'Matplotlib'],
      githubLink: 'https://github.com/joshualead/data-analyzer'
    }
  ];

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects;
    
    const query = searchQuery.toLowerCase();
    return projects.filter(project => 
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.technologies.some(tech => tech.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContent
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={onClose}>CLOSE</CloseButton>
            <h2 style={{ color: theme.colors.terminal, fontFamily: theme.fonts.mono }}>Projects</h2>
            <SearchBar
              type="text"
              placeholder="Search projects by title, description, or technology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <ProjectGrid>
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <ProjectHeader>
                    <ProjectTitle>{project.title}</ProjectTitle>
                    <ProjectLinks>
                      <ProjectLink
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub
                      </ProjectLink>
                    </ProjectLinks>
                  </ProjectHeader>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <ProjectTech>
                    {project.technologies.map((tech, techIndex) => (
                      <TechTag key={techIndex}>{tech}</TechTag>
                    ))}
                  </ProjectTech>
                </ProjectCard>
              ))}
            </ProjectGrid>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default ProjectsModal; 