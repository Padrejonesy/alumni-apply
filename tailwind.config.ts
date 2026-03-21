import type { Config } from "tailwindcss";

export default {
	darkMode: "class",
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
			padding: '1rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter var', 'Inter', 'system-ui', 'sans-serif'],
				serif: ['"Playfair Display"', 'Georgia', 'serif'],
			},
			fontSize: {
				'xs': '0.75rem',
				'sm': '0.875rem',
				'base': '1rem',
				'lg': '1.125rem',
				'xl': '1.25rem',
				'2xl': '1.5rem',
				'3xl': '1.875rem',
				'4xl': '2.25rem',
				'5xl': '3rem',
				'6xl': '3.75rem',
				'7xl': '4.5rem',
				'8xl': '6rem',
				'9xl': '8rem',
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				gold: {
					50: 'hsl(var(--gold-50))',
					100: 'hsl(var(--gold-100))',
					200: 'hsl(var(--gold-200))',
					300: 'hsl(var(--gold-300))',
					400: 'hsl(var(--gold-400))',
					500: 'hsl(var(--gold-500))',
					600: 'hsl(var(--gold-600))',
					700: 'hsl(var(--gold-700))',
					800: 'hsl(var(--gold-800))',
					900: 'hsl(var(--gold-900))',
					950: 'hsl(var(--gold-950))',
				},
				platinum: {
					50: 'hsl(var(--platinum-50))',
					100: 'hsl(var(--platinum-100))',
					200: 'hsl(var(--platinum-200))',
					300: 'hsl(var(--platinum-300))',
					400: 'hsl(var(--platinum-400))',
					500: 'hsl(var(--platinum-500))',
					600: 'hsl(var(--platinum-600))',
					700: 'hsl(var(--platinum-700))',
					800: 'hsl(var(--platinum-800))',
					900: 'hsl(var(--platinum-900))',
					950: 'hsl(var(--platinum-950))',
				}
			},
			boxShadow: {
				'luxury': 'var(--shadow-2xl)',
				'gold': 'var(--shadow-gold)',
				'gold-lg': 'var(--shadow-gold-lg)',
				'platinum': 'var(--shadow-platinum)',
				'blue': 'var(--shadow-blue)',
				'teal': 'var(--shadow-teal)',
				'purple': 'var(--shadow-purple)',
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-gold': 'var(--gradient-gold)',
				'gradient-platinum': 'var(--gradient-platinum)',
				'gradient-gold-subtle': 'var(--gradient-gold-subtle)',
				'gradient-surface': 'var(--gradient-surface)',
				'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
				'gradient-blue': 'linear-gradient(135deg, hsl(var(--portal-blue)) 0%, hsl(var(--portal-blue-light)) 100%)',
				'gradient-teal': 'linear-gradient(135deg, hsl(var(--portal-teal)) 0%, hsl(var(--portal-teal-light)) 100%)',
				'gradient-purple': 'linear-gradient(135deg, hsl(var(--portal-purple)) 0%, hsl(var(--portal-purple-light)) 100%)',
				'gradient-rose': 'linear-gradient(135deg, hsl(var(--portal-rose)) 0%, hsl(var(--portal-rose-light)) 100%)',
				'gradient-emerald': 'linear-gradient(135deg, hsl(var(--portal-emerald)) 0%, hsl(var(--portal-emerald-light)) 100%)',
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
				'128': '32rem',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'scroll-left': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-100%)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'scroll-left': 'scroll-left 30s linear infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
