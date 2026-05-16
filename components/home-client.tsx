"use client"

import Image from 'next/image'
import {PortableText} from '@portabletext/react'
import {useMemo, useState, useEffect} from 'react'
import {
  Check,
  X,
  FileText,
  Link2,
  BriefcaseBusiness,
  ClipboardList,
  BookOpenText,
  MessagesSquare,
  Globe,
  UserRoundCheck,
} from 'lucide-react'
import {client} from '@/lib/sanity.client'
import {siteContentQuery} from '@/lib/queries'
import {urlFor} from '@/lib/sanity.image'
import type {SiteContent} from '@/lib/types'

const iconMap: Record<string, React.ElementType> = {
  cv: FileText,
  linkedin: Link2,
  strategy: BriefcaseBusiness,
  report: ClipboardList,
  gateway: BookOpenText,
  session: MessagesSquare,
  globe: Globe,
  interview: UserRoundCheck,
}

const brand = {
  navy: '#0D223E',
  green: '#79945B',
  blueDeep: '#637EA9',
  bgSoft: '#F4F7FB',
}

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH || ''

function withBase(path: string) {
  return `${assetBase}${path}`
}

function formatPrice(price: string) {
  const v = (price || '').replace(/₹/g, '').replace(/\?/g, '').trim()
  return v ? `₹ ${v}` : '₹'
}

const fallbackData: SiteContent = {
  brandName: 'Samvaad',
  tagline: 'Meaningful Conversations, Lasting Change',
  aboutBrand: 'Samvaad is a counseling practice by psychologist Ms Gouri Phatak, built on the power of meaningful conversations.',
  heroTitle: 'Counselling That Brings Clarity, Healing, and Growth',
  heroSubtitle: 'Samvaad is a safe and supportive space where you can express yourself freely and move towards emotional well-being.',
  founderName: 'Gouri Phatak',
  founderBio: [],
  founderImage: null,
  services: [
    {title: 'Mental Healing', description: 'Helping individuals heal from stress, anxiety, emotional pain, and life challenges through compassionate counselling.'},
    {title: 'Career Counseling', description: 'Guiding students and professionals to discover the right career path with assessments and personalized guidance.'},
    {title: 'Personal Growth', description: 'Supporting self-awareness, confidence, emotional strength, and life skills for a healthier and calmer mind.'},
  ],
  testimonials: [
    {quote: 'I felt heard without being judged. Gradually, I became more confident and emotionally stable.', author: 'Mr. Santosh Kamble, Akole'},
    {quote: 'I learned how to manage my emotions and look at life more positively. It made a big difference.', author: 'Ms. Farjana Khatun, Kolkata'},
    {quote: 'Career counselling helped me understand my interests and choose my path with confidence.', author: 'Ms. Anushka Sarkar, CBSE 12th Grade'},
  ],
  packageAudiences: [
    {
      label: '8-9 Students',
      leftPlan: {tier: 'Standard', name: 'Discover', price: '5,500', buttonText: 'BUY NOW', features: [{text: 'Psychometric assessment to measure your interests', included: true}, {text: '1 career counselling session', included: true}, {text: 'Lifetime access to Knowledge Gateway', included: true}, {text: 'Invites to live webinars by industry experts', included: true}, {text: 'Customised reports after each session', included: false}]},
      rightPlan: {tier: 'Premium', name: 'Discover plus+', price: '15,000', buttonText: 'BUY NOW', features: [{text: 'Psychometric assessments to measure interests and abilities', included: true}, {text: '8 career counselling sessions', included: true}, {text: 'Lifetime access to Knowledge Gateway', included: true}, {text: 'Invites to live webinars by industry experts', included: true}, {text: 'Customised reports after each session', included: true}]},
    },
    {
      label: '10-12 Students',
      leftPlan: {tier: 'Standard', name: 'Achieve Online', price: '5,999', buttonText: 'BUY NOW', features: [{text: 'Psychometric assessment', included: true}, {text: '1 career counselling session', included: true}, {text: 'Lifetime access to Knowledge Gateway', included: true}]},
      rightPlan: {tier: 'Premium', name: 'Achieve Plus+', price: '10,599', buttonText: 'BUY NOW', features: [{text: 'Psychometric assessment', included: true}, {text: '4 career counselling sessions', included: true}, {text: 'Lifetime access to Knowledge Gateway', included: true}]},
    },
  ],
  customServices: [
    {title: 'CV Building', price: '2000', description: 'Build your CV to stand out from the crowd and increase interview chances.', icon: 'cv', buttonText: 'BUY NOW'},
    {title: 'LinkedIn Profile Building', price: '2000', description: 'Revamp your LinkedIn profile with expert recommendations.', icon: 'linkedin', buttonText: 'BUY NOW'},
    {title: 'Career Report', price: '2500', description: 'Detailed psychometric report for interests, personality and abilities.', icon: 'report', buttonText: 'BUY NOW'},
    {title: 'Interview Prep Session', price: '2000', description: 'Ace upcoming interviews with guidance from top HR experts.', icon: 'interview', buttonText: 'BUY NOW'},
  ],
  phone: '9619249092',
  email: 'therapist.gouri@gmail.com',
  instagram: 'https://www.instagram.com/samvaad90?igsh=NjFhbGYzMHZjenI2',
  linkedin: 'https://www.linkedin.com/in/gouri-phatak-3556a312',
}

