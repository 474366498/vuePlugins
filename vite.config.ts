import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
console.log(process.env.VITE_APP_BASE_API)
// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, 'src')
//     }
//   },
//   css: {
//     preprocessorOptions: {
//       scss: {
//         // additionalData: '@import "src/assets/styles/global.scss";'
//       }
//     }
//   }
// })

export default ({ command, mode }) => {
  const envConfig = loadEnv(mode, './');
  console.log(24, envConfig)
  let config: Object = {
    base: './',
    plugins: [vue()],
    optimizeDeps: {
      // include: ['schart.js']
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, 'src')
      }
    },
    server: {
      host: envConfig.VITE_HOST,
      port: envConfig.VITE_PORT,
      // 是否自动在浏览器打开
      open: true,
      // 是否开启 https
      https: false,
      // 服务端渲染
      ssr: false,
      base: envConfig.VITE_BASE_URL,
      outDir: envConfig.VITE_OUTPUT_DIR,
      define: {
        'process.env': {}
      }
    },
  };
  console.log(52, config)
  return defineConfig(config)
}


