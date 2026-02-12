// Store de usuario: progreso, XP, nivel, persistencia LocalStorage
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

// Definición de rangos según XP
const RANGOS = [
    { nombre: 'Recluta', minXP: 0, icono: '🔰' },
    { nombre: 'Cadete', minXP: 201, icono: '🎖️' },
    { nombre: 'Piloto', minXP: 501, icono: '✈️' },
    { nombre: 'Capitán', minXP: 1001, icono: '⭐' },
    { nombre: 'Comandante', minXP: 2001, icono: '🛡️' },
    { nombre: 'Arquitecto Maestro', minXP: 3501, icono: '👑' }
]

export const useUserStore = defineStore('user', () => {
    // === Estado ===
    const username = ref('')
    const xp = ref(0)
    const astronautColor = ref('cyan') // cyan, magenta, purple
    const experienceLevel = ref('nada') // nada, algo, bastante
    const onboardingCompleted = ref(false)
    const hasProAccess = ref(false)
    const createdAt = ref(null)

    // === Computed ===

    // Rango actual basado en XP
    const currentRank = computed(() => {
        let rank = RANGOS[0]
        for (const r of RANGOS) {
            if (xp.value >= r.minXP) rank = r
        }
        return rank.nombre
    })

    // Icono del rango actual
    const currentRankIcon = computed(() => {
        let rank = RANGOS[0]
        for (const r of RANGOS) {
            if (xp.value >= r.minXP) rank = r
        }
        return rank.icono
    })

    // Índice del rango actual (para calcular progreso al siguiente)
    const currentRankIndex = computed(() => {
        let idx = 0
        for (let i = 0; i < RANGOS.length; i++) {
            if (xp.value >= RANGOS[i].minXP) idx = i
        }
        return idx
    })

    // XP necesario para el siguiente rango
    const xpParaSiguienteRango = computed(() => {
        const nextIdx = currentRankIndex.value + 1
        if (nextIdx >= RANGOS.length) return xp.value // Ya es el máximo
        return RANGOS[nextIdx].minXP
    })

    // Progreso porcentual hacia el siguiente rango (0-100)
    const progresoRango = computed(() => {
        const currentMin = RANGOS[currentRankIndex.value].minXP
        const nextMin = xpParaSiguienteRango.value
        if (nextMin === currentMin) return 100
        return Math.min(100, Math.round(((xp.value - currentMin) / (nextMin - currentMin)) * 100))
    })

    // === Acciones ===

    // Añadir XP con validación
    function addXP(cantidad) {
        if (cantidad <= 0) return
        xp.value += cantidad
        guardarEnLocalStorage()
    }

    // Crear perfil de astronauta durante onboarding
    function crearPerfil(nombre, color, experiencia) {
        username.value = nombre
        astronautColor.value = color
        experienceLevel.value = experiencia
        onboardingCompleted.value = true
        createdAt.value = new Date().toISOString()
    }

    // Canjear código de invitado
    function redeemCode(code) {
        if (code === 'PACKPRO') {
            hasProAccess.value = true
            guardarEnLocalStorage()
            return true
        }
        return false
    }

    // Persistencia en LocalStorage
    function guardarEnLocalStorage() {
        const data = {
            username: username.value,
            xp: xp.value,
            astronautColor: astronautColor.value,
            experienceLevel: experienceLevel.value,
            onboardingCompleted: onboardingCompleted.value,
            hasProAccess: hasProAccess.value,
            createdAt: createdAt.value
        }
        localStorage.setItem('antigravity-user', JSON.stringify(data))
    }

    // Cargar datos desde LocalStorage
    function cargarDesdeLocalStorage() {
        const raw = localStorage.getItem('antigravity-user')
        if (!raw) return false

        try {
            const data = JSON.parse(raw)
            username.value = data.username || ''
            xp.value = data.xp || 0
            astronautColor.value = data.astronautColor || 'cyan'
            experienceLevel.value = data.experienceLevel || 'nada'
            onboardingCompleted.value = data.onboardingCompleted || false
            hasProAccess.value = data.hasProAccess || false
            createdAt.value = data.createdAt || null
            return true
        } catch {
            return false
        }
    }

    // Resetear todo (para testing/debug)
    function resetear() {
        username.value = ''
        xp.value = 0
        astronautColor.value = 'cyan'
        experienceLevel.value = 'nada'
        onboardingCompleted.value = false
        createdAt.value = null
        localStorage.removeItem('antigravity-user')
    }

    // Cargar datos al crear el store
    cargarDesdeLocalStorage()

    return {
        // Estado
        username,
        xp,
        astronautColor,
        experienceLevel,
        onboardingCompleted,
        createdAt,
        // Computed
        currentRank,
        currentRankIcon,
        currentRankIndex,
        xpParaSiguienteRango,
        progresoRango,
        // Acciones
        addXP,
        crearPerfil,
        guardarEnLocalStorage,
        cargarDesdeLocalStorage,
        resetear,
        redeemCode,
        hasProAccess
    }
})
