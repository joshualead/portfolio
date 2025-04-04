import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../styles/theme';
import ProjectsModal from './ProjectsModal';
import TopicsModal from './TopicsModal';
import ResumeModal from './ResumeModal';
import { useMediaQuery } from 'react-responsive';

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  padding: 20px;
  color: ${({ theme }) => theme.colors.terminal};
  font-family: 'Fira Code', monospace;
  font-size: 24px;
  font-weight: bold;
  z-index: 100;
`;

const TerminalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 10px;
  height: 100vh;
  position: relative;
  background: ${({ theme }) => theme.colors.background};
  padding-top: 80px;
`;

const MenuBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
  padding: 20px;
  background: ${({ theme }) => theme.colors.terminalBackground};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuButton = styled(motion.button)`
  background: transparent;
  color: ${({ theme }) => theme.colors.terminal};
  border: 1px solid ${({ theme }) => theme.colors.terminal};
  padding: 8px 16px;
  cursor: pointer;
  font-family: 'Fira Code', monospace;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background: ${({ theme }) => theme.colors.terminal};
    color: ${({ theme }) => theme.colors.background};
    transform: translateY(-2px);
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
    background: ${({ theme }) => theme.colors.terminal};
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

const TerminalWindow = styled.div`
  background: ${({ theme }) => theme.colors.terminalBackground};
  border-radius: 8px;
  padding: 20px;
  height: calc(100vh - 100px);
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const TerminalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.terminal};
`;

const TerminalTitle = styled.h2`
  color: ${({ theme }) => theme.colors.terminal};
  margin: 0;
  font-family: 'Fira Code', monospace;
`;

const TerminalContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 10px;
  display: flex;
  flex-direction: column;
  min-height: 0;
  margin-bottom: 60px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.terminalBackground};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.terminal};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.terminal}dd;
  }
`;

const TerminalHistory = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
`;

const TerminalLine = styled.div`
  color: ${({ theme }) => theme.colors.terminal};
  margin-bottom: 10px;
  font-family: 'Fira Code', monospace;
  line-height: 1.5;
`;

const TerminalInput = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.terminalBackground};
  padding: 15px 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.terminal};
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 10;
`;

const Prompt = styled.span`
  color: ${({ theme }) => theme.colors.terminal};
  font-family: 'Fira Code', monospace;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.terminal};
  font-family: 'Fira Code', monospace;
  font-size: 16px;
  flex: 1;
  outline: none;
  padding: 5px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.terminal}88;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ConnectButton = styled(motion.a)`
  background: transparent;
  color: ${({ theme }) => theme.colors.terminal};
  border: 1px solid ${({ theme }) => theme.colors.terminal};
  padding: 8px 16px;
  cursor: pointer;
  font-family: 'Fira Code', monospace;
  transition: all 0.3s ease;
  text-decoration: none;
  border-radius: 4px;

  &:hover {
    background: ${({ theme }) => theme.colors.terminal};
    color: ${({ theme }) => theme.colors.background};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ThemeToggle = styled(motion.button)`
  background: transparent;
  color: ${({ theme }) => theme.colors.terminal};
  border: 1px solid ${({ theme }) => theme.colors.terminal};
  padding: 8px 16px;
  cursor: pointer;
  font-family: 'Fira Code', monospace;
  transition: all 0.3s ease;
  border-radius: 4px;

  &:hover {
    background: ${({ theme }) => theme.colors.terminal};
    color: ${({ theme }) => theme.colors.background};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 16px;
  background-color: ${({ theme }) => theme.colors.terminal};
  margin-left: 4px;
  animation: blink 1s infinite;
  
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

const HamburgerButton = styled(motion.button)`
  display: none;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.terminal};
  font-size: 24px;
  cursor: pointer;
  padding: 10px;
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.colors.terminalBackground};
  z-index: 999;
  padding: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileMenuButton = styled(MenuButton)`
  width: 100%;
  max-width: 200px;
  margin: 0;
`;

const Terminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false);
  const [isTopicsModalOpen, setIsTopicsModalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const inputRef = useRef<HTMLInputElement>(null);

  const introText = `Welcome to Joshua's Portfolio Terminal!

This terminal provides an interactive way to explore Joshua's professional background and projects.

Available Commands:
- resume: View Joshua's complete resume
- projects: Explore Joshua's projects
- skills: View technical skills
- experience: Check work experience
- education: View educational background
- certifications: See professional certifications
- help: Show this help message
- clear: Clear the terminal

You can also use the menu buttons above for quick access.

Type 'help' anytime to see these commands again.`;

  useEffect(() => {
    setOutput(introText.split('\n'));
  }, []);

  const handleButtonClick = (command: string) => {
    const newOutput = [...output];
    
    switch (command.toLowerCase()) {
      case 'resume':
        setIsResumeModalOpen(true);
        newOutput.push('Opening resume...');
        break;
      case 'projects':
        setIsProjectsModalOpen(true);
        newOutput.push('Opening projects...');
        break;
      case 'skills':
      case 'experience':
      case 'education':
      case 'certifications':
        setSelectedTopic(command.toLowerCase());
        setIsTopicsModalOpen(true);
        newOutput.push(`Opening ${command}...`);
        break;
    }
    
    setOutput(newOutput);
    inputRef.current?.focus();
  };

  const handleCommand = (command: string) => {
    const newOutput = [...output, `> ${command}`];
    
    switch (command.toLowerCase()) {
      case 'resume':
        setIsResumeModalOpen(true);
        newOutput.push('Opening resume...');
        break;
      case 'projects':
        setIsProjectsModalOpen(true);
        newOutput.push('Opening projects...');
        break;
      case 'skills':
      case 'experience':
      case 'education':
      case 'certifications':
        setSelectedTopic(command.toLowerCase());
        setIsTopicsModalOpen(true);
        newOutput.push(`Opening ${command}...`);
        break;
      case 'clear':
        setOutput([]);
        return;
      case 'help':
        newOutput.push(...introText.split('\n'));
        break;
      default:
        newOutput.push(`Command not found: ${command}`);
        newOutput.push('Type "help" to see available commands');
    }
    
    setOutput(newOutput);
    setInput('');
    inputRef.current?.focus();
  };

  const handleMobileMenuClick = (command: string) => {
    handleButtonClick(command);
    setIsMobileMenuOpen(false);
  };

  return (
    <TerminalContainer>
      <Header>Joshua Jerome</Header>
      <HamburgerButton
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        ☰
      </HamburgerButton>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <MobileMenuButton
              onClick={() => handleMobileMenuClick('resume')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Resume
            </MobileMenuButton>
            <MobileMenuButton
              onClick={() => handleMobileMenuClick('projects')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Projects
            </MobileMenuButton>
            <MobileMenuButton
              onClick={() => handleMobileMenuClick('skills')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Skills
            </MobileMenuButton>
            <MobileMenuButton
              onClick={() => handleMobileMenuClick('experience')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Experience
            </MobileMenuButton>
            <MobileMenuButton
              onClick={() => handleMobileMenuClick('education')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Education
            </MobileMenuButton>
            <MobileMenuButton
              onClick={() => handleMobileMenuClick('certifications')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Certifications
            </MobileMenuButton>
          </MobileMenu>
        )}
      </AnimatePresence>

      {!isMobile && (
        <MenuBar>
          <MenuButton
            onClick={() => handleButtonClick('resume')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Resume
          </MenuButton>
          <MenuButton
            onClick={() => handleButtonClick('projects')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Projects
          </MenuButton>
          <MenuButton
            onClick={() => handleButtonClick('skills')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Skills
          </MenuButton>
          <MenuButton
            onClick={() => handleButtonClick('experience')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Experience
          </MenuButton>
          <MenuButton
            onClick={() => handleButtonClick('education')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Education
          </MenuButton>
          <MenuButton
            onClick={() => handleButtonClick('certifications')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Certifications
          </MenuButton>
        </MenuBar>
      )}

      <TerminalWindow>
        <TerminalHeader>
          <TerminalTitle>Terminal</TerminalTitle>
        </TerminalHeader>
        <TerminalContent>
          <TerminalHistory>
            {output.map((line, index) => (
              <TerminalLine key={index}>{line}</TerminalLine>
            ))}
          </TerminalHistory>
        </TerminalContent>
      </TerminalWindow>

      <TerminalInput>
        <Prompt>~$</Prompt>
        <Input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleCommand(input);
            }
          }}
          placeholder="Type a command or click a menu button above..."
          autoFocus
        />
      </TerminalInput>

      <ProjectsModal
        isOpen={isProjectsModalOpen}
        onClose={() => setIsProjectsModalOpen(false)}
      />
      <TopicsModal
        isOpen={isTopicsModalOpen}
        onClose={() => setIsTopicsModalOpen(false)}
        topic={selectedTopic || ''}
      />
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </TerminalContainer>
  );
};

export default Terminal; 