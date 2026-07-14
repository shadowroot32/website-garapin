export interface Dictionary {
  nav: {
    home: string;
    about: string;
    services: string;
    portfolio: string;
    pricing: string;
    blog: string;
    contact: string;
    cta: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    cta_primary: string;
    cta_secondary: string;
    stats_clients: string;
    stats_projects: string;
    stats_years: string;
  };
  services: {
    title: string;
    subtitle: string;
    items: {
      [key: string]: {
        title: string;
        desc: string;
      };
    };
  };
  workflow: {
    title: string;
    subtitle: string;
    steps: {
      [key: string]: {
        title: string;
        desc: string;
      };
    };
  };
  portfolio: {
    title: string;
    subtitle: string;
    view_detail: string;
    all: string;
    categories: {
      [key: string]: string;
    };
  };
  pricing: {
    title: string;
    subtitle: string;
    recommended: string;
    starter: PricingTier;
    profesional: PricingTier;
    premium: PricingTier;
    cta: string;
    note: string;
  };
  testimonials: {
    title: string;
    subtitle: string;
  };
  faq: {
    title: string;
    subtitle: string;
    items: Array<{
      q: string;
      a: string;
    }>;
  };
  cta_section: {
    title: string;
    subtitle: string;
    button: string;
  };
  footer: {
    description: string;
    services_title: string;
    quick_links: string;
    contact_title: string;
    contact_wa: string;
    contact_email: string;
    copyright: string;
    made_with: string;
    in_indonesia: string;
  };
  about: {
    title: string;
    subtitle: string;
    story_title: string;
    story: string;
    vision_title: string;
    vision: string;
    mission: string;
    values_title: string;
    values: {
      [key: string]: {
        title: string;
        desc: string;
      };
    };
    founder_title: string;
    founder_name: string;
    founder_role: string;
    founder_desc: string;
  };
  contact: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      name_placeholder: string;
      company: string;
      company_placeholder: string;
      contact: string;
      contact_placeholder: string;
      website_type: string;
      website_type_placeholder: string;
      website_options: {
        [key: string]: string;
      };
      package: string;
      package_placeholder: string;
      package_options: {
        [key: string]: string;
      };
      message: string;
      message_placeholder: string;
      submit: string;
      sending: string;
      success: string;
      error: string;
    };
    info_title: string;
    info_wa: string;
    info_email: string;
    info_response: string;
    info_response_text: string;
  };
  blog: {
    title: string;
    subtitle: string;
    read_more: string;
    categories: {
      [key: string]: string;
    };
    related: string;
    not_found: string;
  };
  not_found: {
    title: string;
    desc: string;
    cta: string;
  };
}

export interface PricingTier {
  name: string;
  price: string;
  desc: string;
  features: {
    pages: string;
    language: string;
    cms: string;
    database: string;
    seo: string;
    revision: string;
    support: string;
  };
}