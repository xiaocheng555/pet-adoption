<template>
  <c-page title="首页" :has-back="false">
		<navigator url="/pages/test/index">========test========</navigator>
	</c-page>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    onLoad() {
      this.$app.ready(() => {
				this.$http.get('/pet/api/v1/pet/class').then(res => {
					console.log(res, 'res')
				})
			})
    }
  }
</script>

<style>
</style>
