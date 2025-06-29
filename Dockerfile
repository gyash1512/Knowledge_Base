# Build the React frontend
FROM node:16-alpine as builder
WORKDIR /app
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Build the Flask backend
FROM python:3.9-slim
RUN apt-get update && apt-get install -y git
WORKDIR /app
COPY --from=builder /app/build ./frontend/build
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]
