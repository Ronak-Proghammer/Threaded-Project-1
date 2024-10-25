export function checkAuth(req, res, next) {
    if (req.session.isLoggedIn) {
      return true // User is logged in, proceed to the next middleware
    } else {
      return false
    }
  }