module.exports = {
  apps : [{
    name: 'react-back-end',
    script: './node_modules/.bin/ts-node',
    args:"-T -r tsconfig-paths/register ./src/index.ts"
  }]
}
