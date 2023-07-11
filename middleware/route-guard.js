
export default function ({ $cookies, redirect, route, app, $toast }) {
  if (route.query.token) {
    $cookies.set('slate-token', route.query.token)
    $cookies.set('user-details', route.query.user)
  } else if (!$cookies.get('slate-token')) {
  // $toast({
  //   type: 'error',
  //   text: 'You must be logged in to access this page',
  // })
      redirect('https://slate.ng/auth/login?publisher=true')
    }
  }