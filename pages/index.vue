<template>
	<div>
		<h1>Index</h1>
		<!--<component :blok="story.content" :is="story.content.component | dashify" :key="story.content._uid"-->
		           <!--v-if="story.content.component"></component>-->
	</div>
</template>

<script>
    import CookieBanner from "../components/cookie-banner";
    import axios from 'axios';
    import localData from 'static/data/data.json'

    function getLocalData() {
        console.log('k')
       
    };
    
    const loadData = function ({api, cacheVersion, errorCallback, version, path}) {
        return api.get(`cdn/stories/${path}`, {
            version: version,
            cv: cacheVersion
        }).then((res) => {
            return res.data
        }).catch((res) => {
            console.log('getting local data')
            if (!res.response) {
                console.error(res);
                // errorCallback({statusCode: 404, message: 'Failed to receive content form api'});
                
            } else {
                console.error(res.response.data)
                // errorCallback({statusCode: res.response.status, message: res.response.data});
            }
            return localData
        })
    };

    export default {
        components: {CookieBanner},
        data() {
            return {story: {content: {}}}
        },
        mounted() {
            this.$storybridge.on(['input', 'published', 'change'], (event) => {
                if (event.action == 'input') {
                    if (event.story.id === this.story.id) {
                        this.story.content = event.story.content
                    }
                } else if (!event.slugChanged) {
                    window.location.reload()
                }
            })
        },
        asyncData(context) {
            // Check if we are in the editing mode
            let editMode = false;

            if (context.query._storyblok || context.isDev || (typeof window !== 'undefined' && window.localStorage.getItem('_storyblok_draft_mode'))) {
                if (typeof window !== 'undefined') {
                    window.localStorage.setItem('_storyblok_draft_mode', '1');
                    if (window.location == window.parent.location) {
                        window.localStorage.removeItem('_storyblok_draft_mode')
                    }
                }

                editMode = true
            }

            let version = editMode ? 'draft' : 'published';
            let path = context.route.path == '/' ? 'home' : context.route.path;

            // Load the JSON from the API
            return loadData({
                version: version,
                api: context.app.$storyapi,
                cacheVersion: context.store.state.cacheVersion,
                errorCallback: context.error,
                path: path
            })
        }
    }
</script>
