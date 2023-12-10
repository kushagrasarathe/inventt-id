import { toast } from "@/components/ui/use-toast";
import { sha256 } from "js-sha256";

interface Credentials {
  securityPin?: number;
  securityQuestionsResponses?: string[];
}

async function generatePolygonID() {
  const body = {
    didMetadata: {
      method: "polygonid",
      blockchain: "polygon",
      network: "mumbai",
      type: "BJJ",
    },
  };

  const headers = {
    accept: "application/json",
    "content-type": "application/json",
    authorization: "Basic a3VzaGFncmE6a3VzaGFncmEtaXNzdWVy",
    "access-control-allow-origin": "*",
  };

  const options = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  };
  const response = await fetch("/v1/identities", options);

  if (response.status === 201) {
    toast({
      title: "Success",
      description: "PolygonID generated successfully",
    });
    const data = await response.json();
    return data;
  } else {
    toast({
      title: "Error generating new PolygonID",
      description: "Please try again later",
      variant: "destructive",
    });
    return null;
  }
}

async function generateClaim(
  securityPin: string,
  securityResponse1: string,
  securityResponse2: string,
  securityResponse3: string,
  userPolygonID: string,
) {
  // "did:polygonid:polygon:mumbai:2qFYKZkpW2MRXcve4j82sc6eyewAa3ptLZyfyCsU6Z"
  const credentials =
    securityPin.toString() +
    securityResponse1 +
    securityResponse2 +
    securityResponse3;
  const hashDigested = sha256(credentials);
  const credentialsHashedDigest = `0x${hashDigested}`;

  const body = {
    credentialSchema: "ipfs://Qmdvv6y2H31CtURJ1rEFPyemZoeEFA2i1WGh4tHcn7Wc8N",
    type: "InventtCredential",
    credentialSubject: {
      id: userPolygonID,
      securityHash: credentialsHashedDigest,
    },
    expiration: 1903357766,
  };

  const headers = {
    accept: "application/json",
    "content-type": "application/json",
    authorization: "Basic a3VzaGFncmE6a3VzaGFncmEtaXNzdWVy",
    "access-control-allow-origin": "*",
  };

  const options = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  };

  const response = await fetch(
    `/v1/did:polygonid:polygon:mumbai:2qFYKZkpW2MRXcve4j82sc6eyewAa3ptLZyfyCsU6Z/claims`,
    options,
  );

  if (response.status === 201) {
    toast({
      title: "Success",
      description: "Claim generated successfully",
    });
    const data = await response.json();
    return data;
  } else {
    toast({
      title: "Error generating claim",
      description: "Please try again later",
      variant: "destructive",
    });
    return null;
  }
}

async function generateClaimQrData(id: string) {
  const headers = {
    accept: "application/json",
    "content-type": "application/json",
    authorization: "Basic a3VzaGFncmE6a3VzaGFncmEtaXNzdWVy",
    "access-control-allow-origin": "*",
  };

  const options = {
    method: "GET",
    headers: headers,
  };

  const response = await fetch(
    `/v1/did:polygonid:polygon:mumbai:2qFYKZkpW2MRXcve4j82sc6eyewAa3ptLZyfyCsU6Z/claims/${id}/qrcode`,
    options,
  );

  if (response.status === 200) {
    toast({
      title: "Success",
      description: "QR code generated successfully",
    });
    const data = await response.json();
    return data;
  } else {
    toast({
      title: "Error generating QR code",
      description: "Please try again later",
      variant: "destructive",
    });
    return null;
  }
}

export { generateClaim, generateClaimQrData, generatePolygonID };
