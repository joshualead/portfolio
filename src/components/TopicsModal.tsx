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

const TopicContainer = styled.div`
  margin-top: ${theme.spacing.lg};
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.terminal};
  border-radius: 4px;
  margin-bottom: ${theme.spacing.lg};

  &:last-child {
    margin-bottom: 0;
  }
`;

const TopicTitle = styled.h3`
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.terminal};
`;

const TopicDescription = styled.p`
  margin-bottom: ${theme.spacing.sm};
  line-height: 1.5;
`;

const TopicList = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;

const TopicListItem = styled.li`
  margin-bottom: ${theme.spacing.xs};
  padding-left: ${theme.spacing.md};
  position: relative;

  &:before {
    content: "●";
    position: absolute;
    left: 0;
    color: ${theme.colors.terminal};
  }
`;

const InstitutionLink = styled.a`
  color: ${theme.colors.terminal};
  text-decoration: none;
  display: inline-block;
  margin: ${theme.spacing.sm} 0;
  padding: ${theme.spacing.xs};
  border: 1px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${theme.colors.terminal};
    background: rgba(0, 255, 0, 0.1);
  }
`;

interface TopicsModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic: string;
}

const TopicsModal: React.FC<TopicsModalProps> = ({ isOpen, onClose, topic }) => {
  const getTopicContent = () => {
    switch (topic) {
      case 'skills':
        return {
          title: 'Technical Skills',
          content: [
            'Languages: Python, Java, JavaScript (ES6+), TypeScript',
            'Frameworks & Libraries: React.js, Node.js, Express.js',
            'Databases: MySQL, Redis, Cassandra, MongoDB',
            'Cloud & DevOps: AWS (S3, EC2, Lambda, SQS), Docker, Kubernetes, CI/CD',
            'Testing: Jest, Mocha, Chai, Selenium, Cucumber',
            'Tools: Git, Jira, Confluence, Apache Kafka, Webpack',
            'Concepts: RESTful APIs, Microservices, Distributed Systems, Scalability, Caching'
          ]
        };
      case 'experience':
        return {
          title: 'Professional Experience',
          content: [
            'Member of Technical Staff | Athenahealth | August 2024 – Present',
            'Associate Software Engineer | Lifion by ADP | August 2022 – August 2024',
            'Platform Engineering Intern | Lifion by ADP | April 2022 – August 2022',
            'SDE Intern | National Institute of Wind Energy | March 2021 – August 2021'
          ]
        };
      case 'education':
        return {
          title: 'Education',
          content: [
            'B.E. in Computer Science and Engineering | Loyola ICAM College of Engineering and Technology | 2018 – 2022',
            'CGPA: 8.51 (First Class with Distinction)',
            'Key Courses: Data Structures, Algorithms, Operating Systems, Computer Networks, Distributed Systems',
            'Final Project: Developed a Student Assessment Management System using Node.js, MySQL, serving 480+ users'
          ],
          institutionLink: 'https://licet.ac.in/'
        };
      case 'certifications':
        return {
          title: 'Certifications',
          content: [
            'AWS Fundamentals (Amazon)',
            'Architecting with Google Compute Engine (Google)',
            'APIs for Perspective Platform (JPMorgan Chase)',
            'Web Development Bootcamp (AppBrewery)'
          ]
        };
      default:
        return { title: '', content: [] };
    }
  };

  const { title, content, institutionLink } = getTopicContent();

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
            <h2>{title}</h2>
            <TopicContainer>
              <TopicList>
                {content.map((item, index) => (
                  <TopicListItem key={index}>{item}</TopicListItem>
                ))}
              </TopicList>
              {institutionLink && (
                <InstitutionLink 
                  href={institutionLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Visit Institution Website →
                </InstitutionLink>
              )}
            </TopicContainer>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default TopicsModal; 