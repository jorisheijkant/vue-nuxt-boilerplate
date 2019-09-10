const pkg = require('./package');
const STORYBLOK_TOKEN = 'vIxSxIvAUpbqD8V7NrciPAtt';
const GA_ID = 'UA-12301-2';

module.exports = {
    mode: 'universal',

    /*
    ** Headers of the page
    */
    head: {
        title: pkg.name,
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: pkg.description}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },

    /*
    ** Customize the progress-bar color
    */
    loading: {color: '#fff'},

    /*
    ** Global CSS
    */
    css: [],

    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        '~/plugins/components',
        '~/plugins/filters',
        {src: '~/plugins/cookie.js', ssr: false}
    ],

    /*
    ** Nuxt.js modules
    */
    modules: [
        ['storyblok-nuxt', {accessToken: STORYBLOK_TOKEN, cacheProvider: 'memory'}],
        ['@nuxtjs/google-analytics', {
            id: GA_ID,
            disabled: () => {
                if(localStorage && localStorage['vue-cookie-accept-decline-myPanel1']) {
                    return localStorage['vue-cookie-accept-decline-myPanel1'] === 'decline';
                } else {
                    return true
                }
            },
            debug: {
                enabled: true
            }
        }]
    ],

    /*
    ** Router middleware
    */
    router: {
        middleware: 'setCacheVersion'
    },

    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {

        }
    }
}
