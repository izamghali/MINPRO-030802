/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
  theme: {
    screens: {
        'sm': '550px', // min-width: 550px
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
    },
    extend: {
        colors: {
            // accent: '#FFE9B9',
            accent: '#FDE047',
        },
        animation:{
            'shake': 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
        },
        keyframes: {
            'shake' : {
                '10%, 90%': {
                    transform: 'translate3d(-1px, 0, 0)'
                },
                '20%, 80%' : {
                    transform: 'translate3d(2px, 0, 0)'
                },
                '30%, 50%, 70%': {
                    transform: 'translate3d(-4px, 0, 0)'
                },
                '40%, 60%': {
                    transform: 'translate3d(4px, 0, 0)'
                }
            }
        },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ['light']
  }
}

