@echo off
setlocal
start cmd /c "yarn --cwd back-end dev"
start cmd /c "yarn --cwd front-end dev"
exit
