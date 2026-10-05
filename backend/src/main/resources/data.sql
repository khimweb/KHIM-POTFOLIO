-- Projects
INSERT INTO projects (title, description, technologies, github_url, live_url, image_url, featured, created_at)
VALUES 
('CV Builder Platform (Client Project)', 'Production client application for creating, tailoring, and exporting high-impact professional resumes with real-time preview and modern ATS formatting.', 'React, TypeScript, TailwindCSS, Client Project, Web', 'https://github.com/khimweb', 'https://cv-builder.store/', 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', true, CURRENT_TIMESTAMP),
('Kiro Helpdesk System (Client Project)', 'Comprehensive client ticketing and customer support management solution deployed live with user authentication, ticket triage, and status metrics.', 'React, Node.js, Express, MongoDB, Client Project, Web', 'https://github.com/khimweb', 'https://kiro-helpdesk.onrender.com', 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', true, CURRENT_TIMESTAMP),
('3D Interactive Portfolio', 'Next-gen portfolio with custom Three.js GLSL iridescent fluid shaders, GSAP ScrollTrigger transitions, and Spring Boot REST API.', 'React, Three.js, GSAP, Spring Boot, SQLite, Web', 'https://github.com/khimweb', '#home', 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', true, CURRENT_TIMESTAMP),
('Spring Boot Enterprise Backend', 'Robust RESTful backend service with Spring Data JPA, SQLite, CORS security, and transactional endpoints for client services.', 'Java, Spring Boot, SQLite, REST API, Database', 'https://github.com/khimweb', '#', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', false, CURRENT_TIMESTAMP);

-- Skills (Languages)
INSERT INTO skills (name, category, proficiency, icon_url) VALUES ('Java', 'LANGUAGE', 90, '/icons/java.svg');
INSERT INTO skills (name, category, proficiency, icon_url) VALUES ('Python', 'LANGUAGE', 85, '/icons/python.svg');
INSERT INTO skills (name, category, proficiency, icon_url) VALUES ('JavaScript/TypeScript', 'LANGUAGE', 88, '/icons/js.svg');
INSERT INTO skills (name, category, proficiency, icon_url) VALUES ('C++', 'LANGUAGE', 75, '/icons/cpp.svg');
INSERT INTO skills (name, category, proficiency, icon_url) VALUES ('SQL', 'LANGUAGE', 85, '/icons/sql.svg');

-- Skills (Frameworks)
INSERT INTO skills (name, category, proficiency, icon_url) VALUES ('Spring Boot', 'FRAMEWORK', 88, '/icons/spring.svg');
INSERT INTO skills (name, category, proficiency, icon_url) VALUES ('React', 'FRAMEWORK', 90, '/icons/react.svg');
INSERT INTO skills (name, category, proficiency, icon_url) VALUES ('Node.js', 'FRAMEWORK', 80, '/icons/nodejs.svg');
INSERT INTO skills (name, category, proficiency, icon_url) VALUES ('FastAPI', 'FRAMEWORK', 75, '/icons/fastapi.svg');

-- Skills (Tools)
INSERT INTO skills (name, category, proficiency, icon_url) VALUES ('Git', 'TOOL', 95, '/icons/git.svg');
INSERT INTO skills (name, category, proficiency, icon_url) VALUES ('Docker', 'TOOL', 80, '/icons/docker.svg');
INSERT INTO skills (name, category, proficiency, icon_url) VALUES ('AWS', 'TOOL', 70, '/icons/aws.svg');
INSERT INTO skills (name, category, proficiency, icon_url) VALUES ('Figma', 'TOOL', 75, '/icons/figma.svg');

-- Skills (Databases)
INSERT INTO skills (name, category, proficiency, icon_url) VALUES ('MySQL', 'DATABASE', 85, '/icons/mysql.svg');
INSERT INTO skills (name, category, proficiency, icon_url) VALUES ('PostgreSQL', 'DATABASE', 80, '/icons/postgresql.svg');
INSERT INTO skills (name, category, proficiency, icon_url) VALUES ('MongoDB', 'DATABASE', 75, '/icons/mongodb.svg');
INSERT INTO skills (name, category, proficiency, icon_url) VALUES ('SQLite', 'DATABASE', 85, '/icons/sqlite.svg');

-- Experiences
INSERT INTO experiences (company, position, description, start_date, end_date, current, technologies)
VALUES 
('Tech Innovators Inc.', 'Software Engineering Intern', 'Developed RESTful APIs for internal tools, optimized database queries resulting in 30% faster load times, and collaborated with frontend team to integrate new features.', '2023-05-01 00:00:00.000', '2023-08-15 00:00:00.000', false, 'Java, Spring Boot, MySQL, Git'),
('University IT Services', 'Student Web Developer', 'Maintained and updated university web applications, fixed bugs reported by students, and implemented accessibility improvements.', '2022-09-01 00:00:00.000', '2023-04-30 00:00:00.000', false, 'JavaScript, React, Node.js'),
('Freelance', 'Full Stack Developer', 'Building custom websites and web applications for local businesses and organizations.', '2023-09-01 00:00:00.000', NULL, true, 'React, Spring Boot, PostgreSQL, Docker');
