<template>
    <div class="site-details" v-if="activeSite">
        <list-header>{{ formatedName() }}</list-header>
        <div class="content">
            <div>Path: {{ activeSite.path }}</div>
            <div v-if="getDriver(activeSite.path)">Driver: {{ driver }}</div>
            <div v-if="activeSite.git">
                <div>Git: {{ activeSite.git ? 'Yes' : 'No' }}</div>
            </div>
        </div>

        <div class="footer">
            <div>
                <button class="btn" @click="openSite">Open</button>
                <button class="btn" @click="openFolder">Reveal</button>
                <button class="btn is-red" @click="forgetOrUnlink()">
                    <span v-if="isLinked()">Un-link</span>
                    <span v-if="isParked()">Forget</span>
                </button>
            </div>
            <div style="margin-top: 10px;" v-if="activeSite.git && remote">
                <button class="btn" @click="openRemote()">
                    <span>View on {{ remoteHost }}</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
  import ListHeader from './ListHeader.vue'

  export default {
    data () {
      return {
        driver: null
      }
    },
    props: ['activeSite'],
    computed: {
      remote () {
        var keys = []
        for (var k in this.activeSite.git) keys.push(k);
        if (!keys.length) return 'None'
        return this.activeSite.git[keys.find(i => i.startsWith('remote'))] ? this.activeSite.git[keys.find(i => i.startsWith('remote'))].url : false
      },
      currentBranch () {
        return this.activeSite.git
      },
      remoteHost () {
        switch (true) {
          case this.remote === 'gitlab':
            return 'Gitlab'
            break
          case this.remote === 'github':
            return 'GitHub'
            break
          case !this.remote:
            return 'None'
            break
          default:
            return 'Host'
        }
      }
    },
    methods: {
      getDriver (path) {
        valet_which(path)
          .then((r) => {
            this.driver = r
          })
        return true
      },
      formatedName () {
        let formated = this.activeSite.site
        formated = formated.split('.')
        formated.pop()
        formated = formated.join('').split('-').map((string) => {
          return string[0] ? string[0].toUpperCase() + string.substr(1) : string
        }).join(' ')
        return formated
      },
      openSite () {
        shell.openExternal('http://' + this.activeSite.site)
      },
      openRemote () {
        shell.openExternal(this.remote)
      },
      openFolder () {
        shell.openItem(this.activeSite.path)
      },
      isLinked () {
        return this.activeSite.path.search('.valet/Sites') != -1
      },
      isParked () {
        return !this.isLinked()
      },
      forgetOrUnlink () {
        if (this.isLinked()) {
          valet_unlink(this.activeSite.path)
            .then(() => {
              this.activeSite = null
              window.location.reload()
            })
        } else {
          let dirPath = this.activeSite.path.split('/')
          delete dirPath[dirPath.length - 1]
          dirPath = dirPath.join('/')
          if (!confirm('Are you sure you want to do this? This will remove all the sites in this folder from Valet Park.')) return
          valet_forget(dirPath)
            .then(r => {
              window.location.reload()
            })
        }
      },
      openInSublime () {
        open_sublime(this.activeSite.path)
      }
    },
    components: ListHeader
  }
</script>

<style type="text/css">
    .content {
        padding: 0 20px;
        color: #666;
    }

    .footer {
        margin-top: 20px;
        padding: 10px 20px;
    }
</style>
