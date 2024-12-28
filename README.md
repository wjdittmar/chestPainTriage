## Overview

The **Chest Pain Triage App** is a web-based application designed to help patients understand the potential causes of their chest pain and determine whether they need to seek emergency care. The app collects structured medical history and symptoms from users, processes the information using OpenAI's ChatGPT API, and provides actionable triage recommendations.

## Features

- **Structured Input:** Users provide details such as age, gender, medical history, aggravating/relieving factors, associated symptoms, risk factors, and free-text descriptions.
- **Interactive Chat:** Dynamic interaction loop to gather missing or additional information for an accurate assessment.
- **AI-Powered Analysis:** Uses ChatGPT to analyze symptoms and generate triage recommendations.
- **Frontend:** Built with Next.js for a fast and responsive user experience.
- **Backend:** Developed in Go, leveraging gRPC for efficient communication.
- **Deployment:** Dockerized for easy deployment to AWS EC2.

---

## Technology Stack

### **Frontend**

- Framework: Next.js (React-based)
- UI Library: Material-UI
- Protobuf Plugin: `ts-proto` for gRPC type generation

### **Backend**

- Language: Go
- Framework: gRPC
- Protobuf Plugins: `protoc-gen-go`, `protoc-gen-go-grpc`
- AI Integration: OpenAI API

### **Deployment**

- **Containerization:** Docker
- **Hosting:** AWS EC2

---

## Installation and Setup

### Prerequisites

- **Node.js** (v18 or later)
- **Go** (v1.20 or later)
- **Protobuf Compiler**
- **Docker**

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/chestPainTriage.git
cd chest-pain-triage-app
```

### 2. Set Up the Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install Go dependencies:
   ```bash
   go mod tidy
   ```
3. Generate Protobuf files (if not already included):
   ```bash
   protoc --go_out=. --go-grpc_out=. ../proto/chest_pain.proto
   ```
4. Run the backend:
   ```bash
   go run main.go
   ```

### 3. Set Up the Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. The TypeScript types generated from Protobuf are already included in the repository. This step is optional if the generated files are present:
   ```bash
   protoc --plugin=protoc-gen-ts_proto=$(which protoc-gen-ts_proto) \
     --ts_proto_out=./src/proto ../proto/chest_pain.proto
   ```
4. Run the frontend:
   ```bash
   npm run dev
   ```

### 4. Run Locally with Docker Compose

1. Build and start the containers:
   ```bash
   docker-compose up --build
   ```
2. Access the app:
   - **Frontend:** `http://localhost:3000`
   - **Backend:** `http://localhost:50051`

---

## Deployment to AWS EC2

### 1. Launch an EC2 Instance

- Use Amazon Linux 2 or Ubuntu.
- Open ports **3000** (frontend) and **50051** (backend).

### 2. Install Docker and Docker Compose

```bash
sudo yum update -y
sudo yum install docker -y
sudo service docker start
sudo usermod -aG docker ec2-user
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 3. Copy Files to EC2

```bash
scp -r /path/to/project ec2-user@<ec2-ip>:/home/ec2-user
```

### 4. Run the Application

```bash
cd /home/ec2-user/chestPainTriage
docker-compose up --build -d
```

### 5. Access the Application

- **Frontend:** `http://<ec2-ip>:3000`
- **Backend:** `http://<ec2-ip>:50051`

---
