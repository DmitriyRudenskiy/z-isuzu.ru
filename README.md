# z-isuzu.ru

 HOST=0.0.0.0 PORT=5071 node src/index.js

pm2 start /php/z-isuzu.ru/src/index.js -n "z-isuzu.ru"
pm2 restart 0 --update-env


// session middleware will run before authorize
router
  .use(session())
  .use(authorize());

// use middleware only with given path
router.use('/users', userAuth());

// or with an array of paths
router.use(['/users', '/admin'], userAuth());

app.use(router.routes());

# Run local server (once)
    HOST=0.0.0.0 PORT=5070 node src/index.js

cd /php/z-isuzu.ru/
pm2 start src/ -n "z-isuzu.ru"