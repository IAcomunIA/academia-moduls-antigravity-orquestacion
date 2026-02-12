/** @type {import('tailwindcss').Config} */
// Configuración de Tailwind basada en el skill estilo-marca de Antigravity
export default {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            // Paleta de colores del skill estilo-marca
            colors: {
                'deep-space': '#0A0E27',
                'dark-void': '#070A1F',
                'space-overlay': 'rgba(10,14,39,0.95)',
                'cyber-cyan': '#00F0FF',
                'neon-turquoise': '#00D9E8',
                'electric-blue': '#00C4FF',
                'deep-purple': '#6B46C1',
                'soft-purple': '#8B5CF6',
                'light-purple': '#A78BFA',
                'indigo-glow': '#6366F1',
                'neon-magenta': '#FF00FF',
                'neon-pink': '#FF006E',
                'white-glow': '#FFFFFF',
                'gray-mist': '#94A3B8',
                'gray-dim': '#64748B',
                'success-green': '#10B981',
                'warning-yellow': '#F59E0B',
                'error-red': '#EF4444',
                'info-blue': '#3B82F6',
            },
            // Tipografías del skill
            fontFamily: {
                heading: ['Orbitron', 'sans-serif'],
                body: ['Inter', 'sans-serif'],
                code: ['Fira Code', 'monospace'],
            },
            // Animaciones personalizadas
            animation: {
                'float': 'float 3s ease-in-out infinite',
                'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
                'slide-up': 'slide-up 0.3s ease-out',
                'fade-in': 'fade-in 0.25s ease-in',
                'twinkle': 'twinkle 2s ease-in-out infinite',
                'dash': 'dash 1s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'glow-pulse': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.6' },
                },
                'slide-up': {
                    from: { transform: 'translateY(20px)', opacity: '0' },
                    to: { transform: 'translateY(0)', opacity: '1' },
                },
                'fade-in': {
                    from: { opacity: '0' },
                    to: { opacity: '1' },
                },
                twinkle: {
                    '0%, 100%': { opacity: '0.3' },
                    '50%': { opacity: '1' },
                },
                dash: {
                    to: { strokeDashoffset: '-10' },
                },
            },
            // Sombras neón personalizadas
            boxShadow: {
                'glow-cyan': '0 0 20px rgba(0,240,255,0.5), inset 0 0 10px rgba(0,240,255,0.2)',
                'glow-cyan-lg': '0 0 30px rgba(0,240,255,0.6)',
                'glow-purple': '0 0 20px rgba(139,92,246,0.5), inset 0 0 10px rgba(139,92,246,0.2)',
                'glow-magenta': '0 0 20px rgba(255,0,255,0.5), inset 0 0 10px rgba(255,0,255,0.2)',
            },
            // Border radius personalizados
            borderRadius: {
                'card': '16px',
                'level': '20px',
                'character': '24px',
            },
        },
    },
    plugins: [],
}
