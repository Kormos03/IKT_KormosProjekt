@echo off
start cmd /k "cd backend && npm install && npx prisma generate"
start cmd /k "cd frontend && cd frontend && npm install"