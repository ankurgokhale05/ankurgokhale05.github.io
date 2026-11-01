// All site content lives here. Edit this file to update the portfolio.

export const profile = {
  name: 'Ankur Gokhale',
  title: 'Senior Software Engineer',
  tagline: 'I build backend systems and data platforms that scale, with a deep interest in machine learning and AI.',
  email: 'ankurgokhale05@gmail.com',
  resume: 'resume.pdf', // file in /public; set to '' to hide the résumé
  openTo: 'Open to new opportunities', // shown under the tagline and in the footer; set to '' to hide
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
      'Developed and shipped 30+ features and microservices for EOS, an underwriting tool, using Python and MySQL.',
      'Built data pipelines that move data from the data warehouse into MySQL using Airflow and Azure Data Factory.',
      "Migrated the team's entire database from MySQL to StarRocks.",
      'Built and integrated 20+ Airflow DAGs that ingest upstream data lake artifacts into StarRocks staging and input tables.',
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
      'Wrote test plans and test cases for 20+ features across the Creator Management and Monetization value chain.',
      'Automated multiple backend APIs, raising code coverage from 0% to 40%.',
      'Integrated automation into CI/CD pipelines (ByteCycle) and cut latency to 1600 ms for faster releases and reporting (Tesla).',
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
    logo: 'logos/digital-vibes.webp',
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
    logo: 'logos/aduera.webp',
    bullets: [
      'Built the front end for a peer-to-peer marketplace where students buy and sell books directly, removing the middleman.',
      "Managed the company's social media.",
    ],
    tech: ['HTML', 'CSS', 'Sass', 'Node.js', 'Bootstrap', 'jQuery'],
  },
];

// Grouped skills, from the résumé and the tools used in each role.
export const skills = [
  { group: 'Languages', items: ['Python', 'Java', 'Scala', 'JavaScript', 'TypeScript'] },
  { group: 'Data & Cloud', items: ['Microsoft Azure', 'Azure Data Factory', 'Apache Airflow', 'Apache Kafka', 'Apache Hadoop', 'ZooKeeper', 'Elasticsearch', 'Kibana'] },
  { group: 'Databases', items: ['MySQL', 'StarRocks', 'SQLite'] },
  { group: 'Backend & Web', items: ['Django', 'Node.js', 'REST', 'GraphQL', 'React', 'React Native', 'HTML5', 'CSS3', 'Sass', 'jQuery'] },
  { group: 'Testing', items: ['Pytest', 'Cypress', 'Selenium WebDriver', 'Jest', 'JUnit', 'unittest', 'Nightwatch.js', 'Locust', 'JMeter'] },
  { group: 'Tools', items: ['Git', 'Jenkins', 'Postman', 'JIRA', 'Rally'] },
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
    logo: 'logos/mumbai-university.webp',
    details: ['GPA 8.8 / 10'],
    coursework: [],
  },
];

// Newest first. `slides` opens in the on-site viewer; `url` links out to the paper.
export const publications = [
  {
    date: 'Jul 2020',
    title: 'Visa Government Payment Portal (VGPP)',
    type: 'White paper',
    venue: 'Visa Intern Case Challenge · Team STIMULATE',
    award: 'Ranked 2nd of 56 teams',
    description:
      'A mobile and web portal, built on Visa Direct and Plaid APIs, that connects the IRS with citizens to speed up tax refunds and stimulus payments, and moves government-to-consumer (G2C) payments away from paper checks.',
    slides: 'papers/vgpp-slides.pdf',
    tech: ['Visa Direct', 'Visa Token Service', 'Plaid', 'G2C payments'],
  },
  {
    date: 'Oct 2018',
    title: 'Saviour: Disaster Management & Monitoring Utility',
    type: 'Conference paper',
    venue: 'Proceedings of the 2019 Conference on Technologies for Future Cities (CTFC) · Elsevier BV – Machine Learning Journal',
    authors: ['P. Kanade', 'N. Aswal', 'A. Gokhale'],
    url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3276164',
    tech: [],
  },
];

export const projects = [
  {
    title: 'Protein Statistics and Analysis',
    description: 'Statistical analysis and exploration of protein structure data.',
    image: 'projects/protein.webp',
    url: 'https://github.com/ankurgokhale05/ProteinStatistics-and-Analysis',
    tech: ['Python', 'Data Analysis'],
  },
  {
    title: 'Real-Time Chat System',
    description: 'A chat application that delivers messages between users in real time.',
    image: 'projects/chat.webp',
    url: 'https://github.com/ankurgokhale05/chat-system',
    tech: ['Real-time', 'Messaging'],
  },
  {
    title: 'Machine Learning Templates',
    description: 'Ready-to-use code templates for common machine learning algorithms.',
    image: 'projects/ml.webp',
    url: 'https://github.com/ankurgokhale05/Machine-Learning',
    tech: ['Python', 'Machine Learning'],
  },
  {
    title: 'AI in Games',
    description: 'Experiments applying artificial intelligence techniques to games.',
    image: 'projects/ai-games.webp',
    url: 'https://github.com/ankurgokhale05/AI-in-games',
    tech: ['AI', 'Games'],
  },
  {
    title: 'Blockchain Projects',
    description: 'A collection of experiments and projects built on blockchain technology.',
    image: 'projects/blockchain.webp',
    url: 'https://github.com/ankurgokhale05/Blockchain-Projects',
    tech: ['Blockchain'],
  },
  {
    title: 'Portfolio Website',
    description: 'This site — built with React, Vite, and Tailwind CSS, deployed on GitHub Pages.',
    image: 'projects/portfolio.webp',
    url: 'https://github.com/ankurgokhale05/ankurgokhale05.github.io',
    tech: ['React', 'Vite', 'Tailwind CSS'],
  },
];
