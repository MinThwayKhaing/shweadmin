// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/hello%20shwe/shweadmin/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/hello%20shwe/shweadmin/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueDevTools from "file:///C:/hello%20shwe/shweadmin/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import pagesPlugin from "file:///C:/hello%20shwe/shweadmin/node_modules/vite-plugin-pages/dist/index.js";
var __vite_injected_original_import_meta_url = "file:///C:/hello%20shwe/shweadmin/vite.config.js";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    pagesPlugin({
      dirs: "src/pages"
      // Specify your folder here
    }),
    vueDevTools()
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxoZWxsbyBzaHdlXFxcXHNod2VhZG1pblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcaGVsbG8gc2h3ZVxcXFxzaHdlYWRtaW5cXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L2hlbGxvJTIwc2h3ZS9zaHdlYWRtaW4vdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCdcclxuXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5pbXBvcnQgdnVlRGV2VG9vbHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWRldnRvb2xzJ1xyXG5pbXBvcnQgcGFnZXNQbHVnaW4gZnJvbSAndml0ZS1wbHVnaW4tcGFnZXMnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIHZ1ZSgpLFxyXG4gICAgcGFnZXNQbHVnaW4oe1xyXG4gICAgICBkaXJzOiAnc3JjL3BhZ2VzJyAvLyBTcGVjaWZ5IHlvdXIgZm9sZGVyIGhlcmVcclxuICAgIH0pLFxyXG4gICAgdnVlRGV2VG9vbHMoKVxyXG4gIF0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcclxuICAgIH1cclxuICB9XHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBK1AsU0FBUyxlQUFlLFdBQVc7QUFFbFMsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8saUJBQWlCO0FBQ3hCLE9BQU8saUJBQWlCO0FBTG1JLElBQU0sMkNBQTJDO0FBUTVNLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLFlBQVk7QUFBQSxNQUNWLE1BQU07QUFBQTtBQUFBLElBQ1IsQ0FBQztBQUFBLElBQ0QsWUFBWTtBQUFBLEVBQ2Q7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
