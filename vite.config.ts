import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import {VitePWA} from 'vite-plugin-pwa';

dotenv.config();
export default defineConfig({
    plugins: [
        react(),
        VitePWA(//
            {//
                registerType: "autoUpdate", // This is valid as long as it's one of the accepted types
                // add this to cache all the imports
                workbox: {
                    globPatterns: ["**/*"],
                },
                // add this to cache all the
                // static assets in the public folder
                includeAssets: [
                    "**/*",
                ],
                manifest: {
                    name: "نمارنگ",
                    short_name: "نمارنگ",
                    description: "نمارنگ سفارش سریع حروف",
                    icons: [
                        {
                            src: "./android-chrome-192x192.png",
                            sizes: "192x192",
                            type: "image/png",
                        },
                        {
                            src: "./android-chrome-512x512.png",
                            sizes: "512x512",
                            type: "image/png",
                            purpose: 'favicon',
                        },
                        {
                            src: "/apple-touch-icon.png",
                            sizes: '180x180',
                            type: "image/png",
                            purpose: 'apple touch icon',
                        },
                        {
                            src: "./android-chrome-192x192.png",
                            sizes: "144x144",
                            type: "image/png",
                            purpose: "any",
                        },
                        {
                            src: "./android-chrome-512x512.png",
                            sizes: "256x256",
                            type: "image/png",
                            purpose: "icon",
                        },
                        {
                            src: "./android-chrome-512x512.png",
                            sizes: "384x384",
                            type: "image/png",
                            purpose: "any maskable",
                        },
                    ],
                    theme_color: "#181818",
                    background_color: "#000c40",
                    display: "standalone",
                    scope: "/",
                    start_url: "/",
                    orientation: "portrait",
                },
            }//
        )//
    ],
    define: {
        'process.env': process.env,
    },
});
