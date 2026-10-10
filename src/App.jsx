import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Atom,
  BookOpen,
  Brain,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Code2,
  Compass,
  Flame,
  Gift,
  GraduationCap,
  Heart,
  Laptop,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  PhoneCall,
  Play,
  Quote,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Users,
  X,
} from 'lucide-react';
import axios from 'axios';
import EntityWorkspace from './EntityWorkspace.jsx';

const API = import.meta.env.VITE_API_URL || 'https://elevate-intelligence-api.onrender.com/api';
const TEL = '+918169676574';
const TEL2 = '+918286663068';
const MAIL = 'info.elevateintelligence@gmail.com';

/* ------------------------------------------------------------------ *
 *  Content
 * ------------------------------------------------------------------ */

const learningPaths = [
  {
    id: 'science',
    title: 'Science & Mathematics',
    tagline: 'Strong foundations, real confidence.',
    eyebrow: 'SCHOOL PROGRAM · GRADES 1–12',
    badge: 'GRADES 1–12',
    icon: Atom,
    accent: 'blue',
    mode: 'Online + classroom',
    highlights: [
      'Physics, Chemistry, Biology & Mathematics',
      'CBSE, ICSE and State board aligned',
      'Concept-first teaching, no rote learning',
      'Weekly doubt-solving sessions',
    ],
    pills: ['Grades 1–12', 'Small batches', 'Board ready'],
  },
  {
    id: 'programming',
    title: 'Programming Foundations',
    tagline: 'Think like a developer, from zero.',
    eyebrow: 'CODING PROGRAM · BEGINNER TO ADVANCED',
    badge: 'BEGINNER → ADVANCED',
    icon: Code2,
    accent: 'teal',
    mode: 'Guided, hands-on classes',
    highlights: [
      'C, C++, Python and Java programming',
      'Logic building from absolute basics',
      'Mini projects on every module',
      'Practice sets reviewed by mentors',
    ],
    pills: ['4 languages', 'Beginner friendly', 'Project based'],
  },
  {
    id: 'career',
    title: 'Career Technology',
    tagline: 'Industry-ready skills, real portfolio.',
    eyebrow: 'CAREER PROGRAM · PROJECT BASED',
    badge: 'PROJECT BASED',
    icon: Laptop,
    accent: 'orange',
    mode: 'Portfolio + interview ready',
    highlights: [
      'Web development, MERN stack, Full-stack Java & Python',
      'DevOps, AWS and system design',
      'Build a portfolio of real work',
      'Interview and career guidance',
    ],
    pills: ['15+ tracks', 'Industry tools', 'Portfolio'],
  },
];

const languages = [
  {
    title: 'C Programming',
    icon: Code2,
    accent: 'blue',
    topics: ['Syntax & data types', 'Pointers & memory', 'Functions & arrays', 'File handling'],
  },
  {
    title: 'C++ Programming',
    icon: Layers,
    accent: 'teal',
    topics: ['OOP fundamentals', 'Classes & objects', 'STL essentials', 'Problem solving'],
  },
  {
    title: 'Python Programming',
    icon: Brain,
    accent: 'orange',
    topics: ['Core syntax', 'Data structures', 'Functions & modules', 'Mini projects'],
  },
  {
    title: 'Java Programming',
    icon: Laptop,
    accent: 'purple',
    topics: ['Core Java', 'OOP & collections', 'Exception handling', 'Project practice'],
  },
];

const journey = [
  {
    step: '01',
    title: 'Start with a conversation',
    subtitle: 'Free demo',
    icon: MessageCircle,
    desc: 'Tell us what you would like to learn. We will help you find a path that feels right — no pressure.',
  },
  {
    step: '02',
    title: 'Choose your learning path',
    subtitle: 'School · Coding · Career',
    icon: Compass,
    desc: 'Pick Science & Mathematics, Programming Foundations or a Career Technology track.',
  },
  {
    step: '03',
    title: 'Learn concepts, clearly',
    subtitle: 'Concept-first teaching',
    icon: BookOpen,
    desc: 'Small batches and clear explanations so every learner gets room to ask questions.',
  },
  {
    step: '04',
    title: 'Practice with purpose',
    subtitle: 'Guided practice',
    icon: Target,
    desc: 'Assignments and exercises that actually build skill, reviewed by your mentor.',
  },
  {
    step: '05',
    title: 'Build something real',
    subtitle: 'Projects & application',
    icon: Code2,
    desc: 'Turn concepts into working projects — an idea, a plan and a result you can show.',
  },
  {
    step: '06',
    title: 'Track progress, celebrate',
    subtitle: 'Milestones',
    icon: Trophy,
    desc: 'Regular check-ins keep progress visible and make improvement worth celebrating.',
  },
  {
    step: '07',
    title: 'Move forward with confidence',
    subtitle: 'Next step ready',
    icon: TrendingUp,
    desc: 'Leave with stronger fundamentals, real skills and belief in what you can do next.',
  },
];

const features = [
  {
    icon: Users,
    accent: 'blue',
    title: 'Small batches, real attention',
    desc: 'Batches stay small so every learner gets room to ask, explore and grow — not just watch.',
  },
  {
    icon: Heart,
    accent: 'teal',
    title: 'Mentors who show up',
    desc: 'Guided by educators who care about your progress and are ready to go at your pace.',
  },
  {
    icon: Target,
    accent: 'orange',
    title: 'Practice with a purpose',
    desc: 'Every assignment is built to develop real skill instead of just filling pages.',
  },
  {
    icon: Brain,
    accent: 'teal',
    title: 'Concepts made clear',
    desc: 'Understanding over memorising, always. We build roots before we build speed.',
  },
  {
    icon: Rocket,
    accent: 'purple',
    title: 'Online or in person',
    desc: 'Learn from home anywhere, or join us at our Koparkhairane, Navi Mumbai centre.',
  },
  {
    icon: TrendingUp,
    accent: 'blue',
    title: 'Skills that open doors',
    desc: 'From board exams to technology careers — learning that moves you forward.',
  },
];

