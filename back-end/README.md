## 布署
### 设置环境变量
- process.env.JWT_SECRET_KEY 设置JWT的秘钥
- process.env.DEMO_PORT 设置端口号
- process.env.DEMO_USERNAME 设置用户名
- process.env.DEMO_PASSWORD 设置密码


### 启动
pm2 start ecosystem.config.js