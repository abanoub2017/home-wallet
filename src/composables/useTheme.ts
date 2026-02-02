import { ref, watch, onMounted } from 'vue'

type Theme = 'light' | 'dark' | 'system'

const theme = ref<Theme>('system')
const isDark = ref(false)

export function useTheme() {
    const updateTheme = () => {
        const root = document.documentElement

        if (theme.value === 'system') {
            isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
        } else {
            isDark.value = theme.value === 'dark'
        }

        if (isDark.value) {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }

        // Update theme-color meta tag
        const themeColor = isDark.value ? '#1f2937' : '#6366f1'
        const metaThemeColor = document.querySelector('meta[name="theme-color"]')
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', themeColor)
        }
    }

    const setTheme = (newTheme: Theme) => {
        theme.value = newTheme
        localStorage.setItem('theme', newTheme)
        updateTheme()
    }

    const toggleTheme = () => {
        if (isDark.value) {
            setTheme('light')
        } else {
            setTheme('dark')
        }
    }

    const initTheme = () => {
        const savedTheme = localStorage.getItem('theme') as Theme | null
        if (savedTheme) {
            theme.value = savedTheme
        }
        updateTheme()

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            if (theme.value === 'system') {
                updateTheme()
            }
        })
    }

    return {
        theme,
        isDark,
        setTheme,
        toggleTheme,
        initTheme,
    }
}
