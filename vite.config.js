import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // hoặc vue, tùy project
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
      // hoặc dùng @ nếu bạn thích
      // '@': path.resolve(__dirname, 'src'),
    },
  },
});
