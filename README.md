# z-isuzu.ru

node HOST=0.0.0.0 PORT=5070 /php/z-isuzu.ru/src/index.js

pm2 start /php/z-isuzu.ru/src/index.js -N "z-isuzu.ru"