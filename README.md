# z-isuzu.ru

node HOST=0.0.0.0 PORT=5070 /php/z-isuzu.ru/src/index.js

pm2 start /php/z-isuzu.ru/src/index.js -N "z-isuzu.ru"


// session middleware will run before authorize
router
  .use(session())
  .use(authorize());

// use middleware only with given path
router.use('/users', userAuth());

// or with an array of paths
router.use(['/users', '/admin'], userAuth());

app.use(router.routes());