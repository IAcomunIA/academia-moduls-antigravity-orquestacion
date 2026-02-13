// Configuración de rutas de Antigravity Academy
import { createRouter, createWebHistory } from 'vue-router'

// Vistas principales (Imports estáticos para mejor rendimiento en local)
import LandingView from '@/views/LandingView.vue'
import OnboardingView from '@/views/OnboardingView.vue'
import WorldMap from '@/views/WorldMap.vue'
import Dashboard from '@/views/Dashboard.vue'
import NotFound from '@/views/NotFound.vue'

// Módulo 1: Las 4 Capas (Lazy loading se mantiene para módulos)
const Module1Landing = () => import('@/modules/Module1FourLayers/Landing.vue')
const Level1Directives = () => import('@/modules/Module1FourLayers/Level1Directives.vue')
const Level2Orchestrator = () => import('@/modules/Module1FourLayers/Level2Orchestrator.vue')
const Level3Agents = () => import('@/modules/Module1FourLayers/Level3Agents.vue')
const Level4Output = () => import('@/modules/Module1FourLayers/Level4Output.vue')
const Module1Completion = () => import('@/modules/Module1FourLayers/Completion.vue')
const LevelBonusTools = () => import('@/modules/Module1FourLayers/LevelBonusTools.vue')

// Módulo 2: Habilidades Avanzadas
const Level5Skills = () => import('@/modules/Module2AdvancedSkills/Level5Skills.vue')
const Level6Parallel = () => import('@/modules/Module2AdvancedSkills/Level6Parallel.vue')
const Level7MCP = () => import('@/modules/Module2AdvancedSkills/Level7MCP.vue')
const Level8RAG = () => import('@/modules/Module2AdvancedSkills/Level8RAG.vue')

// Módulo 3: Sinergia
const Level9Config = () => import('@/modules/Module3Synergy/Level9Config.vue')
const Level10AdvancedAgents = () => import('@/modules/Module3Synergy/Level10AdvancedAgents.vue')
const Level11MultiAgent = () => import('@/modules/Module3Synergy/Level11MultiAgent.vue')

// Módulo 4: Arquitectura
const LevelBuilder = () => import('@/modules/Module4Architect/Builder.vue')

const routes = [
    {
        path: '/',
        name: 'Home',
        component: LandingView,
        meta: { title: 'Antigravity Academy', requiereOnboarding: false }
    },
    {
        path: '/onboarding',
        name: 'Onboarding',
        component: OnboardingView,
        meta: { title: 'Identificación de Piloto', requiereOnboarding: false }
    },
    {
        path: '/map',
        name: 'WorldMap',
        component: WorldMap,
        meta: { title: 'Mapa de Niveles', requiereOnboarding: true }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { title: 'Nave de Comando', requiereOnboarding: true }
    },
    // Módulo 1
    {
        path: '/module-1',
        name: 'Module1Landing',
        component: Module1Landing,
        meta: { title: 'Módulo 1: Las 4 Capas', requiereOnboarding: true }
    },
    {
        path: '/module-1/level-1',
        name: 'Level1Directives',
        component: Level1Directives,
        meta: { title: 'Nivel 1: Directivas', requiereOnboarding: true }
    },
    {
        path: '/module-1/level-2',
        name: 'Level2Orchestrator',
        component: Level2Orchestrator,
        meta: { title: 'Nivel 2: Orquestador', requiereOnboarding: true }
    },
    {
        path: '/module-1/level-3',
        name: 'Level3Agents',
        component: Level3Agents,
        meta: { title: 'Nivel 3: Agentes', requiereOnboarding: true }
    },
    {
        path: '/module-1/level-4',
        name: 'Level4Output',
        component: Level4Output,
        meta: { title: 'Nivel 4: Output', requiereOnboarding: true }
    },
    {
        path: '/module-1/completion',
        name: 'Module1Completion',
        component: Module1Completion,
        meta: { title: '¡Módulo 1 Completado!', requiereOnboarding: true }
    },
    {
        path: '/module-1/bonus-tools',
        name: 'LevelBonusTools',
        component: LevelBonusTools,
        meta: { title: 'Herramientas y Trucos', requiereOnboarding: true }
    },
    // Módulo 2
    {
        path: '/module-2/level-1',
        name: 'Level5Skills',
        component: Level5Skills,
        meta: { title: 'Nivel 5: Skills & Rules', requiereOnboarding: true }
    },
    {
        path: '/module-2/level-2',
        name: 'Level6Parallel',
        component: Level6Parallel,
        meta: { title: 'Nivel 6: Agentes en Paralelo', requiereOnboarding: true }
    },
    {
        path: '/module-2/level-3',
        name: 'Level7MCP',
        component: Level7MCP,
        meta: { title: 'Nivel 7: MCP & Tools', requiereOnboarding: true }
    },
    {
        path: '/module-2/level-4',
        name: 'Level8RAG',
        component: Level8RAG,
        meta: { title: 'Nivel 8: Memory & RAG', requiereOnboarding: true }
    },
    // Módulo 3
    {
        path: '/module-3/level-1',
        name: 'Level9Config',
        component: Level9Config,
        meta: { title: 'Nivel 9: Gestión de Agentes', requiereOnboarding: true }
    },
    // Módulo 0
    {
        path: '/module-0/builder',
        name: 'LevelBuilder',
        component: LevelBuilder,
        meta: { title: 'Taller de Arquitectura', requiereOnboarding: true }
    },
    // Ruta catch-all 404
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
        meta: { title: 'Página no encontrada', requiereOnboarding: false }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
    }
})

// === Función para verificar onboarding desde localStorage directamente ===
function verificarOnboarding() {
    try {
        const raw = localStorage.getItem('antigravity-user')
        if (!raw) return false
        const data = JSON.parse(raw)
        return data.onboardingCompleted === true
    } catch {
        return false
    }
}

// === Navigation Guard ===
router.beforeEach((to) => {
    const onboardingCompletado = verificarOnboarding()
    if (to.meta.requiereOnboarding && !onboardingCompletado) {
        return { name: 'Home' }
    }
})

// Actualizar título de la página
router.afterEach((to) => {
    document.title = `${to.meta.title || 'Antigravity Academy'} | Antigravity Academy`
})

export default router
