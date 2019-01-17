import auth0 from 'auth0-js'
import router from '../router/index'
import Vue from 'vue'
import store from '../store'
import { promptForPasswordChange } from './Auth0LockService'

const vm = new Vue({
    store
})

export default class Auth0Service {

    constructor (domain, clientID) {
        this.auth0 = new auth0.WebAuth({
            domain,
            clientID,
            redirectUri: `http://${window.location.host}/callback`,
            // audience: `https://${process.env.AUTH0_MATCH_DOMAIN}/userinfo`,
            responseType: 'token id_token',
            scope: 'openid profile email'
        })
        this.domain = domain
        this.setSession = this.setSession.bind(this)
        this.logger = require('@/logger').default()
        this.isAuthenticated()
    }

    login () {
        this.auth0.authorize()
    }

    handleAuthentication () {
        const setSession = this.setSession
        const logger = this.logger
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.auth0.client.userInfo(authResult.accessToken, function (err, user) {
                    // Now you have the user's information
                    if (err) {
                        logger.error(err)
                        return router.replace({ path: '/' })
                    }
                    if (user.is_expired) {
                        promptForPasswordChange()
                        return router.replace({ path: '/' })
                    }
                    return setSession(authResult, user)
                })
            } else if (err) {
                logger.error(err)
                router.replace({ path: '/' })
            }
        })
    }

    setUserProfileAndRedirect (profile) {
        this.userProfile = profile
        vm.$store.commit('auth/setUser', profile)
        router.replace({ path: '/patient' })
    }

    setSession (authResult, profile) {
        // Set the time that the Access Token will expire at
        let expiresAt = JSON.stringify(
            authResult.expiresIn * 1000 + Date.now()
        )
        vm.$store.commit('auth/setAccessToken', authResult.accessToken)
        vm.$store.commit('auth/setIdToken', authResult.idToken)
        vm.$store.commit('auth/setExpiresAt', expiresAt)
        this.setUserProfileAndRedirect(profile)
    }

    logout () {
        // Clear Access Token and ID Token from Vuex vm.$store
        vm.$store.commit('auth/clearAuth')
        this.userProfile = {}
        router.replace({ path: '/login' })
    }

    isAuthenticated () {
        // Check whether the current time is past the
        // Access Token's expiry time
        let expiresAt = JSON.parse(vm.$store.getters['auth/getExpiresAt'])
        this.authenticated = Date.now() < expiresAt
        return this.authenticated
    }
}
