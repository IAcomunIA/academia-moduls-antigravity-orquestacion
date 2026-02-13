// Store de gamificación: badges, racha diaria, misiones
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// Catálogo completo de badges disponibles
const CATALOGO_BADGES = [
    { id: 'recluta-espacial', nombre: 'Recluta Espacial', descripcion: 'Completar onboarding', icono: '🎖️', rareza: 'comun' },
    { id: 'navegante', nombre: 'Navegante', descripcion: 'Completar primer nivel', icono: '🧭', rareza: 'comun' },
    { id: 'arquitecto-directivas', nombre: 'Arquitecto de Directivas', descripcion: 'Dominar Módulo 1 Nivel 1', icono: '🏆', rareza: 'raro' },
    { id: 'maestro-orquestador', nombre: 'Maestro Orquestador', descripcion: 'Dominar Módulo 1 Nivel 2', icono: '⚡', rareza: 'raro' },
    { id: 'constructor-agentes', nombre: 'Constructor de Agentes', descripcion: 'Dominar Módulo 1 Nivel 3', icono: '🤖', rareza: 'raro' },
    { id: 'comunicador-experto', nombre: 'Comunicador Experto', descripcion: 'Dominar Módulo 1 Nivel 4', icono: '📊', rareza: 'raro' },
    { id: 'arquitecto-agentes', nombre: 'Arquitecto de Agentes', descripcion: 'Dominar Módulo 3 Nivel 9', icono: '🧬', rareza: 'raro' },
    { id: 'arquitecto-patrones', nombre: 'Maestro de Patrones', descripcion: 'Dominar Módulo 3 Nivel 10', icono: '🔄', rareza: 'raro' },
    { id: 'maestro-control', nombre: 'Maestro de Control', descripcion: 'Dominar Módulo 3 Nivel 11', icono: '⚖️', rareza: 'raro' },
    { id: 'explorador-4-capas', nombre: 'Explorador de las 4 Capas', descripcion: 'Completar Módulo 1', icono: '🌟', rareza: 'epico' },
    { id: 'dedicado', nombre: 'Dedicado', descripcion: '7 días consecutivos', icono: '🔥', rareza: 'epico' },
    { id: 'perfeccionista', nombre: 'Perfeccionista', descripcion: 'Todos los niveles con 3 estrellas', icono: '⭐', rareza: 'legendario' },
    { id: 'sin-ayuda', nombre: 'Autodidacta', descripcion: 'Completar un nivel sin hints', icono: '💪', rareza: 'raro' }
]

export const useGameStore = defineStore('game', () => {
    // === Estado ===
    const badgesDesbloqueados = ref([]) // IDs de badges obtenidos
    const streak = ref(0) // Días consecutivos
    const lastPlayDate = ref(null) // Último día jugado
    const badgePendiente = ref(null) // Badge recién desbloqueado (para notificación)

    // === Computed ===

    // Badges completos con info del catálogo
    const badgesConInfo = computed(() => {
        return CATALOGO_BADGES.map(badge => ({
            ...badge,
            desbloqueado: badgesDesbloqueados.value.includes(badge.id)
        }))
    })

    // Total de badges desbloqueados
    const totalBadges = computed(() => badgesDesbloqueados.value.length)

    // Progreso de badges (porcentaje)
    const progresoBadges = computed(() => {
        return Math.round((totalBadges.value / CATALOGO_BADGES.length) * 100)
    })

    // === Acciones ===

    // Desbloquear un badge nuevo
    function unlockBadge(badgeId) {
        if (badgesDesbloqueados.value.includes(badgeId)) return false // Ya lo tiene

        const badge = CATALOGO_BADGES.find(b => b.id === badgeId)
        if (!badge) return false

        badgesDesbloqueados.value.push(badgeId)
        badgePendiente.value = badge // Activar notificación
        guardarEnLocalStorage()
        return true
    }

    // Limpiar notificación de badge
    function limpiarBadgePendiente() {
        badgePendiente.value = null
    }

    // Actualizar racha diaria
    function updateStreak() {
        const hoy = new Date().toDateString()

        if (lastPlayDate.value === hoy) return // Ya jugó hoy

        const ayer = new Date()
        ayer.setDate(ayer.getDate() - 1)

        if (lastPlayDate.value === ayer.toDateString()) {
            // Día consecutivo
            streak.value++
        } else if (lastPlayDate.value !== hoy) {
            // Se rompió la racha
            streak.value = 1
        }

        lastPlayDate.value = hoy

        // Badge de dedicación a 7 días
        if (streak.value >= 7) {
            unlockBadge('dedicado')
        }

        guardarEnLocalStorage()
    }

    // Persistencia
    function guardarEnLocalStorage() {
        const data = {
            badgesDesbloqueados: badgesDesbloqueados.value,
            streak: streak.value,
            lastPlayDate: lastPlayDate.value
        }
        localStorage.setItem('antigravity-game', JSON.stringify(data))
    }

    function cargarDesdeLocalStorage() {
        const raw = localStorage.getItem('antigravity-game')
        if (!raw) return

        try {
            const data = JSON.parse(raw)
            badgesDesbloqueados.value = data.badgesDesbloqueados || []
            streak.value = data.streak || 0
            lastPlayDate.value = data.lastPlayDate || null
        } catch {
            // Datos corruptos, ignorar
        }
    }

    // Resetear todo
    function resetear() {
        badgesDesbloqueados.value = []
        streak.value = 0
        lastPlayDate.value = null
        badgePendiente.value = null
        localStorage.removeItem('antigravity-game')
    }

    // Cargar al iniciar
    cargarDesdeLocalStorage()

    return {
        // Estado
        badgesDesbloqueados,
        streak,
        lastPlayDate,
        badgePendiente,
        // Computed
        badgesConInfo,
        totalBadges,
        progresoBadges,
        // Acciones
        unlockBadge,
        limpiarBadgePendiente,
        updateStreak,
        guardarEnLocalStorage,
        cargarDesdeLocalStorage,
        resetear
    }
})
