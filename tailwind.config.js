import scrollbarHide from 'tailwind-scrollbar-hide';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        bara_sodomy: '#222C59',
        bara_gray_5: '#646D8F',
        bara_gray_4: '#9098B3',
        bara_gray_3: '#B5BCD2',
        bara_gray_2: '#DBE2F1',
        bara_gray_1: '#EDF2FA',
        bara_light_sky_blue: '#BCE9FF',
        bara_light_blue: '#B8C5FF',
        bara_pink: '#D68FF2',
        bara_blue: '#3F5FEC',
        bara_sky_blue: '#3EB2EA',
      },
      spacing: {
        '27': '27rem',
      },
      fontFamily: {
        sans: ['"Noto Sans KR"', 'sans-serif'],
      },
      fontWeight: {
        light: 300,
        medium: 500,
      },
    },
  },
  plugins: [
    scrollbarHide, // 플러그인 추가
  ],
};
