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

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.terminal};
  font-size: 24px;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  &:hover {
    background: ${({ theme }) => theme.colors.terminal}22;
  }
`;

const ResumeSection = styled.div`
  margin-bottom: 30px;
`;

const ResumeTitle = styled.h2`
  color: ${({ theme }) => theme.colors.terminal};
  font-family: 'Fira Code', monospace;
  margin-bottom: 15px;
  font-size: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.terminal}22;
  padding-bottom: 10px;
`;

const ResumeSubtitle = styled.h3`
  color: ${({ theme }) => theme.colors.terminal};
  font-family: 'Fira Code', monospace;
  margin: 15px 0 10px;
  font-size: 20px;
`;

const ResumeText = styled.p`
  color: ${({ theme }) => theme.colors.terminal};
  font-family: 'Fira Code', monospace;
  line-height: 1.6;
  margin-bottom: 10px;
`;

const ResumeList = styled.ul`
  color: ${({ theme }) => theme.colors.terminal};
  font-family: 'Fira Code', monospace;
  line-height: 1.6;
  margin: 10px 0;
  padding-left: 20px;
`;

const ResumeListItem = styled.li`
  margin-bottom: 8px;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ContactItem = styled.a`
  color: ${({ theme }) => theme.colors.terminal};
  font-family: 'Fira Code', monospace;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const TechStack = styled.div`
  color: ${({ theme }) => theme.colors.terminal}88;
  font-family: 'Fira Code', monospace;
  font-size: 14px;
  margin-top: 10px;
  font-style: italic;
