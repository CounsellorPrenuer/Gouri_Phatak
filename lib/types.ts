export type Feature = {text: string; included: boolean}
export type Plan = {tier: string; name: string; price: string; features: Feature[]; buttonText: string}
export type Audience = {label: string; leftPlan: Plan; rightPlan: Plan}
export type CustomService = {title: string; price: string; description: string; icon: string; buttonText: string}

export type SiteContent = {
  brandName: string
  tagline: string
  aboutBrand: string
  heroTitle: string
  heroSubtitle: string
  founderName: string
  founderBio: unknown[]
  founderImage: unknown
  services: {title: string; description: string}[]
  testimonials: {quote: string; author: string}[]
  packageAudiences: Audience[]
  customServices: CustomService[]
  phone: string
  email: string
  instagram: string
  linkedin: string
  coreValues?: string[]
  whoShouldContact?: string[]
  sessionDetails?: string
}
