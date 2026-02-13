import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useI18nStore = defineStore('i18n', () => {
    // Definición de traducciones
    const translations = {
        es: {
            nav: {
                home: 'Inicio',
                methodology: 'Metodología',
                curriculum: 'Temario',
                product: 'Producto',
                startNow: 'Empezar Ahora',
                starMap: 'Mapa Estelar',
                commandShip: 'Nave de Comando'
            },
            hero: {
                badge: 'Plataforma Interactiva de Agentes',
                subtitle: 'Academy v2.0 // Interactive Platform',
                headlineMain: 'Antigravity: El Orquestador',
                headlineSub: 'de Intelligent Agents',
                subHeadline: 'Arquitecturas Replicables de Alto Nivel',
                description: 'Misiones en tiempo real, práctica en vivo y arquitectura base para crear 5 productos reales.',
                ctaEnter: 'ENTRAR A LA ACADEMIA',
                ctaMissions: 'VER MISIONES'
            },
            concept: {
                title: '¿Qué es Anti-Gravity?',
                description: 'Olvídate de los scripts sueltos y prompts básicos. Anti-Gravity es una arquitectura robusta de 4 capas diseñada para construir sistemas de IA profesionales.',
                card1Title: 'Arquitectura 4-Capas',
                card1Desc: 'Directivas, Orquestación, Ejecución y Observabilidad. Separa responsabilidades como un ingeniero senior.',
                card2Title: 'Agentes Reales',
                card2Desc: 'Pasa de chatear con bots a orquestar obreros digitales que generan valor real sin supervisión.',
                card3Title: 'Production-Ready',
                card3Desc: 'No construimos demos. Construimos aplicaciones escalables con manejo de errores y logs.'
            },
            sinHumo: {
                title: 'Foco en la ejecución. Solo sistemas funcionales.',
                subtitle: 'Anti-Gravity no es otro curso más. Es un entorno de entrenamiento interactivo donde aplicas el sistema de 4 capas en tiempo real.',
                card1Title: 'Ejecución Práctica',
                card1Desc: 'Construye soluciones autónomas que resuelven problemas reales paso a paso.',
                card2Title: 'Arquitectura Replicable',
                card2Desc: 'Domina el framework que puedes copiar y pegar para tus propios proyectos comerciales.'
            },
            curriculum: {
                title: 'Ecosistema de Módulos',
                mod1Title: 'Single Agent Mastery',
                mod1Desc: 'Cómo diseñar Directivas invencibles que fuerzan a la IA a seguir flujos lógicos estrictos sin alucinaciones.',
                mod2Title: 'Orquestación Multi-Agente',
                mod2Desc: 'Crea ejércitos de especialistas (Arquitecto, Programador, Tester) que colaborar en paralelo para entregar productos finales.',
                mod3Title: 'Herramientas & Memoria (RAG)',
                mod3Desc: 'Conecta tus agentes al mundo real con MCP y dales memoria infinita usando bases de datos vectoriales.'
            },
            demo: {
                title: 'Mira el sistema en acción',
                subtitle: 'Antigravity inicializa enjambres de agentes expertos en segundos.'
            },
            roadmap: {
                badge: 'TU RUTA DE APRENDIZAJE',
                title: 'Misiones Academy',
                subtitle: 'No es teoría pasiva. Descubre la EXPERIÊNCIA INTERACTIVA onde você desbloqueia níveis e obtém equipamentos digitais reais.',
                step1Title: "The Architect's Core",
                step1Desc: 'Instalación del kernel Antigravity y diseño de la primera red de agentes.',
                step2Title: 'Cognitive Swarms',
                step2Desc: 'Orquestación de agentes con memoria a corto y largo plazo (Vector DBs).',
                step3Title: 'Tool Mastering',
                step3Desc: 'Integración de MCPs y herramientas externas para que la IA actúe en el mundo real.',
                step4Title: 'Final Deployment',
                step4Desc: 'Despliegue total de un producto SaaS autónomo operado al 100% por agentes.'
            },
            architect: {
                subtitle: 'arquitectura robusta de 4 capas diseñada para construir sistemas de IA profesionales.'
            },
            landing: {
                packTitle: 'Consigue el Pack Completo',
                packSub: 'La plataforma interactiva junto con el material de referencia definitivo.',
                ebookTitle: 'EbookPack Pro',
                lifetime: 'ACCESO DE POR VIDA',
                feature1: 'Plataforma Interactiva (8 Niveles)',
                feature2: 'Ebook "Arquitectura de Agentes" (PDF)',
                feature3: 'Workshop: 2 Horas de Video Deep-Dive',
                feature4: 'Repo Base: Todos los Agentes IA',
                regularPrice: 'Regular: $49',
                savings: 'Ahorro 80%',
                ctaBuy: 'Obtener Acceso Total',
                guarantee: 'Pago único. Sin suscripciones. Garantía 14 días.'
            },
            dashboard: {
                welcome: 'Comandante',
                statusLabel: 'Estado del Sistema',
                online: 'ONLINE',
                currentRank: 'Rango Actual',
                accumulatedXp: 'XP Acumulado',
                dailyStreak: 'Racha Diaria',
                badges: 'Insignias',
                levelProgress: 'Progreso de Nivel',
                xpMissing: 'Faltan',
                forNextRank: 'para el siguiente rango',
                trainingModules: 'Módulos de Entrenamiento',
                moduleCompleted: 'COMPLETADO',
                moduleInProgress: 'EN PROGRESO',
                moduleBlocked: 'BLOQUEADO',
                trophyHall: 'Salón de Trofeos',
                resetProgress: 'Resetear Progreso de la Academia (Dev Mode)',
                available: 'Disponible',
                locked: 'Bloqueado',
                reviewModule: 'Repasar Módulo',
                continueMission: 'Continuar Misión',
                emptyBadges: 'Completa misiones para ganar insignias...',
                resetConfirm: '¿ESTÁS SEGURO? Esto borrará todo tu progreso, XP y medallas. Esta acción no se puede deshacer.'
            },
            ranks: {
                'Recluta': 'Recluta',
                'Cadete': 'Cadete',
                'Piloto': 'Piloto',
                'Capitán': 'Capitán',
                'Comandante': 'Comandante',
                'Arquitecto Maestro': 'Arquitecto Maestro'
            },
            modules: {
                'module-0': {
                    title: 'Fase 0: El Origen / Estructura',
                    desc: 'Construye y organiza la arquitectura base de tus proyectos antes de despegar.'
                },
                'module-1': {
                    title: 'Fase 1: Las 4 Capas',
                    desc: 'Domina la arquitectura fundamental de la nueva era de agentes.'
                },
                'module-2': {
                    title: 'Fase 2: Arquitectura Avanzada',
                    desc: 'Skills, MCP y ejecución paralela de alto rendimiento.'
                },
                'module-3': {
                    title: 'Fase 3: Sinergia y Flujos',
                    desc: 'Patrones de diseño avanzados y colaboración Humano-IA.'
                }
            }
        },
        en: {
            nav: {
                home: 'Home',
                methodology: 'Methodology',
                curriculum: 'Curriculum',
                product: 'Product',
                startNow: 'Start Now',
                starMap: 'Star Map',
                commandShip: 'Command Ship'
            },
            hero: {
                badge: 'Interactive Agents Platform',
                subtitle: 'Academy v2.0 // Interactive Platform',
                headlineMain: 'Antigravity: The Orchestrator',
                headlineSub: 'of Intelligent Agents',
                subHeadline: 'High-Level Replicable Architectures',
                description: 'Real-time missions, live practice, and base architecture to build 5 real products.',
                ctaEnter: 'ENTER THE ACADEMY',
                ctaMissions: 'VIEW MISSIONS'
            },
            concept: {
                title: 'What is Anti-Gravity?',
                description: 'Forget loose scripts and basic prompts. Anti-Gravity is a robust 4-layer architecture designed to build professional AI systems.',
                card1Title: '4-Layer Architecture',
                card1Desc: 'Directives, Orchestration, Execution, and Observability. Separate responsibilities like a senior software engineer.',
                card2Title: 'Real Agents',
                card2Desc: 'Go from chatting with bots to orchestrating digital workers that generate code, art, and complex logic without constant supervision.',
                card3Title: 'Production-Ready',
                card3Desc: 'We don\'t build demos. We build scalable applications with error handling, logs, and automatic deployment.'
            },
            sinHumo: {
                title: 'Focus on execution. Functional systems only.',
                subtitle: 'Anti-Gravity is not just another course. It is an interactive training environment where you apply the 4-layer system in real time.',
                card1Title: 'Practical Execution',
                card1Desc: 'Build autonomous solutions that solve real-world problems step by step.',
                card2Title: 'Replicable Architecture',
                card2Desc: 'Master the framework you can copy and paste for your own commercial projects.'
            },
            curriculum: {
                title: 'Module Ecosystem',
                mod1Title: 'Single Agent Mastery',
                mod1Desc: 'How to design invincible Directives that force AI to follow strict logical flows without hallucinations.',
                mod2Title: 'Multi-Agent Orchestration',
                mod2Desc: 'Create armies of specialists (Architect, Developer, Tester) that collaborate in parallel to deliver final products.',
                mod3Title: 'Tools & Memory (RAG)',
                mod3Desc: 'Connect your agents to the real world with MCP and give them infinite memory using vector databases.'
            },
            demo: {
                title: 'See the system in action',
                subtitle: 'Antigravity initializes expert agent swarms in seconds.'
            },
            roadmap: {
                badge: 'YOUR LEARNING PATH',
                title: 'Academy Missions',
                subtitle: 'Not passive theory. Discover the INTERACTIVE EXPERIENCE where you unlock levels and get real digital equipment.',
                step1Title: "The Architect's Core",
                step1Desc: 'Installation of the Antigravity kernel and design of the first agent network.',
                step2Title: 'Cognitive Swarms',
                step2Desc: 'Orchestration of agents with short and long-term memory (Vector DBs).',
                step3Title: 'Tool Mastering',
                step3Desc: 'Integration of MCPs and external tools for AI to act in the real world.',
                step4Title: 'Final Deployment',
                step4Desc: 'Total deployment of an autonomous SaaS product operated 100% by agents.'
            },
            architect: {
                subtitle: 'robust 4-layer architecture designed to build professional AI systems.'
            },
            landing: {
                packTitle: 'Get the Complete Pack',
                packSub: 'The interactive platform along with the definitive reference material.',
                ebookTitle: 'EbookPack Pro',
                lifetime: 'LIFETIME ACCESS',
                feature1: 'Interactive Platform (8 Levels)',
                feature2: 'Ebook "Agent Architecture" (PDF)',
                feature3: 'Workshop: 2 Hours Deep-Dive Video',
                feature4: 'Base Repo: All AI Agents',
                regularPrice: 'Regular: $49',
                savings: 'Save 80%',
                ctaBuy: 'Get Total Access',
                guarantee: 'One-time payment. No subscriptions. 14-day guarantee.'
            },
            dashboard: {
                welcome: 'Commander',
                statusLabel: 'System Status',
                online: 'ONLINE',
                currentRank: 'Current Rank',
                accumulatedXp: 'Accumulated XP',
                dailyStreak: 'Daily Streak',
                badges: 'Badges',
                levelProgress: 'Level Progress',
                xpMissing: '',
                forNextRank: 'XP left for next rank',
                trainingModules: 'Training Modules',
                moduleCompleted: 'COMPLETED',
                moduleInProgress: 'IN PROGRESS',
                moduleBlocked: 'LOCKED',
                trophyHall: 'Trophy Hall',
                resetProgress: 'Reset Academy Progress (Dev Mode)',
                available: 'Available',
                locked: 'Locked',
                reviewModule: 'Review Module',
                continueMission: 'Continue Mission',
                emptyBadges: 'Complete missions to earn badges...',
                resetConfirm: 'ARE YOU SURE? This will clear all progress, XP, and badges. This action cannot be undone.'
            },
            ranks: {
                'Recluta': 'Recruit',
                'Cadete': 'Cadet',
                'Piloto': 'Pilot',
                'Capitán': 'Captain',
                'Comandante': 'Commander',
                'Arquitecto Maestro': 'Master Architect'
            },
            modules: {
                'module-0': {
                    title: 'Phase 0: Origin / Structure',
                    desc: 'Build and organize the base architecture of your projects before take-off.'
                },
                'module-1': {
                    title: 'Phase 1: The 4 Layers',
                    desc: 'Master the fundamental architecture of the new era of agents.'
                },
                'module-2': {
                    title: 'Phase 2: Advanced Architecture',
                    desc: 'Skills, MCP, and high-performance parallel execution.'
                },
                'module-3': {
                    title: 'Phase 3: Synergy and Flows',
                    desc: 'Advanced design patterns and Human-AI collaboration.'
                }
            }
        },
        pt: {
            nav: {
                home: 'Início',
                methodology: 'Metodologia',
                curriculum: 'Currículo',
                product: 'Produto',
                startNow: 'Começar Agora',
                starMap: 'Mapa Estelar',
                commandShip: 'Nave de Comando'
            },
            hero: {
                badge: 'Plataforma Interativa de Agentes',
                subtitle: 'Academy v2.0 // Interactive Platform',
                headlineMain: 'Antigravity: O Orquestrador',
                headlineSub: 'de Agentes Inteligentes',
                subHeadline: 'Arquiteturas Replicáveis de Alto Nível',
                description: 'Missões em tempo real, prática ao vivo e arquitetura base para criar 5 produtos reais.',
                ctaEnter: 'ENTRAR NA ACADEMIA',
                ctaMissions: 'VER MISSÕES'
            },
            concept: {
                title: 'O que é Anti-Gravity?',
                description: 'Esqueça scripts soltos e prompts básicos. Anti-Gravity é uma arquitetura robusta de 4 camadas projetada para construir sistemas de IA profissionais.',
                card1Title: 'Arquitetura de 4 Camadas',
                card1Desc: 'Diretrizes, Orquestração, Execução e Observabilidade. Separe responsabilidades como um engenheiro de software sênior.',
                card2Title: 'Agentes Reais',
                card2Desc: 'Passe de conversar com bots para orquestrar trabalhadores digitais que geram código, arte e lógica complexa sem supervisão constante.',
                card3Title: 'Pronto para Produção',
                card3Desc: 'Não construímos demos. Construímos aplicações escaláveis com tratamento de erros, logs e implantação automática.'
            },
            sinHumo: {
                title: 'Foco na execução. Apenas sistemas funcionais.',
                subtitle: 'Anti-Gravity não é apenas mais um curso. É um ambiente de treinamento interativo onde você aplica o sistema de 4 camadas em tempo real.',
                card1Title: 'Execução Prática',
                card1Desc: 'Construa soluções autônomas que resolvem problemas reais passo a passo.',
                card2Title: 'Arquitetura Replicável',
                card2Desc: 'Domine o framework que você pode copiar e colar para seus próprios projetos comerciais.'
            },
            curriculum: {
                title: 'Ecossistema de Módulos',
                mod1Title: 'Mestre em Agente Único',
                mod1Desc: 'Como projetar Diretrizes invencíveis que forçam a IA a seguir fluxos lógicos estritos sem alucinações.',
                mod2Title: 'Orquestração Multi-Agente',
                mod2Desc: 'Crie exércitos de especialistas (Arquiteto, Desenvolvedor, Tester) que colaboram em paralelo para entregar produtos finais.',
                mod3Title: 'Ferramentas & Memória (RAG)',
                mod3Desc: 'Conecte seus agentes ao mundo real com MCP e dê a eles memória infinita usando bancos de dados vetoriais.'
            },
            demo: {
                title: 'Veja o sistema em acción',
                subtitle: 'Antigravity inicializa enxames de agentes especialistas em segundos.'
            },
            roadmap: {
                badge: 'SEU CAMINHO DE APRENDIZAGEM',
                title: 'Missões Academy',
                subtitle: 'Não é teoria pasiva. Descubra a EXPERIÊNCIA INTERATIVA onde você desbloqueia níveis e obtém equipamentos digitais reais.',
                step1Title: "The Architect's Core",
                step1Desc: 'Instalação do kernel Antigravity e design da primeira rede de agentes.',
                step2Title: 'Swarms Cognitivos',
                step2Desc: 'Orquestração de agentes con memória de curto e longo prazo (Vector DBs).',
                step3Title: 'Domínio de Ferramentas',
                step3Desc: 'Integração de MCPs e ferramentas externas para que a IA atue no mundo real.',
                step4Title: 'Implantação Final',
                step4Desc: 'Implantação total de um produto SaaS autônomo operado 100% por agentes.'
            },
            architect: {
                subtitle: 'arquitetura robusta de 4 camadas projetada para construir sistemas de IA profissionais.'
            },
            landing: {
                packTitle: 'Consiga o Pack Completo',
                packSub: 'A plataforma interativa junto com o material de referencia definitivo.',
                ebookTitle: 'EbookPack Pro',
                lifetime: 'ACESSO VITALÍCIO',
                feature1: 'Plataforma Interativa (8 Níveis)',
                feature2: 'Ebook "Arquitetura de Agentes" (PDF)',
                feature3: 'Workshop: 2 Horas de Vídeo Deep-Dive',
                feature4: 'Repo Base: Todos os Agentes IA',
                regularPrice: 'Regular: $49',
                savings: 'Economia 80%',
                ctaBuy: 'Obter Acesso Total',
                guarantee: 'Pagamento único. Sem assinaturas. Garantia de 14 dias.'
            },
            dashboard: {
                welcome: 'Comandante',
                statusLabel: 'Estado do Sistema',
                online: 'ONLINE',
                currentRank: 'Rango Atual',
                accumulatedXp: 'XP Acumulado',
                dailyStreak: 'Racha Diaria',
                badges: 'Insígnias',
                levelProgress: 'Progresso do Nível',
                xpMissing: 'Faltam',
                forNextRank: 'para o próximo rank',
                trainingModules: 'Módulos de Treinamento',
                moduleCompleted: 'CONCLUÍDO',
                moduleInProgress: 'EM PROGRESSO',
                moduleBlocked: 'BLOQUEADO',
                trophyHall: 'Salão de Trofeos',
                resetProgress: 'Resetar Progresso da Academia (Modo Dev)',
                available: 'Disponível',
                locked: 'Bloqueado',
                reviewModule: 'Revisar Módulo',
                continueMission: 'Continuar Missão',
                emptyBadges: 'Complete missões para ganhar insígnias...',
                resetConfirm: 'VOCÊ TEM CERTEZA? Isso limpará todo o seu progresso, XP e medalhas. Esta ação não pode ser desfeita.'
            },
            ranks: {
                'Recluta': 'Recruta',
                'Cadete': 'Cadete',
                'Piloto': 'Piloto',
                'Capitán': 'Capitão',
                'Comandante': 'Comandante',
                'Arquitecto Maestro': 'Arquiteto Mestre'
            },
            modules: {
                'module-0': {
                    title: 'Fase 0: Origem / Estrutura',
                    desc: 'Construa e organize a arquitetura base de seus projetos antes de decolar.'
                },
                'module-1': {
                    title: 'Fase 1: As 4 Camadas',
                    desc: 'Domine a arquitetura fundamental da nova era de agentes.'
                },
                'module-2': {
                    title: 'Fase 2: Arquitetura Avançada',
                    desc: 'Skills, MCP e execução paralela de alto desempenho.'
                },
                'module-3': {
                    title: 'Fase 3: Sinergia e Fluxos',
                    desc: 'Padrões de design avançados e colaboração Humano-IA.'
                }
            }
        }
    }

    // Estado persistente del idioma
    const currentLocale = ref(localStorage.getItem('antigravity-locale') || 'es')

    // Función de traducción simple
    const t = (path) => {
        const keys = path.split('.')
        let result = translations[currentLocale.value]

        for (const key of keys) {
            if (result && result[key]) {
                result = result[key]
            } else {
                return path // Fallback al path si no existe la traducción
            }
        }
        return result
    }

    // Cambiar idioma
    const setLocale = (locale) => {
        if (translations[locale]) {
            currentLocale.value = locale
            localStorage.setItem('antigravity-locale', locale)
        }
    }

    return {
        currentLocale,
        t,
        setLocale,
        availableLocales: ['es', 'en', 'pt']
    }
})
