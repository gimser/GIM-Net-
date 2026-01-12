
import { Language, Product } from './types';

// الحصول على المسار الأساسي من إعدادات Vite تلقائياً
const base = import.meta.env.BASE_URL || '/GIM-Net-/';

export const VIDEO_PATHS = {
  home: {
    ma: `${base}video/intro-ma.mp4`,
    ar: `${base}video/intro-ar.mp4`,
    en: `${base}video/intro-en.mp4`,
    de: `${base}video/intro-de.mp4`,
    fr: `${base}video/intro-fr.mp4`
  },
  networks: {
    hero: `${base}video/net1-intro.mp4`,
    cctv: `${base}video/cctv-intro.mp4`,
    net: `${base}video/net-intro.mp4`
  },
  websites: {
    hero: `${base}video/Intro-genweb.mp4`,
    app: `${base}video/App-G.mp4`,
    web: `${base}video/Web-G.mp4`
  },
  smarthome: {
    hero: `${base}video/haus2.mp4`
  }
};

export const TRANSLATIONS: Record<Language, any> = {
  ma: {
    nav: {
      home: 'الرئيسية',
      store: 'المتجر',
      networks: 'الشبكات والكاميرات',
      websites: 'المواقع والتطبيقات',
      smarthome: 'المنزل الذكي',
      contact: 'تواصل معنا'
    },
    hero: {
      title: 'Electro GIM',
      subtitle: 'Services',
      desc: 'أحسن تجربة تقنية فالمغرب. كنوفروا ليك حلول ذكية لدارك وخدمتك بـ جودة عالمية.',
      cta: 'إبدأ المشروع ديالك'
    },
    booking: {
      title: 'للحجز والاستفسارات',
      submit: 'سجل معانا دابا',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      phone: 'رقم الجوال',
      service: 'نوع الخدمة',
      address: 'العنوان',
      desc: 'وصف الطلب بالتفصيل'
    },
    services: {
      networks: {
        title: 'خدمات كاميرات المراقبة والشبكات المتقدمة',
        desc: 'نقدم حلول مراقبة ذكية بجودة عالية تضمن لك رؤية واضحة ودقيقة على مدار الساعة، مما يمنحك راحة البال التامة. تصميم وتركيب أنظمة اتصال مستقرة وسريعة.',
        features: [
          { title: 'كاميرات 4K AI', detail: 'رؤية ليلية فائقة الدقة مع خاصية التعرف على الوجوه وتتبع الحركة.' },
          { title: 'بنية Fiber Optic', detail: 'تركيب شبكات الألياف البصرية لضمان أقصى سرعة واستقرار للإنترنت.' },
          { title: 'الأمن السيبراني', detail: 'حماية الشبكات من الاختراق وتأمين البيانات الحساسة بجدران نارية متطورة.' },
          { title: 'مراقبة عن بعد', detail: 'إمكانية الوصول المباشر للبث الحي عبر هاتفك الذكي من أي مكان في العالم.' }
        ]
      },
      websites: {
        title: 'تطوير المواقع والتطبيقات الذكية',
        desc: 'حلول متكاملة لتطوير التطبيقات والمواقع التي تلبي احتياجات العملاء بدقة، مع التركيز على الأداء العالي والتكامل السلس مع الأنظمة المختلفة.',
        features: [
          { title: 'تكامل Gemini AI', detail: 'دمج تقنيات الذكاء الاصطناعي لتقديم تجربة مستخدم ذكية وتفاعلية.' },
          { title: 'تطبيقات Mobile', detail: 'برمجة تطبيقات أندرويد و iOS بواجهات سهلة الاستخدام وتجربة متكاملة.' },
          { title: 'تحسين SEO', detail: 'تصميم متوافق مع محركات البحث لضمان وصول أوسع لجمهورك المستهدف.' },
          { title: 'دفع إلكتروني', detail: 'دمج أنظمة الدفع العالمية والمحلية بأمان تام وسهولة في التعامل.' }
        ]
      },
      smarthome: {
        title: 'المنزل الذكي والأتمتة الكاملة',
        desc: 'نظام متكامل يمنحك التحكم الكامل في الأجهزة المنزلية مثل الإضاءة والتدفئة والأمان عن بُعد باستخدام الهاتف أو الأوامر الصوتية.',
        features: [
          { title: 'أتمتة الإضاءة', detail: 'تحكم ذكي في شدة الضوء والألوان بناءً على الوقت أو الحالة المزاجية.' },
          { title: 'أقفال بيومترية', detail: 'تأمين المداخل بالبصمة، الكود، أو التعرف على الوجه لراحة وأمان أكثر.' },
          { title: 'توفير الطاقة', detail: 'إدارة ذكية للاستهلاك الكهربائي لتقليل التكاليف وحماية البيئة.' },
          { title: 'أوامر صوتية', detail: 'ربط المنزل مع Alexa و Google Home للتحكم الصوتي الكامل في كل المرافق.' }
        ]
      }
    },
    store: {
      title: 'GIM SHOP',
      search: 'قلب على الأجهزة...',
      addToCart: 'أضف للسلة',
      checkout: 'إتمام الطلب',
      total: 'المجموع',
      wishlist: 'أمنياتي',
      emptyWishlist: 'قائمة الأمنيات خاوية',
      moveToCart: 'نقل للسلة'
    }
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      store: 'المتجر',
      networks: 'الشبكات والكاميرات',
      websites: 'تطوير المواقع',
      smarthome: 'المنزل الذكي',
      contact: 'اتصل بنا'
    },
    hero: {
      title: 'إلكترو جيم',
      subtitle: 'للخدمات التقنية',
      desc: 'نحن نقود التحول الرقمي في المغرب من خلال أنظمة ذكية وبنية تحتية متطورة.',
      cta: 'ابدأ مشروعك الآن'
    },
    services: {
      networks: {
        title: 'أنظمة المراقبة والشبكات المتقدمة',
        desc: 'نقدم حلول مراقبة ذكية بجودة عالية تضمن لك رؤية واضحة ودقيقة على مدار الساعة. تصميم وتركيب أنظمة اتصال مستقرة وسريعة تضمن أداءً مثالياً.',
        features: [
          { title: 'دقة 4K فائقة', detail: 'أنظمة مراقبة متطورة تضمن تفاصيل دقيقة ليلاً ونهاراً مع رؤية ليلية.' },
          { title: 'بنية تحتية قوية', detail: 'تصميم وتمديد شبكات الحاسوب والألياف البصرية للشركات والمنازل.' },
          { title: 'حماية متقدمة', detail: 'تأمين الشبكات ضد الهجمات الإلكترونية وجدران نارية فعالة لحماية بياناتك.' },
          { title: 'الربط السحابي', detail: 'متابعة البث المباشر والتسجيلات عبر هاتفك الذكي من أي مكان وفي أي وقت.' }
        ]
      },
      websites: {
        title: 'برمجة المواقع والتطبيقات السحابية',
        desc: 'نقدم حلولاً متكاملة لتطوير التطبيقات الذكية والمواقع الديناميكية التي تلبي تطلعات سوق العمل الرقمي الحديث.',
        features: [
          { title: 'ذكاء اصطناعي', detail: 'دمج تقنيات Gemini API لإنشاء منصات ذكية قادرة على تحليل البيانات وتوقع الاحتياجات.' },
          { title: 'تطبيقات الهاتف', detail: 'تطوير تطبيقات iOS و Android متوافقة مع أحدث الأجهزة وبأداء عالٍ.' },
          { title: 'تجربة المستخدم', detail: 'تصاميم عصرية تركز على سهولة الوصول وسرعة التصفح لضمان رضا المستخدم.' },
          { title: 'الأمان الرقمي', detail: 'استخدام شهادات SSL وحماية متطورة لضمان استقرار المواقع وسريتها.' }
        ]
      },
      smarthome: {
        title: 'المنزل الذكي المتكامل',
        desc: 'تحكم ذكي متكامل في الإضاءة والأجهزة وأنظمة الأمان لراحة تامة وأمان مستمر عبر تقنيات الأتمتة المتقدمة.',
        features: [
          { title: 'الأتمتة الكاملة', detail: 'برمجة سيناريوهات ذكية للمنزل (الاستيقاظ، العودة، النوم) بلمسة واحدة.' },
          { title: 'أنظمة الأمان', detail: 'أجهزة استشعار الحركة والحريق مرتبطة مباشرة بهاتفك للتنبيه الفوري.' },
          { title: 'كفاءة الطاقة', detail: 'إدارة ذكية لأجهزة التدفئة والتكييف لتوفير استهلاك الطاقة بشكل ملحوظ.' },
          { title: 'تحكم تفاعلي', detail: 'تحكم في منزلك عبر الأوامر الصوتية باللغات العربية والإنجليزية بسهولة تامة.' }
        ]
      }
    },
    store: {
      title: 'متجر جيم',
      search: 'بحث عن منتج...',
      addToCart: 'أضف للسلة',
      checkout: 'إتمام الطلب',
      total: 'المجموع',
      wishlist: 'أمنياتي',
      emptyWishlist: 'قائمة الأمنيات فارغة',
      moveToCart: 'نقل للسلة'
    }
  },
  en: {
    nav: {
      home: 'Home',
      store: 'Store',
      networks: 'Networks & CCTV',
      websites: 'Web & App Dev',
      smarthome: 'Smart Home',
      contact: 'Contact'
    },
    hero: {
      title: 'Electro GIM',
      subtitle: 'Services',
      desc: 'The best tech experience in Morocco. Providing smart solutions for your home and business with world-class quality.',
      cta: 'Launch Your Project'
    },
    services: {
      networks: {
        title: 'Advanced Networks & CCTV',
        desc: 'We offer high-quality smart surveillance solutions that guarantee superior vision and control 24/7. Professional design and installation.',
        features: [
          { title: '4K AI Cameras', detail: 'Ultra-HD surveillance with facial recognition and advanced night vision.' },
          { title: 'Fiber Infrastructure', detail: 'Deployment of high-speed fiber optic networks for seamless connectivity.' },
          { title: 'Cyber Defense', detail: 'State-of-the-art firewall and encryption to protect your digital assets.' },
          { title: 'Global Access', detail: 'Monitor your premises live from any device, anywhere in the world.' }
        ]
      },
      websites: {
        title: 'Web & Mobile Development',
        desc: 'Professional dynamic websites and smart applications built with the latest technologies to ensure performance and security.',
        features: [
          { title: 'Gemini AI Integration', detail: 'Leveraging Google\'s Gemini API to create intelligent, automated digital solutions.' },
          { title: 'Mobile Apps', detail: 'Native and cross-platform apps for iOS and Android with premium UI/UX.' },
          { title: 'SEO Strategy', detail: 'Built-in search engine optimization to boost your online visibility and growth.' },
          { title: 'Secure Cloud', detail: 'Robust cloud hosting with SSL and advanced attack prevention systems.' }
        ]
      },
      smarthome: {
        title: 'Smart Home Automation',
        desc: 'Transform your living space into a fully integrated smart environment controlled by voice or your smartphone.',
        features: [
          { title: 'Smart Lighting', detail: 'Automated lighting control based on your presence, mood, or schedule.' },
          { title: 'Biometric Security', detail: 'Smart locks with fingerprint and facial recognition for ultimate safety.' },
          { title: 'Energy Efficiency', detail: 'AI-driven energy management to lower bills and optimize climate control.' },
          { title: 'Voice Ecosystem', detail: 'Perfect integration with Alexa, Google Assistant, and Apple HomeKit.' }
        ]
      }
    },
    store: {
      title: 'GIM Store',
      search: 'Search products...',
      addToCart: 'Add to Cart',
      checkout: 'Checkout',
      total: 'Total',
      wishlist: 'Wishlist',
      emptyWishlist: 'Wishlist is empty',
      moveToCart: 'Move to Cart'
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      store: 'Boutique',
      networks: 'Réseaux & CCTV',
      websites: 'Développement Web',
      smarthome: 'Maison Intelligente',
      contact: 'Contact'
    },
    hero: {
      title: 'Electro GIM',
      subtitle: 'Services',
      desc: 'La meilleure expérience technologique au Maroc. Solutions intelligentes de classe mondiale.',
      cta: 'Lancer le Projet'
    },
    services: {
      networks: {
        title: 'Réseaux & CCTV Avancés',
        desc: 'Solutions de surveillance intelligente de haute qualité garantissant une visibilité parfaite 24/7. Conception réseau professionnelle.',
        features: [
          { title: 'Caméras 4K AI', detail: 'Surveillance Ultra-HD avec reconnaissance faciale et vision nocturne avancée.' },
          { title: 'Fibre Optique', detail: 'Installation de réseaux haut débit pour une connectivité stable et rapide.' },
          { title: 'Cybersécurité', detail: 'Protection contre les intrusions avec des pare-feu de nouvelle génération.' },
          { title: 'Accès Cloud', detail: 'Visualisez vos flux vidéo en direct partout dans le monde via mobile.' }
        ]
      },
      websites: {
        title: 'Développement Web & App',
        desc: 'Création de sites dynamiques et d’applications mobiles avec les dernières technologies pour une performance optimale.',
        features: [
          { title: 'Intégration IA', detail: 'Utilisation de Gemini API pour des solutions digitales intelligentes et autonomes.' },
          { title: 'Apps Mobiles', detail: 'Applications iOS/Android avec un design épuré et une fluidité exceptionnelle.' },
          { title: 'Optimisation SEO', detail: 'Stratégies de référencement intégrées pour maximiser votre présence en ligne.' },
          { title: 'E-commerce Sécurisé', detail: 'Boutiques en ligne avec tunnels d\'achat optimisés et paiements sécurisés.' }
        ]
      },
      smarthome: {
        title: 'Domotique & Maison Connectée',
        desc: 'Contrôle total de votre habitat via smartphone ou voix pour un confort et une sécurité inégalés.',
        features: [
          { title: 'Éclairage Intelligent', detail: 'Gestion automatisée des ambiances lumineuses selon vos habitudes.' },
          { title: 'Sécurité Biométrique', detail: 'Verrous connectés avec accès par empreinte ou reconnaissance faciale.' },
          { title: 'Gestion d\'Énergie', detail: 'Optimisation de la consommation pour un foyer plus durable et économique.' },
          { title: 'Commandes Vocales', detail: 'Compatibilité totale avec Alexa, Google Home et Siri.' }
        ]
      }
    },
    store: {
      title: 'Boutique GIM',
      search: 'Rechercher...',
      addToCart: 'Ajouter au panier',
      checkout: 'Payer',
      total: 'Total',
      wishlist: 'Ma Liste',
      emptyWishlist: 'Liste vide',
      moveToCart: 'Vers le Panier'
    }
  },
  de: {
    nav: {
      home: 'Startseite',
      store: 'Shop',
      networks: 'Netzwerke',
      websites: 'Programmierung',
      smarthome: 'Smart Home',
      contact: 'Kontakt'
    },
    hero: {
      title: 'Electro GIM',
      subtitle: 'Technik',
      desc: 'Erstklassige Technologielösungen für Ihr Zuhause und Ihr Unternehmen in Marokko.',
      cta: 'Projekt Starten'
    },
    services: {
      networks: {
        title: 'Netzwerke & CCTV Lösungen',
        desc: 'Intelligente Überwachungslösungen mit höchster Qualität für 24/7 Sicherheit. Professionelle Planung und Installation.',
        features: [
          { title: '4K AI Kameras', detail: 'Ultra-HD Videoüberwachung mit Gesichtserkennung und KI-Technologie.' },
          { title: 'Glasfaser-Struktur', detail: 'Installation moderner Glasfaser-Netze für maximale Internetgeschwindigkeit.' },
          { title: 'Datensicherheit', detail: 'Schutz vor Cyberangriffen durch moderne Firewalls und Verschlüsselung.' },
          { title: 'Mobiler Zugriff', detail: 'Überwachen Sie Ihr Eigentum weltweit live über das Smartphone.' }
        ]
      },
      websites: {
        title: 'Web- & App-Entwicklung',
        desc: 'Erstellung responsiver Websites und mobiler Apps mit modernster Technologie für beste Performance und Sicherheit.',
        features: [
          { title: 'KI-Integration', detail: 'Nutzung von Gemini API für intelligente und automatisierte Geschäftsprozesse.' },
          { title: 'Mobile Apps', detail: 'Native Apps für iOS & Android with exzellenter Benutzererfahrung.' },
          { title: 'SEO-Optimierung', detail: 'Suchmaschinenoptimierung für Top-Rankings und mehr Reichweite.' },
          { title: 'Cloud-Hosting', detail: 'Sichere Serverlösungen mit SSL-Schutz und hoher Verfügbarkeit.' }
        ]
      },
      smarthome: {
        title: 'Smart Home & Automatisierung',
        desc: 'Vollständige Kontrolle über Beleuchtung, Sicherheit und Klima per Smartphone oder Sprachbefehl.',
        features: [
          { title: 'Lichtsteuerung', detail: 'Automatisierte Beleuchtungsszenarien für Komfort und Energieeinsparung.' },
          { title: 'Sicherer Zutritt', detail: 'Intelligente Türschlösser mit Biometrie und App-Steuerung.' },
          { title: 'Energiemanagement', detail: 'KI-gesteuerte Verbrauchsoptimierung senkt Ihre Nebenkosten spürbar.' },
          { title: 'Sprachsteuerung', detail: 'Nahtlose Integration mit Alexa, Google Home und Apple HomeKit.' }
        ]
      }
    },
    store: {
      title: 'GIM Shop',
      search: 'Suchen...',
      addToCart: 'In den Warenkorb',
      checkout: 'Bezahlen',
      total: 'Gesamt',
      wishlist: 'Wunschliste',
      emptyWishlist: 'Wunschliste ist leer',
      moveToCart: 'In den Warenkorb'
    }
  }
};

export const MOCK_PRODUCTS: Product[] = [
  { id: '1', title: 'AI CCTV 4K Ultra', price: 1450, currency: 'MAD', category: 'cctv', image: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=400', desc: 'Smart AI facial recognition camera.' },
  { id: '2', title: 'GIM Home Hub Pro', price: 4200, currency: 'MAD', category: 'smarthome', image: 'https://images.unsplash.com/photo-1558002038-103792e07a70?q=80&w=400', desc: 'Central smart home automation unit.' },
  { id: '3', title: 'Enterprise Router 10G', price: 2100, currency: 'MAD', category: 'networks', image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=400', desc: 'High-speed business network router.' },
  { id: '4', title: 'Smart App Dashboard', price: 7500, currency: 'MAD', category: 'dev', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400', desc: 'Custom business management dashboard.' },
  { id: '5', title: 'Smart Lighting Bridge', price: 850, currency: 'MAD', category: 'smarthome', image: 'https://images.unsplash.com/photo-1550524514-9636edba60c8?q=80&w=400', desc: 'Control all your lights remotely.' },
  { id: '6', title: 'Tablet Pro Engineering', price: 3200, currency: 'MAD', category: 'networks', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=400', desc: 'Professional diagnostics tablet.' },
];
