import { NextRequest, NextResponse } from "next/server";
import { credentials } from "@grpc/grpc-js";
import { TriageServiceClient, SymptomInput } from "@/proto/triage";

const GRPC_ADDRESS = process.env.GRPC_ADDRESS || "localhost:50051";
// We don't need PROTO_PATH or createNodeRpc anymore!

// Ideally, create one client instance at the top. You could
// also create it inside the POST, but it’s best to reuse the client.
const triageClient = new TriageServiceClient(
  GRPC_ADDRESS,
  credentials.createInsecure(),
);

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SymptomInput;

    // Make the gRPC call via callback => promise:
    const triageResponse = await new Promise((resolve, reject) => {
      triageClient.analyzeSymptoms(body, (err, response) => {
        if (err) reject(err);
        else resolve(response);
      });
    });

    return NextResponse.json(triageResponse);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
