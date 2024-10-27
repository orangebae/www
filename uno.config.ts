import { defineConfig, presetUno, presetAttributify, transformerDirectives } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify()
  ],
  transformers: [
    transformerDirectives()
  ],
  rules: [
    ["body-background", {background: "url('/background.jpg')"}],
    ["font-arial", { "font-family": "Arial" }],
    ["font-tahoma", { "font-family": "tahoma" }],
    ["header-body-color", { background: "blue", background: "linear-gradient(90deg, rgba(112, 205, 84, 1) 0%, rgba(0, 121, 215, 1) 69%)"}],
    ["header-bottom-color", { background: "#fcd600", background: "linear-gradient(90deg, rgba(0, 121, 215, 1) 35%, rgba(252, 214, 0, 1) 94%)"}]
  ],
  theme: {
    colors: {
      body: "rgba(255, 255, 255, 0.8)",
      navbar: "#021fac",
      navbarBorder: "#1b35b4",
      navbarMenu: "#bcb9bc",
      navbarMenuHover: "gray",
      headerBoxDefault: "#f3dbd0",
      headerBoxSecond: "#ffd8ac",
      headerBoxThird: "#e9bd2e",
      headerBoxFourth: "#ff7800",
      headerRightLine: "#fcd600",
      button: "#8a8a8a1d",
      footer: "#bcb9bc"
    }
  }
})