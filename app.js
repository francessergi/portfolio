const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const year = document.getElementById('year');
const lightbox = document.getElementById('case-lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxClose = document.querySelector('.lightbox-close');

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.site-nav a');

if (sections.length && navLinks.length) {
  const linkByHash = new Map(Array.from(navLinks).map((link) => [link.getAttribute('href'), link]));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const activeLink = linkByHash.get(`#${entry.target.id}`);
        navLinks.forEach((link) => link.removeAttribute('aria-current'));
        if (activeLink) {
          activeLink.setAttribute('aria-current', 'page');
        }
      });
    },
    { rootMargin: '-35% 0px -55% 0px', threshold: 0.1 },
  );

  sections.forEach((section) => observer.observe(section));
}

const openLightbox = (src, title) => {
  if (!lightbox || !lightboxImage || !lightboxTitle) {
    return;
  }

  lightboxImage.src = src;
  lightboxImage.alt = title;
  lightboxTitle.textContent = title;
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
  if (!lightbox) {
    return;
  }

  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

document.querySelectorAll('.case-card-visual').forEach((button) => {
  button.addEventListener('click', () => {
    const src = button.dataset.lightbox;
    const title = button.dataset.title || button.querySelector('img')?.alt || 'Case study';

    if (src) {
      openLightbox(src, title);
    }
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener('click', (event) => {
    if (event.target instanceof HTMLElement && event.target.dataset.closeLightbox === 'true') {
      closeLightbox();
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox && lightbox.classList.contains('is-open')) {
    closeLightbox();
  }
});

const languageSelector = document.getElementById('language-selector');
const supportedLanguages = ['en', 'es', 'ko'];
const normalizeText = (text) => text.replace(/\s+/g, ' ').trim();
const translations = {
  es: {
    Language: 'Idioma',
    About: 'Sobre mí',
    Experience: 'Experiencia',
    Stack: 'Tecnologías',
    Impact: 'Impacto',
    Work: 'Proyectos',
    Contact: 'Contacto',
    'Senior Backend Engineer': 'Ingeniero Backend Senior',
    'I build reliable backend systems for marketplace, financial, and data-intensive workflows.': 'Construyo sistemas backend fiables para marketplaces, finanzas y flujos de trabajo intensivos en datos.',
    'PHP/Symfony engineer experienced in distributed systems, event-driven processing, analytical architectures, and database optimization—combining hands-on delivery with technical ownership.': 'Ingeniero PHP/Symfony con experiencia en sistemas distribuidos, procesamiento dirigido por eventos, arquitecturas analíticas y optimización de bases de datos; combino la ejecución práctica con la responsabilidad técnica.',
    'View experience': 'Ver experiencia',
    'Key technologies': 'Tecnologías principales',
    Currently: 'Actualmente',
    'Backend Software Engineer': 'Ingeniero de Software Backend',
    'Marketplace / Seller Account & Offer Management': 'Marketplace / Gestión de cuentas y ofertas de vendedores',
    'SUSA / Financial Reporting': 'SUSA / Informes financieros',
    'Finance / ERP': 'Finanzas / ERP',
    'core areas': 'áreas principales',
    'years in backend': 'años en backend',
    'business domains': 'dominios de negocio',
    'Backend engineering from product requirements to reliable delivery.': 'Ingeniería backend: de los requisitos de producto a una entrega fiable.',
    'I translate product requirements into technical designs and implementation plans, then contribute hands-on across APIs, data flows, integrations, testing, and delivery.': 'Transformo requisitos de producto en diseños técnicos y planes de implementación, y contribuyo de forma práctica en APIs, flujos de datos, integraciones, pruebas y entrega.',
    'My experience spans marketplace operations, finance and ERP, analytical reporting, and distributed processing—systems where data quality, reliability, and operational visibility matter.': 'Mi experiencia abarca operaciones de marketplace, finanzas y ERP, informes analíticos y procesamiento distribuido: sistemas en los que importan la calidad de los datos, la fiabilidad y la visibilidad operativa.',
    'A technical path with growing responsibility and ownership.': 'Una trayectoria técnica con responsabilidad y autonomía crecientes.',
    'METRO Markets GmbH · May 2022 – Present': 'METRO Markets GmbH · mayo de 2022 – actualidad',
    'Building and maintaining backend capabilities for seller onboarding, account management, offer lifecycles, competitive pricing, and destination-specific marketplace behaviour.': 'Desarrollo y mantengo capacidades backend para el alta de vendedores, gestión de cuentas, ciclos de vida de ofertas, precios competitivos y comportamientos específicos de cada marketplace.',
    'Technical ownership from requirements and design through decomposition and hands-on delivery.': 'Responsabilidad técnica desde los requisitos y el diseño hasta la descomposición y la ejecución práctica.',
    'End-to-end market-price data flows across orchestration, ClickHouse, Kafka/Flink, Elasticsearch, and APIs.': 'Flujos de datos de precios de mercado de extremo a extremo con orquestación, ClickHouse, Kafka/Flink, Elasticsearch y APIs.',
    'Data-quality work covering GTIN relevance, duplicate handling, and downstream readiness.': 'Trabajo de calidad de datos que cubre relevancia de GTIN, gestión de duplicados y preparación de sistemas posteriores.',
    'Testing, E2E demos, observability, incident response, and cross-team coordination.': 'Pruebas, demostraciones E2E, observabilidad, respuesta a incidentes y coordinación entre equipos.',
    'Backend Engineer': 'Ingeniero Backend',
    'SUSA / Reporting': 'SUSA / Informes',
    'Financial reporting modernization': 'Modernización de informes financieros',
    'Owned the technical implementation of moving analytical reporting workloads from MySQL to ClickHouse with Airbyte replication and materialized views.': 'Lideré la implementación técnica de la migración de cargas analíticas de informes de MySQL a ClickHouse con replicación mediante Airbyte y vistas materializadas.',
    'Separated complex reporting workloads from the transactional database.': 'Separé las cargas complejas de informes de la base de datos transaccional.',
    'Implemented and validated reporting for sales, invoices, VAT, liabilities, and consolidated views.': 'Implementé y validé informes de ventas, facturas, IVA, pasivos y vistas consolidadas.',
    'Created Grafana dashboards and alerts, including Slack notifications routed through n8n.': 'Creé paneles y alertas de Grafana, incluidas notificaciones de Slack gestionadas mediante n8n.',
    'Admin & Finance / ERP': 'Administración y Finanzas / ERP',
    'Finance / ERP / Admin & Finance': 'Finanzas / ERP / Administración y Finanzas',
    'Built and maintained business-critical functionality for invoicing, credit notes, VAT and tax, payments, e-invoicing, and marketplace-to-finance data processing.': 'Desarrollé y mantuve funcionalidades críticas para facturación, abonos, IVA e impuestos, pagos, facturación electrónica y procesamiento de datos entre marketplace y finanzas.',
    'Migrated and extended finance integrations to the Amazon Selling Partner API.': 'Migré y amplié integraciones financieras con la API de Amazon Selling Partner.',
    'Implemented external financial integrations and country-specific accounting requirements.': 'Implementé integraciones financieras externas y requisitos contables específicos por país.',
    'Improved reliability through error handling, retries, reprocessing, and automated tests.': 'Mejoré la fiabilidad mediante gestión de errores, reintentos, reprocesamiento y pruebas automatizadas.',
    'Web Developer': 'Desarrollador Web',
    'Conjurer Services / IKEA · Oct 2021 – Mar 2022': 'Conjurer Services / IKEA · oct. de 2021 – mar. de 2022',
    'Production web platform maintenance and evolution': 'Mantenimiento y evolución de plataformas web en producción',
    'Delivered bug fixes and incremental features for IKEA web platforms across the Balearic Islands, Canary Islands, Baltic countries, and Iceland using PHP, jQuery, and SVN.': 'Entregué correcciones y funcionalidades incrementales para plataformas web de IKEA en Baleares, Canarias, países bálticos e Islandia con PHP, jQuery y SVN.',
    'PHP / Symfony Developer': 'Desarrollador PHP / Symfony',
    'Tiendeo · Jan 2021 – Aug 2021': 'Tiendeo · ene. de 2021 – ago. de 2021',
    'Retail data extraction and automation': 'Extracción y automatización de datos de retail',
    'Developed PHP/Symfony crawlers for heterogeneous retail websites and automated scheduled data collection with Jenkins and cron across HTML, embedded JSON, and public API sources.': 'Desarrollé crawlers PHP/Symfony para sitios web de retail heterogéneos y automaticé la recopilación programada de datos con Jenkins y cron a partir de HTML, JSON embebido y APIs públicas.',
    'Stack & capabilities': 'Tecnologías y capacidades',
    'Strong experience across backend, data, and distributed systems.': 'Sólida experiencia en backend, datos y sistemas distribuidos.',
    Backend: 'Backend',
    'Streaming & analytics': 'Streaming y analítica',
    'Infrastructure & delivery': 'Infraestructura y entrega',
    'Engineering focus': 'Enfoque de ingeniería',
    'Technical ownership': 'Responsabilidad técnica',
    'Software architecture': 'Arquitectura de software',
    'System design': 'Diseño de sistemas',
    'Testing & observability': 'Pruebas y observabilidad',
    'Incident response': 'Respuesta a incidentes',
    'Cross-team coordination': 'Coordinación entre equipos',
    'Ownership across design, implementation, and operations.': 'Responsabilidad en diseño, implementación y operaciones.',
    Architecture: 'Arquitectura',
    'Turning product requirements and complex business rules into maintainable backend designs.': 'Transformar requisitos de producto y reglas de negocio complejas en diseños backend mantenibles.',
    Data: 'Datos',
    'Building event-driven pipelines and moving analytical workloads to scalable data architectures.': 'Construir pipelines dirigidos por eventos y trasladar cargas analíticas a arquitecturas de datos escalables.',
    Delivery: 'Entrega',
    'Coordinating dependencies while supporting testing, CI/CD, observability, and incident response.': 'Coordinar dependencias mientras doy soporte a pruebas, CI/CD, observabilidad y respuesta a incidentes.',
    'Selected work': 'Proyectos destacados',
    'Business problems translated into reliable backend and data solutions.': 'Problemas de negocio convertidos en soluciones backend y de datos fiables.',
    'Market data integration & processing pipeline': 'Integración de datos de mercado y pipeline de procesamiento',
    'Built an end-to-end flow that integrates externally collected pricing data through orchestration, analytical storage, event-driven processing, search indexing, and backend/API consumption.': 'Construí un flujo integral que integra datos de precios recopilados externamente mediante orquestación, almacenamiento analítico, procesamiento dirigido por eventos, indexación de búsqueda y consumo desde backend/APIs.',
    'Modernizing financial reporting': 'Modernización de informes financieros',
    'Moved analytical workloads from MySQL to ClickHouse with Airbyte replication and materialized views, reducing transactional database pressure and improving reporting scalability.': 'Moví cargas analíticas de MySQL a ClickHouse con replicación de Airbyte y vistas materializadas, reduciendo la carga de la base de datos transaccional y mejorando la escalabilidad de los informes.',
    "Cap'n Hook": "Cap'n Hook",
    'A Symfony webhook reliability and observability service with durable ingestion, asynchronous RabbitMQ delivery, retry and dead-letter handling, inspection, and replay capabilities.': 'Un servicio Symfony de fiabilidad y observabilidad de webhooks con ingesta duradera, entrega asíncrona con RabbitMQ, gestión de reintentos y mensajes fallidos, inspección y reproducción.',
    'View repository': 'Ver repositorio',
    'Let’s talk about backend systems, architecture, and data-intensive platforms.': 'Hablemos de sistemas backend, arquitectura y plataformas intensivas en datos.',
    'Get in touch': 'Contactar',
    'Senior Backend Engineer • Marketplace • Financial systems • Data-intensive platforms': 'Ingeniero Backend Senior • Marketplace • Sistemas financieros • Plataformas intensivas en datos',
    'Case study': 'Caso de estudio',
  },
  ko: {
    Language: '언어',
    About: '소개',
    Experience: '경력',
    Stack: '기술 스택',
    Impact: '성과',
    Work: '프로젝트',
    Contact: '연락처',
    'Senior Backend Engineer': '시니어 백엔드 엔지니어',
    'I build reliable backend systems for marketplace, financial, and data-intensive workflows.': '마켓플레이스, 금융 및 데이터 집약적 워크플로를 위한 안정적인 백엔드 시스템을 구축합니다.',
    'PHP/Symfony engineer experienced in distributed systems, event-driven processing, analytical architectures, and database optimization—combining hands-on delivery with technical ownership.': '분산 시스템, 이벤트 기반 처리, 분석 아키텍처 및 데이터베이스 최적화 경험을 갖춘 PHP/Symfony 엔지니어로서, 실무 구현과 기술적 오너십을 함께 수행합니다.',
    'View experience': '경력 보기',
    'Key technologies': '주요 기술',
    Currently: '현재',
    'Backend Software Engineer': '백엔드 소프트웨어 엔지니어',
    'Marketplace / Seller Account & Offer Management': '마켓플레이스 / 판매자 계정 및 오퍼 관리',
    'SUSA / Financial Reporting': 'SUSA / 재무 보고',
    'Finance / ERP': '재무 / ERP',
    'core areas': '핵심 분야',
    'years in backend': '년의 백엔드 경력',
    'business domains': '비즈니스 도메인',
    'Backend engineering from product requirements to reliable delivery.': '제품 요구사항부터 안정적인 배포까지의 백엔드 엔지니어링.',
    'I translate product requirements into technical designs and implementation plans, then contribute hands-on across APIs, data flows, integrations, testing, and delivery.': '제품 요구사항을 기술 설계와 구현 계획으로 전환하고, API, 데이터 흐름, 통합, 테스트 및 배포 전반에 실무적으로 기여합니다.',
    'My experience spans marketplace operations, finance and ERP, analytical reporting, and distributed processing—systems where data quality, reliability, and operational visibility matter.': '마켓플레이스 운영, 재무 및 ERP, 분석 보고, 분산 처리 경험을 보유하고 있으며 데이터 품질, 안정성 및 운영 가시성이 중요한 시스템을 다룹니다.',
    'A technical path with growing responsibility and ownership.': '책임과 오너십을 지속적으로 확장해 온 기술 경력.',
    'METRO Markets GmbH · May 2022 – Present': 'METRO Markets GmbH · 2022년 5월 – 현재',
    'Building and maintaining backend capabilities for seller onboarding, account management, offer lifecycles, competitive pricing, and destination-specific marketplace behaviour.': '판매자 온보딩, 계정 관리, 오퍼 수명 주기, 경쟁 가격 및 국가별 마켓플레이스 동작을 위한 백엔드 기능을 구축하고 유지합니다.',
    'Technical ownership from requirements and design through decomposition and hands-on delivery.': '요구사항과 설계부터 세분화 및 실무 구현까지 기술적 오너십을 담당합니다.',
    'End-to-end market-price data flows across orchestration, ClickHouse, Kafka/Flink, Elasticsearch, and APIs.': '오케스트레이션, ClickHouse, Kafka/Flink, Elasticsearch 및 API를 아우르는 엔드투엔드 시장 가격 데이터 흐름을 구축합니다.',
    'Data-quality work covering GTIN relevance, duplicate handling, and downstream readiness.': 'GTIN 관련성, 중복 처리 및 후속 시스템 준비를 포함한 데이터 품질 업무를 수행합니다.',
    'Testing, E2E demos, observability, incident response, and cross-team coordination.': '테스트, E2E 데모, 관찰 가능성, 장애 대응 및 팀 간 조율을 수행합니다.',
    'Backend Engineer': '백엔드 엔지니어',
    'SUSA / Reporting': 'SUSA / 보고',
    'Financial reporting modernization': '재무 보고 현대화',
    'Owned the technical implementation of moving analytical reporting workloads from MySQL to ClickHouse with Airbyte replication and materialized views.': 'Airbyte 복제와 물리화 뷰를 활용해 분석 보고 워크로드를 MySQL에서 ClickHouse로 이전하는 기술 구현을 주도했습니다.',
    'Separated complex reporting workloads from the transactional database.': '복잡한 보고 워크로드를 트랜잭션 데이터베이스에서 분리했습니다.',
    'Implemented and validated reporting for sales, invoices, VAT, liabilities, and consolidated views.': '매출, 송장, 부가가치세, 부채 및 통합 뷰에 대한 보고 기능을 구현하고 검증했습니다.',
    'Created Grafana dashboards and alerts, including Slack notifications routed through n8n.': 'n8n을 통해 전달되는 Slack 알림을 포함하여 Grafana 대시보드와 알림을 만들었습니다.',
    'Admin & Finance / ERP': '관리 및 재무 / ERP',
    'Finance / ERP / Admin & Finance': '재무 / ERP / 관리 및 재무',
    'Built and maintained business-critical functionality for invoicing, credit notes, VAT and tax, payments, e-invoicing, and marketplace-to-finance data processing.': '송장 발행, 신용 전표, 부가가치세 및 세금, 결제, 전자 송장 및 마켓플레이스-재무 데이터 처리를 위한 핵심 기능을 구축하고 유지했습니다.',
    'Migrated and extended finance integrations to the Amazon Selling Partner API.': '재무 통합을 Amazon Selling Partner API로 이전하고 확장했습니다.',
    'Implemented external financial integrations and country-specific accounting requirements.': '외부 재무 통합과 국가별 회계 요구사항을 구현했습니다.',
    'Improved reliability through error handling, retries, reprocessing, and automated tests.': '오류 처리, 재시도, 재처리 및 자동화 테스트를 통해 안정성을 개선했습니다.',
    'Web Developer': '웹 개발자',
    'Conjurer Services / IKEA · Oct 2021 – Mar 2022': 'Conjurer Services / IKEA · 2021년 10월 – 2022년 3월',
    'Production web platform maintenance and evolution': '운영 웹 플랫폼 유지보수 및 발전',
    'Delivered bug fixes and incremental features for IKEA web platforms across the Balearic Islands, Canary Islands, Baltic countries, and Iceland using PHP, jQuery, and SVN.': 'PHP, jQuery 및 SVN을 사용하여 발레아레스 제도, 카나리아 제도, 발트 국가 및 아이슬란드의 IKEA 웹 플랫폼에 버그 수정과 점진적 기능을 제공했습니다.',
    'PHP / Symfony Developer': 'PHP / Symfony 개발자',
    'Tiendeo · Jan 2021 – Aug 2021': 'Tiendeo · 2021년 1월 – 2021년 8월',
    'Retail data extraction and automation': '리테일 데이터 추출 및 자동화',
    'Developed PHP/Symfony crawlers for heterogeneous retail websites and automated scheduled data collection with Jenkins and cron across HTML, embedded JSON, and public API sources.': '서로 다른 리테일 웹사이트를 위한 PHP/Symfony 크롤러를 개발하고, HTML, 임베디드 JSON 및 공개 API 소스에서 Jenkins와 cron으로 예약된 데이터 수집을 자동화했습니다.',
    'Stack & capabilities': '기술 스택 및 역량',
    'Strong experience across backend, data, and distributed systems.': '백엔드, 데이터 및 분산 시스템 전반에 걸친 풍부한 경험.',
    Backend: '백엔드',
    'Streaming & analytics': '스트리밍 및 분석',
    'Infrastructure & delivery': '인프라 및 배포',
    'Engineering focus': '엔지니어링 중점',
    'Technical ownership': '기술적 오너십',
    'Software architecture': '소프트웨어 아키텍처',
    'System design': '시스템 설계',
    'Testing & observability': '테스트 및 관찰 가능성',
    'Incident response': '장애 대응',
    'Cross-team coordination': '팀 간 조율',
    'Ownership across design, implementation, and operations.': '설계, 구현 및 운영 전반의 오너십.',
    Architecture: '아키텍처',
    'Turning product requirements and complex business rules into maintainable backend designs.': '제품 요구사항과 복잡한 비즈니스 규칙을 유지보수 가능한 백엔드 설계로 전환합니다.',
    Data: '데이터',
    'Building event-driven pipelines and moving analytical workloads to scalable data architectures.': '이벤트 기반 파이프라인을 구축하고 분석 워크로드를 확장 가능한 데이터 아키텍처로 이전합니다.',
    Delivery: '배포',
    'Coordinating dependencies while supporting testing, CI/CD, observability, and incident response.': '테스트, CI/CD, 관찰 가능성 및 장애 대응을 지원하면서 의존성을 조율합니다.',
    'Selected work': '주요 프로젝트',
    'Business problems translated into reliable backend and data solutions.': '비즈니스 문제를 안정적인 백엔드 및 데이터 솔루션으로 전환합니다.',
    'Market data integration & processing pipeline': '시장 데이터 통합 및 처리 파이프라인',
    'Built an end-to-end flow that integrates externally collected pricing data through orchestration, analytical storage, event-driven processing, search indexing, and backend/API consumption.': '외부에서 수집한 가격 데이터를 오케스트레이션, 분석 저장소, 이벤트 기반 처리, 검색 인덱싱 및 백엔드/API 소비로 통합하는 엔드투엔드 흐름을 구축했습니다.',
    'Modernizing financial reporting': '재무 보고 현대화',
    'Moved analytical workloads from MySQL to ClickHouse with Airbyte replication and materialized views, reducing transactional database pressure and improving reporting scalability.': 'Airbyte 복제와 물리화 뷰를 사용해 분석 워크로드를 MySQL에서 ClickHouse로 이전하여 트랜잭션 데이터베이스 부하를 줄이고 보고 확장성을 개선했습니다.',
    "Cap'n Hook": "Cap'n Hook",
    'A Symfony webhook reliability and observability service with durable ingestion, asynchronous RabbitMQ delivery, retry and dead-letter handling, inspection, and replay capabilities.': '내구성 있는 수집, 비동기 RabbitMQ 전달, 재시도 및 데드 레터 처리, 검사와 재실행 기능을 갖춘 Symfony 웹훅 안정성 및 관찰 가능성 서비스입니다.',
    'View repository': '저장소 보기',
    'Let’s talk about backend systems, architecture, and data-intensive platforms.': '백엔드 시스템, 아키텍처 및 데이터 집약적 플랫폼에 대해 이야기해 보세요.',
    'Get in touch': '연락하기',
    'Senior Backend Engineer • Marketplace • Financial systems • Data-intensive platforms': '시니어 백엔드 엔지니어 • 마켓플레이스 • 금융 시스템 • 데이터 집약적 플랫폼',
    'Case study': '사례 연구',
  },
};

const translatableElements = Array.from(document.querySelectorAll('body *'))
  .filter((element) => element.children.length === 0 && element.textContent.trim())
  .map((element) => ({ element, source: normalizeText(element.textContent) }));

const languageAttributes = [
  ['.nav-toggle', 'aria-label', 'Open menu'],
  ['.hero-pills', 'aria-label', 'Key technologies'],
  ['.hero-card', 'aria-label', 'Professional summary'],
  ['.case-card-visual[data-lightbox="context/market-price.png"]', 'aria-label', 'Open market data integration preview'],
  ['.case-card-visual[data-lightbox="context/case-study.png"]', 'aria-label', 'Open financial reporting preview'],
  ['.case-card-visual[data-lightbox="context/capn-hook.png"]', 'aria-label', "Open Cap'n Hook preview"],
  ['img[src="profile-avatar.png"]', 'alt', 'Sergi Francés Roca profile photo'],
  ['img[src="context/market-price.png"]', 'alt', 'Market Data Integration and Processing Pipeline case study'],
  ['img[src="context/case-study.png"]', 'alt', 'Modernizing Financial Reporting case study'],
  ['img[src="context/capn-hook.png"]', 'alt', "Cap'n Hook project preview"],
  ['.lightbox-close', 'aria-label', 'Close image preview'],
];

const attributeTranslations = {
  es: {
    'Open menu': 'Abrir menú',
    'Key technologies': 'Tecnologías principales',
    'Professional summary': 'Resumen profesional',
    'Open market data integration preview': 'Abrir vista previa de la integración de datos de mercado',
    'Open financial reporting preview': 'Abrir vista previa de informes financieros',
    "Open Cap'n Hook preview": "Abrir vista previa de Cap'n Hook",
    'Sergi Francés Roca profile photo': 'Foto de perfil de Sergi Francés Roca',
    'Market Data Integration and Processing Pipeline case study': 'Caso de estudio de integración y procesamiento de datos de mercado',
    'Modernizing Financial Reporting case study': 'Caso de estudio de modernización de informes financieros',
    "Cap'n Hook project preview": "Vista previa del proyecto Cap'n Hook",
    'Close image preview': 'Cerrar vista previa de imagen',
  },
  ko: {
    'Open menu': '메뉴 열기',
    'Key technologies': '주요 기술',
    'Professional summary': '전문 경력 요약',
    'Open market data integration preview': '시장 데이터 통합 미리보기 열기',
    'Open financial reporting preview': '재무 보고 미리보기 열기',
    "Open Cap'n Hook preview": "Cap'n Hook 미리보기 열기",
    'Sergi Francés Roca profile photo': 'Sergi Francés Roca 프로필 사진',
    'Market Data Integration and Processing Pipeline case study': '시장 데이터 통합 및 처리 파이프라인 사례 연구',
    'Modernizing Financial Reporting case study': '재무 보고 현대화 사례 연구',
    "Cap'n Hook project preview": "Cap'n Hook 프로젝트 미리보기",
    'Close image preview': '이미지 미리보기 닫기',
  },
};

const pageMetadata = {
  en: {
    title: 'Sergi Francés Roca | Senior Backend Engineer',
    description: 'Portfolio of Sergi Francés Roca, Senior Backend Engineer focused on PHP, Symfony, distributed systems, marketplace platforms, and financial systems.',
  },
  es: {
    title: 'Sergi Francés Roca | Ingeniero Backend Senior',
    description: 'Portfolio de Sergi Francés Roca, Ingeniero Backend Senior especializado en PHP, Symfony, sistemas distribuidos, marketplaces y sistemas financieros.',
  },
  ko: {
    title: 'Sergi Francés Roca | 시니어 백엔드 엔지니어',
    description: 'PHP, Symfony, 분산 시스템, 마켓플레이스 플랫폼 및 금융 시스템을 전문으로 하는 시니어 백엔드 엔지니어 Sergi Francés Roca의 포트폴리오입니다.',
  },
};

const setLanguage = (language, persist = false) => {
  const selectedLanguage = supportedLanguages.includes(language) ? language : 'en';
  const dictionary = translations[selectedLanguage] || {};
  const attributeDictionary = attributeTranslations[selectedLanguage] || {};

  translatableElements.forEach(({ element, source }) => {
    element.textContent = dictionary[source] || source;
  });

  languageAttributes.forEach(([selector, attribute, source]) => {
    const element = document.querySelector(selector);
    if (element) {
      element.setAttribute(attribute, attributeDictionary[source] || source);
    }
  });

  document.querySelectorAll('.case-card-visual').forEach((button) => {
    const sourceTitle = button.dataset.sourceTitle || button.dataset.title;
    if (sourceTitle) {
      button.dataset.sourceTitle = sourceTitle;
      button.dataset.title = dictionary[sourceTitle] || sourceTitle;
    }
  });

  document.documentElement.lang = selectedLanguage;
  document.title = pageMetadata[selectedLanguage].title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', pageMetadata[selectedLanguage].description);
  if (languageSelector) {
    languageSelector.value = selectedLanguage;
  }
  if (persist) {
    localStorage.setItem('portfolio-language', selectedLanguage);
  }
};

const browserLanguage = navigator.languages
  .map((language) => language.split('-')[0])
  .find((language) => supportedLanguages.includes(language));
const savedLanguage = localStorage.getItem('portfolio-language');

setLanguage(savedLanguage || browserLanguage || 'en');

if (languageSelector) {
  languageSelector.addEventListener('change', () => setLanguage(languageSelector.value, true));
}
