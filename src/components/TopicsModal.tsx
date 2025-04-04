import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../styles/theme';

interface TopicsModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic: string;
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

const ContentSection = styled.div<{ isDarkMode: boolean }>`
  margin-top: ${theme.spacing.lg};
  padding: ${theme.spacing.lg};
  border: 1px solid ${theme.colors.terminal};
  border-radius: 8px;
  background-color: ${props => props.isDarkMode ? 'rgba(0, 255, 0, 0.1)' : 'rgba(0, 255, 0, 0.05)'};
`;

const SectionTitle = styled.h3`
  color: ${theme.colors.terminal};
  margin-bottom: ${theme.spacing.sm};
  font-family: ${theme.fonts.mono};
`;

const SectionContent = styled.div`
  color: ${theme.colors.terminal};
  opacity: 0.8;
  font-family: ${theme.fonts.mono};
  line-height: 1.6;
`;

const InstitutionLink = styled.a`
  color: ${props => props.theme.colors.terminal};
  text-decoration: none;
  display: inline-block;
  margin: ${theme.spacing.sm} 0;
  padding: ${theme.spacing.xs};
  border: 1px solid transparent;
  transition: all 0.3s ease;
  font-family: ${theme.fonts.mono};

  &:hover {
    border-color: ${props => props.theme.colors.terminal};
    background: rgba(0, 255, 0, 0.1);
  }
`;

const TopicButton = styled(motion.button)`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  padding: 8px 16px;
  margin: 4px;
  cursor: pointer;
  font-family: 'Fira Code', monospace;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  &::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding: 4px 8px;
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
    visibility: visible;
    bottom: calc(100% + 5px);
  }
`;

const TopicContent = styled(motion.div)`
  margin-top: 20px;
  padding: 20px;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  max-height: 400px;
  overflow-y: auto;
  position: relative;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.primary}dd;
  }
`;

const LoadingSpinner = styled(motion.div)`
  width: 40px;
  height: 40px;
  border: 4px solid ${({ theme }) => theme.colors.primary}33;
  border-top: 4px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const TimelineContainer = styled.div`
  position: relative;
  padding: 20px 0;
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  padding-left: 30px;
  margin-bottom: 30px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 2px;
    height: 100%;
    background: ${({ theme }) => theme.colors.primary};
  }

  &::after {
    content: '';
    position: absolute;
    left: -6px;
    top: 0;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
  }
`;

const TimelineDate = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  display: block;
  margin-bottom: 8px;
`;

const TimelineContent = styled.div`
  background: ${({ theme }) => theme.colors.background};
  padding: 15px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
`;

const SkillContainer = styled.div`
  margin-bottom: 20px;
`;

const SkillName = styled.h4`
  margin: 0 0 8px 0;
  color: ${({ theme }) => theme.colors.primary};
`;

const SkillBar = styled.div`
  height: 8px;
  background: ${({ theme }) => theme.colors.primary}22;
  border-radius: 4px;
  overflow: hidden;
`;

const SkillLevel = styled(motion.div)`
  height: 100%;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
`;

const ProjectLink = styled(motion.a).attrs({
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 }
})`
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

const TopicsModal: React.FC<TopicsModalProps> = ({ isOpen, onClose, topic }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const getTopicContent = () => {
    switch (topic) {
      case 'skills':
        return {
          title: 'Technical Skills',
          content: (
            <div>
              <p>● Languages: Python, Java, JavaScript (ES6+), TypeScript</p>
              <p>● Frameworks & Libraries: React.js, Node.js, Express.js</p>
              <p>● Databases: MySQL, Redis, Cassandra, MongoDB</p>
              <p>● Cloud & DevOps: AWS (S3, EC2, Lambda, SQS), Docker, Kubernetes, CI/CD</p>
              <p>● Testing: Jest, Mocha, Chai, Selenium, Cucumber</p>
              <p>● Tools: Git, Jira, Confluence, Apache Kafka, Webpack</p>
              <p>● Concepts: RESTful APIs, Microservices, Distributed Systems, Scalability, Caching</p>
            </div>
          )
        };
      case 'experience':
        return {
          title: 'Professional Experience',
          content: (
            <div>
              <p><strong>Member of Technical Staff | Athenahealth | August 2024 – Present</strong></p>
              <p>● Engineered a real-time health check dashboard for staging environments in athenaOne using React.js and AWS Lambda, improving system monitoring by 30%.</p>
              <p>● Optimized staging database performance by resolving refresh issues, reducing ad hoc bugs by 25% through root cause analysis.</p>
              <p>● Authored onboarding documentation for new hires, streamlining training processes and reducing ramp-up time by 15%.</p>
              <p>Tech Stack: React.js, AWS, MySQL, Docker.</p>
              
              <p><strong>Associate Software Engineer | Lifion by ADP | August 2022 – August 2024</strong></p>
              <p>● Enhanced API reliability by implementing heartbeat monitoring, reducing downtime by 40%, and documented RESTful API spikes for team scalability.</p>
              <p>● Designed and deployed a caching architecture with Redis, cutting database calls by 60% and saving $10,000 monthly in operational costs.</p>
              <p>● Led group code reviews and wrote comprehensive unit/integration tests using Jest, Mocha, and Chai, improving code quality by 20%.</p>
              <p>● Facilitated agile workflows by moderating standups and managing tasks in Jira, boosting team productivity by 15%.</p>
              <p>Tech Stack: Node.js, Redis, MySQL, Jest, Docker.</p>
            </div>
          )
        };
      case 'education':
        return {
          title: 'Education',
          content: (
            <div>
              <p><strong>B.E. in Computer Science and Engineering | Loyola ICAM College of Engineering and Technology | 2018 – 2022</strong></p>
              <p>● CGPA: 8.51 (First Class with Distinction)</p>
              <p>● Key Courses: Data Structures, Algorithms, Operating Systems, Computer Networks, Distributed Systems</p>
              <p>● Final Project: Developed a Student Assessment Management System using Node.js, MySQL, serving 480+ users.</p>
            </div>
          ),
          institutionLink: 'https://licet.ac.in/'
        };
      case 'certifications':
        return {
          title: 'Certifications',
          content: (
            <div>
              <p>● AWS Fundamentals (Amazon)</p>
              <p>● Architecting with Google Compute Engine (Google)</p>
              <p>● APIs for Perspective Platform (JPMorgan Chase)</p>
              <p>● Web Development Bootcamp (AppBrewery)</p>
            </div>
          )
        };
      default:
        return { title: '', content: null };
    }
  };

  const { title, content, institutionLink } = getTopicContent();

  const filteredContent = useMemo(() => {
    if (!searchQuery.trim() || !content) return content;
    
    const query = searchQuery.toLowerCase();
    if (typeof content === 'string') {
      return content.toLowerCase().includes(query) ? content : null;
    }
    
    // For React elements, we'll search through their text content
    const textContent = content.toString().toLowerCase();
    return textContent.includes(query) ? content : null;
  }, [content, searchQuery]);

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
            <h2 style={{ color: theme.colors.terminal, fontFamily: theme.fonts.mono }}>{title}</h2>
            <SearchBar
              type="text"
              placeholder="Search within this section..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <ContentSection isDarkMode={false}>
              {filteredContent ? (
                <SectionContent>{filteredContent}</SectionContent>
              ) : (
                <p>No results found for "{searchQuery}"</p>
              )}
              {institutionLink && (
                <InstitutionLink
                  href={institutionLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Institution Website →
                </InstitutionLink>
              )}
            </ContentSection>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default TopicsModal; 