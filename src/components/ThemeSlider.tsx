import type { ChangeEvent, useState, useEffect } from 'react'

export type Theme = 'light' | 'pastel-pink' | 'pastel-brown' | 'dim' | 'dark'

const themes: Theme[] = ['light', 'pastel-pink', 'pastel-brown', 'dim', 'dark']
interface ThemeSliderProps {
  theme: Theme
  onChange: (theme: Theme) => void
}

export function ThemeSlider({ theme, onChange }: ThemeSliderProps) {
  const value = themes.indexOf(theme)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(themes[Number(event.target.value)])
  }

  return (
    <div className="theme-slider">
      <div className="theme-slider-heading">
        <span className="font-semibold">Appearance</span>
        <span className="theme-current">{theme}</span>
      </div>

      <input
        aria-label="Choose appearance"
        aria-valuetext={theme}
        type="range"
        min={0}
        max={2}
        step={1}
        value={value}
        onChange={handleChange}
        className="theme-range"
      />

      <div className="theme-labels">
        {themes.map((option, index) => (
          <button
            key={option}
            type="button"
            aria-pressed={theme === option}
            onClick={() => onChange(option)}
            className={theme === option ? 'theme-label active' : 'theme-label'}
          >
            {
              [
                '☀ Light',
                '🌸 Pastel Pink',
                '🟤 Pastel Brown',
                '◐ Dim',
                '☾ Dark',
              ][index]
            }
          </button>
        ))}
      </div>
    </div>
  )
}
