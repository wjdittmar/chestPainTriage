package server

import (
	"context"
	"fmt"
	"log"
	"net"

	pb "github.com/wjdittmar/chestPainTriage/proto"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

// TriageServer implements the TriageServiceServer interface.
type TriageServer struct {
	pb.UnimplementedTriageServiceServer
}

// AnalyzeSymptoms delegates the request to the AnalyzeSymptoms function.
func (s *TriageServer) AnalyzeSymptoms(ctx context.Context, req *pb.SymptomInput) (*pb.TriageResponse, error) {
	return AnalyzeSymptoms(ctx, req)
}

// Run initializes and starts the gRPC server.
func Run(port int) error {
	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", port))
	if err != nil {
		return fmt.Errorf("failed to listen: %w", err)
	}

	s := grpc.NewServer()
	pb.RegisterTriageServiceServer(s, &TriageServer{})
	reflection.Register(s)
	log.Printf("Server listening at %v", lis.Addr())
	return s.Serve(lis)
}
