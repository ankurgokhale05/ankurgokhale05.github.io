// All site content lives here. Edit this file to update the portfolio.

export const profile = {
  name: 'Ankur Gokhale',
  title: 'Senior Software Engineer',
  tagline: 'I build backend systems and data platforms that scale, with a deep interest in machine learning and AI.',
  email: 'ankurgokhale05@gmail.com',
  resume: 'resume.pdf', // file in /public; set to '' to hide the résumé
};

export const socials = [
  { name: 'GitHub', icon: 'github', url: 'https://github.com/ankurgokhale05' },
  { name: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/in/ankurajitgokhale/' },
  { name: 'Email', icon: 'mail', url: 'mailto:ankurgokhale05@gmail.com' },
];

export const about = [
  "I'm a software engineer at <b>CVS Health</b>, where I build microservices and data pipelines for an underwriting platform. I enjoy building reliable backend systems and the tooling that keeps them well tested.",
  "Before CVS, I built the Creator Analytics platform as a <b>software development engineer at TikTok</b>, worked on Webex Contact Center as a <b>software engineer at Cisco</b>, and built a web app for small merchants as a <b>software engineering intern at Visa</b>.",
  "I hold a <b>Master's in Computer Science</b> (Data Science track) from the University of Texas at Dallas. Outside of work, I'm an avid reader and a curious polymath. I love to travel, hike, cook, and strength train, and I enjoy personal finance and actively managing my investment portfolio.",
]

// `date` is optional — shown in the left column under the logo.
// `logo` is optional — a file in /public/logos. Without one, the company's initials are shown.
export const experience = [
  {
    date: 'May 2023 — Present',
    title: 'Sr. Software Engineer',
    company: 'CVS Health Inc.',
    location: 'Dallas, TX',
    url: 'https://www.cvshealth.com',
    logo: 'logos/cvs-health.png',
    bullets: [
      'Developed and shipped 10+ features and microservices for EOS, an underwriting tool, using Python and MySQL.',
      'Built data pipelines that move data from the data warehouse into MySQL using Airflow and Azure Data Factory.',
      'Collaborated with PMs, QA, and other developers, and took part in Agile Scrum ceremonies.',
    ],
    tech: ['Python', 'MySQL', 'StarRocks', 'Microsoft Azure', 'Airflow', 'GraphQL'],
  },
  {
    date: 'Oct 2021 — Jan 2023',
    title: 'Software Development Engineer',
    company: 'TikTok Inc.',
    location: 'Mountain View, CA',
    url: 'https://www.tiktok.com',
    logo: 'logos/tiktok.svg',
    bullets: [
      'Implemented the Analytics platform for TikTok Creators on the Creator Growth – Analytics team.',
      'Built backend APIs for real-time metrics such as likes, comments, and shares.',
      'Built backend APIs for aggregated metrics including average watch time, demographics, geolocation, and retention graphs.',
      'Improved the backend tools and infrastructure used for quality analysis.',
      'Wrote test plans and test cases for 20+ features across the Creator Management and Monetization value chain.',
      'Automated multiple backend APIs, raising code coverage from 0% to 40%.',
      'Implemented API, UI, and mobile automation using Pytest, PagePass, and Shoots.',
      'Integrated automation into CI/CD pipelines (ByteCycle) and cut latency to 1600 ms for faster releases and reporting (Tesla).',
      'Migrated test data from the code repository to Nebula, an internal data management tool.',
      'Handled incident management end to end: troubleshooting, escalation, postmortems, and root cause analysis.',
      'Collaborated with cross-functional teams on projects across the Creator value chain.',
    ],
    tech: ['Python', 'Cypress', 'TypeScript', 'JavaScript', 'Pytest', 'CI/CD', 'Git', 'JIRA'],
  },
  {
    date: 'Jul 2021 — Sep 2021',
    title: 'Software Engineer',
    company: 'Cisco Systems Inc.',
    location: 'Herndon, VA',
    url: 'https://www.cisco.com',
    logo: 'logos/cisco.svg',
    bullets: [
      'Worked on the Webex Contact Center Flow Control Design team.',
      'Refactored backend APIs for token authentication and authorization using Scala.',
      'Implemented unit and functional tests using ScalaTest.',
      'Took part in the deployment process and collaborated across teams.',
    ],
    tech: ['Scala', 'Java', 'ScalaTest', 'Jenkins', 'GitLab', 'Postman'],
  },
  {
    date: 'May 2020 — Aug 2020',
    title: 'Sr. Software Engineering Intern',
    company: 'Visa Inc.',
    location: 'Foster City, CA',
    url: 'https://www.visa.com',
    logo: 'logos/visa.svg',
    bullets: [
      "Deployed a web application for small merchants, built in Python, that could grow Visa's merchant user base by 75,000.",
      "Extended Visa's rewards and loyalty programs by implementing a Karma Points mechanism.",
      'Followed Agile Scrum practices, reducing project completion time by 30%.',
      'Designed the front end and back end using HTML5, CSS3, JavaScript (ES6), jQuery, Bootstrap, Django, and SQLite.',
      'Wrote end-to-end and unit tests with Nightwatch.js, reaching 60% unit test coverage.',
    ],
    tech: ['Python', 'Django', 'JavaScript', 'jQuery', 'Bootstrap', 'SQLite', 'Nightwatch.js'],
  },
  {
    date: 'Oct 2017 — Jun 2018',
    title: 'Mobile and Web Developer',
    company: 'Digital Vibes LLC',
    location: 'United Kingdom',
    url: '',
    logo: 'logos/digital-vibes.png',
    bullets: [
      'Front-end developer on Kuendo, a mobile application for residents of condo communities, from development through deployment.',
      'Built cross-platform mobile and web interfaces with React Native, NativeScript, React, AngularJS, and TypeScript.',
      'Managed application state with Redux and wrote automated tests with Selenium.',
      "Evaluated software design patterns and their trade-offs, helping the team choose the right patterns for the project's architecture.",
      'Followed test-driven development and Agile practices, using GitHub, GitLab, and JIRA.',
    ],
    tech: ['React Native', 'NativeScript', 'React', 'AngularJS', 'TypeScript', 'Redux', 'Selenium'],
  },
  {
    date: 'Jun 2017 — Sep 2017',
    title: 'Front End Developer',
    company: 'Aduera Inc.',
    location: 'Mumbai, India',
    url: '',
    logo: 'logos/aduera.jpg',
    bullets: [
      'Built the front end for a peer-to-peer marketplace where students buy and sell books directly, removing the middleman.',
      "Managed the company's social media.",
    ],
    tech: ['HTML', 'CSS', 'Sass', 'Node.js', 'Bootstrap', 'jQuery'],
  },
];

export const education = [
  {
    date: '2019 — 2021',
    school: 'The University of Texas at Dallas',
    degree: 'Master of Science in Computer Science',
    location: 'Dallas, TX',
    url: 'https://www.utdallas.edu',
    logo: 'logos/utd.svg',
    details: ['Specialization in Data Science', 'GPA 3.81 / 4.0'],
    coursework: ['Design & Analysis of Algorithms', 'Machine Learning', 'Database Design', 'Big Data Systems'],
  },
  {
    date: '2015 — 2019',
    school: 'University of Mumbai',
    degree: 'B.E. (Hons.) in Computer Science',
    location: 'Mumbai, India',
    url: 'https://mu.ac.in',
    logo: 'logos/mumbai-university.svg',
    details: ['GPA 8.8 / 10'],
    coursework: [],
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