export default function HomeClient() {
  const [data, setData] = useState<SiteContent>(fallbackData)
  const [packageMode, setPackageMode] = useState<'mentoria' | 'custom'>('mentoria')
  const [audienceIndex, setAudienceIndex] = useState(0)

  useEffect(() => {
    client.fetch<SiteContent>(siteContentQuery).then((d) => { if (d) setData(d) }).catch(() => {})
  }, [])

  const audiences = data?.packageAudiences ?? []
  const safeAudienceIndex = Math.min(audienceIndex, Math.max(audiences.length - 1, 0))
  const activeAudience = audiences[safeAudienceIndex]

  const planCards = useMemo(() => {
    if (!activeAudience) return []
    return [activeAudience.leftPlan, activeAudience.rightPlan]
  }, [activeAudience])

  return (
    <div className="text-slate-900" style={{background: brand.bgSoft}}>
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Image src={withBase('/logo.png')} alt="Logo" width={40} height={40} className="rounded-full" />
            <span className="font-semibold" style={{color: brand.navy}}>{data?.brandName ?? 'Samvaad'}</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium" style={{color: brand.navy}}>
            <a href="#home">Home</a><a href="#founder">About Founder</a><a href="#services">Services</a><a href="#packages">Packages</a><a href="#contact">Contact Us</a>
          </div>
        </nav>
      </header>

      <main>
        <section id="home" className="mx-auto max-w-6xl px-4 py-16">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.2em]" style={{color: brand.green}}>{data?.tagline}</p>
            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl" style={{color: brand.navy}}>{data?.heroTitle}</h1>
            <p className="mb-6 text-slate-700">{data?.heroSubtitle}</p>
            <p className="text-slate-700">{data?.aboutBrand}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" className="rounded-full px-6 py-3 font-semibold text-white" style={{background: brand.blueDeep}}>Book a Session</a>
              <a href="#packages" className="rounded-full border px-6 py-3 font-semibold" style={{borderColor: brand.blueDeep, color: brand.blueDeep}}>View Plans</a>
            </div>
          </div>
        </section>

        <section id="founder" className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-8 rounded-3xl bg-white p-8 shadow-sm md:grid-cols-[280px_1fr]">
            <Image src={data?.founderImage ? urlFor(data.founderImage).width(280).height(320).url() : withBase('/founder.jpeg')} alt={data?.founderName || 'Founder'} width={280} height={320} className="h-[320px] w-[280px] rounded-2xl object-cover" />
            <div>
              <p className="text-sm uppercase tracking-[0.2em]" style={{color: brand.green}}>About Founder</p>
              <h2 className="mt-2 mb-4 text-3xl font-bold" style={{color: brand.navy}}>{data?.founderName}</h2>
              <div className="prose prose-slate max-w-none">
                {data?.founderBio ? <PortableText value={data.founderBio as any} /> : null}
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="mb-8 text-3xl font-bold" style={{color: brand.navy}}>Services</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {data?.services?.map((service) => (
              <article key={service.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-xl font-semibold" style={{color: brand.blueDeep}}>{service.title}</h3>
                <p className="text-slate-600">{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="packages" className="py-16" style={{background: '#EFF3F9'}}>
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="mb-6 text-3xl font-bold" style={{color: brand.navy}}>Packages</h2>
            <div className="mb-4 grid grid-cols-2 gap-2 rounded-xl border bg-white p-2">
              <button onClick={() => setPackageMode('mentoria')} className="rounded-md py-2 text-sm font-semibold" style={packageMode === 'mentoria' ? {background: brand.blueDeep, color: 'white'} : {color: brand.blueDeep}}>Mentoria&apos;s Plans</button>
              <button onClick={() => setPackageMode('custom')} className="rounded-md py-2 text-sm font-semibold" style={packageMode === 'custom' ? {background: brand.blueDeep, color: 'white'} : {color: brand.blueDeep}}>Customise Your Mentorship Plan</button>
            </div>
            {packageMode === 'mentoria' ? (
              <>
                <div className="mb-8 grid gap-2 md:grid-cols-4">
                  {audiences.map((audience, idx) => (
                    <button key={audience.label} onClick={() => setAudienceIndex(idx)} className="rounded-md border py-3 text-center font-semibold" style={idx === safeAudienceIndex ? {background: brand.blueDeep, borderColor: brand.blueDeep, color: 'white'} : {color: brand.blueDeep}}>{audience.label}</button>
                  ))}
                </div>
                {activeAudience ? (
                  <div className="relative mb-10">
                    <div className="relative grid gap-6 md:grid-cols-2">
                      {planCards.map((plan, idx) => (
                        <article key={plan.name} className="rounded-3xl bg-white p-6 shadow-sm">
                          <p className="text-sm uppercase" style={{color: brand.blueDeep}}>{plan.tier}</p>
                          <h4 className="mt-2 text-4xl font-bold" style={{color: brand.blueDeep}}>{plan.name}</h4>
                          <p className="mt-1 text-4xl font-bold" style={{color: brand.blueDeep}}>{formatPrice(plan.price)}</p>
                          <ul className="mt-4 space-y-2">
                            {plan.features?.map((feature) => (
                              <li key={feature.text} className="flex items-start gap-2 text-slate-600">
                                {feature.included ? <Check className="mt-1 h-4 w-4" style={{color: brand.blueDeep}} /> : <X className="mt-1 h-4 w-4 text-slate-400" />}
                                <span className={!feature.included ? 'line-through opacity-80' : ''}>{feature.text}</span>
                              </li>
                            ))}
                          </ul>
                          <button className="mt-6 rounded-full px-8 py-2 font-semibold text-white" style={{background: idx === 0 ? '#8F8AE8' : '#3F5CD7'}}>{plan.buttonText}</button>
                        </article>
                      ))}
                    </div>
                  </div>
                ) : null}
              </>
            ) : (
              <>
                <h3 className="mt-6 mb-6 text-2xl font-bold" style={{color: brand.navy}}>Customise Your Mentorship Plan</h3>
                <div className="grid gap-5 md:grid-cols-2">
                  {data?.customServices?.map((item) => {
                    const Icon = iconMap[item.icon] || FileText
                    return (
                      <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-4">
                        <div className="mb-3 inline-flex h-16 w-16 items-center justify-center rounded-2xl" style={{background: '#E6EEF8'}}><Icon className="h-8 w-8" style={{color: brand.blueDeep}} /></div>
                        <h4 className="mt-3 text-lg font-bold text-slate-800">{item.title}</h4>
                        <p className="font-semibold" style={{color: brand.blueDeep}}>{formatPrice(item.price)}</p>
                        <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                        <button className="mt-4 rounded px-5 py-2 text-sm font-semibold text-white" style={{background: brand.blueDeep}}>{item.buttonText}</button>
                      </article>
                    )
                  })}
                </div>
              </>
            )}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="mb-8 text-3xl font-bold" style={{color: brand.navy}}>Client Voices</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {data?.testimonials?.map((t) => (
              <blockquote key={t.author} className="rounded-2xl bg-white p-6 shadow-sm"><p className="text-slate-600">“{t.quote}”</p><footer className="mt-4 font-semibold" style={{color: brand.blueDeep}}>- {t.author}</footer></blockquote>
            ))}
          </div>
        </section>

        <section id="contact" className="py-16 text-white" style={{background: brand.navy}}>
          <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold">Contact Us</h2>
              <p className="mt-3 text-slate-300">Let&apos;s start a meaningful conversation.</p>
              <p className="mt-6">Phone / WhatsApp: {data?.phone}</p>
              <p>Email: {data?.email}</p>
              <p className="mt-3"><a href={data?.instagram} target="_blank">Instagram</a> | <a href={data?.linkedin} target="_blank">LinkedIn</a></p>
            </div>
            <form className="grid gap-4 rounded-2xl bg-white p-6 text-slate-900 shadow-xl">
              <input className="rounded-lg border border-slate-300 px-4 py-3" placeholder="Your Name" />
              <input className="rounded-lg border border-slate-300 px-4 py-3" placeholder="Phone" />
              <input className="rounded-lg border border-slate-300 px-4 py-3" placeholder="Email" />
              <textarea className="min-h-28 rounded-lg border border-slate-300 px-4 py-3" placeholder="How can we support you?" />
              <button type="button" className="rounded-lg px-5 py-3 font-semibold text-white" style={{background: brand.blueDeep}}>Send Message</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}
