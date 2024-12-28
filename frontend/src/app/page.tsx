"use client";

import React, { useState } from "react";
import { SymptomInput } from "@/proto/triage";

export default function Page() {
  const [response, setResponse] = useState<any>(null);

  async function testGrpc() {
    try {
      const symptomInput: SymptomInput = {
        age: 45,
        gender: "male",
        medicalHistory: "Hypertension",
        surgicalHistory: "Appendectomy",
        currentMedications: "Lisinopril",
        smoker: true,
        symptomDescription: "Chest pain radiating to the left arm",
        onset: "2 hours ago",
        aggravatingFactors: "Exercise",
        relievingFactors: "Rest",
        associatedSymptoms: "Shortness of breath",
      };

      const res = await fetch("/api/triage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(symptomInput),
      });

      if (!res.ok) {
        throw new Error(`Failed to call /api/triage: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data);
    } catch (error: any) {
      console.error(error);
      setResponse({ error: error.message });
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Test gRPC via Next.js API Route</h1>
      <button onClick={testGrpc}>Test gRPC</button>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
}
