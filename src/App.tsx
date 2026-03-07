import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Navigate, useLocation } from 'react-router-dom';
import { Mail, Briefcase, Code, Terminal, Award, FileText, ChevronDown, ChevronUp, Linkedin, Download, ChartNoAxesCombined, GraduationCap, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

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
    <div className="card">
      <div className="card-header">
        <div className="card-title">
          <h3>{title}</h3>
          <span>{company}</span>
        </div>
        <div className="card-date">{date}</div>
      </div>
      <div className={`collapsible-content ${isExpanded ? 'expanded' : 'collapsed'}`}>
        <ul>
          {bullets.map((bullet, idx) => (
            <li key={idx}>
              {bullet.bold && <strong>{bullet.bold}: </strong>}
              {bullet.text}
            </li>
          ))}
        </ul>
      </div>
      <button className="toggle-btn" onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? <><ChevronUp size={16} /> Show Less</> : <><ChevronDown size={16} /> Read Full Details</>}
      </button>
    </div>
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
    <section>
      <h2><Mail size={24} /> Get in Touch</h2>
      <p className="subtitle" style={{marginBottom: '2rem'}}>
        Interested in discussing technical strategy, AI automation, or my experience in the CRM space? Use the secure form below.
      </p>
      <div ref={jotformContainer}></div>
    </section>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <header>
          <h1>Daniel J Illsley</h1>
          <p className="subtitle">Strategic Technical Leader & CRM Architect</p>
          <div className="contact-links" style={{marginBottom: '2rem'}}>
            <a href="https://www.linkedin.com/in/daniel-illsley-9a0a96109/" target="_blank" rel="noopener noreferrer">
              <Linkedin size={18} /> LinkedIn
            </a>
            <a href="https://drive.google.com/file/d/1B_TOkzmmDE1YWRl036QVhHqXWSwyI3cC/view?usp=sharing" target="_blank" rel="noopener noreferrer">
              <Download size={18} /> Download CV
            </a>
          </div>
          <nav>
            <NavLink to="/experience" className={({ isActive }) => isActive ? 'active' : ''}>Experience</NavLink>
            <NavLink to="/ai-lab" className={({ isActive }) => isActive ? 'active' : ''}>AI Lab & Projects</NavLink>
            <NavLink to="/data-strategy" className={({ isActive }) => isActive ? 'active' : ''}>Data & Strategy</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact Me</NavLink>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Navigate to="/experience" replace />} />
          <Route path="/experience" element={
            <>
              <section>
                <h2><Award size={24} /> Qualifications & Certifications</h2>
                <div className="qual-grid">
                  <div className="qual-item">
                    <Award size={18} className="icon-green" />
                    <span>Level 5 CMI Management & Leadership</span>
                  </div>
                  <div className="qual-item">
                    <GraduationCap size={18} className="icon-green" />
                    <span>BSc Business Statistics (UEA)</span>
                  </div>
                  <div className="qual-item">
                    <ShieldCheck size={18} className="icon-green" />
                    <span>Google AI for Professionals</span>
                  </div>
                  <div className="qual-item">
                    <ShieldCheck size={18} className="icon-green" />
                    <span>HubSpot Marketing Hub Certified</span>
                  </div>
                  <div className="qual-item">
                    <ShieldCheck size={18} className="icon-green" />
                    <span>Klaviyo Product Certified</span>
                  </div>
                  <div className="qual-item">
                    <Award size={18} className="icon-green" />
                    <span>Level 2 Certificate in Enterprise</span>
                  </div>
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
                <JobCard 
                  title="Retention Team Leader"
                  company="Win Technologies, London"
                  date="Jan 2014 — Mar 2016"
                  bullets={[
                    { bold: "Team Leadership", text: "Led a retention and CRM team operating in different regions across casino and bingo products. Responsible for translating high level strategy into localised execution and monthly KPI reporting." }
                  ]}
                />
                <JobCard 
                  title="Loyalty (Retention) Executive"
                  company="Win Technologies, London"
                  date="Aug 2012 — Jan 2014"
                  bullets={[
                    { bold: "Promotional Design", text: "Creation of promotions and analysing the results. Including back office set up and project management." }
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
            </>
          } />
          <Route path="/ai-lab" element={
            <section>
              <h2><FileText size={24} /> AI Lab & Projects</h2>
              <div className="card">
                <h3>Automated Data Categorisation Agent</h3>
                <p style={{color: 'var(--text-muted)', marginBottom: '1rem'}}>
                  Utilised Gemini CLI to automate the categorisation of unstructured data, significantly reducing manual data-entry hours and improving data hygiene.
                </p>
                <div className="skill-tags">
                  <span className="skill-tag">Gemini CLI</span>
                  <span className="skill-tag">AI Agents</span>
                  <span className="skill-tag">Data Parsing</span>
                </div>
              </div>
              <div className="card">
                <h3>AI-Assisted PostgreSQL App Prototype</h3>
                <p style={{color: 'var(--text-muted)', marginBottom: '1rem'}}>
                  Prototyped a PostgreSQL-based application leveraging AI-assisted development tools to accelerate the database architecture and initial codebase generation.
                </p>
                <div className="skill-tags">
                  <span className="skill-tag">PostgreSQL</span>
                  <span className="skill-tag">AI Assisted Development</span>
                  <span className="skill-tag">Rapid Prototyping</span>
                </div>
              </div>
              <div className="card">
                <h3>Speech-to-JSON Workflow Automation</h3>
                <p style={{color: 'var(--text-muted)', marginBottom: '1rem'}}>
                  Spearheaded AI agent creation and workflow automations, including using AI to parse raw speech into structured JSON objects for automated downstream processing.
                </p>
                <div className="skill-tags">
                  <span className="skill-tag">Workflow Automation</span>
                  <span className="skill-tag">Speech-to-Text AI</span>
                  <span className="skill-tag">JSON</span>
                </div>
              </div>
              <div className="card">
                <h3>AI-Assisted Photo Organiser</h3>
                <p style={{color: 'var(--text-muted)', marginBottom: '1rem'}}>
                  Built an autonomous PowerShell tool using <strong>Gemini CLI</strong> to process thousands of images across a NAS. 
                  Extracted EXIF metadata, performed reverse geocoding via OpenStreetMap API, and auto-organised files into location-based hierarchies.
                </p>
                <div className="skill-tags">
                  <span className="skill-tag">PowerShell</span>
                  <span className="skill-tag">AI Agents</span>
                  <span className="skill-tag">REST APIs</span>
                  <span className="skill-tag">Automation</span>
                </div>
              </div>
            </section>
          } />
          <Route path="/data-strategy" element={
            <section>
              <h2><ChartNoAxesCombined size={24} /> Data & Strategy</h2>
              <div className="card">
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
              <div className="card">
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
          } />
          <Route path="/contact" element={<ContactForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
