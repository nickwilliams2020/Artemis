import Auth0Lock from 'auth0-lock'
let lock = new Auth0Lock(
    process.env.AUTH0_MATCH_ID,
    process.env.AUTH0_DOMAIN
)

export function promptForPasswordChange () {
    lock.show({
        flashMessage: {
            type: 'error',
            text: 'At this time, you need to reset your password'
        },
        initialScreen: 'forgotPassword',
        allowLogin: false
    })
}
