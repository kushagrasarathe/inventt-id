import { sha256 } from "js-sha256";

interface Credentials {
  securityPin?: number;
  securityQuestionsResponses?: string[];
}
export default async function generateClaim() {
  //   req: NextRequest,
  //   res: NextResponse,
  let name: string = "Kushagra";
  let email: string = "kushagra@test.com";
  let securityPin: number = 123456;
  let securityQuestionsResponses: string[] = ["qn1", "qn2", "qn3"];
  const credentials =
    securityPin.toString() +
    securityQuestionsResponses[0] +
    securityQuestionsResponses[1] +
    securityQuestionsResponses[2];
  const hashDigested = sha256(credentials);
  const credentialsHashedDigest = `0x${hashDigested}`;
  console.log(credentialsHashedDigest);
}
