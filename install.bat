@echo off
cd backend && npm install && npx prisma generate && cd..
cd frontend && cd frontend && npm install