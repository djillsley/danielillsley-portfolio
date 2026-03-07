import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Navigate, useLocation } from 'react-router-dom';
import { Mail, Briefcase, Code, Terminal, Award, ChevronDown, ChevronUp, Linkedin, Download, ChartNoAxesCombined, GraduationCap, ShieldCheck, Cpu } from 'lucide-react';
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

const AIProjectCard = ({ title, description, tags, status }: { title: string, description: string, tags: string[], status: string }) => {
  return (
    <div className="ai-project-card">
      <div className="ai-card-content">
        <div className="ai-card-tag">PROJECT CASE STUDY</div>
        <h3 className="ai-card-title">{title}</h3>
        <p className="ai-card-description">{description}</p>
        
        <div className="ai-status-bar">
          <div className="status-indicator">
            <span className="status-dot"></span>
            <span className="status-text">STATUS: {status}</span>
          </div>
          <div className="ai-tech-stack">
            {tags.map(tag => (
              <span key={tag} className="tech-tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
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
          <NavLink to="/ai-lab" className={({ isActive }) => isActive ? 'active' : ''}>AI Lab & Projects</NavLink>
          <NavLink to="/data-strategy" className={({ isActive }) => isActive ? 'active' : ''}>Data & Strategy</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact Me</NavLink>
        </nav>
      </header>

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Navigate to="/experience" replace />} />
          <Route path="/experience" element={
            <PageTransition>
              <section>
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

              <section>
                <h2><Briefcase size={24} /> Experience</h2>
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

              <section>
                <h2><Code size={24} /> Technical Arsenal</h2>
                <div className="skills-grid">
                  <div className="skill-category">
                    <h3><Terminal size={16} /> CRM Platforms</h3>
                    <div className="skill-tags">
                      <span className="skill-tag">Salesforce Marketing Cloud (Expert 10+ years)</span>
                      <span className="skill-tag">Braze (Highly proficient)</span>
                      <span className="skill-tag">HubSpot</span>
                      <span className="skill-tag">Klaviyo</span>
                      <span className="skill-tag">Optimove</span>
                      <span className="skill-tag">Pendo</span>
                      <span className="skill-tag">Firebase</span>
                      <span className="skill-tag">Mailchimp</span>
                    </div>
                  </div>
                  <div className="skill-category">
                    <h3><Terminal size={16} /> Data & Analytics</h3>
                    <div className="skill-tags">
                      <span className="skill-tag">SQL</span>
                      <span className="skill-tag">Tableau</span>
                      <span className="skill-tag">Google Analytics</span>
                      <span className="skill-tag">Excel (Expert)</span>
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
                <div className="ai-project-grid">
                  <AIProjectCard 
                    title="Automated Data Categorisation Agent"
                    description="Automated the processing of thousands of unstructured data entries. By leveraging Gemini CLI, I reduced manual data-entry by 90% and established a scalable taxonomy for better analytical hygiene."
                    tags={["Gemini CLI", "AI Agents", "Data Parsing"]}
                    status="COMPLETED"
                  />
                  <AIProjectCard 
                    title="AI-Assisted PostgreSQL App Prototype"
                    description="Spearheaded the rapid development of a full-stack database application. Used AI-assisted tools to architect complex PostgreSQL schemas and generate boilerplate code, accelerating time-to-market."
                    tags={["PostgreSQL", "AI Assisted Development", "Rapid Prototyping"]}
                    status="ACTIVE"
                  />
                  <AIProjectCard 
                    title="Speech-to-JSON Workflow Automation"
                    description="Created a high-impact workflow that converts raw speech files into structured JSON data. This enables immediate integration into downstream CRM and BI systems for automated insights."
                    tags={["Workflow Automation", "Speech-to-Text AI", "JSON"]}
                    status="LIVE"
                  />
                  <AIProjectCard 
                    title="AI-Assisted Photo Organiser"
                    description="Built an autonomous PowerShell tool using Gemini CLI to process large-scale image libraries on a NAS. Extracted EXIF metadata and geocoding to auto-organise files into location hierarchies."
                    tags={["PowerShell", "REST APIs", "Automation"]}
                    status="ACTIVE"
                  />
                </div>
              </section>
            </PageTransition>
          } />
          <Route path="/data-strategy" element={
            <PageTransition>
              <section>
                <h2><ChartNoAxesCombined size={24} /> Data & Strategy</h2>
                <div className="card" style={{ background: 'rgba(38, 38, 38, 0.7)', backdropFilter: 'blur(10px)' }}>
                  <h3>SQL Data Feed Re-engineering</h3>
                  <p style={{color: 'var(--text-muted)', marginBottom: '1rem'}}>
                    Optimised complex data pipelines for enterprise-scale CRM at Just Eat. Reduced reliance on external engineering tickets by 40% through agile SQL adjustments and feed ownership.
                  </p>
                  <div className="skill-tags">
                    <span className="skill-tag">SQL</span>
                    <span className="skill-tag">Data Architecture</span>
                    <span className="skill-tag">Salesforce Marketing Cloud</span>
                  </div>
                </div>
                <div className="card" style={{ background: 'rgba(38, 38, 38, 0.7)', backdropFilter: 'blur(10px)' }}>
                  <h3>Strategic Cohort Analysis</h3>
                  <p style={{color: 'var(--text-muted)', marginBottom: '1rem'}}>
                    Expertise in performing deep-dive cohort analysis to track customer retention and attrition over time. Utilising data-driven insights to identify churn patterns and implement targeted intervention strategies.
                  </p>
                  <div className="project-image" style={{marginTop: '1.5rem', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--card-border)'}}>
                    <RetentionHeatmap />
                  </div>
                  <div className="skill-tags" style={{marginTop: '1rem'}}>
                    <span className="skill-tag">Retention Analysis</span>
                    <span className="skill-tag">Data Visualisation</span>
                    <span className="skill-tag">CRM Strategy</span>
                  </div>
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