`;

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
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
            <CloseButton
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ×
            </CloseButton>
            
            <ResumeSection>
              <ResumeTitle>Joshua Jerome</ResumeTitle>
              <ResumeText>Full Stack Developer</ResumeText>
            </ResumeSection>

            <ResumeSection>
              <ResumeText>
                3+ years of experience building scalable full-stack web applications for global platforms using modern frameworks, cloud technologies, and agile methodologies.
              </ResumeText>
            </ResumeSection>

            <ResumeSection>
              <ResumeTitle>Contact</ResumeTitle>
              <ContactInfo>
                <ContactItem href="mailto:joshua_jerome_@outlook.com">
                  Email: joshua_jerome_@outlook.com
                </ContactItem>
                <ResumeText>Phone: +91 9150159695</ResumeText>
                <ContactItem href="https://linkedin.com/in/joshuajerome45" target="_blank" rel="noopener noreferrer">
                  LinkedIn: linkedin.com/in/joshuajerome45
                </ContactItem>
                <ContactItem href="https://github.com/joshualead" target="_blank" rel="noopener noreferrer">
                  GitHub: github.com/joshualead
                </ContactItem>
              </ContactInfo>
            </ResumeSection>

            <ResumeSection>
              <ResumeTitle>Technical Skills</ResumeTitle>
              <ResumeList>
                <ResumeListItem>Languages: Python, Java, JavaScript (ES6+), TypeScript</ResumeListItem>
                <ResumeListItem>Frameworks & Libraries: React.js, Node.js, Express.js</ResumeListItem>
                <ResumeListItem>Databases: MySQL, Redis, Cassandra, MongoDB</ResumeListItem>
                <ResumeListItem>Cloud & DevOps: AWS (S3, EC2, Lambda, SQS), Docker, Kubernetes, CI/CD</ResumeListItem>
                <ResumeListItem>Testing: Jest, Mocha, Chai, Selenium, Cucumber</ResumeListItem>
                <ResumeListItem>Tools: Git, Jira, Confluence, Apache Kafka, Webpack</ResumeListItem>
                <ResumeListItem>Concepts: RESTful APIs, Microservices, Distributed Systems, Scalability, Caching</ResumeListItem>
              </ResumeList>
            </ResumeSection>

            <ResumeSection>
              <ResumeTitle>Professional Experience</ResumeTitle>
              
              <ResumeSubtitle>Member of Technical Staff | Athenahealth | August 2024 – Present</ResumeSubtitle>
              <ResumeList>
                <ResumeListItem>Engineered a real-time health check dashboard for staging environments in athenaOne using React.js and AWS Lambda, improving system monitoring by 30%.</ResumeListItem>
                <ResumeListItem>Optimized staging database performance by resolving refresh issues, reducing ad hoc bugs by 25% through root cause analysis.</ResumeListItem>
                <ResumeListItem>Authored onboarding documentation for new hires, streamlining training processes and reducing ramp-up time by 15%.</ResumeListItem>
              </ResumeList>
              <TechStack>Tech Stack: React.js, AWS, MySQL, Docker.</TechStack>

              <ResumeSubtitle>Associate Software Engineer | Lifion by ADP | August 2022 – August 2024</ResumeSubtitle>
              <ResumeList>
                <ResumeListItem>Enhanced API reliability by implementing heartbeat monitoring, reducing downtime by 40%, and documented RESTful API spikes for team scalability.</ResumeListItem>
                <ResumeListItem>Designed and deployed a caching architecture with Redis, cutting database calls by 60% and saving $10,000 monthly in operational costs.</ResumeListItem>
                <ResumeListItem>Led group code reviews and wrote comprehensive unit/integration tests using Jest, Mocha, and Chai, improving code quality by 20%.</ResumeListItem>
                <ResumeListItem>Facilitated agile workflows by moderating standups and managing tasks in Jira, boosting team productivity by 15%.</ResumeListItem>
              </ResumeList>
              <TechStack>Tech Stack: Node.js, Redis, MySQL, Jest, Docker.</TechStack>

              <ResumeSubtitle>Platform Engineering Intern | Lifion by ADP | April 2022 – August 2022</ResumeSubtitle>
              <ResumeList>
                <ResumeListItem>Developed scalable microservices with Node.js, improving feature flexibility and reducing deployment time by 25%.</ResumeListItem>
                <ResumeListItem>Proposed and prototyped distributed caching solutions using Redis, enhancing system performance in a multi-region setup.</ResumeListItem>
                <ResumeListItem>Collaborated across 3 time zones in an agile environment, ensuring on-time delivery of 5+ features.</ResumeListItem>
              </ResumeList>
              <TechStack>Tech Stack: Node.js, Redis, Jira, Confluence.</TechStack>

              <ResumeSubtitle>SDE Intern | National Institute of Wind Energy | March 2021 – August 2021</ResumeSubtitle>
              <ResumeList>
                <ResumeListItem>Built a data processing automation tool in Python to analyze 4TB of MET tower data, reducing manual processing time by 60%.</ResumeListItem>
                <ResumeListItem>Improved data fetch efficiency by 36% through optimized big data workflows and custom algorithms.</ResumeListItem>
              </ResumeList>
              <TechStack>Tech Stack: Python, Pandas, Matplotlib.</TechStack>
            </ResumeSection>

            <ResumeSection>
              <ResumeTitle>Education</ResumeTitle>
              <ResumeSubtitle>B.E. in Computer Science and Engineering | Loyola ICAM College of Engineering and Technology | 2018 – 2022</ResumeSubtitle>
              <ResumeList>
                <ResumeListItem>CGPA: 8.51 (First Class with Distinction)</ResumeListItem>
                <ResumeListItem>Key Courses: Data Structures, Algorithms, Operating Systems, Computer Networks, Distributed Systems</ResumeListItem>
                <ResumeListItem>Final Project: Developed a Student Assessment Management System using Node.js, MySQL, serving 480+ users.</ResumeListItem>
              </ResumeList>
            </ResumeSection>

            <ResumeSection>
              <ResumeTitle>Projects</ResumeTitle>
              <ResumeSubtitle>Steer - Training Companion</ResumeSubtitle>
              <ResumeText>Created a course management platform adopted by ADP teams, featuring user authentication (JWT) and performance tracking, reducing onboarding time by 20%.</ResumeText>
              <TechStack>Tech Stack: React.js, Node.js, MySQL, Redis, Docker</TechStack>

              <ResumeSubtitle>LUCAS - Personal Assistant</ResumeSubtitle>
              <ResumeText>Built an API-integrated virtual assistant automating 10 daily tasks, saving users ~2 hours weekly.</ResumeText>
              <TechStack>Tech Stack: Python, Tkinter</TechStack>

              <ResumeSubtitle>Data Analyzer</ResumeSubtitle>
              <ResumeText>Designed a windmill site selection tool, cutting analysis time by 30% with custom data models.</ResumeText>
              <TechStack>Tech Stack: Python, Pandas, Matplotlib</TechStack>
            </ResumeSection>

            <ResumeSection>
              <ResumeTitle>Certifications</ResumeTitle>
              <ResumeList>
                <ResumeListItem>AWS Fundamentals (Amazon)</ResumeListItem>
                <ResumeListItem>Architecting with Google Compute Engine (Google)</ResumeListItem>
                <ResumeListItem>APIs for Perspective Platform (JPMorgan Chase)</ResumeListItem>
                <ResumeListItem>Web Development Bootcamp (AppBrewery)</ResumeListItem>
              </ResumeList>
            </ResumeSection>

            <ResumeSection>
              <ResumeTitle>Achievements</ResumeTitle>
              <ResumeList>
                <ResumeListItem>Special Mention, MLH Hackade 2021 – "Adventures of Jake"</ResumeListItem>
                <ResumeListItem>Led National Digital Library chapter and KCG Csemic Quiz 2020 (Winner)</ResumeListItem>
              </ResumeList>
            </ResumeSection>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default ResumeModal; 