export const localBlogs = [
  {
    slug: "civic-tech-beyond-code-civicconnect",
    title: "Civic Tech Beyond Code: Building Around Everyday Problems",
    description: "Reflections on CivicConnect, a crowdsourced civic issue reporting and resolution concept presented at Allenhouse Engineering Day.",
    tags: ["Civic tech", "Product thinking", "Smart cities"],
    dateLabel: "Engineering Day · 2025",
    sourcePost: "https://www.linkedin.com/posts/atul-verma4321_innovation-engineeringday-smartcities-activity-7375183423167975424-WU_l",
  },
  {
    slug: "concept-to-clarity-180-seconds",
    title: "From Concept to Clarity in 180 Seconds: A Lesson in Student Innovation",
    description: "What presenting CivicConnect at an Engineering Day idea sprint taught me about problem framing, teamwork, and concise communication.",
    tags: ["Innovation", "Communication", "Teamwork"],
    dateLabel: "Engineering Day · 2025",
    sourcePost: "https://www.linkedin.com/posts/atul-verma4321_innovation-engineeringday-smartcities-activity-7375183423167975424-WU_l",
  },
  {
    slug: "competitive-programming-lessons-tcs-codevita",
    title: "Competitive Programming Is More Than Speed: Reflections From TCS CodeVita",
    description: "Reflections on using a competitive coding experience to build stronger problem-solving habits.",
    tags: ["TCS CodeVita", "Problem solving", "DSA"],
    dateLabel: "Competitive programming",
    sourcePost: "https://www.linkedin.com/posts/atulatul87_tcs-codevita-coding-activity-7463709239887269888-X-Il",
  },
  {
    slug: "mathematics-logic-foundations-computer-science",
    title: "Why Mathematics and Logic Still Matter in Computer Science",
    description: "Reflections on the SWAMLCS 24 workshop and the role of mathematical reasoning in programming and AI.",
    tags: ["Computer science", "Mathematics", "Logic"],
    dateLabel: "SWAMLCS 24 · 2024",
    sourcePost: "https://www.linkedin.com/posts/atul-verma-102b5b2a9_swamlcs24-allenhouseinstitute-computerscience-activity-7248700382623768576-_tlA",
  },
];

export const getLocalBlog = (slug) => localBlogs.find((blog) => blog.slug === slug);
