import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api";
import { 
  ServiceDetailHeader, 
  ServiceAbout, 
  ServiceSection, 
  ServiceFaqs, 
  BenefitList, 
  CaseStudyCarousel, 
  type CaseStudy 
} from "@/components/ServiceDetail";
import { CallToAction } from "@/components/CallToAction";

type ServiceDetail = {
  title: string;
  subtitle: string;
  heroImageUrl?: string;
  about?: {
    title: string;
    description: string[];
    ctaText: string;
    imageUrl: string;
  };
  sections?: {
    subtitle?: string;
    title: string;
    items: {
      title: string;
      image?: string;
      description: string;
      list?: string[];
    }[];
  }[];
  benefits?: string[];
  caseStudies?: CaseStudy[];
  faqs?: {
    question: string;
    answer: string;
  }[];
};

const SERVICES_DATA: Record<string, ServiceDetail> = {
  "custom-app-development": {
    title: "Custom App Development Services",
    subtitle: "We develop customized, ready-to-launch clones of the world’s most popular apps, tailored for your market",
    heroImageUrl: "/assets/images/services/tinder-openai-game-inc.webp",
    about: {
      title: "Cifer Trooper – Clone App Development Company",
      description: [
        "At Cifer Trooper, we specialize in mobile app clone development for startups, enterprises, and mid-level businesses. We deliver Uber clone apps, Netflix clone platforms, and Amazon-style marketplaces that help brands launch quickly and scale efficiently.",
        "We combine UI/UX design, branding, and digital marketing to create customizable, secure, and scalable clone apps for industries like ride-hailing, food delivery, OTT streaming, dating, and e-learning."
      ],
      ctaText: "Get a Clone App Quote",
      imageUrl: "/assets/images/services/cross-plateform-blog-1.webp"
    },
    sections: [
      {
        subtitle: "Our Solutions",
        title: "App Categories",
        items: [
          {
            title: "Ride-Hailing & Taxi Apps",
            image: "/assets/images/services/taxi.jpg",
            description: "Build your own Uber-like taxi booking app with real-time GPS tracking, driver earnings dashboard, and multiple payment gateways.",
            list: ["Uber Clone", "Ola Clone", "Lyft Clone", "Bolt Clone"]
          },
          {
            title: "Super App Solutions",
            image: "/assets/images/services/super.jpg",
            description: "Empower entrepreneurs to build multi-service super apps offering ride-hailing, food delivery, and logistics — all in one platform.",
            list: ["Gojek Clone", "Grab Clone", "Rappi Clone"]
          },
          {
            title: "Dating & Social Clones",
            image: "/assets/images/services/dating.jpg",
            description: "Build engaging social media and dating apps. Our Tinder clone comes with swipe features, AI-driven matching, and chat tools.",
            list: ["Tinder Clone", "Bumble Clone", "Instagram Clone"]
          },
          {
            title: "E-Learning Platforms",
            image: "/assets/images/services/ebook.jpg",
            description: "Launch your own e-learning clone app to tap into the digital education space with course marketplaces and live sessions.",
            list: ["Udemy Clone", "Byju's Clone", "Coursera Clone"]
          }
        ]
      }
    ],
    benefits: [
      "Rapid time-to-market (6-10 weeks)",
      "Reduced development costs",
      "Proven, market-tested business models",
      "Full customization for your brand",
      "Ongoing technical support"
    ],
    faqs: [
      {
        question: "What is a clone app?",
        answer: "A clone app is a ready-made solution inspired by top apps like Uber or Amazon, built with unique source code and customized branding."
      },
      {
        question: "How long does it take to launch?",
        answer: "On average, clone apps can be launched in 6–10 weeks, depending on complexity and integrations."
      },
      {
        question: "Do you provide marketing services?",
        answer: "Absolutely. We provide App Store Optimization (ASO), digital marketing, and branding to ensure your app succeeds."
      }
    ]
  },
  "website-development": {
    title: "Website Development Services",
    subtitle: "SEO-friendly, responsive websites for any business.",
    about: {
      title: "Building Digital Growth Platforms, Not Just Websites",
      description: [
        "At Cifer Trooper, we don’t just create websites — we build digital growth platforms. Your website is more than just a presence; it’s a business engine that drives leads, sales, and brand credibility.",
        "We harness the future with AI-driven websites that deliver personalized experiences and smart content automation."
      ],
      ctaText: "Start Your Project",
      imageUrl: "/assets/images/services/cu.jpg"
    },
    sections: [
      {
        title: "Development Solutions",
        items: [
          {
            title: "Corporate & AI-Powered Websites",
            image: "/assets/images/services/cor-web.jpg",
            description: "Professional, scalable, and brand-focused websites for businesses of all sizes. We integrate AI for personalized user journeys."
          },
          {
            title: "CMS & E-Commerce Solutions",
            image: "/assets/images/services/cms.jpg",
            description: "Manage your content with ease using WordPress or Webflow. From single-brand stores to multi-vendor marketplaces."
          }
        ]
      }
    ],
    benefits: [
      "Designed to drive leads and sales",
      "Optimized for speed and SEO",
      "Multilingual and global-ready",
      "AI and automation integration",
      "High ROI performance"
    ],
    faqs: [
      {
        question: "How long does it take to build a website?",
        answer: "Typically 2–8 weeks, depending on features, complexity, and custom integrations."
      },
      {
        question: "Can you build AI-powered websites?",
        answer: "Yes - we integrate AI chatbots, personalization engines, and smart automation into websites."
      }
    ]
  },
  "logo-branding-design": {
    title: "Logo & Branding Design",
    subtitle: "Creative brand identity and logo design services.",
    about: {
      title: "Define Your Brand Identity",
      description: [
        "We help businesses create a strong visual identity that resonates with their audience. Our designs are modern, memorable, and professional.",
        "From logo creation to full brand guidelines, we ensure your brand stands out in the marketplace."
      ],
      ctaText: "Get Your Logo",
      imageUrl: "/assets/images/services/logo-branding.jpg"
    },
    sections: [
      {
        title: "Branding Services",
        items: [
          {
            title: "Logo Design",
            description: "Custom logo designs that represent your brand's core values and vision."
          },
          {
            title: "Brand Guidelines",
            description: "Comprehensive guides covering color palettes, typography, and usage rules."
          }
        ]
      }
    ],
    benefits: [
      "Professional brand image",
      "Consistent visual identity",
      "Increased brand recognition",
      "Tailored to your industry"
    ]
  },
  "ui-ux-design": {
    title: "UI/UX Design Services",
    subtitle: "Modern, user-friendly interfaces for mobile apps and websites.",
    about: {
      title: "Beautiful, Functional Designs",
      description: [
        "At Cifer Trooper, we create beautiful, functional, and user-centered designs for both mobile apps and websites.",
        "Our UI/UX design services focus on blending creativity with usability to ensure high conversion rates."
      ],
      ctaText: "Discuss Design",
      imageUrl: "/assets/images/services/ui.gif"
    },
    sections: [
      {
        title: "Design Process",
        items: [
          {
            title: "Mobile & Web UI Design",
            image: "/assets/images/services/mobile-app.jpg",
            description: "Modern interfaces for Android and iOS apps, as well as responsive website designs."
          },
          {
            title: "Wireframing & Prototyping",
            image: "/assets/images/services/wire.jpg",
            description: "Visual layouts and interactive prototypes to bring your vision to life before development."
          }
        ]
      }
    ],
    benefits: [
      "Higher conversions",
      "Better user retention",
      "Faster development",
      "Stronger brand identity"
    ],
    faqs: [
      {
        question: "What is UI/UX design?",
        answer: "UI (User Interface) design focuses on the look and feel, while UX (User Experience) ensures it is easy and intuitive to use."
      }
    ]
  },
  "online-marketing": {
    title: "Online Marketing Services",
    subtitle: "SEO, social media marketing, and ad campaigns to grow your business.",
    about: {
      title: "Strategic Online Marketing for Business Growth",
      description: [
        "At Cifer Trooper, we specialize in creating data-driven, AI-powered marketing campaigns that connect you with the right audience.",
        "Our online marketing solutions are designed to maximize your ROI through multi-channel expertise."
      ],
      ctaText: "Get Marketing Audit",
      imageUrl: "/assets/images/services/Blog-12.png"
    },
    sections: [
      {
        title: "Marketing Solutions",
        items: [
          {
            title: "SEO & Content Marketing",
            image: "/assets/images/services/seo-opt.jpg",
            description: "Climb search rankings with AI-powered SEO strategies and technical optimization.",
            list: ["Technical SEO", "AI Content", "Backlinks"]
          },
          {
            title: "Social Media & PPC",
            image: "/assets/images/services/social.jpg",
            description: "Drive traffic with Google Ads and social PPC campaigns managed with AI-driven bidding.",
            list: ["Facebook Ads", "Google Ads", "LinkedIn"]
          }
        ]
      }
    ],
    benefits: [
      "Increase brand visibility",
      "Generate qualified leads",
      "Reduce acquisition costs",
      "Build customer loyalty"
    ],
    faqs: [
      {
        question: "How soon can I see results from SEO?",
        answer: "SEO is a long-term strategy; noticeable improvements typically appear in 3–6 months."
      }
    ]
  },
  "ai-automation-chatbot-solutions": {
    title: "AI Automation & Chatbot Solutions",
    subtitle: "Workflow automation, intelligent chatbots, and AI-driven business solutions.",
    about: {
      title: "Harness the Power of AI for Smarter Business",
      description: [
        "We help businesses harness the power of AI automation and intelligent chatbots to work smarter and reduce manual tasks.",
        "From workflow automation to AI-driven website bots, we build solutions that make your business future-ready."
      ],
      ctaText: "Automate Now",
      imageUrl: "/assets/images/services/full-screen-10.webp"
    },
    sections: [
      {
        title: "AI Solutions",
        items: [
          {
            title: "Workflow Automation",
            image: "/assets/images/services/12.jpg",
            description: "Custom workflows using Zapier and n8n to integrate your apps and automate repetitive tasks.",
            list: ["CRM Integration", "Marketing Automation", "E-commerce Flows"]
          },
          {
            title: "Intelligent AI Chatbots",
            image: "/assets/images/services/9.jpg",
            description: "AI chatbots for websites and WhatsApp that capture leads and provide 24/7 support.",
            list: ["WhatsApp Bots", "Lead Capture", "24/7 Support"]
          }
        ]
      }
    ],
    benefits: [
      "Higher efficiency",
      "Reduced support costs",
      "24/7 lead capture",
      "Seamless integrations"
    ],
    faqs: [
      {
        question: "What platforms do you use for automation?",
        answer: "We primarily use Zapier, n8n, and Make to build custom automated workflows."
      }
    ]
  },
  "e-commerce-development": {
    title: "E-Commerce Website Development",
    subtitle: "Launch an online store with payment gateway integration and mobile optimization.",
    heroImageUrl: "/assets/images/services/ecom-1.jpg",
    about: {
      title: "Scale Your Business with E-Commerce",
      description: [
        "We specialize in building scalable, high-converting, and secure e-commerce platforms that help businesses sell smarter.",
        "From startups to enterprises, we design SEO-optimized, AI-powered, and payment-ready solutions."
      ],
      ctaText: "Start Selling",
      imageUrl: "/assets/images/services/ecom-2-1024x709.jpg"
    },
    sections: [
      {
        subtitle: "Our Services",
        title: "E-Commerce Solutions",
        items: [
          {
            title: "Custom Online Stores",
            image: "/assets/images/services/custome.jpg",
            description: "Tailored websites that showcase your brand and drive conversions.",
            list: ["Shopify", "WooCommerce", "Magento"]
          },
          {
            title: "Multi-Vendor Marketplaces",
            image: "/assets/images/services/ecoms.jpg",
            description: "Build platforms like Amazon with vendor dashboards and secure management.",
            list: ["Vendor Portal", "Commission Systems", "Logistics"]
          }
        ]
      }
    ],
    benefits: [
      "Boost sales globally",
      "Frictionless checkout",
      "Higher conversions",
      "Secure and scalable"
    ],
    faqs: [
      {
        question: "Can you build marketplaces?",
        answer: "Yes - we develop multi-vendor marketplaces with vendor dashboards and scalable infrastructure."
      }
    ]
  }
};

