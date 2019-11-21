import { Component } from 'react'
import Router from 'next/router'
import cookie from 'js-cookie'
import nextCookie from 'next-cookies'

export const getToken = () => cookie.get('token')

export async function loginReadyFor(token, options={}) {
  let redirect = '/'

  if (options['welcomePage']) redirect = '/q'
  if (options['admin']) redirect = '/admin/index'
  return new Promise((res) => {
    cookie.set('token', token, {expires: 1})
    res(Router.replace(redirect))
  })
}

export function logout (client) {
  cookie.remove('token')
  if (client && client.clearStore) client.clearStore()
  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now())
  Router.push('/login')
}

const getDisplayName = Component =>
  Component.displayName || Component.name || 'Component'


class Base extends Component {

  constructor (props) {
    super(props)
    this.syncLogout = this.syncLogout.bind(this)
  }

  componentDidMount () {
    window.addEventListener('storage', this.syncLogout)
  }

  componentWillUnmount () {
    window.removeEventListener('storage', this.syncLogout)
    window.localStorage.removeItem('logout')
  }

  syncLogout (event) {
    if (event.key === 'logout') {
      console.log('logged out from storage!')
      Router.push('/login')
    }
  }

}
export const withAuthSync = WrappedComponent =>
  class extends Base {
    static displayName = `withAuthSync(${ getDisplayName(WrappedComponent)})`
    static async getInitialProps (ctx) {
      const client = ctx.apolloClient
      const token = auth(ctx)
      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx))
      return { ...componentProps, token, client }
    }
    render () {
      return <WrappedComponent {...this.props} />
    }
  }

export const withAdminAuthSync = WrappedComponent =>
  class extends Base {
    static displayName = `withAdminAuthSync(${ getDisplayName(WrappedComponent)})`
    static async getInitialProps (ctx) {
      const client = ctx.apolloClient
      const token = adminAuth(ctx)

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx))
      return { ...componentProps, token, client }
    }

    render () {
      return <WrappedComponent {...this.props} />
    }
  }

const auth = ctx => {
  const { token } = nextCookie(ctx)

  if (ctx.req && !token) {
    ctx.res.writeHead(302, {Location: '/welcome'})
    ctx.res.end()
    return
  }

  if (!token) {
    Router.push('/welcome')
  }

  return token
}

const adminAuth = ctx => {
  const { token } = nextCookie(ctx)

  if (ctx.req && !token) {
    ctx.res.writeHead(302, {Location: '/admin/login'})
    ctx.res.end()
    return
  }

  if (!token) {
    Router.push('/admin/login')
  }

  return token
}

export const isAuthenticated = () => getToken() !== undefined


