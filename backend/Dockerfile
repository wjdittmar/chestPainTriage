FROM golang:1.20 as builder

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN go build -o chest-pain-backend

FROM gcr.io/distroless/base-debian11

COPY --from=builder /app/chest-pain-backend /

# Expose the gRPC server port
EXPOSE 50051

# Command to run the binary
CMD ["/chest-pain-backend"]
