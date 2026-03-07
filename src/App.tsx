import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Navigate, useLocation } from 'react-router-dom';
import { Mail, Briefcase, Code, Terminal, Award, ChevronDown, ChevronUp, Linkedin, Download, ChartNoAxesCombined, GraduationCap, ShieldCheck, Cpu, Layers, MousePointer2, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DataNodeBackground from './components/DataNodeBackground';

const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

const ImageModal = ({ isOpen, onClose, image, title }: { isOpen: boolean, onClose: () => void, image: string, title: string }) => {
  if (!isOpen) return null;
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal-overlay"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="modal-content"
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3>{title}</h3>
          <button onClick={onClose} className="modal-close"><X size={20} /></button>
        </div>
        <img src={image} alt={title} className="modal-image" />
      </motion.div>
    </motion.div>
  );
};

const DataPipelineViz = () => (
  <div style={{ background: '#171717', padding: '1rem', borderRadius: '12px', border: '1px solid #404040' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.25rem', flexWrap: 'nowrap' }}>
      <div style={{ textAlign: 'center', flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '0.5rem', color: '#a3a3a3', marginBottom: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>RAW SQL</div>
        <div style={{ height: '30px', background: '#333', borderRadius: '4px', border: '1px dashed #555' }}></div>
      </div>
      <div style={{ color: 'var(--accent)', fontSize: '0.75rem' }}>→</div>
      <div style={{ textAlign: 'center', flex: 1.5, minWidth: 0 }}>
        <div style={{ fontSize: '0.5rem', color: 'var(--accent)', marginBottom: '0.5rem', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>OPTIMISED</div>
        <div style={{ height: '40px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '4px', border: '1px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '70%', height: '3px', background: 'var(--accent)', borderRadius: '2px' }}></div>
        </div>
      </div>
      <div style={{ color: 'var(--accent)', fontSize: '0.75rem' }}>→</div>
      <div style={{ textAlign: 'center', flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '0.5rem', color: '#a3a3a3', marginBottom: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>CRM</div>
        <div style={{ height: '30px', background: '#333', borderRadius: '4px', border: '1px dashed #555' }}></div>
      </div>
    </div>
  </div>
);

const ChannelPerformanceViz = () => {
  const channels = [
    { name: 'Email', val: 85, color: '#22c55e' },
    { name: 'WhatsApp', val: 92, color: '#10b981' },
    { name: 'Push', val: 65, color: '#059669' },
    { name: 'SMS', val: 45, color: '#047857' }
  ];
  return (
    <div style={{ background: '#171717', padding: '1rem', borderRadius: '12px', border: '1px solid #404040' }}>
      <div style={{ fontSize: '0.6rem', color: '#a3a3a3', marginBottom: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Channel Performance Index</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {channels.map(c => (
          <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ fontSize: '0.6rem', width: '50px', color: '#f5f5f5', whiteSpace: 'nowrap' }}>{c.name}</div>
            <div style={{ flex: 1, height: '6px', background: '#262626', borderRadius: '4px', overflow: 'hidden' }}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${c.val}%` }}
                style={{ height: '100%', background: c.color }}
              />
            </div>
            <div style={{ fontSize: '0.6rem', color: 'var(--accent)', fontWeight: 'bold', width: '25px', textAlign: 'right' }}>{c.val}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SamplingViz = () => (
  <div style={{ background: '#171717', padding: '1rem', borderRadius: '12px', border: '1px solid #404040', textAlign: 'center' }}>
    <div style={{ fontSize: '0.6rem', color: '#a3a3a3', marginBottom: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Stratified Population Balancing</div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(8px, 1fr))', gap: '3px', marginBottom: '0.75rem' }}>
      {[...Array(24)].map((_, i) => (
        <div key={i} style={{ 
          height: '10px', 
          borderRadius: '1px', 
          background: i % 3 === 0 ? 'var(--accent)' : i % 3 === 1 ? '#3b82f6' : '#6366f1',
          opacity: [2, 5, 11, 15, 18, 21].includes(i) ? 1 : 0.2
        }}></div>
      ))}
    </div>
    <div style={{ fontSize: '0.55rem', color: 'var(--accent)', lineHeight: '1.2' }}>Balanced Sample (Statistically Significant)</div>
  </div>
);

const RFVMatrixViz = () => {
  const segments = [
    { label: 'Champions', color: '#166534' },
    { label: 'Loyal', color: '#15803d' },
    { label: 'At Risk', color: '#991b1b' },
    { label: 'New', color: '#1e40af' }
  ];
  return (
    <div style={{ background: '#171717', padding: '0.75rem', borderRadius: '12px', border: '1px solid #404040' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3px' }}>
        {[...Array(9)].map((_, i) => (
          <div key={i} style={{ 
            height: '25px', 
            borderRadius: '2px', 
            background: i === 0 ? '#166534' : i === 1 ? '#15803d' : i === 8 ? '#991b1b' : '#262626',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.45rem',
            fontWeight: 'bold'
          }}>
            {i === 0 ? 'R5/F5' : i === 8 ? 'R1/F1' : ''}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.6rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        {segments.map(s => (
          <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '1px', background: s.color }}></div>
            <div style={{ fontSize: '0.5rem', color: '#a3a3a3' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProjectCard = ({ title, description, tags, subtitle, image, viz }: { title: string, description: string, tags: string[], subtitle?: string, image?: string, viz?: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        className={`card project-card-clickable ${image ? 'has-preview' : ''}`}
        onClick={() => image && setIsModalOpen(true)}
      >
        <div className="card-header">
          <div className="card-title">
            <h3>{title}</h3>
            {subtitle && <span>{subtitle}</span>}
          </div>
          {image && <MousePointer2 size={16} className="preview-hint" />}
        </div>
        
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          {description}
        </p>

        {viz && <div style={{ marginBottom: '1.5rem' }}>{viz}</div>}

        <div className="skill-tags">
          {tags.map(tag => (
            <span key={tag} className="skill-tag">{tag}</span>
          ))}
        </div>
        {image && <div className="preview-label">Click to preview project</div>}
      </div>

      {image && (
        <AnimatePresence>
          <ImageModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            image={image} 
            title={title} 
          />
        </AnimatePresence>
      )}
    </>
  );
};

const RetentionHeatmap = () => {
  const cohorts = [
    { month: '2025-01', data: [100, 85, 72, 65, 60, 58] },
    { month: '2025-02', data: [100, 82, 68, 61, 55] },
    { month: '2025-03', data: [100, 78, 65, 58] },
    { month: '2025-04', data: [100, 80, 62] },
    { month: '2025-05', data: [100, 84] },
    { month: '2025-06', data: [100] },
  ];

  const getColor = (val: number) => {
    if (val === 100) return '#166534'; // Dark green
    if (val > 80) return '#15803d';
    if (val > 70) return '#16a34a';
    if (val > 60) return '#22c55e';
    if (val > 55) return '#4ade80';
    return '#86efac';
  };

  return (
    <div style={{ background: '#171717', padding: '1.5rem', borderRadius: '12px', border: '1px solid #404040', overflowX: 'auto' }}>
      <div style={{ fontSize: '0.75rem', color: '#a3a3a3', fontWeight: 'bold', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Strategic Cohort Retention Analysis (MoM %)
      </div>
      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '4px' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', fontSize: '0.7rem', color: '#a3a3a3', padding: '4px' }}>COHORT</th>
            {[0, 1, 2, 3, 4, 5].map(m => (
              <th key={m} style={{ fontSize: '0.7rem', color: '#a3a3a3', padding: '4px' }}>M{m}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cohorts.map((row, i) => (
            <tr key={i}>
              <td style={{ fontSize: '0.75rem', color: '#f5f5f5', padding: '4px', whiteSpace: 'nowrap' }}>{row.month}</td>
              {row.data.map((val, j) => (
                <td key={j} style={{
                  background: getColor(val),
                  color: val > 60 ? '#f5f5f5' : '#171717',
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  padding: '8px',
                  borderRadius: '2px',
                  width: '45px'
                }}>
                  {val}%
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const JobCard = ({ title, company, date, bullets }: { title: string, company: string, date: string, bullets: {bold?: string, text: string}[] }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      className="card"
      layout
      transition={{ layout: { duration: 0.3, type: "spring" } }}
    >
      <div className="card-header">
        <div className="card-title">
          <motion.h3 layout="position">{title}</motion.h3>
          <motion.span layout="position">{company}</motion.span>
        </div>
        <motion.div layout="position" className="card-date">{date}</motion.div>
      </div>
      <motion.div 
        layout
        className={`collapsible-content ${isExpanded ? 'expanded' : 'collapsed'}`}
      >
        <ul>
          {bullets.map((bullet, idx) => (
            <motion.li 
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              {bullet.bold && <strong>{bullet.bold}: </strong>}
              {bullet.text}
            </motion.li>
          ))}
        </ul>
      </motion.div>
      <button className="toggle-btn" onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? <><ChevronUp size={16} /> Show Less</> : <><ChevronDown size={16} /> Read Full Details</>}
      </button>
    </motion.div>
  );
};

const ContactForm = () => {
  const jotformContainer = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (jotformContainer.current) {
      jotformContainer.current.innerHTML = '';
      const script = document.createElement('script');
      script.src = "https://form.jotform.com/jsform/260646553132050";
      script.type = "text/javascript";
      script.async = true;
      jotformContainer.current.appendChild(script);
    }
  }, [location]);

  return (
    <PageTransition>
      <section>
        <h2><Mail size={24} /> Get in Touch</h2>
        <p className="subtitle" style={{marginBottom: '2rem'}}>
          Interested in discussing technical strategy, AI automation, or my experience in the CRM space? Use the secure form below.
        </p>
        <div className="card" style={{ padding: '0.5rem', background: 'rgba(38, 38, 38, 0.5)', backdropFilter: 'blur(10px)' }}>
          <div ref={jotformContainer}></div>
        </div>
      </section>
    </PageTransition>
  );
};

function App() {
  const location = useLocation();

  return (
    <div className="app-container">
      <DataNodeBackground />
      <header>
        <motion.h1 
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.8 }}
          className="glow-text"
        >
          Daniel J Illsley
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="subtitle"
        >
          Strategic Technical Leader & CRM Architect
        </motion.p>
        <div className="contact-links" style={{marginBottom: '2rem'}}>
          <a href="https://www.linkedin.com/in/daniel-illsley-9a0a96109/" target="_blank" rel="noopener noreferrer">
            <Linkedin size={18} /> LinkedIn
          </a>
          <a href="https://drive.google.com/file/d/1B_TOkzmmDE1YWRl036QVhHqXWSwyI3cC/view?usp=sharing" target="_blank" rel="noopener noreferrer">
            <Download size={18} /> Download CV
          </a>
        </div>
        <nav className="glass-nav">
          <NavLink to="/experience" className={({ isActive }) => isActive ? 'active' : ''}>Experience</NavLink>
          <NavLink to="/ai-lab" className={({ isActive }) => isActive ? 'active' : ''}>AI Lab</NavLink>
          <NavLink to="/data-lab" className={({ isActive }) => isActive ? 'active' : ''}>Data Lab</NavLink>
          <NavLink to="/strategy" className={({ isActive }) => isActive ? 'active' : ''}>Strategic Frameworks</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact Me</NavLink>
        </nav>
      </header>

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Navigate to="/experience" replace />} />
          <Route path="/experience" element={
            <PageTransition>
              <div className="experience-nav">
                <span className="nav-label">Jump to:</span>
                <a href="#qualifications">Qualifications</a>
                <a href="#professional-experience">Experience</a>
                <a href="#technical-arsenal">Technical Arsenal</a>
              </div>

              <section id="qualifications">
                <h2><Award size={24} /> Qualifications & Certifications</h2>
                <div className="qual-grid">
                  {[
                    { icon: Award, text: "Level 5 CMI Management & Leadership" },
                    { icon: GraduationCap, text: "BSc Business Statistics (UEA)" },
                    { icon: ShieldCheck, text: "Google AI for Professionals" },
                    { icon: ShieldCheck, text: "HubSpot Marketing Hub Certified" },
                    { icon: ShieldCheck, text: "Klaviyo Product Certified" },
                    { icon: Award, text: "Level 2 Certificate in Enterprise" }
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      className="qual-item"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <item.icon size={18} className="icon-green" />
                      <span>{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </section>

              <section id="professional-experience">
                <h2><Briefcase size={24} /> Professional Experience</h2>
                <JobCard 
                  title="CRM Lead (B2B Marketing)"
                  company="Just Eat, London"
                  date="Nov 2021 — Present"
                  bullets={[
                    { bold: "Multi-Channel Innovation", text: "Implemented Just Eat's first WhatsApp channel, diversifying the CRM mix and boosting conversion." },
                    { bold: "Technical Data Architecture", text: "Took ownership and re-engineered the SQL-based data feed into Salesforce Marketing Cloud, enabling agile adjustments and reducing reliance on external engineering tickets." },
                    { bold: "AI & Efficiency", text: "Championed team-wide adoption and upskilling of AI to scale content production, campaign output and operational efficiency without increased headcount. This included the creation of agents to optimise processes, data analysis and copywriting." },
                    { bold: "Operational Scaling", text: "Scaled up CRM operations from a single audience to four (UK/IE partner & courier)." },
                    { bold: "Funnel Optimisation", text: "Integrated near-time data pipelines to onboarding journeys to reduce time through funnel." },
                    { bold: "Strategic Automation", text: "Implementation of multiple automations covering the full lifecycle: highly dynamic welcome and onboarding comms, churn prevention, transactional, milestones, vouchering." },
                    { bold: "Cross-Functional Leadership", text: "Supporting many pillars outside of marketing across the business: sales, account management, legal/compliance, finance, operations and customer service." },
                    { bold: "Performance Recognition", text: "Promoted from Senior Manager to Lead." }
                  ]}
                />
                <JobCard 
                  title="Head of Operations"
                  company="BGO Group, London"
                  date="Aug 2017 — Nov 2021"
                  bullets={[
                    { bold: "Strategic Leadership", text: "Accountable for the strategic leadership of CRM, retention, operations, project management and BI teams to ensure the effective running of casino and bingo brands. Held full P&L ownership of the Bingo business and led high-level decision-making for multi-brand casino operations in a highly regulated industry. Integrated new game and service providers to maximise casino revenues." },
                    { bold: "Strategic Redesign", text: "Launched the bgo Rewards promotional level system, identified a lack in customer engagement and completely redesigned it to see a 15% increase in returning customers." },
                    { bold: "Revenue Growth", text: "Tripled bingo revenue in 14 months on a reduced budget by analysing gameplay, timings and prizes." },
                    { bold: "Systems Integration", text: "Integrated several new systems effectively for CRM, retention and compliance plus nine new game suppliers." },
                    { bold: "Performance Monitoring", text: "Monitored performance metrics to pivot operational strategy, ensuring KPIs were met across all active brands." }
                  ]}
                />
                <JobCard 
                  title="Casino Retention Manager"
                  company="Win Technologies, London"
                  date="Mar 2016 — Jun 2017"
                  bullets={[
                    { bold: "Operational Effectiveness", text: "Directed retention strategy and operational effectiveness for several markets within the main casino brand." },
                    { bold: "Reporting", text: "Reporting and analysing the effectiveness of the casino to further strategise improvements to retention KPIs, such as increasing customer engagement and values, and decreasing customer churn." },
                    { bold: "Budget Management", text: "Managed the casino promotion budget for UK retention campaigns." },
                    { bold: "Direct Mail Optimisation", text: "Optimised direct mail schedules for maximum impact and ROI." }
                  ]}
                />
              </section>

              <section id="technical-arsenal">
                <h2><Code size={24} /> Technical Arsenal</h2>
                <div className="arsenal-container">
                  <div className="arsenal-category">
                    <div className="category-header">
                      <Terminal size={20} className="icon-green" />
                      <h3>CRM & Marketing Platforms</h3>
                    </div>
                    <div className="skill-tags">
                      <span className="skill-tag">Salesforce Marketing Cloud (10+ years)</span>
                      <span className="skill-tag">Braze</span>
                      <span className="skill-tag">HubSpot</span>
                      <span className="skill-tag">Klaviyo</span>
                      <span className="skill-tag">Optimove</span>
                      <span className="skill-tag">Pendo</span>
                      <span className="skill-tag">Firebase</span>
                      <span className="skill-tag">Mailchimp</span>
                    </div>
                  </div>
                  
                  <div className="arsenal-category">
                    <div className="category-header">
                      <ChartNoAxesCombined size={20} className="icon-green" />
                      <h3>Data, Analytics & BI</h3>
                    </div>
                    <div className="skill-tags">
                      <span className="skill-tag">SQL (Data Architecture & Querying)</span>
                      <span className="skill-tag">Tableau</span>
                      <span className="skill-tag">Google Analytics</span>
                      <span className="skill-tag">Advanced Excel / VBA</span>
                      <span className="skill-tag">Business Statistics</span>
                    </div>
                  </div>

                  <div className="arsenal-category">
                    <div className="category-header">
                      <Cpu size={20} className="icon-green" />
                      <h3>AI & Automation</h3>
                    </div>
                    <div className="skill-tags">
                      <span className="skill-tag">AI Agent Orchestration</span>
                      <span className="skill-tag">Prompt Engineering</span>
                      <span className="skill-tag">PowerShell Automation</span>
                      <span className="skill-tag">REST API Integration</span>
                      <span className="skill-tag">Make.com / Workflow Automation</span>
                    </div>
                  </div>
                </div>
              </section>
            </PageTransition>
          } />
          <Route path="/ai-lab" element={
            <PageTransition>
              <section>
                <h2><Cpu size={24} /> AI Lab & Projects</h2>
                <div className="project-grid">
                  <ProjectCard 
                    title="Automated Data Categorisation Agent"
                    subtitle="Automation & Agents"
                    description="Automated the processing of thousands of unstructured data entries. By leveraging Gemini CLI, I reduced manual data-entry by 90% and established a scalable taxonomy for better analytical hygiene."
                    tags={["Gemini CLI", "AI Agents", "Data Parsing"]}
                    image="/assets/Dans_Gemini_CLI_Process.gif"
                  />
                  <ProjectCard 
                    title="AI-Assisted PostgreSQL App Prototype"
                    subtitle="Data Engineering"
                    description="Spearheaded the rapid development of a full-stack database application. Used AI-assisted tools to architect complex PostgreSQL schemas and generate boilerplate code, accelerating time-to-market."
                    tags={["PostgreSQL", "AI Assisted Development", "Rapid Prototyping"]}
                    image="/assets/DansApp.PNG"
                  />
                  <ProjectCard 
                    title="Speech-to-JSON Workflow Automation"
                    subtitle="Workflow Efficiency"
                    description="Created a high-impact workflow that converts raw speech files into structured JSON data. This enables immediate integration into downstream CRM and BI systems for automated insights."
                    tags={["Workflow Automation", "Speech-to-Text AI", "JSON"]}
                    image="/assets/make_com Scenario.PNG"
                  />
                  <ProjectCard 
                    title="AI Website Design & Creation"
                    subtitle="Agentic Development"
                    description="Directed the end-to-end design and build of this professional platform using autonomous AI agents. This case study demonstrates my ability to lead complex technical projects, manage automated deployments (CI/CD), and ensure high-quality, consistent results."
                    tags={["AI Design", "React", "CI/CD", "GitHub"]}
                  />
                </div>
                <div style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(34, 197, 94, 0.05)', borderRadius: '16px', border: '1px solid rgba(34, 197, 94, 0.1)', textAlign: 'center' }}>
                  <p style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '1.25rem', fontWeight: '600' }}>
                    Want to see the AI build log for this website?
                  </p>
                  <a 
                    href="https://github.com/djillsley/danielillsley-portfolio" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="skill-tag"
                    style={{ padding: '0.75rem 1.5rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.75rem', background: 'var(--accent)', color: '#000', fontWeight: '700', border: 'none' }}
                  >
                    <Code size={18} /> View the Build Log on GitHub
                  </a>
                </div>
              </section>
            </PageTransition>
          } />
          <Route path="/data-lab" element={
            <PageTransition>
              <section>
                <h2><ChartNoAxesCombined size={24} /> Data Lab</h2>
                <div className="project-grid">
                  <ProjectCard 
                    title="SQL Data Feed Re-engineering"
                    subtitle="Enterprise Data"
                    description="Optimised complex data pipelines for enterprise-scale CRM at Just Eat. Reduced reliance on external engineering tickets by 40% through agile SQL adjustments and feed ownership."
                    tags={["SQL", "Data Architecture", "Salesforce Marketing Cloud"]}
                    viz={<DataPipelineViz />}
                  />
                  <ProjectCard 
                    title="Multi-Channel CRM Performance Analysis"
                    subtitle="Omnichannel Insights"
                    description="Developing holistic performance frameworks across Email, SMS, Push, In-App, and WhatsApp. Correlating engagement metrics with downstream business value to optimize channel-mix strategy."
                    tags={["Omnichannel", "CRM Analysis", "WhatsApp", "Push Notifications"]}
                    viz={<ChannelPerformanceViz />}
                  />
                  <ProjectCard 
                    title="Stratified Sampling & Statistical Rigor"
                    subtitle="Experimentation Science"
                    description="Implementing stratified sampling techniques to ensure unbiased testing environments. Focus on eliminating selection bias and ensuring statistical significance in complex CRM experiments."
                    tags={["Statistics", "Sampling", "Data Quality"]}
                    viz={<SamplingViz />}
                  />
                  <ProjectCard 
                    title="Advanced Segmentation & RFV Modelling"
                    subtitle="Customer Analytics"
                    description="Architecting sophisticated segmentation models based on Recency, Frequency, and Monetary Value (RFV). Automating lifecycle stage movement to trigger dynamic, high-relevancy communications."
                    tags={["RFV Modelling", "Segmentation", "Lifecycle Stages"]}
                    viz={<RFVMatrixViz />}
                  />
                  <div className="card">
                    <div className="card-header">
                      <div className="card-title">
                        <h3>Strategic Cohort Analysis</h3>
                        <span>Retention Strategy</span>
                      </div>
                    </div>
                    <p style={{color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.6'}}>
                      Expertise in performing deep-dive cohort analysis to track customer retention and attrition over time. Utilising data-driven insights to identify churn patterns and implement targeted intervention strategies.
                    </p>
                    <div className="project-image" style={{borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--card-border)'}}>
                      <RetentionHeatmap />
                    </div>
                    <div className="skill-tags" style={{marginTop: '1.5rem'}}>
                      <span className="skill-tag">Retention Analysis</span>
                      <span className="skill-tag">Data Visualisation</span>
                      <span className="skill-tag">CRM Strategy</span>
                    </div>
                  </div>
                </div>
              </section>
            </PageTransition>
          } />
          <Route path="/strategy" element={
            <PageTransition>
              <section>
                <h2><Layers size={24} /> Strategic Frameworks</h2>
                <div className="project-grid">
                  <ProjectCard 
                    title="LTV-Driven Strategic Planning"
                    subtitle="Customer Value"
                    description="Shifting organizational focus from short-term conversion to long-term Customer Lifetime Value (LTV). Designing frameworks that prioritize high-value acquisition and retention to drive sustainable growth."
                    tags={["LTV", "Growth Strategy", "Financial Modelling"]}
                  />
                  <ProjectCard 
                    title="Retention Engine & Personalization"
                    subtitle="Engagement Strategy"
                    description="Designing 1:1 personalization frameworks that leverage predictive behavioral data to proactively mitigate churn. Focus on high-value user retention through dynamic reward systems and automated re-engagement."
                    tags={["Retention", "Churn Prevention", "Personalization"]}
                  />
                  <ProjectCard 
                    title="Lifecycle Architecture & Automation"
                    subtitle="Operational Efficiency"
                    description="Building end-to-end automated customer journeys from acquisition to advocacy. Streamlining complex multi-channel touchpoints (Email, SMS, WhatsApp, In-App) to create a seamless user experience."
                    tags={["Lifecycle Marketing", "Automation", "CX"]}
                  />
                  <ProjectCard 
                    title="Experimentation & Testing Framework"
                    subtitle="Data-Driven Growth"
                    description="Establishing rigorous A/B/n testing cultures to optimize campaign performance. Utilizing incrementality measurement and significance testing to ensure every strategic move translates to measurable ROI."
                    tags={["A/B Testing", "Incrementality", "ROI"]}
                  />
                  <ProjectCard 
                    title="CRM Infrastructure & Governance"
                    subtitle="Systems Leadership"
                    description="Scaling CRM operations for multi-brand and multi-market organizations. Implementing robust data governance and system integrations that allow for agile strategic pivots without technical debt."
                    tags={["Governance", "Infrastructure", "Scalability"]}
                  />
                </div>
              </section>
            </PageTransition>
          } />
          <Route path="/contact" element={<ContactForm />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default Root;
