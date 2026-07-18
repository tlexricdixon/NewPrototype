(function () {
    'use strict';

    var ispContact = 'https://isp.illinois.gov/Home/ContactISP';

    window.VirtualKimCatalog = Object.freeze({
        openingMessage: "Hi, I’m Kim. I can help you find an ISP service, explore this homepage concept, or point you to another Illinois agency. What are you looking for?",
        fallbackMessage: "I’m not sure which service you need. Try choosing one of these common topics, or use the site search.",
        quickActions: Object.freeze({
            'services-menu': {
                message: 'Here are common ISP services I can help you find.',
                links: [
                    { label: 'FOID and concealed carry', href: 'https://isp.illinois.gov/Foid' },
                    { label: 'Crash reports', href: 'https://isp.illinois.gov/CrashReports' },
                    { label: 'Background checks', href: 'https://isp.illinois.gov/BureauOfIdentification' },
                    { label: 'Troop locations', href: 'https://isp.illinois.gov/Patrol/TroopMap' },
                    { label: 'Records and FOIA', href: 'https://isp.illinois.gov/Foia' }
                ]
            },
            'report-menu': {
                message: 'Kim cannot take a report. If anyone is in immediate danger, call 911. For non-emergencies, choose an official reporting destination.',
                links: [
                    { label: 'Submit an ISP crime tip', href: 'https://isptips.illinois.gov/' },
                    { label: 'Citizen complaint procedure', href: 'https://isp.illinois.gov/InternalInvestigations/ComplaintProcedures' },
                    { label: 'Crash report information', href: 'https://isp.illinois.gov/CrashReports' },
                    { label: 'Contact ISP', href: ispContact }
                ]
            },
            careers: {
                message: 'Explore trooper careers, civilian opportunities, internships, and recruitment information on the official Join ISP site.',
                links: [{ label: 'Explore Join ISP', href: 'https://isp.illinois.gov/JoinIsp' }]
            },
            'state-services-menu': {
                message: 'These services are handled by other Illinois agencies.',
                links: [
                    { label: 'Driver and vehicle services — Secretary of State', href: 'https://www.ilsos.gov/' },
                    { label: 'SNAP, medical, and cash assistance — ABE/DHS', href: 'https://abe.illinois.gov/abe/access/' },
                    { label: 'Unemployment — IDES', href: 'https://ides.illinois.gov/unemployment/insurance.html' },
                    { label: 'Illinois taxes — Department of Revenue', href: 'https://tax.illinois.gov/' },
                    { label: 'Road conditions — IDOT', href: 'https://www.gettingaroundillinois.com/' }
                ]
            }
        }),
        intents: Object.freeze([
            {
                id: 'emergency',
                patterns: ['911', 'emergency', 'immediate danger', 'crime in progress', 'someone is hurt', 'call police now'],
                message: 'If anyone is in immediate danger or a crime is in progress, call 911. Kim does not monitor incidents and cannot dispatch help.',
                links: []
            },
            {
                id: 'concealed-carry',
                patterns: ['concealed carry', 'ccl', 'carry license', 'conceal carry'],
                message: 'The ISP Firearms Services Bureau handles Concealed Carry License information and applications.',
                links: [{ label: 'Concealed carry and firearms services', href: 'https://isp.illinois.gov/Foid' }]
            },
            {
                id: 'foid',
                patterns: ['foid', 'firearm owner', 'firearms card', 'gun card', 'firearm services'],
                message: 'The ISP Firearms Services Bureau handles FOID applications, status information, and related services.',
                links: [{ label: 'FOID and firearms services', href: 'https://isp.illinois.gov/Foid' }]
            },
            {
                id: 'crash-copy',
                patterns: ['copy of crash report', 'obtain crash report', 'get a crash report', 'get crash report', 'buy crash report', 'accident report copy', 'crash report'],
                message: 'ISP provides official options for obtaining a copy of a crash report online or by mail.',
                links: [{ label: 'Obtain a crash report', href: 'https://isp.illinois.gov/CrashReports' }]
            },
            {
                id: 'crash-file',
                patterns: ['file a crash report', 'file crash report', 'submit a crash report', 'submit crash report', 'report a crash', 'traffic crash', 'car accident'],
                message: 'Review the official ISP crash-report criteria and filing options. Kim cannot determine whether a particular crash must be reported.',
                links: [{ label: 'Crash report information', href: 'https://isp.illinois.gov/CrashReports' }]
            },
            {
                id: 'background-check',
                patterns: ['background check', 'criminal history', 'fingerprint check', 'fingerprinting', 'chirp'],
                message: 'The ISP Bureau of Identification provides criminal-history, fingerprint, and background-check services.',
                links: [{ label: 'Bureau of Identification', href: 'https://isp.illinois.gov/BureauOfIdentification' }]
            },
            {
                id: 'missing-person',
                patterns: ['missing person', 'missing child', 'someone is missing', 'report missing'],
                message: 'Kim cannot take a missing-person report. Contact the appropriate local law-enforcement agency immediately; call 911 when there is immediate danger. ISP contact information is available here.',
                links: [{ label: 'Contact ISP', href: ispContact }]
            },
            {
                id: 'troop-location',
                patterns: ['troop location', 'troop headquarters', 'trooper office', 'state police office', 'isp location', 'nearest troop'],
                message: 'Use the official ISP Patrol Troop Map to find troop pages and headquarters information.',
                links: [{ label: 'ISP Patrol Troop Map', href: 'https://isp.illinois.gov/Patrol/TroopMap' }]
            },
            {
                id: 'trooper-career',
                patterns: ['become a trooper', 'trooper job', 'state police job', 'isp career', 'join isp', 'jobs and careers', 'jobs', 'career'],
                message: 'Join ISP contains official information about becoming a trooper and other ISP career opportunities.',
                links: [{ label: 'Explore Join ISP', href: 'https://isp.illinois.gov/JoinIsp' }]
            },
            {
                id: 'internship',
                patterns: ['internship', 'intern at isp', 'ride along', 'recruitment question'],
                message: 'Recruitment, internship, and ride-along information is available through Join ISP.',
                links: [{ label: 'Recruitment and opportunities', href: 'https://isp.illinois.gov/JoinIsp' }]
            },
            {
                id: 'human-trafficking',
                patterns: ['human trafficking', 'trafficking resources', 'trafficking help'],
                message: 'ISP provides official human-trafficking awareness, indicators, and resource information. Kim cannot receive a report.',
                links: [
                    { label: 'Human trafficking resources', href: 'https://isp.illinois.gov/Home/HumanTrafficking' },
                    { label: 'Submit an ISP crime tip', href: 'https://isptips.illinois.gov/' }
                ]
            },
            {
                id: 'foia',
                patterns: ['foia', 'freedom of information', 'public records request', 'request records'],
                message: 'The ISP FOIA page explains what records ISP maintains and how to submit a focused request.',
                links: [{ label: 'ISP FOIA requests', href: 'https://isp.illinois.gov/Foia' }]
            },
            {
                id: 'records',
                patterns: ['records', 'police records', 'incident records', 'get a record'],
                message: 'Different records use different processes. The ISP FOIA page and Contact ISP directory can help identify the correct destination.',
                links: [
                    { label: 'ISP FOIA', href: 'https://isp.illinois.gov/Foia' },
                    { label: 'Contact ISP directory', href: ispContact }
                ]
            },
            {
                id: 'complaint',
                patterns: ['file complaint', 'citizen complaint', 'complain about trooper', 'complaint about officer', 'state employee complaint', 'complaint'],
                message: 'Use the official Division of Internal Investigation procedure for a complaint involving an ISP employee. Kim cannot accept the complaint.',
                links: [{ label: 'Citizen complaint procedure', href: 'https://isp.illinois.gov/InternalInvestigations/ComplaintProcedures' }]
            },
            {
                id: 'crime-tip',
                patterns: ['suspicious activity', 'crime tip', 'submit a tip', 'report something', 'report crime', 'tip line'],
                message: 'For an emergency or crime in progress, call 911. For non-emergency information, use the official ISP Investigative Tips site. Kim cannot accept details.',
                links: [{ label: 'Submit an ISP crime tip', href: 'https://isptips.illinois.gov/' }]
            },
            {
                id: 'contact-isp',
                patterns: ['contact isp', 'contact state police', 'isp phone', 'isp email', 'who do i call', 'find an isp service', 'find isp service'],
                message: 'The Contact ISP directory routes common questions to the correct bureau, page, phone number, or email address.',
                links: [{ label: 'Contact ISP', href: ispContact }]
            },
            {
                id: 'drivers-license',
                patterns: ['driver license', "driver's license", 'drivers license', 'state id', 'real id', 'dmv', 'secretary of state'],
                message: 'Driver’s licenses, State IDs, REAL IDs, and DMV services are handled by the Illinois Secretary of State—not ISP.',
                links: [{ label: 'Secretary of State Driver Services', href: 'https://www.ilsos.gov/departments/drivers/home.html' }]
            },
            {
                id: 'vehicle-services',
                patterns: ['vehicle registration', 'license plate', 'plate sticker', 'vehicle title', 'car registration'],
                message: 'Vehicle titles, registrations, plates, and stickers are handled by the Illinois Secretary of State.',
                links: [{ label: 'Secretary of State vehicle services', href: 'https://www.ilsos.gov/' }]
            },
            {
                id: 'snap',
                patterns: ['snap', 'food stamps', 'link card', 'food assistance'],
                message: 'SNAP and food-assistance applications are handled through Illinois ABE and the Department of Human Services.',
                links: [{ label: 'Illinois ABE benefits', href: 'https://abe.illinois.gov/abe/access/' }]
            },
            {
                id: 'medicaid',
                patterns: ['medicaid', 'medical assistance', 'health coverage', 'medical card'],
                message: 'Medical-assistance applications are available through Illinois ABE. This is not an ISP service.',
                links: [{ label: 'Illinois ABE medical benefits', href: 'https://abe.illinois.gov/abe/access/' }]
            },
            {
                id: 'public-aid',
                patterns: ['public aid', 'cash assistance', 'dhs benefits', 'state benefits'],
                message: 'Cash, food, and medical assistance are handled through Illinois ABE and the Department of Human Services.',
                links: [{ label: 'Illinois ABE benefits', href: 'https://abe.illinois.gov/abe/access/' }]
            },
            {
                id: 'unemployment',
                patterns: ['unemployment', 'unemployment benefits', 'lost my job', 'ides'],
                message: 'Unemployment insurance is administered by the Illinois Department of Employment Security.',
                links: [{ label: 'IDES unemployment insurance', href: 'https://ides.illinois.gov/unemployment/insurance.html' }]
            },
            {
                id: 'taxes',
                patterns: ['illinois taxes', 'state taxes', 'tax refund', 'mytax', 'department of revenue'],
                message: 'Illinois tax filing, payments, refunds, and account services are handled by the Department of Revenue.',
                links: [{ label: 'Illinois Department of Revenue', href: 'https://tax.illinois.gov/' }]
            },
            {
                id: 'road-conditions',
                patterns: ['road condition', 'road conditions', 'winter roads', 'road construction', 'travel conditions', 'idot'],
                message: 'IDOT’s Getting Around Illinois provides traveler information, winter road conditions, and construction maps.',
                links: [{ label: 'Getting Around Illinois', href: 'https://www.gettingaroundillinois.com/' }]
            },
            {
                id: 'latest-announcements',
                patterns: ['what has isp announced', 'announced lately', 'latest announcement', 'recent announcement', 'latest press releases', 'recent press releases'],
                message: 'Here are recent fictional good-news releases seeded for this demonstration. They are not actual ISP announcements.',
                links: [
                    { label: 'DEMO — New troopers graduate', href: '/news/demo-new-troopers-graduate' },
                    { label: 'DEMO — K-9 team recognized', href: '/news/demo-k9-team-recognized' },
                    { label: 'DEMO — Forensic service improvements', href: '/news/demo-forensic-service-improvements' },
                    { label: 'View all demo news', href: '/news' }
                ]
            },
            {
                id: 'news-archive',
                patterns: ['news', 'press release', 'press releases', 'pio news', 'latest news'],
                message: 'The prototype News archive contains accessible HTML press releases published through Piranha CMS.',
                links: [{ label: 'Open the News archive', href: '/news' }]
            },
            {
                id: 'current-concept',
                patterns: ['which concept', 'what concept', 'current concept', 'which design', 'what design'],
                message: 'You are viewing Homepage Concept {conceptNumber}: {conceptName}.',
                links: []
            },
            {
                id: 'switch-concepts',
                patterns: ['switch concept', 'change concept', 'show another design', 'other homepage', 'compare designs'],
                message: 'You can compare all four homepage concepts. Kim will remain available as you switch.',
                links: [
                    { label: 'Concept 1 — Command', href: '/' },
                    { label: 'Concept 2 — Service', href: '/Home/Index2' },
                    { label: 'Concept 3 — Editorial', href: '/Home/Index3' },
                    { label: 'Concept 4 — Civic', href: '/Home/Index4' }
                ]
            },
            {
                id: 'site-search',
                patterns: ['search the site', 'site search', 'google search', 'search website'],
                message: 'The site search remains available in the header and searches the official ISP domain. Kim only handles her approved topics.',
                links: []
            },
            {
                id: 'legal-boundary',
                patterns: ['legal advice', 'interpret law', 'what does the law mean', 'is this legal', 'my social security', 'my foid number', 'personal information'],
                message: 'Kim cannot interpret laws, provide legal advice, or receive personal or account information. Please use an official service page or contact the appropriate agency.',
                links: [{ label: 'Contact ISP directory', href: ispContact }]
            }
        ])
    });
}());