const valueCards = [
  { title: 'Small batches', text: 'More attention for every learner.', icon: Users },
  { title: 'Concept-first teaching', text: 'Understanding before memorising.', icon: Brain },
  { title: 'Practice with purpose', text: 'Assignments that build real skill.', icon: Target },
  { title: 'Online + classroom', text: 'Learn your way, from anywhere.', icon: Rocket },
  { title: 'Personal mentorship', text: 'Guidance that shows up for you.', icon: Heart },
  { title: 'Progress you can feel', text: 'Milestones worth celebrating.', icon: Trophy },
];

const faqs = [
  {
    q: 'Which grades and subjects do you teach?',
    a: 'We teach Science and Mathematics for Grades 1–12 across CBSE, ICSE and State boards, along with programming and career technology programs.',
  },
  {
    q: 'Are classes online, in person, or both?',
    a: 'Both. You can join online from anywhere, or attend in person at our Koparkhairane, Navi Mumbai centre.',
  },
  {
    q: 'Do you offer programming for beginners?',
    a: 'Yes. Our Programming Foundations program starts from absolute basics in C, C++, Python and Java.',
  },
  {
    q: 'How do I choose the right learning path?',
    a: 'Tell us what you are working towards and our team will help you find the right fit — start with a free demo conversation.',
  },
  {
    q: 'Do you help with career technology skills?',
    a: 'Our Career Technology track covers web development, MERN stack, full-stack Java and Python, DevOps, AWS and system design.',
  },
];

const members = [
  {
    name: 'Pawan Gupta',
    role: 'Co-Founder, Elevate Intelligence',
    image: '/images/team/pawan-gupta.jpeg',
    focus: 'Mathematics & Science mentoring',
    linkedin: null,
  },
  {
    name: 'Suraj Sahani',
    role: 'Software Engineer · EdTech Educator',
    image: '/images/team/suraj-sahani.jpeg',
    focus: 'Programming & career technology',
    linkedin: 'https://www.linkedin.com/in/engineersurajsahani/',
  },
];

/* ------------------------------------------------------------------ *
 *  Hooks & utilities
 * ------------------------------------------------------------------ */

function useScrollReveal() {
  const { pathname } = useLocation();
  useEffect(() => {
    const run = () => {
      const nodes = document.querySelectorAll('.reveal:not(.is-in)');
      if (!('IntersectionObserver' in window)) {
        nodes.forEach((n) => n.classList.add('is-in'));
        return null;
      }
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-in');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
      );
      nodes.forEach((n) => io.observe(n));
      return io;
    };
    const io = run();
    const timer = setTimeout(() => {
      if (io) io.disconnect();
      run();
    }, 500);
    return () => {
      clearTimeout(timer);
      if (io) io.disconnect();
    };
  }, [pathname]);
}

function Counter({ to, suffix = '', prefix = '', duration = 1600 }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let raf,
      start,
      done = false;
    const finish = () => {
      if (!done) {
        done = true;
        setValue(to);
      }
    };
    if (!('IntersectionObserver' in window)) {
      finish();
      return;
    }
    const safety = setTimeout(finish, duration + 900);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const step = (time) => {
          if (done) return;
          if (!start) start = time;
          const progress = Math.min((time - start) / duration, 1);
          setValue(Math.round((1 - Math.pow(1 - progress, 3)) * to));
          if (progress < 1) raf = requestAnimationFrame(step);
          else finish();
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(node);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(safety);
    };
  }, [to, duration]);
  return (
    <span ref={ref}>
      {prefix}
      {value.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}

// Pointer-driven 3D tilt with a moving glare highlight (mirrors ECA's TiltCard).
function TiltCard({ children, className = '', maxTilt = 8, glare = true }) {
  const ref = useRef(null);
  const glareRef = useRef(null);
  const move = (event) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `rotateY(${px * maxTilt}deg) rotateX(${-py * maxTilt}deg)`;
    if (glareRef.current) {
      glareRef.current.style.opacity = '0.4';
      glareRef.current.style.background = `radial-gradient(circle at ${(px + 0.5) * 100}% ${(py + 0.5) * 100}%, rgba(255,255,255,0.85) 0%, transparent 55%)`;
    }
  };
  const leave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'rotateY(0deg) rotateX(0deg)';
    if (glareRef.current) glareRef.current.style.opacity = '0';
  };
  return (
    <div className={`tilt-scene ${className}`}>
      <div ref={ref} className="tilt-card" onMouseMove={move} onMouseLeave={leave}>
        {children}
        {glare && <div ref={glareRef} className="tilt-glare" aria-hidden />}
      </div>
    </div>
  );
}

const delay = (ms) => ({ '--d': `${ms}ms` });

/* ------------------------------------------------------------------ *
 *  Chrome
 * ------------------------------------------------------------------ */

function Brand({ light = false }) {
  return (
    <Link to="/" className={`brand ${light ? 'brand-light' : ''}`} aria-label="Elevate Intelligence — Home">
      <span className="brand-mark">
        <img src="/logo.jpeg" alt="Elevate Intelligence logo" />
      </span>
      <span className="brand-text">
        <b>ELEVATE</b>
        <small>INTELLIGENCE</small>
      </span>
    </Link>
  );
}

