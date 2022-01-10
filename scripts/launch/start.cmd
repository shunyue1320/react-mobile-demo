@echo off
setlocal
start cmd /c "pnpm --cwd back-end dev"
start cmd /c "pnpm --cwd front-end dev"
exit
