// Store de módulos educativos: progreso por nivel, estrellas, contenido
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './user'

// Estructura de datos de los Módulos
const MODULOS_DATOS = [
    {
        id: 'module-0',
        titulo: 'Fase 0: El Origen / Estructura',
        descripcion: 'Construye y organiza la arquitectura base de tus proyectos antes de despegar.',
        icono: '📐',
        requierePro: false,
        niveles: [
            {
                id: 'level-builder',
                titulo: 'Arquitecto de Proyecto',
                subtitulo: 'Drag & Drop Builder',
                icono: '🏗️',
                personaje: 'El Constructor',
                ruta: '/module-0/builder',
                xpRecompensa: 500,
                badgeId: 'maestro-arquitecto'
            }
        ]
    },
    {
        id: 'module-1',
        titulo: 'Fase 1: Las 4 Capas',
        descripcion: 'Domina la arquitectura fundamental de la nueva era de agentes.',
        icono: '🏗️',
        requierePro: true,
        niveles: [
            {
                id: 'level-1',
                titulo: 'Directivas',
                subtitulo: 'El Corazón del Agente',
                icono: '🏛️',
                personaje: 'El Maestro',
                ruta: '/module-1/level-1',
                xpRecompensa: 150,
                badgeId: 'arquitecto-directivas'
            },
            {
                id: 'level-2',
                titulo: 'Orquestador',
                subtitulo: 'El Director de la Orquesta',
                icono: '🎭',
                personaje: 'El Coordinador',
                ruta: '/module-1/level-2',
                xpRecompensa: 200,
                badgeId: 'maestro-orquestacion'
            },
            {
                id: 'level-3',
                titulo: 'Agentes',
                subtitulo: 'Los Especialistas',
                icono: '🤖',
                personaje: 'El Equipo',
                ruta: '/module-1/level-3',
                xpRecompensa: 150,
                badgeId: 'constructor-agentes'
            },
            {
                id: 'level-4',
                titulo: 'Output',
                subtitulo: 'La Presentación Perfecta',
                icono: '📡',
                personaje: 'El Comunicador',
                ruta: '/module-1/level-4',
                xpRecompensa: 150,
                badgeId: 'comunicador-experto'
            }
        ]
    },
    {
        id: 'module-2',
        titulo: 'Fase 2: Arquitectura Avanzada',
        descripcion: 'Skills, MCP y ejecución paralela de alto rendimiento.',
        icono: '⚙️',
        requierePro: true,
        niveles: [
            {
                id: 'level-5',
                titulo: 'Skills & Rules',
                subtitulo: 'El ADN del Agente',
                icono: '📜',
                personaje: 'El Guardián',
                ruta: '/module-2/level-1',
                xpRecompensa: 250,
                badgeId: 'arquitecto-skills'
            },
            {
                id: 'level-6',
                titulo: 'Agentes en Paralelo',
                subtitulo: 'Sincronización Masiva',
                icono: '⚡',
                personaje: 'La Mente Colmena',
                ruta: '/module-2/level-2',
                xpRecompensa: 250,
                badgeId: 'maestro-paralelo'
            },
            {
                id: 'level-7',
                titulo: 'MCP & Connectors',
                subtitulo: 'Acceso al Mundo Real',
                icono: '🔌',
                personaje: 'El Enlace',
                ruta: '/module-2/level-3',
                xpRecompensa: 300,
                badgeId: 'tecnico-mcp'
            },
            {
                id: 'level-8',
                titulo: 'Memory & RAG',
                subtitulo: 'Conocimiento Infinito',
                icono: '🧠',
                personaje: 'La Archivista',
                ruta: '/module-2/level-4',
                xpRecompensa: 300,
                badgeId: 'guardian-memoria'
            }
        ]
    },
    {
        id: 'module-3',
        titulo: 'Fase 3: Sinergia y Flujos',
        descripcion: 'Patrones de diseño avanzados y colaboración Humano-IA.',
        icono: '🤝',
        requierePro: true,
        niveles: [
            {
                id: 'level-9',
                titulo: 'Gestión de Agentes',
                subtitulo: 'Autonomía y Agent Manager',
                icono: '🎮',
                personaje: 'El Estratega',
                ruta: '/module-3/level-1',
                xpRecompensa: 400,
                badgeId: 'arquitecto-agentes'
            },
            {
                id: 'level-10',
                titulo: 'Patrones de Diseño',
                subtitulo: 'Chains, Routers & Loops',
                icono: '🔄',
                personaje: 'El Maestro',
                ruta: '/module-3/level-2',
                xpRecompensa: 400,
                badgeId: 'arquitecto-patrones'
            },
            {
                id: 'level-11',
                titulo: 'Human-in-the-loop',
                subtitulo: 'Supervisión y Control',
                icono: '👤',
                personaje: 'El Supervisor',
                ruta: '/module-3/level-3',
                xpRecompensa: 400,
                badgeId: 'maestro-control'
            }
        ]
    }
]

