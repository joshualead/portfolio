import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../styles/theme';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1002;
`;

const ModalContent = styled(motion.div)`
  background: ${theme.colors.terminalBackground};
  color: ${theme.colors.terminal};
  padding: ${theme.spacing.xl} ${theme.spacing.lg};
  border-radius: 8px;
  width: 80%;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
  font-family: ${theme.fonts.mono};
  border: 1px solid ${theme.colors.terminal};
  position: relative;

  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.terminal};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 255, 0, 0.8);
  }
`;

const ProjectLink = styled.a`
  color: ${theme.colors.terminal};
  text-decoration: none;
  display: block;
  margin: ${theme.spacing.sm} 0;
  padding: ${theme.spacing.xs};
  border: 1px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${theme.colors.terminal};
    background: rgba(0, 255, 0, 0.1);
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: ${theme.spacing.md};
  left: ${theme.spacing.md};
  background: transparent;
  border: 1px solid ${theme.colors.terminal};
  color: ${theme.colors.terminal};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  font-family: ${theme.fonts.mono};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.colors.terminal};
    color: ${theme.colors.background};
  }
`;

const ProjectContainer = styled.div`
  margin-top: ${theme.spacing.lg};
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.terminal};
  border-radius: 4px;
  margin-bottom: ${theme.spacing.lg};

  &:last-child {
    margin-bottom: 0;
  }
`;

const ProjectTitle = styled.h3`
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.terminal};
`;

const ProjectDescription = styled.p`
  margin-bottom: ${theme.spacing.sm};
  line-height: 1.5;
`;

const ProjectTech = styled.p`
  margin-bottom: ${theme.spacing.sm};
  font-style: italic;
`;

interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProjectsModal: React.FC<ProjectsModalProps> = ({ isOpen, onClose }) => {
  const projects = [
    {
      name: 'Steer - Training Companion',
      description: 'Course management platform with user authentication and performance tracking',
      tech: 'React.js, Node.js, MySQL, Redis, Docker',
      link: 'https://github.com/joshualead/steer'
    },
    {
      name: 'LUCAS - Personal Assistant',
      description: 'API-integrated virtual assistant automating daily tasks',
      tech: 'Python, Tkinter',
      link: 'https://github.com/joshualead/lucas'
    },
    {
      name: 'Data Analyzer',
      description: 'Windmill site selection tool with custom data models',
      tech: 'Python, Pandas, Matplotlib',
      link: 'https://github.com/joshualead/data-analyzer'
    }
  ];

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
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={e => e.stopPropagation()}
          >
            <CloseButton
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              CLOSE
            </CloseButton>
            <h2>Projects</h2>
            {projects.map((project, index) => (
              <ProjectContainer key={index}>
                <ProjectTitle>{project.name}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <ProjectTech>Tech Stack: {project.tech}</ProjectTech>
                <ProjectLink 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  View on GitHub →
                </ProjectLink>
              </ProjectContainer>
            ))}
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default ProjectsModal; 