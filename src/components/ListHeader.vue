<template>
    <div class="list-header">
        <slot></slot>
    </div>
</template>

<script>
  export default {}
</script>

<style type="text/css">
    .list-header {
        display: flex;
        align-items: center;
        padding: 0 20px;
        height: 45px;
    }
</style>
