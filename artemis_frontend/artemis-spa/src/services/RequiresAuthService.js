import authMixin from '../mixins/authenticate'

export default function requiresAuth (to, from, next) {
    if (authMixin.methods.isAuthenticated()) {
        return next()
    }
    return next({ path: '/login' })
}