export const useModulesStore = defineStore('modules', () => {
    // === Estado ===
    const progreso = ref({})
    const nivelActual = ref(null)

    // === Computed ===

    // Módulos con progreso integrado
    const modulos = computed(() => {
        const userStore = useUserStore()

        return MODULOS_DATOS.map((modulo, mIndex) => {
            const nivelAnteriorModuloCompletado = mIndex === 0 ||
                modulos.value?.[mIndex - 1]?.niveles.every(n => progreso.value[n.id]?.completado) ||
                modulo.id === 'module-3' // Temporales para testing

            const bloqueadoPorPro = modulo.requierePro && !userStore.hasProAccess

            return {
                ...modulo,
                bloqueadoPorPro,
                desbloqueado: nivelAnteriorModuloCompletado && !bloqueadoPorPro,
                niveles: modulo.niveles.map((nivel, index) => {
                    const prog = progreso.value[nivel.id] || {}
                    const nivelAnterior = index > 0 ? modulo.niveles[index - 1] : null
                    const anteriorCompletado = !nivelAnterior || (progreso.value[nivelAnterior.id]?.completado)

                    const nivelDesbloqueado = (nivelAnteriorModuloCompletado || modulo.id === 'module-3') &&
                        (index === 0 || anteriorCompletado) &&
                        !bloqueadoPorPro

                    return {
                        ...nivel,
                        completado: prog.completado || false,
                        estrellas: prog.estrellas || 0,
                        hintsUsados: prog.hintsUsados || 0,
                        tiempoSegundos: prog.tiempoSegundos || 0,
                        desbloqueado: nivelDesbloqueado,
                        estado: prog.completado ? 'completado' : (nivelDesbloqueado) ? 'disponible' : 'bloqueado'
                    }
                })
            }
        })
    })

    // Alias para compatibilidad con código existente
    const modulo0 = computed(() => modulos.value.find(m => m.id === 'module-0'))
    const modulo1 = computed(() => modulos.value.find(m => m.id === 'module-1'))
    const modulo2 = computed(() => modulos.value.find(m => m.id === 'module-2'))

    const progresoModulo1 = computed(() => {
        const m = modulo1.value
        if (!m) return 0
        const completados = m.niveles.filter(n => n.completado).length
        return Math.round((completados / m.niveles.length) * 100)
    })

    const modulo1Completado = computed(() => progresoModulo1.value === 100)

    const siguienteNivel = computed(() => {
        for (const m of modulos.value) {
            if (!m.desbloqueado) continue
            const prox = m.niveles.find(n => !n.completado && n.desbloqueado)
            if (prox) return prox
        }
        return null
    })

    // === Acciones ===

    function completarNivel(nivelId, estrellas = 1, hintsUsados = 0, tiempoSegundos = 0) {
        const existente = progreso.value[nivelId]

        progreso.value = {
            ...progreso.value,
            [nivelId]: {
                completado: true,
                estrellas: Math.max(existente?.estrellas || 0, estrellas),
                hintsUsados: Math.min(existente?.hintsUsados ?? hintsUsados, hintsUsados),
                tiempoSegundos: tiempoSegundos,
                completadoEn: new Date().toISOString()
            }
        }

        guardarEnLocalStorage()
    }

    function calcularEstrellas(hintsUsados, errores) {
        if (hintsUsados === 0 && errores === 0) return 3
        if (hintsUsados <= 1 && errores <= 2) return 2
        return 1
    }

    function obtenerNivel(nivelId) {
        for (const m of modulos.value) {
            const n = m.niveles.find(lvl => lvl.id === nivelId)
            if (n) return n
        }
        return null
    }

    function guardarEnLocalStorage() {
        localStorage.setItem('antigravity-modules', JSON.stringify(progreso.value))
    }

    function cargarDesdeLocalStorage() {
        const raw = localStorage.getItem('antigravity-modules')
        if (!raw) return
        try {
            progreso.value = JSON.parse(raw)
        } catch {
            progreso.value = {}
        }
    }

    // Inicializar
    cargarDesdeLocalStorage()

    return {
        progreso,
        nivelActual,
        modulos,
        modulo0,
        modulo1,
        modulo2,
        progresoModulo1,
        modulo1Completado,
        siguienteNivel,
        completarNivel,
        calcularEstrellas,
        obtenerNivel,
        resetear: () => {
            progreso.value = {}
            localStorage.removeItem('antigravity-modules')
        }
    }
})
