import vue from '@vitejs/plugin-vue';
import styleImport, { VantResolve } from 'vite-plugin-style-import';
import { defineConfig } from 'vite'

export default {
  plugins: [
    vue(),
    styleImport({
      resolves: [VantResolve()],
    }),
  ],
  server: {
    proxy: { // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
      // 正则表达式写法
      '^/api': {
        target: 'http://www.chengmingqi.cn:3000', // 后端服务实际地址
        changeOrigin: true, //开启代理
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
};
