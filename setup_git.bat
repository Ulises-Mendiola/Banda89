@echo off
git init > git_out.txt 2>&1
git remote add origin https://github.com/Ulises-Mendiola/Banda89.git >> git_out.txt 2>&1
git add . >> git_out.txt 2>&1
git commit -m "Initial commit" >> git_out.txt 2>&1
git branch -M main >> git_out.txt 2>&1
git remote -v >> git_out.txt 2>&1
