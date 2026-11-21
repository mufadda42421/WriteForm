// Content model for WriteForm. Copy is original to this educational project.
import { uid } from '../lib/store'

export const WORDMARKS = ['Northwind', 'Hexalab', 'Paper Plane', 'Bluepine Co.', 'Lumen Labs', 'Arcwell', 'Fieldnote', 'Copperline']

export const FEATURES = [
  {
    title: 'One question at a time',
    body: 'A single, focused question per screen with a physical progress bar. Completion rates beat traditional scroll-and-submit forms.',
    tag: '01',
    tint: 'bg-sage-soft border-sage/20',
  },
  {
    title: 'Seven question types',
    body: 'Short text, long text, multiple choice, yes/no, star ratings, numeric fields and validated emails — everything a real intake form needs.',
    tag: '02',
    tint: 'bg-amber/15 border-amber/40',
  },
  {
    title: 'Live preview as you build',
    body: 'The builder renders the respondent experience side-by-side. What you see is exactly what people get.',
    tag: '03',
    tint: 'bg-sky-soft border-sky/20',
  },
  {
    title: 'Share in one click',
    body: 'A link is the entire publishing pipeline — the form travels inside the URL. No deploy, no account, no gatekeeping.',
    tag: '04',
    tint: 'bg-rose-soft border-rose/20',
  },
  {
    title: 'Stays on this device',
    body: 'Forms and responses live in your browser’s local storage. Nothing is transmitted, tracked or profiled — ever.',
    tag: '05',
    tint: 'bg-sage-soft border-sage/20',
  },
  {
    title: 'Take your data with you',
    body: 'Every result set exports to a tidy CSV the moment you need it — open in Numbers, Excel, Sheets or pandas.',
    tag: '06',
    tint: 'bg-amber/15 border-amber/40',
  },
]

export const FAQS = [
  {
    q: 'Is WriteForm really free?',
    a: 'Yes — every feature, forever. WriteForm is an educational, non-commercial project built to demonstrate how conversational form tools work end to end. No plans, no tiers, no trial timers.',
  },
  {
    q: 'Where do my forms and responses go?',
    a: 'Only into this browser’s local storage. Forms you build and responses you collect never touch a server. Clear your browser data and they’re gone — which is also the strongest privacy guarantee we can make.',
  },
  {
    q: 'How does sharing work without a backend?',
    a: 'The share link encodes the complete form definition in the URL itself. When someone opens it, WriteForm rebuilds the form locally in their browser. Responses they submit are stored on the device that collects them, and you can export that browser’s results to CSV any time.',
  },
  {
    q: 'How do responses from other people reach me?',
    a: 'No server means a respondent’s browser can’t write into yours. Instead, when someone finishes your form they get a short response code with one-tap “Email it” (addressed to you if you set “Send responses to” in the builder), copy, or a .json download. Paste that code — or open the file — under Results → Import and the answer lands in your table, ready for CSV.',
  },
  {
    q: 'Can I embed a form on my website?',
    a: 'Yes. Every share sheet includes a ready-made iframe snippet you can paste into any page. The embedded form runs the same local-first flow.',
  },
  {
    q: 'Is this the same company as Typeform?',
    a: 'No. WriteForm is an independent educational re-implementation of the conversational-form idea. It is not affiliated with, endorsed by, or connected to Typeform S.L. in any way.',
  },
]

export const TESTIMONIALS = [
  {
    quote: 'We swapped our 22-field contact form for a WriteForm sequence and the leads just… arrived. Completion went from 18% to 61% in a fortnight.',
    name: 'Maya Okonkwo',
    role: 'Head of Growth, Bluepine Co.',
    tint: 'from-amber to-coral',
  },
  {
    quote: 'The local-first model sold me. Research responses never leave the studio laptop, and I still get a clean CSV at the end of the week.',
    name: 'Jonas Pereira',
    role: 'UX Researcher, Hexalab',
    tint: 'from-sage to-ink-3',
  },
  {
    quote: 'Built our event RSVP in four minutes, pasted the link in our newsletter, and watched the headcount fill itself in.',
    name: 'Priya Raman',
    role: 'Events Lead, Lumen Labs',
    tint: 'from-sky to-ink-3',
  },
]

const q = (type, label, required = true, options = []) => ({ id: uid(), type, label, required, options })

export const TEMPLATES = [
  {
    key: 'feedback',
    name: 'Customer feedback',
    blurb: 'Post-purchase pulse with a rating and open question.',
    icon: 'MessageSquareHeart',
    tint: 'bg-sage-soft text-sage border-sage/25',
    build: () => [
      q('rating', 'How would you rate your experience?'),
      q('choice', 'What stood out most?', true, ['Product quality', 'Delivery speed', 'Support', 'Price']),
      q('long', 'Anything we could do better?', false),
      q('email', 'Where should we send our thank-you?'),
    ],
  },
  {
    key: 'rsvp',
    name: 'Event RSVP',
    blurb: 'Headcount, dietary notes and a plus-one question.',
    icon: 'CalendarCheck',
    tint: 'bg-amber/15 text-amber-700 border-amber/40',
    build: () => [
      q('yesno', 'Will you be joining us?'),
      q('number', 'How many seats should we reserve (including you)?'),
      q('long', 'Dietary notes or accessibility needs?', false),
    ],
  },
  {
    key: 'job',
    name: 'Job application',
    blurb: 'A humane screening flow for small teams.',
    icon: 'Briefcase',
    tint: 'bg-sky-soft text-sky border-sky/25',
    build: () => [
      q('email', 'Your email address'),
      q('short', 'What role are you applying for?'),
      q('long', 'Tell us about the work you’re proudest of.'),
      q('short', 'Link to your portfolio or résumé'),
      q('yesno', 'Authorized to work on-site?'),
    ],
  },
  {
    key: 'nps',
    name: 'NPS pulse',
    blurb: 'Three questions, under a minute, every quarter.',
    icon: 'Gauge',
    tint: 'bg-rose-soft text-rose border-rose/25',
    build: () => [
      q('short', 'What team are you on?', false),
      q('number', '0–10 — how likely are you to recommend us?'),
      q('long', 'What’s the main reason for your score?', false),
    ],
  },
  {
    key: 'waitlist',
    name: 'Product waitlist',
    blurb: 'Capture interest before you spend a dollar on ads.',
    icon: 'Rocket',
    tint: 'bg-sage-soft text-sage border-sage/25',
    build: () => [
      q('email', 'Your email — where we’ll reach you'),
      q('choice', 'What’s your role?', true, ['Founder', 'Designer', 'Engineer', 'Marketer', 'Other']),
      q('long', 'What problem should we solve for you first?', false),
    ],
  },
  {
    key: 'quiz',
    name: 'Quiz funnel',
    blurb: 'A playful chooser that qualifies leads on autopilot.',
    icon: 'ListChecks',
    tint: 'bg-amber/15 text-amber-700 border-amber/40',
    build: () => [
      q('choice', 'Pick your biggest priority right now', true, ['Save time', 'Look more professional', 'Collect data safely', 'All of the above']),
      q('choice', 'When do you want to launch?', true, ['This week', 'This month', 'This quarter', 'Just exploring']),
      q('email', 'Where should we send your personalized plan?'),
    ],
  },
]
