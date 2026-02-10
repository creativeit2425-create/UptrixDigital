@echo off
echo Adding all changes...
git add .
echo.
set /p msg="Enter commit message (Press Enter for 'Update website'): "
if "%msg%"=="" set msg="Update website"
echo.
echo Committing with message: "%msg%"...
git commit -m "%msg%"
echo.
echo Pushing to GitHub...
git push origin master
echo.
echo Done! You can close this window.
pause
