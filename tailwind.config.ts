import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
      extend: {
        perspective: {
          '1000': '1000px',
        },
        transform: {
          'preserve-3d': 'preserve-3d',
        },
        backfaceVisibility: {
          'hidden': 'hidden',
        },
        rotate: {
          'y-180': 'rotateY(180deg)',
        },
			fontFamily: {
				'inter': ['Inter', 'sans-serif'],
				'sora': ['Sora', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				'background-inverse': 'hsl(var(--background-inverse))',
				'foreground-inverse': 'hsl(var(--foreground-inverse))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					hover: 'hsl(var(--primary-hover))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				namespace: {
					black: 'hsl(var(--namespace-black))',
					white: 'hsl(var(--namespace-white))',
					purple: 'hsl(var(--namespace-purple))',
					'purple-light': 'hsl(var(--namespace-purple-light))',
					'purple-glow': 'hsl(var(--namespace-purple-glow))',
					blue: 'hsl(var(--namespace-blue))',
					pink: 'hsl(var(--namespace-pink))'
				},
				hackhazards: {
					'dark-bg': 'hsl(var(--hackhazards-dark-bg))',
					'darker-bg': 'hsl(var(--hackhazards-darker-bg))',
					'light-text': 'hsl(var(--hackhazards-light-text))',
					'muted-text': 'hsl(var(--hackhazards-muted-text))',
					'green-primary': 'hsl(var(--hackhazards-green-primary))',
					'green-bright': 'hsl(var(--hackhazards-green-bright))',
					'green-dark': 'hsl(var(--hackhazards-green-dark))',
					'green-light': 'hsl(var(--hackhazards-green-light))',
					'green-glow': 'hsl(var(--hackhazards-green-glow))',
					'border': 'hsl(var(--hackhazards-border))',
					'muted': 'hsl(var(--hackhazards-muted))'
				}
			},
			backgroundImage: {
				'gradient-orbital': 'var(--gradient-orbital)',
				'gradient-purple': 'var(--gradient-purple)'
			},
			boxShadow: {
				'elegant': 'var(--shadow-elegant)',
				'orbital': 'var(--shadow-orbital)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'orbital-float': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'50%': { transform: 'translateY(-20px) rotate(180deg)' }
				},
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(30px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				'scroll': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-50%)' }
				},
				'scroll-programs': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-50%)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'orbital-float': 'orbital-float 6s ease-in-out infinite',
				'fade-in-up': 'fade-in-up 0.6s ease-out',
				'scale-in': 'scale-in 0.5s ease-out',
				'scroll': 'scroll 30s linear infinite',
				'scroll-fast': 'scroll 20s linear infinite',
				'scroll-programs': 'scroll-programs 80s linear infinite'
			},
			transitionProperty: {
				'smooth': 'var(--transition-smooth)',
				'orbital': 'var(--transition-orbital)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
