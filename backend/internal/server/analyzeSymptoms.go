package server

import (
	"context"
	"log"

	pb "github.com/wjdittmar/chestPainTriage/proto"
)

// AnalyzeSymptoms handles the logic for triaging symptoms.
func AnalyzeSymptoms(_ context.Context, req *pb.SymptomInput) (*pb.TriageResponse, error) {
	log.Printf("Received request: %+v", req)

	// Example response logic
	recommendation := "Seek emergency care immediately"
	if req.SymptomDescription == "Mild pain" {
		recommendation = "Monitor symptoms and consult a doctor if they persist."
	}

	return &pb.TriageResponse{
		Recommendation: recommendation,
		PossibleCauses: []string{"Example Cause 1", "Example Cause 2"},
		AdditionalQuestions: []string{
			"How severe is the pain?",
			"Does the pain radiate anywhere?",
		},
	}, nil
}
