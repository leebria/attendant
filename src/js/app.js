import Vue from 'vue'
import TitleBar from './components/TitleBar.vue'
import StatusBar from './components/StatusBar.vue'
import ListHeader from './components/ListHeader.vue'
import SiteList from './components/SiteList.vue'
import SiteDetails from './components/SiteDetails.vue'

window.app = new Vue({
  el: '#app',
  data: {
    config: {},
    siteList: [],
    activeSite: null,
    dropdownOpen: false,
    timeout: null
  },
  components: {
    'title-bar': TitleBar,
    'status-bar': StatusBar,
    'list-header': ListHeader,
    'site-list': SiteList,
    'site-details': SiteDetails
  },
  methods: {
    activateSite (site) {
      this.activeSite = site
    },
    loadBase () {
      this.config = config
      this.siteList = sites
    },
    updateRunning (running) {
      this.running = running
    },
    toggleDropdown () {
      this.dropdownOpen = !this.dropdownOpen
    },
    hideDropdown () {
      this.timeout = setTimeout(function () {
        this.dropdownOpen = false
      }, 500)
    },
    hoverDropdown () {
      clearTimeout(this.timeout)
    }
  },
  mounted () {
    this.$on('reload-base', this.loadBase)
    this.$on('update-running', this.updateRunning)
  }
})
