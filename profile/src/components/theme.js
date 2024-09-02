// themeManager.js

export const themes = {
    light: {
        id: 'light',
        name: 'Classic',
        colors: {
            'bg':'#fff',
            'bg2':'#f5f5f5',
            'word':'#000',
        },
    },
    dark: {
        id: 'dark',
        name: 'Dark',
        colors: {
            'bg':'#2d2c3e',
            'bg2':'#272633',
            'word':'#fff',
        },
    }
}

export const mapTheme = (variables) => {
    if (!variables) {
        return null
    }

    return {
        '--color-bg': variables.bg || '',
        '--color-bg2': variables.bg2 || '',
        '--color-inverted': variables.word || '',
    }
}

export const getInitialTheme = () => {
    const storedTheme = localStorage.getItem('theme')

    if (storedTheme) {
        return storedTheme
    }

    const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'

    return preferredTheme
}

export const applyTheme = (theme) => {
    const themeObject = mapTheme(themes[theme]?.colors)

    if (!themeObject) return

    localStorage.setItem('theme', theme)

    const root = document.documentElement

    Object.keys(themeObject).forEach((property) => {
        if (property === 'name') {
            return
        }

        root.style.setProperty(property, themeObject[property])
    })
}

export const toggleTheme = () => {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
};
