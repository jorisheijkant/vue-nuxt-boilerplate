<template>
	<div>
		<nuxt/>
		<cookie-banner></cookie-banner>
	</div>
</template>

<script>
    import CookieBanner from "../components/cookie-banner";
    export default {
        components: {CookieBanner}
    }
</script>