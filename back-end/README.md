## 布署
### 设置环境变量
- process.env.JWT_SECRET_KEY 设置JWT的秘钥
- process.env.DEMO_PORT 设置端口号
- process.env.DEMO_USERNAME 设置用户名
- process.env.DEMO_PASSWORD 设置密码


### 启动
pm2 start ecosystem.config.js

### Docker 启动 mongo 数据库
```shell
# 安装 mongo 数据库
docker pull mongo

# 启动 mongo 数据库 docker容器名字 mongo-test
docker run -itd --name mongo-test -p 27017:27017 mongo --auth

# 进入 admin 数据库
docker exec -it mongo-test mongo admin

# 给 admin 的数据库设置权限 用户名:'admin' 密码:'123456'
db.createUser({ user:'admin',pwd:'123456',roles:[ { role:'userAdminAnyDatabase', db: 'admin'},"readWriteAnyDatabase"]});
```