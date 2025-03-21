<template>
  <div class="varlet-site">
    <app-header :language="language" />

    <div class="varlet-site-content">
      <app-sidebar
        :language="language"
        :menu="menu"
        :menu-name="menuName"
        @change="handleSidebarChange"
      />

      <div
        class="varlet-site-doc-container"
        ref="doc"
        :class="[!useMobile && 'varlet-site-doc-container--pc-only']"
      >
        <router-view />
      </div>

      <app-mobile
        :component-name="componentName"
        :language="language"
        :replace="menuName"
        v-show="useMobile"
      />
    </div>
  </div>
</template>

<script>
import config from '@config'
import AppMobile from './components/AppMobile.vue'
import AppHeader from './components/AppHeader.vue'
import AppSidebar from './components/AppSidebar.vue'
import { get } from 'lodash-es'
import { getPCLocationInfo, isPhone, MenuTypes } from '../utils'
import { defineComponent } from '../components/utils/create'

export default defineComponent({
  components: {
    AppMobile,
    AppHeader,
    AppSidebar
  },

  data: () => ({
    defaultLanguage: get(config, 'defaultLanguage'),
    menu: get(config, 'pc.menu', []),
    useMobile: get(config, 'useMobile'),
    mobileRedirect: get(config, 'mobile.redirect'),
    language: '',
    componentName: null,
    menuName: '',
  }),

  mounted() {
    this.init()
  },

  watch: {
    '$route.path': {
      handler() {
        const { language: lang, menuName: _menuName } = getPCLocationInfo()
        if (!lang || !_menuName) {
          return
        }

        this.componentName = this.getComponentNameByMenuName(_menuName)
        this.menuName = _menuName
        this.language = lang
        document.title = get(config, 'pc.title')[lang]
      },
      immediate: true
    }
  },

  methods: {
    getComponentNameByMenuName(menuName) {
      const currentMenu = this.menu.find(menu => menu.doc === menuName)
      return currentMenu?.type === MenuTypes.COMPONENT ? menuName : this.mobileRedirect.slice(1)
    },

    init() {
      const { language, menuName } = getPCLocationInfo()

      if (isPhone() && this.useMobile) {
        window.location.href = `./mobile.html#/${menuName}?language=${language || this.defaultLanguage}&platform=mobile`
        return
      }

      this.$nextTick(() => {
        const children = document
          .querySelector('.varlet-site-sidebar')?.getElementsByClassName('var-site-cell')
        const index = this.menu.findIndex((item) => item.doc === menuName)

        if (index !== -1) {
          children[index].scrollIntoView({
            block: 'center',
            inline: 'start',
          })
        }
      })
    },

    handleSidebarChange(menu) {
      this.$refs.doc.scrollTop = 0
      this.componentName = this.getComponentNameByMenuName(menu.doc)
      this.menuName = menu.doc
    }
  },
})
</script>

<style>
.hljs {
  background: var(--site-config-color-hl-background) !important;
  padding: 0 !important;
  transition: all .25s
}

.hljs code {
  line-height: 31px;
}

.hljs-comment, .hljs-meta, .hljs-quote {
  color: var(--site-config-color-hl-group-a)
}

.hljs-keyword, .hljs-name, .hljs-selector-tag, .hljs-tag {
  color: var(--site-config-color-hl-group-b)
}

.hljs-attribute, .hljs-selector-id {
  color: var(--site-config-color-hl-group-c)
}

.hljs-addition, .hljs-selector-attr, .hljs-selector-pseudo, .hljs-string {
  color: var(--site-config-color-hl-group-d)
}

.hljs-subst {
  color: var(--site-config-color-hl-group-e)
}

.hljs-link, .hljs-regexp {
  color: var(--site-config-color-hl-group-f)
}

.hljs-doctag, .hljs-section, .hljs-title, .hljs-type {
  color: var(--site-config-color-hl-group-g)
}

.hljs-bullet, .hljs-literal, .hljs-symbol, .hljs-template-variable, .hljs-variable {
  color: var(--site-config-color-hl-group-h)
}

.hljs-deletion, .hljs-number {
  color: var(--site-config-color-hl-group-i)
}
</style>

<style lang="less">
@doc-active: {
  display: inline;
  font-family: inherit;
  padding: 0;
  white-space: pre-wrap;
}

