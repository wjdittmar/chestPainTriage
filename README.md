# chestPainTriage


## Overview

The Chest Pain Triage App is a web-based application designed to help patients understand the potential causes of their chest pain and determine whether they need to seek emergency care. The app collects structured medical history and symptoms from users, processes the information using OpenAI's ChatGPT API, and provides actionable triage recommendations.

## Features

Structured Input: Users provide details such as age, gender, medical history, aggravating/relieving factors, associated symptoms, risk factors, and free-text descriptions.

Interactive Chat: Dynamic interaction loop to gather missing or additional information for an accurate assessment.

AI-Powered Analysis: Uses ChatGPT to analyze symptoms and generate triage recommendations.

Frontend: Built with Next.js for a fast and responsive user experience.

Backend: Developed in Go, leveraging gRPC for efficient communication.

Deployment: Dockerized for easy deployment to AWS EC2.

## Technology Stack

### Frontend

Framework: Next.js (React-based)

UI Library: Material-UI

Protobuf Plugin: ts-proto for gRPC type generation

### Backend

Language: Go

Framework: gRPC

Protobuf Plugins: protoc-gen-go, protoc-gen-go-grpc

AI Integration: OpenAI API

### Deployment

Containerization: Docker

Hosting: AWS EC2
