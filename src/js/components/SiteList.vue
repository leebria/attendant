<template>
    <div class="site-list" v-if="siteList && siteList.length">
        <site-list-item v-for="(item, key) in siteList"
                        :class="activeSite == item ? 'active' : ''"
                        @click="$emit('activate', item)"
                        :key="key">
            {{ item.site }}
        </site-list-item>
    </div>
    <div v-else class="site-list small">
        You do not have any sites yet.
        <br>
        Drag your code directory to park or link a file.
    </div>
</template>

<script>
  import SiteListItem from './SiteListItem.vue'

  export default {
    props: ['siteList', 'activeSite'],
    components: SiteListItem
  }
</script>

<style type="text/css">
    .site-list {
        padding: 0 10px;
        height: calc(100% - 50px);
        overflow-y: scroll;
    }

    .small {
        font-size: 15px;
        text-align: center;
        padding-top: 20px;
        color: #666;
    }
</style>