::-webkit-scrollbar {
  display: none;
  width: 0;
  background: transparent;
}

body {
  min-width: 1200px;
  margin: 0;
  padding: 60px 0 0;
  font-family: 'Roboto', sans-serif;
  background: var(--site-config-color-body);
  color: var(--site-config-color-text);
}

* {
  transition: background-color .25s, box-shadow .25s;
}

iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: none;
}

.varlet {
  &-introduce {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0;
    padding: 90px 40px;
    border-top: 6px solid var(--site-config-color-introduce-border);
    border-radius: 2px;
    background: var(--site-config-color-bar);
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);

    &__row {
      display: flex;
      align-items: center;
    }

    &__image {
      width: 60px;
      margin-right: 20px;
    }

    &__name {
      font-size: 60px;
    }

    &__des {
      color: var(--site-config-color-sub-text);
      font-size: 16px;
      margin-top: 16px;
      -webkit-font-smoothing: antialiased;
    }
  }

  &-component-preview {
    margin-top: 20px;
  }

  &-site {
    &-content {
      display: flex;
      background: var(--site-config-color-body);
      margin-left: 240px;
      min-height: calc(100vh - 60px);
    }

    &-doc-container {
      flex: 1 0 0;
      min-width: 500px;
      padding: 0 25px;
      overflow-x: hidden;

      &::-webkit-scrollbar {
        display: none;
      }

      &--pc-only {
        padding: 0 90px 0 30px;
      }
    }

    &-doc {
      a {
        color: var(--site-config-color-link);
        -webkit-font-smoothing: antialiased;
        word-break: keep-all;
        font-size: 15px;
        @doc-active();

        &:hover {
          opacity: 0.8;
        }
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        position: relative;
        color: var(--site-config-color-text);
        font-weight: normal;
        line-height: 1.5;
      }

      h1 {
        line-height: 40px;
        font-size: 30px;
        cursor: default;
      }

      h2 {
        margin: 30px 0 20px;
        font-size: 25px;
      }

      h3 {
        font-size: 18px;
        margin: 0;
      }

      h4 {
        margin: 18px 0 0;
      }

      p,
      ul,
      ol {
        -webkit-font-smoothing: antialiased;
        color: var(--site-config-color-text);
        font-size: 15px;
        line-height: 26px;
        border-radius: 4px;
        background: var(--site-config-color-bar);
        list-style: none;
        margin: 14px 0 0;
        padding: 0;
      }

      pre {
        margin: 0;
      }

      code {
        position: relative;
        display: block;
        padding: 10px 16px;
        overflow-x: auto;
        font-size: 13px;
        font-family: Consolas, Monaco, monospace;
        white-space: pre-wrap;
        word-wrap: break-word;
        color: var(--site-config-color-hl-code);
      }

      p code,
      li code,
      table code {
        -webkit-font-smoothing: antialiased;
        word-break: keep-all;
        color: var(--site-config-color-primary);
        font-size: 15px;
        @doc-active();
      }

      table {
        -webkit-font-smoothing: antialiased;
        width: 100%;
        margin-top: 12px;
        color: var(--site-config-color-text);
        background: var(--site-config-color-bar);
        font-size: 14px;
        line-height: 28px;
        border-collapse: collapse;
        border-radius: 4px;

        th {
          padding: 8px 16px;
          font-weight: 500;
          text-align: left;
          color: var(--site-config-color-sub-text);
          font-size: 13px;
          -webkit-font-smoothing: antialiased;
          border-bottom: 1px solid var(--site-config-color-border);
        }

        td {
          padding: 8px 16px;
          border-bottom: 1px solid var(--site-config-color-border);
          color: var(--site-config-color-text);
          font-family: Consolas, Monaco, monospace;

          code {
            white-space: pre-wrap;
            padding: 0;
            font-size: 13px;
          }
        }

        em {
          color: var(--site-config-color-type);
          font-style: normal;
          -webkit-font-smoothing: antialiased;
          font-size: 13px;
          @doc-active();
        }
      }

      .card {
        border-radius: 4px;
        background: var(--site-config-color-bar);
        padding: 20px;
        margin-bottom: 30px;
        box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
      }
    }
  }
}
</style>
