# DivTinder API's

# authRouter

  ✓ -POST /signup 
  ✓ -POST /login
  ✓ -POST /signout

# profileRouter
  ✓ -GET /profile/view
  ✓ -PATCH /profile/update
  ✓ -PATCH /profile/passwordUpdate

# connectionRequestRouter
  -POST /request/send/intereted/:userId
  -POST /request/send/ignored/:userId
  -POST /request/review/accpted/:requestId
  -POST /request/review/rejected/:requestId

# userRouter
  -GET /user/connections
  -GET /user/requests
  -GET /user/feed