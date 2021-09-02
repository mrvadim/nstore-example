export default {
  server: {
    host: "0.0.0.0"
  },
  head: {
    title: "nstore",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Roboto"
      }
    ]
  },
  publicRuntimeConfig: {
    VERSION: "1.0.12",
    DATABASE: 0
  },
  privateRuntimeConfig: {},
  css: ["@/assets/main.css"],
  plugins: ["~/plugins/rights.js"],
  loading: {
    color: "green",
    failedColor: "red"
  },
  components: true,
  buildModules: [
    '@nuxtjs/style-resources',
  ],
  styleResources: {
    scss: ['@/assets/scss/*.scss'],
    hoistUseStatements: true
  },
  router: {
    prefetchLinks: false
    //base: "/store/"
  },
  serverMiddleware: [{ path: "/api", handler: "~/api", prefix: false }],
  modules: ["@nuxtjs/axios", "@nuxtjs/auth", "@nuxtjs/toast", "nuxt-i18n"],
  pageTransition: {
    name: "page",
    mode: "out-in"
  },
  axios: {
    //baseURL: "http://192.168.1.15:3000/api"
    prefix: "/api/"
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/users/login",
            method: "post",
            propertyName: "token"
          },
          logout: false,
          user: { url: "/users", method: "get", propertyName: "user" }
        },
        tokenType: ""
      }
    },
    redirect: {
      login: "/login",
      logout: "/",
      callback: "/login",
      home: "/"
    },
    localStorage: false,
    cookie: {
      prefix: "auth.",
      options: {
        path: "/",
        maxAge: 604800
      }
    }
  },
  i18n: {
    locales: [
      {
        name: "English",
        code: "en",
        file: "en-US.js"
      },
      {
        name: "Русский",
        code: "ru",
        file: "ru-RU.js"
      }
    ],
    strategy: "no_prefix",
    lazy: true,
    langDir: "lang/",
    defaultLocale: "en",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected"
    }
  },
  toast: {
    duration: 4000,
    position: "top-center"
  },
  build: {
    // analyze: {
    //   analyzerMode: "static"
    // }
    // yarn nuxt build -a
  }
};