function Announce() {
  const [show, setShow] = useState(true);
  if (!show) return null;
  return (
    <div className="ei-announce">
      <div className="ei-announce-track">
        {[0, 1].map((row) => (
          <div className="ei-announce-row" key={row} aria-hidden={row === 1}>
            <span>🎓</span>
            <b>New batches starting soon</b>
            <i>✳</i>
            <span>Book a free demo class</span>
            <i>✳</i>
            <span>Online + classroom, Koparkhairane · Navi Mumbai</span>
            <i>✳</i>
            <span>Science · Mathematics · Programming · Career technology</span>
            <i>✳</i>
          </div>
        ))}
      </div>
      <Link className="ei-announce-cta" to="/contact">
        Book free demo <ArrowRight size={13} />
      </Link>
      <button className="ei-announce-close" onClick={() => setShow(false)} aria-label="Dismiss announcement">
        <X size={14} />
      </button>
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const links = [
    ['Home', '/'],
    ['Courses', '/courses'],
    ['About', '/about'],
    ['Team', '/team'],
    ['Contact', '/contact'],
  ];
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);
  return (
    <>
      <nav className={`ei-nav ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="ei-nav-inner">
          <Brand />
          <div className="ei-nav-pill">
            {links.map(([label, path]) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                className={({ isActive }) => `ei-nav-link ${isActive ? 'active' : ''}`}
              >
                {label}
              </NavLink>
            ))}
          </div>
          <div className="ei-nav-actions">
            <Link to="/contact" className="ei-btn ei-btn-primary ei-btn-sm">
              <Rocket size={13} /> Book free demo
            </Link>
            <a href={`tel:${TEL}`} className="ei-btn ei-btn-soft ei-btn-sm">
              <PhoneCall size={13} /> Call us
            </a>
          </div>
          <div className="ei-nav-mobile">
            <Link to="/contact" className="ei-btn ei-btn-primary ei-btn-sm">
              Book demo
            </Link>
            <button className="ei-burger" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>
      <div className={`ei-drawer-backdrop ${open ? 'open' : ''}`} onClick={() => setOpen(false)} />
      <aside className={`ei-drawer ${open ? 'open' : ''}`}>
        <div className="ei-drawer-head">
          <Brand />
          <button className="ei-burger" onClick={() => setOpen(false)} aria-label="Close menu">
            <X size={16} />
          </button>
        </div>
        <div className="ei-drawer-links">
          {links.map(([label, path]) => (
            <NavLink key={path} to={path} end={path === '/'} onClick={() => setOpen(false)}>
              {label}
            </NavLink>
          ))}
        </div>
        <div className="ei-drawer-foot">
          <Link to="/login" className="ei-btn ei-btn-soft" onClick={() => setOpen(false)}>
            Branch login <ArrowUpRight size={14} />
          </Link>
          <Link to="/contact" className="ei-btn ei-btn-primary" onClick={() => setOpen(false)}>
            Book a free demo <ArrowRight size={14} />
          </Link>
        </div>
      </aside>
    </>
  );
}

function Footer() {
  const explore = [
    ['Our courses', '/courses'],
    ['About us', '/about'],
    ['Our team', '/team'],
    ['Contact', '/contact'],
  ];
  const program = learningPaths.map((p) => [p.title, '/courses']);
  return (
    <footer className="ei-footer">
      <div className="ei-container">
        <div className="ei-connect">
          <span className="ei-connect-ring r1" />
          <span className="ei-connect-ring r2" />
          <h3>Let's connect &amp; collaborate</h3>
          <p>Curious about a course, a batch timing or your child's learning path? Our team is happy to help.</p>
          <div className="ei-connect-links">
            <a href={`tel:${TEL}`}>
              <Phone size={14} /> {TEL.replace('+91', '+91 ')}
            </a>
            <a href={`mailto:${MAIL}`}>
              <Mail size={14} /> Email us
            </a>
            <a href="https://www.linkedin.com/in/engineersurajsahani/" target="_blank" rel="noreferrer">
              <Linkedin size={14} /> LinkedIn
            </a>
            <Link to="/contact">
              <MessageCircle size={14} /> Enquiry form
            </Link>
          </div>
          <div className="ei-connect-meta">
            <span>
              <MapPin size={14} /> Shop No. 421, SS: 03, Sector 01, Koparkhairane, Navi Mumbai - 400709
            </span>
            <span>
              <Clock size={14} /> Monday – Saturday
            </span>
          </div>
        </div>
        <div className="ei-footer-grid">
          <div className="ei-footer-brand">
            <Brand />
            <p>Experience the bliss of knowledge. Learning that moves you forward.</p>
            <div className="ei-socials">
              <a href={`tel:${TEL}`} aria-label="Call us">
                <Phone size={15} />
              </a>
              <a href={`mailto:${MAIL}`} aria-label="Email us">
                <Mail size={15} />
              </a>
              <a
                href="https://www.linkedin.com/in/engineersurajsahani/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin size={15} />
              </a>
            </div>
          </div>
          <div className="ei-footer-col">
            <h4>Explore</h4>
            <ul>
              {explore.map(([label, to]) => (
                <li key={label}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="ei-footer-col">
            <h4>Programs</h4>
            <ul>
              {program.map(([label, to]) => (
                <li key={label}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="ei-footer-col">
            <h4>Reach us</h4>
            <ul>
              <li>
                <a href={`tel:${TEL}`}>+91 81696 76574</a>
              </li>
              <li>
                <a href={`tel:${TEL2}`}>+91 82866 63068</a>
              </li>
              <li>
                <a href={`mailto:${MAIL}`}>{MAIL}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="ei-footer-bottom">
          <span>© {new Date().getFullYear()} Elevate Intelligence. All rights reserved.</span>
          <span>
            Made for curious minds <Sparkles size={14} />
          </span>
        </div>
      </div>
    </footer>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="scroll-progress">
      <span style={{ width: `${progress}%` }} />
    </div>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      className={`back-to-top ${show ? 'show' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      <ChevronUp size={20} />
    </button>
  );
}

/* ------------------------------------------------------------------ *
 *  Sections
 * ------------------------------------------------------------------ */

function SectionHead({ kicker, title, accent, lead, center = true }) {
  return (
    <div className={`ei-head reveal ${center ? 'center' : ''}`}>
      <span className="ei-pill">{kicker}</span>
      <h2>
        {title} {accent && <span className="text-gradient">{accent}</span>}
      </h2>
      {lead && <p>{lead}</p>}
    </div>
  );
}

function Hero() {
  return (
    <section className="ei-hero grid-paper">
      <span className="ei-hero-glow g1" />
      <span className="ei-hero-glow g2" />
      <span className="blob blob-a" />
      <span className="blob blob-b" />
      <div className="ei-container ei-hero-inner">
        <p className="ei-kicker reveal">EXPERIENCE THE BLISS OF KNOWLEDGE</p>
        <h1 className="ei-hero-title reveal" style={delay(80)}>
          <span className="ei-hero-brand">Elevate Intelligence</span>
          Master Science, Maths &amp; <span className="ei-hero-chip">Code</span> With Confidence.
        </h1>
        <p className="ei-hero-lead reveal" style={delay(160)}>
          From school fundamentals to industry-ready technology skills — learn online or in person at our Koparkhairane,
          Navi Mumbai centre, guided by mentors who care about your progress.
        </p>
        <div className="ei-hero-pills reveal" style={delay(220)}>
          {learningPaths.map((path) => (
            <Link key={path.id} to="/courses" className="ei-hero-pill">
              <path.icon size={14} /> {path.title} · {path.pills[0]}
            </Link>
          ))}
        </div>
        <div className="ei-hero-proof reveal" style={delay(280)}>
          <div className="ei-avatars">
            <span>EI</span>
            <span>EI</span>
            <span>EI</span>
            <span>EI</span>
          </div>
          <p>
            <strong>Personal attention.</strong> A learning community that shows up for you.
          </p>
        </div>
        <div className="ei-hero-actions reveal" style={delay(340)}>
          <Link to="/courses" className="ei-btn ei-btn-primary ei-btn-lg">
            Explore our courses <ArrowRight size={16} />
          </Link>
          <Link to="/contact" className="ei-btn ei-btn-outline ei-btn-lg">
            <Play size={13} fill="currentColor" /> Book a free demo
          </Link>
        </div>
        <div className="ei-trust reveal" style={delay(420)}>
          <span>
            <GraduationCap size={15} /> Grades 1–12
          </span>
          <span>
            <ShieldCheck size={15} /> CBSE · ICSE · State
          </span>
          <span>
            <Rocket size={15} /> Online + classroom
          </span>
          <span>
            <Heart size={15} /> Personal mentorship
          </span>
        </div>
      </div>
    </section>
  );
}

function Ticker() {
  const words = ['SCIENCE', 'MATHEMATICS', 'PROGRAMMING', 'CAREER TECHNOLOGY', 'FUTURE READY'];
  return (
    <section className="ei-ticker">
      <div className="ei-ticker-track">
        {[0, 1].map((row) => (
          <div className="ei-ticker-row" key={row} aria-hidden={row === 1}>
            {words.map((word) => (
              <span key={`${row}-${word}`} className="ei-ticker-item">
                {word}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function Bento() {
  const stats = [
    { icon: GraduationCap, value: '1–12', label: 'School grades', tone: 'blue' },
    { icon: Layers, value: '15+', label: 'Learning tracks', tone: 'amber' },
  ];
  return (
    <section className="ei-section grid-paper-soft">
      <div className="ei-container">
        <div className="ei-bento-frame reveal">
          <div className="ei-bento-grid">
            <div className="ei-bento-left">
              <div className="ei-bento-stats">
                {stats.map((stat) => (
                  <div className={`ei-bento-stat ${stat.tone}`} key={stat.label}>
                    <div className="ei-bento-stat-top">
                      <span className="ei-bento-icon">
                        <stat.icon size={18} />
                      </span>
                      <span className="ei-bento-value">{stat.value}</span>
                    </div>
                    <p>{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="ei-bento-unlock">
                <span className="ei-dots" aria-hidden>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <i key={i} />
                  ))}
                </span>
                <div className="ei-bento-unlock-line">
                  <span>UNLOCK</span>
                  <span className="ei-avatars sm">
                    <span>EI</span>
                    <span>EI</span>
                    <span>EI</span>
                  </span>
                  <span>YOUR</span>
                </div>
                <div className="ei-bento-unlock-line">
                  <Link to="/contact" className="ei-round-btn" aria-label="Book a free demo">
                    <ArrowRight size={18} />
                  </Link>
                  <span>NEXT LEVEL OF</span>
                </div>
                <h3 className="text-gradient">LEARNING WITH US.</h3>
              </div>
            </div>
            <div className="ei-bento-right">
              <TiltCard className="full" maxTilt={6}>
                <div className="ei-bento-poster">
                  <span className="ei-bento-ring r1" />
                  <span className="ei-bento-ring r2" />
                  <span className="ei-dots light" aria-hidden>
                    {Array.from({ length: 8 }).map((_, i) => (
                      <i key={i} />
                    ))}
                  </span>
                  <div className="ei-bento-poster-head tilt-pop-sm">
                    <h3>Start learning</h3>
                    <p>A PLACE FOR EVERY AMBITION</p>
                  </div>
                  <div className="ei-bento-poster-logo tilt-pop">
                    <img src="/logo.jpeg" alt="Elevate Intelligence" />
                  </div>
                  <div className="ei-bento-poster-foot tilt-pop-sm">
                    <Link to="/contact" className="ei-btn ei-btn-light">
                      <Rocket size={12} /> Get in touch <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgramCards() {
  return (
    <div className="ei-program-grid">
      {learningPaths.map((path, index) => (
        <TiltCard key={path.id} className="full reveal" maxTilt={7}>
          <article className={`ei-program ${path.accent}`} style={delay(index * 90)}>
            <div className={`ei-program-head ${path.accent}`}>
              <div className="ei-program-head-top">
                <span className="ei-program-icon">
                  <path.icon size={24} />
                </span>
                <span className="ei-program-badge">{path.badge}</span>
              </div>
              <h3>{path.title}</h3>
              <p>{path.tagline}</p>
            </div>
            <div className="ei-program-body">
              <div className="ei-program-meta">
                <div>
                  <span>FORMAT</span>
                  <b>{path.mode}</b>
                </div>
                <div>
                  <span>PROGRAM</span>
                  <b>
                    {path.eyebrow
                      .split(' · ')[0]
                      .replace('SCHOOL PROGRAM', 'School')
                      .replace('CODING PROGRAM', 'Coding')
                      .replace('CAREER PROGRAM', 'Career')}
                  </b>
                </div>
              </div>
              <ul className="ei-check-list">
                {path.highlights.map((item) => (
                  <li key={item}>
                    <Check size={14} /> <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="ei-mini-pills">
                {path.pills.map((pill) => (
                  <span key={pill}>{pill}</span>
                ))}
              </div>
              <div className="ei-program-ctas">
                <Link to="/contact" className="ei-btn ei-btn-primary ei-btn-block">
                  <Rocket size={12} /> Book a free demo
                </Link>
                <Link to="/courses" className="ei-btn ei-btn-soft ei-btn-block">
                  View details &amp; topics
                </Link>
              </div>
            </div>
          </article>
        </TiltCard>
      ))}
    </div>
  );
}

function ProgramsSection() {
  return (
    <section className="ei-section" id="programs">
      <div className="ei-container">
        <SectionHead
          kicker="OUR PROGRAMS"
          title="Three paths, one"
          accent="goal — progress."
          lead="Choose the path that fits where you are today. Every program pairs clear teaching with personal attention."
        />
        <ProgramCards />
        <div className="ei-note-strip reveal">
          <p>
            <span className="hl">Small batches</span> · <span className="hl">Online + classroom</span> ·{' '}
            <span className="hl">Personal mentorship</span> — available across every program.
          </p>
        </div>
      </div>
    </section>
  );
}

function LanguagesSection() {
  return (
    <section className="ei-section alt" id="languages">
      <div className="ei-container">
        <SectionHead
          kicker="PROGRAMMING"
          title="Language courses that build"
          accent="real logic."
          lead="Standalone programming courses in C, C++, Python and Java — focused syllabus, guided practice, beginner friendly."
        />
        <div className="ei-lang-grid">
          {languages.map((lang, index) => (
            <TiltCard key={lang.title} className="full reveal" maxTilt={8}>
              <article className={`ei-lang ${lang.accent}`} style={delay(index * 80)}>
                <span className="ei-lang-icon">
                  <lang.icon size={22} />
                </span>
                <h3>{lang.title}</h3>
                <ul>
                  {lang.topics.map((topic) => (
                    <li key={topic}>
                      <Check size={12} /> {topic}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="ei-btn ei-btn-soft ei-btn-block">
                  Enquire <ArrowRight size={13} />
                </Link>
              </article>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function JourneySection() {
  return (
    <section className="ei-section" id="journey">
      <div className="ei-container">
        <SectionHead
          kicker="YOUR ROADMAP"
          title="The Elevate"
          accent="learning journey."
          lead="A clear, transparent path from your first class to the confidence to take on what's next."
        />
        <div className="ei-journey-grid">
          {journey.map((item, index) => (
            <article
              className={`ei-journey ${item.step === '07' ? 'highlight' : ''} reveal`}
              key={item.step}
              style={delay(index * 70)}
            >
              <div className="ei-journey-top">
                <span className="ei-journey-step">{item.step}</span>
                <span className="ei-journey-icon">
                  <item.icon size={20} />
                </span>
              </div>
              <p className="ei-journey-sub">{item.subtitle}</p>
              <h3>{item.title}</h3>
              <p className="ei-journey-desc">{item.desc}</p>
              <div className="ei-journey-foot">
                <span>Phase {item.step}</span>
                <ArrowRight size={14} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureSection() {
  return (
    <section className="ei-section alt" id="why">
      <div className="ei-container">
        <SectionHead
          kicker="💎 THE ELEVATE ADVANTAGE"
          title="Why families choose"
          accent="Elevate Intelligence."
          lead="A learning environment built to help every student feel capable, supported and ready for what's next."
        />
        <div className="ei-feature-grid">
          {features.map((item, index) => (
            <article className={`ei-feature ${item.accent} reveal`} key={item.title} style={delay(index * 70)}>
              <span className="ei-feature-icon">
                <item.icon size={20} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <div className="ei-feature-foot">
                <Check size={14} /> <span>Elevate standard</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactSection() {
  const cards = [
    {
      tag: 'Small batches',
      icon: Users,
      title: 'More attention for every learner — questions always welcome.',
      accent: 'blue',
    },
    {
      tag: 'Concept-first',
      icon: Brain,
      title: 'Concepts made clear, so progress is built on real understanding.',
      accent: 'teal',
    },
    {
      tag: 'Career ready',
      icon: TrendingUp,
      title: 'Skills and projects that open doors to real opportunities.',
      accent: 'orange',
    },
  ];
  return (
    <section className="ei-section" id="impact">
      <div className="ei-container">
        <SectionHead kicker="IMPACT" title="How learning feels" accent="at Elevate." />
        <div className="ei-impact-grid">
          {cards.map((card, index) => (
            <TiltCard key={card.tag} className="full reveal" maxTilt={7}>
              <article className={`ei-impact ${card.accent}`} style={delay(index * 90)}>
                <span className="ei-impact-ring" />
                <span className="ei-impact-tag">
                  <Flame size={11} /> {card.tag}
                </span>
                <span className="ei-impact-icon">
                  <card.icon size={26} />
                </span>
                <p>{card.title}</p>
              </article>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function MentorsSection({ full = false }) {
  return (
    <section className="ei-section alt" id="mentors">
      <div className="ei-container">
        <SectionHead
          kicker="MENTORSHIP"
          title="Learn with people who"
          accent="care about progress."
          lead="Curious minds grow with the right people beside them. Meet the educators building confidence at Elevate Intelligence."
        />
        <div className={`ei-mentor-grid ${full ? 'full' : ''}`}>
          {members.map((member, index) => (
            <TiltCard key={member.name} className="full reveal" maxTilt={6}>
              <article className={`ei-mentor ${index === 0 ? 'lead' : ''}`}>
                <div className="ei-mentor-photo">
                  <img src={member.image} alt={member.name} loading="lazy" />
                  <span className="ei-mentor-focus">
                    <Gift size={11} /> {member.focus}
                  </span>
                </div>
                <div className="ei-mentor-body">
                  <span className="ei-mentor-role">{member.role}</span>
                  <h3>{member.name}</h3>
                  {member.linkedin && (
                    <a className="ei-btn ei-btn-soft ei-btn-sm" href={member.linkedin} target="_blank" rel="noreferrer">
                      <Linkedin size={13} /> Connect on LinkedIn <ArrowUpRight size={13} />
                    </a>
                  )}
                </div>
              </article>
            </TiltCard>
          ))}
        </div>
        {full && (
          <div className="ei-founder-note reveal">
            <Quote size={22} />
            <blockquote>“True academic excellence begins when fear is replaced by curiosity.”</blockquote>
            <span>Pawan Gupta · Co-Founder, Elevate Intelligence</span>
          </div>
        )}
      </div>
    </section>
  );
}

function ValueMarquee() {
  return (
    <section className="ei-value-section">
      <div className="ei-container">
        <SectionHead kicker="THE EXPERIENCE" title="What learning feels" accent="like here." />
      </div>
      <div className="ei-marquee">
        <div className="ei-marquee-track">
          {[0, 1].map((row) => (
            <div className="ei-marquee-row" key={row} aria-hidden={row === 1}>
              {valueCards.map((card) => (
                <article className="ei-review" key={`${row}-${card.title}`}>
                  <span className="ei-review-icon">
                    <card.icon size={18} />
                  </span>
                  <b>{card.title}</b>
                  <p>{card.text}</p>
                  <span className="ei-review-stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={12} fill="currentColor" />
                    ))}
                  </span>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section className="ei-quote reveal">
      <span className="ei-quote-deco">”</span>
      <Quote className="ei-quote-icon" size={26} />
      <blockquote>
        “The right teacher does not just help you understand a subject. They help you believe you can.”
      </blockquote>
      <span className="ei-quote-by">THE ELEVATE INTELLIGENCE PROMISE</span>
    </section>
  );
}

function FAQ() {
  const [active, setActive] = useState(0);
  return (
    <section className="ei-section" id="faq">
      <div className="ei-container narrow">
        <SectionHead kicker="FAQ" title="Frequently asked" accent="questions." />
        <div className="ei-faq">
          {faqs.map((item, index) => (
            <div
              className={`ei-faq-item ${active === index ? 'open' : ''} reveal`}
              key={item.q}
              style={delay(index * 60)}
            >
              <button onClick={() => setActive(active === index ? -1 : index)} aria-expanded={active === index}>
                <span>{item.q}</span>
                <ChevronDown size={18} />
              </button>
              <div className="ei-faq-answer">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="ei-section" id="cta">
      <div className="ei-container">
        <div className="ei-cta reveal">
          <span className="ei-cta-glow" />
          <h2>Ready to start your learning journey?</h2>
          <p>
            Choose Science &amp; Mathematics, Programming Foundations, or a Career Technology track — with personal
            attention in every class.
          </p>
          <div className="ei-cta-actions">
            <Link to="/courses" className="ei-btn ei-btn-primary ei-btn-lg">
              View the programs <ArrowRight size={15} />
            </Link>
            <Link to="/contact" className="ei-btn ei-btn-soft ei-btn-lg">
              Request a call
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <Announce />
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <Bento />
        <ProgramsSection />
        <LanguagesSection />
        <JourneySection />
        <ImpactSection />
        <FeatureSection />
        <MentorsSection />
        <ValueMarquee />
        <Testimonial />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

/* ------------------------------------------------------------------ *
 *  Sub pages
 * ------------------------------------------------------------------ */

function PageHero({ kicker, title, accent, lead }) {
  return (
    <section className="ei-page-hero grid-paper">
      <span className="ei-hero-glow g1" />
      <span className="blob blob-a" />
      <div className="ei-container">
        <span className="ei-pill reveal">{kicker}</span>
        <h1 className="reveal" style={delay(80)}>
          {title} {accent && <span className="text-gradient">{accent}</span>}
        </h1>
        {lead && (
          <p className="reveal" style={delay(140)}>
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}

function Shell({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

function CoursesPage() {
  return (
    <Shell>
      <PageHero
        kicker="COURSES & PROGRAMS"
        title="A path for every"
        accent="kind of ambition."
        lead="Build strong foundations, explore programming, and grow career skills that open doors — online or in person."
      />
      <ProgramsSection />
      <LanguagesSection />
      <JourneySection />
      <FAQ />
      <FinalCTA />
    </Shell>
  );
}

function AboutPage() {
  return (
    <Shell>
      <PageHero
        kicker="ABOUT ELEVATE"
        title="Knowledge opens"
        accent="every door."
        lead="Elevate Intelligence is a learning community in Koparkhairane, Navi Mumbai, helping students and professionals take the next step with confidence."
      />
      <section className="ei-section">
        <div className="ei-container">
          <div className="ei-story-grid">
            <div className="ei-story text reveal">
              <SectionHead center={false} kicker="WHY WE'RE HERE" title="Make learning feel" accent="possible." />
              <p>
                From a first spark of curiosity to a career-changing skill, the learning journey should feel clear,
                encouraging and personal. That is what we work to create in every class.
              </p>
              <p>
                We keep batches small, explain concepts clearly, and make practice purposeful — so every learner has
                room to ask, explore and grow.
              </p>
              <Link to="/contact" className="ei-btn ei-btn-primary">
                Talk to our team <ArrowRight size={15} />
              </Link>
            </div>
            <TiltCard className="full reveal" maxTilt={6}>
              <div className="ei-story-art">
                <span className="ei-story-ring r1" />
                <span className="ei-story-ring r2" />
                <span className="ei-story-ring r3" />
                <span className="ei-story-stamp">
                  EI<i>✳</i>
                </span>
                <div className="ei-story-card">
                  <span>THE ELEVATE WAY</span>
                  <b>
                    Learning that
                    <br />
                    stays with you.
                  </b>
                  <i />
                </div>
              </div>
            </TiltCard>
          </div>
          <div className="ei-value-grid">
            {[
              ['People before pace', Heart],
              ['Understanding over memorising', Brain],
              ['Progress worth celebrating', Trophy],
              ['Clarity in every class', Compass],
            ].map(([label, Icon], index) => (
              <div className="ei-value reveal" key={label} style={delay(index * 70)}>
                <span>
                  <Icon size={18} />
                </span>
                <b>{label}</b>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ImpactSection />
      <MentorsSection full />
      <FinalCTA />
    </Shell>
  );
}

function TeamPage() {
  return (
    <Shell>
      <PageHero
        kicker="OUR TEAM"
        title="Meet your"
        accent="learning partners."
        lead="Curious minds grow with the right people beside them — the educators building confidence and clarity at Elevate Intelligence."
      />
      <MentorsSection full />
      <FeatureSection />
      <FinalCTA />
    </Shell>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  return (
    <form
      className="ei-form reveal"
      onSubmit={(e) => {
        e.preventDefault();
        const values = new FormData(e.currentTarget);
        const body = [
          `Name: ${values.get('name')}`,
          `Contact: ${values.get('contact')}`,
          `Interested in: ${values.get('interest')}`,
          `Message: ${values.get('message') || 'Not provided'}`,
        ].join('\n');
        window.location.href = `mailto:${MAIL}?subject=${encodeURIComponent('Course enquiry')}&body=${encodeURIComponent(body)}`;
        setSent(true);
      }}
    >
      <span className="ei-pill">A QUICK HELLO</span>
      <h3>{sent ? 'Your email app should open' : 'What would you like to learn?'}</h3>
      {sent ? (
        <p className="ei-form-sent">
          Review your enquiry in your email app and send it to our team. You can also call us directly.
        </p>
      ) : (
        <>
          <label>
            Your name
            <input name="name" required placeholder="e.g. Aarav Sharma" />
          </label>
          <label>
            Email or phone
            <input name="contact" required placeholder="How can we reach you?" />
          </label>
          <label>
            I am interested in
            <select name="interest" required defaultValue="">
              <option value="" disabled>
                Choose a learning path
              </option>
              <option>Science &amp; Mathematics</option>
              <option>Programming Foundations</option>
              <option>Career Technology</option>
              <option>Something else</option>
            </select>
          </label>
          <label>
            A little more (optional)
            <textarea name="message" rows="3" placeholder="Tell us what you are looking for..." />
          </label>
          <button className="ei-btn ei-btn-primary ei-btn-block">
            Continue to email <ArrowRight size={15} />
          </button>
        </>
      )}
    </form>
  );
}

function ContactPage() {
  const info = [
    { icon: Phone, label: 'Call us', value: '+91 81696 76574', href: `tel:${TEL}` },
    { icon: PhoneCall, label: 'Alternate', value: '+91 82866 63068', href: `tel:${TEL2}` },
    { icon: Mail, label: 'Email', value: MAIL, href: `mailto:${MAIL}` },
    { icon: MapPin, label: 'Visit us', value: 'Shop No. 421, SS: 03, Sector 01, Koparkhairane, Navi Mumbai - 400709' },
    { icon: Clock, label: 'Hours', value: 'Monday – Saturday' },
  ];
  return (
    <Shell>
      <PageHero
        kicker="LET'S TALK"
        title="Your next step"
        accent="starts here."
        lead="Tell us what you would like to learn. We will help you figure out a path that feels right."
      />
      <section className="ei-section">
        <div className="ei-container">
          <div className="ei-contact-grid">
            <div className="ei-contact-info">
              {info.map((item, index) => (
                <div className="ei-contact-card reveal" key={item.label} style={delay(index * 60)}>
                  <span className="ei-contact-icon">
                    <item.icon size={18} />
                  </span>
                  <div>
                    <span className="ei-contact-label">{item.label}</span>
                    {item.href ? <a href={item.href}>{item.value}</a> : <b>{item.value}</b>}
                  </div>
                </div>
              ))}
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
      <FinalCTA />
    </Shell>
  );
}

/* ------------------------------------------------------------------ *
 *  Auth + portal
 * ------------------------------------------------------------------ */

function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post(`${API}/auth/login`, { identifier, password });
      localStorage.setItem('ei_token', data.token);
      localStorage.setItem('ei_head', JSON.stringify(data.head));
      nav('/portal');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not connect to the branch portal. Please try again.');
    } finally {
      setLoading(false);
    }
  }
  return (
    <Shell>
      <section className="login-layout">
        <div className="login-brand-panel">
          <div className="login-orbit">
            <div />
            <div />
            <img src="/logo.jpeg" alt="Elevate Intelligence" />
          </div>
          <span className="eyebrow">ELEVATE INTELLIGENCE · BRANCH PORTAL</span>
          <h2>
            Every detail,
            <br />
            <em>in good hands.</em>
          </h2>
          <p>Securely manage your branch, students, faculty and day-to-day learning.</p>
        </div>
        <div className="login-form-wrap">
          <div className="login-form-head">
            <span className="course-eyebrow">WELCOME BACK</span>
            <h1>Head login</h1>
            <p>Sign in with your branch or head email/mobile.</p>
          </div>
          <form className="contact-form login-form" onSubmit={submit}>
            <label>
              Branch or head email / mobile
              <input
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Email address or mobile number"
                autoComplete="username"
              />
            </label>
            <label>
              Password
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </label>
            {error && <p className="form-error">{error}</p>}
            <button className="button button-primary" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign in to your branch'} <ArrowRight size={16} />
            </button>
            <small className="login-hint">Access is limited to the head linked to this branch.</small>
          </form>
        </div>
      </section>
    </Shell>
  );
}

function Metric({ label, value, icon, tone }) {
  return (
    <div className="metric-card">
      <span className={`metric-icon ${tone}`}>{icon}</span>
      <span className="metric-label">{label}</span>
      <b>{value}</b>
      <span className="metric-foot">BRANCH TOTAL</span>
    </div>
  );
}

function Portal() {
  const [head] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('ei_head'));
    } catch {
      return null;
    }
  });
  const [tab, setTab] = useState('Overview');
  const [menu, setMenu] = useState(false);
  const [records, setRecords] = useState({});
  const [err, setErr] = useState('');
  const token = localStorage.getItem('ei_token');
  const tabs = ['Overview', 'Students', 'Faculty', 'Courses', 'Fees', 'Attendance', 'Salary Paid'];
  useEffect(() => {
    if (!token) {
      location.href = '/login';
      return;
    }
    axios
      .get(`${API}/portal/summary`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => setRecords(r.data))
      .catch((e) => setErr(e.response?.data?.message || 'API unavailable. Start the backend to load branch data.'));
  }, [token]);
  function logout() {
    localStorage.removeItem('ei_token');
    localStorage.removeItem('ei_head');
    location.href = '/login';
  }
  return (
    <div className="portal">
      <aside className={`portal-side ${menu ? 'portal-side-open' : ''}`}>
        <Brand />
        <div className="branch-label">BRANCH WORKSPACE</div>
        <div className="branch-card">
          <span className="branch-avatar">{head?.name?.slice(0, 1) || 'H'}</span>
          <span>
            <b>{head?.branch?.name || head?.branchName || 'Your branch'}</b>
            <small>{head?.name || 'Branch head'}</small>
          </span>
          <ChevronDown size={15} />
        </div>
        <div className="portal-nav-label">MANAGE</div>
        {tabs.map((t, i) => (
          <button
            key={t}
            className={`portal-nav-item ${tab === t ? 'active' : ''}`}
            onClick={() => {
              setTab(t);
              setMenu(false);
            }}
          >
            <span>{['◫', '◎', '♙', '▱', '↗', '◷', '₹'][i]}</span>
            {t}
            {t === 'Students' && records.studentCount > 0 && <small>{records.studentCount}</small>}
          </button>
        ))}
        <div className="portal-sidebar-bottom">
          <button onClick={logout}>↪ Sign out</button>
          <small>
            Elevate Intelligence
            <br />
            Branch management
          </small>
        </div>
      </aside>
      <main className="portal-main">
        <header className="portal-header">
          <button className="menu-btn portal-menu-btn" onClick={() => setMenu(!menu)} aria-label="Toggle sidebar">
            <Menu />
          </button>
          <div>
            <span>
              Branch portal <span className="crumb">/</span> {tab}
            </span>
            <h1>
              {tab === 'Overview' ? 'Good to see you' : tab} <em>{head?.name?.split(' ')[0] || ''}</em>
            </h1>
          </div>
          <button className="head-profile">
            <span>{head?.name?.slice(0, 1) || 'H'}</span>
            {head?.name || 'Branch head'}
            <ChevronDown size={14} />
          </button>
        </header>
        {err && <div className="api-notice">{err}</div>}
        {tab === 'Overview' ? (
          <>
            <div className="portal-welcome">
              <div>
                <span className="eyebrow">YOUR BRANCH AT A GLANCE</span>
                <h2>
                  Make today <em>count.</em>
                </h2>
                <p>Here is what is happening at {head?.branch?.name || head?.branchName || 'your branch'}.</p>
              </div>
              <span className="today-date">
                {new Intl.DateTimeFormat('en-IN', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                }).format(new Date())}
              </span>
            </div>
            <div className="metric-grid">
              <Metric label="Total students" value={records.studentCount ?? '—'} icon="◎" tone="blue" />
              <Metric label="Active faculty" value={records.facultyCount ?? '—'} icon="♙" tone="teal" />
              <Metric
                label="Fees collected"
                value={
                  records.feesCollected != null ? `₹${Number(records.feesCollected).toLocaleString('en-IN')}` : '—'
                }
                icon="↗"
                tone="orange"
              />
              <Metric
                label="Attendance today"
                value={records.attendanceToday != null ? `${records.attendanceToday}%` : '—'}
                icon="◷"
                tone="purple"
              />
            </div>
            <div className="portal-panels">
              <div className="portal-panel">
                <div className="panel-heading">
                  <div>
                    <span className="course-eyebrow">KEEP THINGS MOVING</span>
                    <h3>Quick actions</h3>
                  </div>
                </div>
                <div className="quick-actions">
                  <button onClick={() => setTab('Students')}>
                    <span className="qa-icon qa-blue">
                      <Users />
                    </span>
                    <span>
                      <b>Register a student</b>
                      <small>Add a learner to your branch</small>
                    </span>
                    <ArrowUpRight />
                  </button>
                  <button onClick={() => setTab('Fees')}>
                    <span className="qa-icon qa-teal">
                      <span>₹</span>
                    </span>
                    <span>
                      <b>Record a fee payment</b>
                      <small>Keep payment history up to date</small>
                    </span>
                    <ArrowUpRight />
                  </button>
                  <button onClick={() => setTab('Attendance')}>
                    <span className="qa-icon qa-orange">
                      <span>✓</span>
                    </span>
                    <span>
                      <b>Mark attendance</b>
                      <small>Take today's roll call</small>
                    </span>
                    <ArrowUpRight />
                  </button>
                </div>
              </div>
              <div className="portal-panel report-panel">
                <div className="panel-heading">
                  <div>
                    <span className="course-eyebrow">YOUR BRANCH</span>
                    <h3>Learning in focus</h3>
                  </div>
                  <BookOpen />
                </div>
                <div className="report-big">
                  <span className="report-circle">
                    <GraduationCap />
                  </span>
                  <p>
                    Every learner deserves a little more attention.
                    <br />
                    <b>Keep building momentum.</b>
                  </p>
                </div>
                <div className="report-footer">
                  <span>BRANCH STATUS</span>
                  <b>
                    <i /> Active workspace
                  </b>
                </div>
              </div>
            </div>
            <div className="portal-panel activity-panel">
              <div className="panel-heading">
                <div>
                  <span className="course-eyebrow">YOUR DAILY RHYTHM</span>
                  <h3>Branch overview</h3>
                </div>
                <span className="subtle-label">LIVE DATA</span>
              </div>
              <div className="activity-stats">
                <div>
                  <span>ENROLLED STUDENTS</span>
                  <b>{records.studentCount ?? '—'}</b>
                </div>
                <div>
                  <span>FACULTY MEMBERS</span>
                  <b>{records.facultyCount ?? '—'}</b>
                </div>
                <div>
                  <span>COURSES OFFERED</span>
                  <b>{records.courseCount ?? '—'}</b>
                </div>
                <div>
                  <span>PAYMENTS RECORDED</span>
                  <b>{records.feeCount ?? '—'}</b>
                </div>
              </div>
            </div>
          </>
        ) : (
          <EntityWorkspace entity={tab} token={token} head={head} />
        )}
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  App
 * ------------------------------------------------------------------ */

export default function App() {
  useScrollReveal();
  return (
    <>
      <ScrollProgress />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/portal" element={<Portal />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <BackToTop />
    </>
  );
}
