// All site content lives here. Edit this file to update the portfolio.

export const profile = {
  name: 'Ankur Gokhale',
  title: 'Software Engineer',
  tagline: 'I build web applications and data-driven tools, with a focus on machine learning and AI.',
  email: 'ankurgokhale05@gmail.com',
  resume: '', // e.g. '/resume.pdf' — put the file in /public
};

export const socials = [
  { name: 'GitHub', icon: 'github', url: 'https://github.com/ankurgokhale05' },
  { name: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/in/ankur-gokhale-86878a13b/' },
  { name: 'Twitter', icon: 'twitter', url: 'https://twitter.com/ankur_gokhale' },
  { name: 'Email', icon: 'mail', url: 'mailto:ankurgokhale05@gmail.com' },
];

export const about = [
  "I'm a software engineer with a Computer Science master's background from the University of Texas at Dallas. I enjoy building things that live on the web — from merchant-facing applications to mobile apps — and turning data into something useful.",
  "I've worked as a <b>Sr. Software Engineering Intern at Visa</b>, building a web application for small merchants, as a <b>mobile and web developer</b> at a UK-based studio, and as a <b>front-end developer</b> on a peer-to-peer book marketplace.",
  'Outside of product work, I explore machine learning, AI in games, protein structure analysis, and blockchain.',
];

// `date` is optional — add ranges like '2019 — 2020' to show them on the left.
export const experience = [
  {
    date: '',
    title: 'Sr. Software Engineering Intern',
    company: 'Visa Inc.',
    location: 'Foster City, CA',
    url: 'https://www.visa.com',
    description:
      "Built and deployed a web application for small merchants, projected to grow Visa's merchant user base by 75,000. Extended Visa's rewards and loyalty programs with a Karma Points mechanism, worked in Scrum to cut project completion time by 30%, and reached 60% unit test coverage with Nightwatch.js end-to-end and unit tests.",
    tech: ['Python', 'Django', 'JavaScript', 'jQuery', 'Bootstrap', 'SQLite', 'Nightwatch.js'],
  },
  {
    date: '',
    title: 'Mobile and Web Developer',
    company: 'Digital Vibes LLC',
    location: 'United Kingdom',
    url: '',
    description:
      'Designed, developed, and deployed Kuendo, a mobile application for residents of condo communities. Worked with test-driven development, Agile practices, and Redux.',
    tech: ['React', 'React Native', 'Node.js', 'AngularJS', 'TypeScript', 'Selenium'],
  },
  {
    date: '',
    title: 'Front End Developer',
    company: 'Aduera Inc.',
    location: '',
    url: '',
    description:
      'Built the front end for a peer-to-peer marketplace where students buy and sell books directly, removing the middleman. Also managed the company’s social media.',
    tech: ['HTML', 'CSS', 'Sass', 'Node.js', 'Bootstrap', 'jQuery'],
  },
];

export const projects = [
  {
    title: 'Protein Statistics and Analysis',
    description: 'Statistical analysis and exploration of protein structure data.',
    image: 'projects/protein.jpg',
    url: 'https://github.com/ankurgokhale05/ProteinStatistics-and-Analysis',
    tech: ['Python', 'Data Analysis'],
  },
  {
    title: 'Real-Time Chat System',
    description: 'A chat application that delivers messages between users in real time.',
    image: 'projects/chat.png',
    url: 'https://github.com/ankurgokhale05/chat-system',
    tech: ['Real-time', 'Messaging'],
  },
  {
    title: 'Machine Learning Templates',
    description: 'Ready-to-use code templates for common machine learning algorithms.',
    image: 'projects/ml.jpg',
    url: 'https://github.com/ankurgokhale05/Machine-Learning',
    tech: ['Python', 'Machine Learning'],
  },
  {
    title: 'AI in Games',
    description: 'Experiments applying artificial intelligence techniques to games.',
    image: 'projects/ai-games.jpeg',
    url: 'https://github.com/ankurgokhale05/AI-in-games',
    tech: ['AI', 'Games'],
  },
  {
    title: 'Blockchain Projects',
    description: 'A collection of experiments and projects built on blockchain technology.',
    image: 'projects/Blockchain.jpg',
    url: 'https://github.com/ankurgokhale05/Blockchain-Projects',
    tech: ['Blockchain'],
  },
  {
    title: 'Portfolio Website',
    description: 'This site — built with React, Vite, and Tailwind CSS, deployed on GitHub Pages.',
    image: 'projects/portfolio.jpg',
    url: 'https://github.com/ankurgokhale05/ankurgokhale05.github.io',
    tech: ['React', 'Vite', 'Tailwind CSS'],
  },
];