export const Route = createFileRoute("/services_/$slug")({
  head: () => ({ meta: [{ name: "description", content: "Service details for CiferTrooper digital solutions." }] }),
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const { slug } = Route.useParams();
  const [data, setData] = useState<ServiceDetail | null>(null);

  useEffect(() => {
    // If we have static data for this slug, use it
    if (SERVICES_DATA[slug]) {
      setData(SERVICES_DATA[slug]);
      return;
    }

    // Otherwise, try to fetch from API (fallback mode)
    apiGet<ServiceDetail>(`/api/services/${slug}`).then(setData).catch(() => {
      // If API fails and no static data, redirect or show error
      console.error("Service not found");
    });
  }, [slug]);

  if (!data) return <div className="py-20 text-center">Loading service details...</div>;

  return (
    <main className="bg-white">
      <ServiceDetailHeader 
        title={data.title} 
        subtitle={data.subtitle} 
        heroImageUrl={data.heroImageUrl} 
      />
      
      {data.about && (
        <ServiceAbout 
          title={data.about.title}
          description={data.about.description}
          ctaText={data.about.ctaText}
          imageUrl={data.about.imageUrl}
        />
      )}

      {data.sections?.map((section, index) => (
        <ServiceSection 
          key={index}
          subtitle={section.subtitle}
          title={section.title}
          items={section.items}
        />
      ))}

      {data.benefits && <BenefitList benefits={data.benefits} />}
      
      {data.caseStudies && <CaseStudyCarousel studies={data.caseStudies} />}
      
      {data.faqs && <ServiceFaqs faqs={data.faqs} />}

      <CallToAction />
    </main>
  );
}
