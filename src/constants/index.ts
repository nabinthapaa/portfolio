import {
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  leapfrog,
  dictionary,
  space,
  countries,
  intuji,
  careinfo,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Software Engineer",
    icon: web,
  }
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  }
];

const experiences = [
  {
    title: "Associate Software Engineer",
    company_name: "Intuji",
    icon: intuji,
    iconBg: "rgb(185, 30, 29)",
    date: "Feb 2025 - Present",
    points: [
      "Developing and maintaining web applications using React.js",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Frontend Developer",
    company_name: "Careinfo Solutions",
    icon: careinfo,
    iconBg: "rgb(11, 73, 92)",
    date: "Sep 2024 - Jan 2025",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
    ],
  },
  {
    title: "Software Engineer Fellow",
    company_name: "Leapfrog Technology",
    icon: leapfrog,
    iconBg: "rgb(32, 90, 11)",
    date: "May 2024 - Aug 2024",
    points: [
      "Developed scalable backend with Express.js, implementing RESTful APIs and secure authentication with JWT",
      "Designed PostgreSQL schemas, wrote raw SQL queries, and used Knex.js for database operations and migrations",
      "Learned about MVC patterns and separation of concerns while building a express.js application with socket for making chat applications",
      "Containerized applications using Docker and managed CI/CD workflows using Github Actions",
      "Utilized Git for version control and collaborative development across projects"
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Space Website",
    description:
      "A web platform that shows info about diferent missions and space bodies made with React.js and SCSS.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "css",
        color: "green-text-gradient",
      },
      {
        name: "Javascript",
        color: "pink-text-gradient",
      },
    ],
    image: space,
    source_code_link: "https://github.com/Eragon580101/Space-Tourism",
    website_link: "https://knowspace.netlify.app/",
  },
  {
    name: "Dictionary",
    description:
      "A web-base simple dictionary that allows users to search for the meaning of a word made with React.js and REST API.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
      {
        name: "Typescript",
        color: "blue-text-gradient",
      }
    ],
    image: dictionary,
    source_code_link: "https://github.com/Eragon580101/Dictionary",
    website_link: "https://warm-concha-a80f46.netlify.app/",
  },
  {
    name: "Countries",
    description:
      "A web-base application that allows users to search for countries and get information about them made with React.js and REST API. ",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: countries,
    source_code_link: "https://github.com/Eragon580101/Countries",
    website_link: "https://courageous-dusk-897dd4.netlify.app/"
  },
];

export { services, technologies, experiences, testimonials, projects };
