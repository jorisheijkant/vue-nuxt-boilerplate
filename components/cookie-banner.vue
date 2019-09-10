<template>
	<client-only>
		<vue-cookie-accept-decline
				:ref="'myPanel1'"
				:elementId="'myPanel1'"
				:debug="false"
				:position="'bottom-left'"
				:type="'floating'"
				:disableDecline="false"
				:transitionName="'slideFromBottom'"
				:showPostponeButton="false"
				@status="cookieStatus"
				@clicked-accept="cookieClickedAccept"
				@clicked-decline="cookieClickedDecline">
			
			<!-- Optional -->
			<!--<p slot="postponeContent">&times;</p>-->
			
			<!-- Optional -->
			<p slot="message">We use cookies to ensure you get the best experience on our website.</p>
			
			<!-- Optional -->
			<p slot="declineContent">OPT OUT</p>
			
			<!-- Optional -->
			<p slot="acceptContent">GOT IT!</p>
		</vue-cookie-accept-decline>
	</client-only>
</template>

<script>
    export default {
        name: "cookie-banner",
	    
	    methods : {
            cookieClickedAccept() {
                console.log('yes, cookies!');
                this.$ga.enable();
                window.location.reload(false);
            },
            cookieClickedDecline() {
                console.log('No cookies for me please!');
                this.$ga.disable();
            },
		    cookieStatus() {
                // console.log('s')
		    }
	    }
    }
</script>
