tell application "Terminal"
    activate
    set ProjectRoot to "$(dirname $(dirname $(dirname $(dirname " & (POSIX path of (path to me)) & "))))"
    do script "yarn --cwd \"" & ProjectRoot & "/back-end\" dev"
    do script "yarn --cwd \"" & ProjectRoot & "/front-end\" dev"
end tell
