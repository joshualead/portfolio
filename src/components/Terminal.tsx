import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';
import ProjectsModal from './ProjectsModal';
import TopicsModal from './TopicsModal';

const TerminalContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.terminalBackground};
  color: ${theme.colors.terminal};
  font-family: ${theme.fonts.mono};
  padding: ${theme.spacing.lg};
  overflow-y: auto;
  z-index: 1000;
`;

const TerminalLine = styled(motion.div)`
  margin-bottom: ${theme.spacing.sm};
  white-space: pre-wrap;
`;

const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 16px;
  background-color: ${theme.colors.terminal};
  margin-left: 4px;
  animation: blink 1s infinite;
  
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

const ButtonContainer = styled.div`
  position: fixed;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  display: flex;
  gap: ${theme.spacing.sm};
  z-index: 1001;
`;

const TerminalButton = styled(motion.button)`
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

const ConnectButton = styled(motion.a)`
  background: transparent;
  border: 1px solid ${theme.colors.terminal};
  color: ${theme.colors.terminal};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  font-family: ${theme.fonts.mono};
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  border-radius: 6px;

  &:hover {
    background: ${theme.colors.terminal};
    color: ${theme.colors.background};
  }
`;

interface TerminalProps {
  onComplete: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ onComplete }) => {
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showProjects, setShowProjects] = useState(false);
  const [showTopic, setShowTopic] = useState<string | null>(null);

  const fullText = `Joshua Jerome
Full Stack Developer

3+ years of experience building scalable full-stack web applications for global platforms using modern frameworks, cloud technologies, and agile methodologies.

Contact
Email: joshua_jerome_@outlook.com
LinkedIn: linkedin.com/in/joshuajerome45
GitHub: github.com/joshualead

Technical Skills
● Languages: Python, Java, JavaScript (ES6+), TypeScript
● Frameworks & Libraries: React.js, Node.js, Express.js
● Databases: MySQL, Redis, Cassandra, MongoDB
● Cloud & DevOps: AWS (S3, EC2, Lambda, SQS), Docker, Kubernetes, CI/CD
● Testing: Jest, Mocha, Chai, Selenium, Cucumber
● Tools: Git, Jira, Confluence, Apache Kafka, Webpack
● Concepts: RESTful APIs, Microservices, Distributed Systems, Scalability, Caching

Professional Experience
Member of Technical Staff | Athenahealth | August 2024 – Present
● Engineered a real-time health check dashboard for staging environments in athenaOne using React.js and AWS Lambda, improving system monitoring by 30%.
● Optimized staging database performance by resolving refresh issues, reducing ad hoc bugs by 25% through root cause analysis.
● Authored onboarding documentation for new hires, streamlining training processes and reducing ramp-up time by 15%.
● Tech Stack: React.js, AWS, MySQL, Docker.

Associate Software Engineer | Lifion by ADP | August 2022 – August 2024
● Enhanced API reliability by implementing heartbeat monitoring, reducing downtime by 40%, and documented RESTful API spikes for team scalability.
● Designed and deployed a caching architecture with Redis, cutting database calls by 60% and saving $10,000 monthly in operational costs.
● Led group code reviews and wrote comprehensive unit/integration tests using Jest, Mocha, and Chai, improving code quality by 20%.
● Facilitated agile workflows by moderating standups and managing tasks in Jira, boosting team productivity by 15%.
● Tech Stack: Node.js, Redis, MySQL, Jest, Docker.

Platform Engineering Intern | Lifion by ADP | April 2022 – August 2022
● Developed scalable microservices with Node.js, improving feature flexibility and reducing deployment time by 25%.
● Proposed and prototyped distributed caching solutions using Redis, enhancing system performance in a multi-region setup.
● Collaborated across 3 time zones in an agile environment, ensuring on-time delivery of 5+ features.
● Tech Stack: Node.js, Redis, Jira, Confluence.

SDE Intern | National Institute of Wind Energy | March 2021 – August 2021
● Built a data processing automation tool in Python to analyze 4TB of MET tower data, reducing manual processing time by 60%.
● Improved data fetch efficiency by 36% through optimized big data workflows and custom algorithms.
● Tech Stack: Python, Pandas, Matplotlib.

Education
B.E. in Computer Science and Engineering | Loyola ICAM College of Engineering and Technology | 2018 – 2022
● CGPA: 8.51 (First Class with Distinction)
● Key Courses: Data Structures, Algorithms, Operating Systems, Computer Networks, Distributed Systems
● Final Project: Developed a Student Assessment Management System using Node.js, MySQL, serving 480+ users.

Projects
Steer - Training Companion | React.js, Node.js, MySQL, Redis, Docker
● Created a course management platform adopted by ADP teams, featuring user authentication (JWT) and performance tracking, reducing onboarding time by 20%.

LUCAS - Personal Assistant | Python, Tkinter
● Built an API-integrated virtual assistant automating 10 daily tasks, saving users ~2 hours weekly.

Data Analyzer | Python, Pandas, Matplotlib
● Designed a windmill site selection tool, cutting analysis time by 30% with custom data models.

Certifications
● AWS Fundamentals (Amazon)
● Architecting with Google Compute Engine (Google)
● APIs for Perspective Platform (JPMorgan Chase)
● Web Development Bootcamp (AppBrewery)

Achievements
● Special Mention, MLH Hackade 2021 – "Adventures of Jake"
● Led National Digital Library chapter and KCG Csemic Quiz 2020 (Winner)`;

  useEffect(() => {
    if (!isTyping) return;

    const timer = setTimeout(() => {
      if (currentIndex < fullText.length) {
        setCurrentText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      } else {
        setIsTyping(false);
        onComplete();
      }
    }, 30);

    return () => clearTimeout(timer);
  }, [currentIndex, isTyping, fullText, onComplete]);

  const handleSkip = () => {
    setIsTyping(false);
    setCurrentText(fullText);
  };

  const toggleProjects = () => {
    setShowProjects(!showProjects);
  };

  const toggleTopic = (topic: string) => {
    setShowTopic(showTopic === topic ? null : topic);
  };

  return (
    <TerminalContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ButtonContainer>
        <ConnectButton
          href="https://linkedin.com/in/joshuajerome45"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          CONNECT
        </ConnectButton>
        <TerminalButton
          onClick={() => toggleTopic('skills')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          SKILLS
        </TerminalButton>
        <TerminalButton
          onClick={() => toggleTopic('experience')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          EXPERIENCE
        </TerminalButton>
        <TerminalButton
          onClick={() => toggleTopic('education')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          EDUCATION
        </TerminalButton>
        <TerminalButton
          onClick={() => toggleTopic('certifications')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          CERTIFICATIONS
        </TerminalButton>
        <TerminalButton
          onClick={toggleProjects}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          PROJECTS
        </TerminalButton>
        <TerminalButton
          onClick={handleSkip}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ESC
        </TerminalButton>
      </ButtonContainer>
      <TerminalLine>
        {currentText}
        {isTyping && <Cursor />}
      </TerminalLine>
      <ProjectsModal isOpen={showProjects} onClose={toggleProjects} />
      {showTopic && (
        <TopicsModal
          isOpen={!!showTopic}
          onClose={() => setShowTopic(null)}
          topic={showTopic}
        />
      )}
    </TerminalContainer>
  );
};

export default Terminal; 