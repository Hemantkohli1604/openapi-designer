export const generateApimPolicyXml = (endpoints, policies) => {
  if (!endpoints || endpoints.length === 0) {
    console.warn("No endpoints found! Returning default policy.");
    return `<?xml version="1.0" encoding="utf-8"?><policies><inbound><base /></inbound><backend><base /></backend><outbound><base /></outbound></policies>`;
  }

  const policyTemplates = {};

  endpoints.forEach((endpoint) => {
    const { path, method } = endpoint;
    const operationId = `${method}_${path.replace(/\//g, '_')}`; // Unique ID for each operation

    policyTemplates[operationId] = `
<policies>
    <inbound>
        <base />
        <!-- Rate Limiting -->
        <rate-limit-by-key calls="${policies.rateLimit.calls}" renewal-period="${policies.rateLimit.renewalPeriod}" counter-key="@(context.Request.IpAddress)" />

        <!-- CORS -->
        <cors allow-credentials="false">
          <allowed-origins>${policies.cors.allowedOrigins.map((o) => `<origin>${o}</origin>`).join('\n')}</allowed-origins>
          <allowed-methods>${policies.cors.allowedMethods.map((m) => `<method>${m}</method>`).join('\n')}</allowed-methods>
          <allowed-headers>${policies.cors.allowedHeaders.map((h) => `<header>${h}</header>`).join('\n')}</allowed-headers>
        </cors>

        ${policies.authentication.jwtEnabled ? `
        <!-- JWT Authentication -->
        <validate-jwt header-name="Authorization" failed-validation-httpcode="401" failed-validation-error-message="Invalid token">
          <openid-config url="https://login.microsoftonline.com/{tenant-id}/v2.0/.well-known/openid-configuration" />
          <require-claim name="aud" match="any">
            <value>your-api-client-id</value>
          </require-claim>
        </validate-jwt>
        ` : ''}

        ${policies.authentication.apiKeyRequired ? `
        <!-- API Key Check -->
        <check-header name="Ocp-Apim-Subscription-Key" failed-check-httpcode="401" failed-check-error-message="API Key missing" />
        ` : ''}

        ${policies.authentication.ipWhitelist.length > 0 ? `
        <!-- IP Restriction -->
        <ip-filter action="allow">
          ${policies.authentication.ipWhitelist.map(ip => `<address>${ip}</address>`).join('\n')}
        </ip-filter>
        ` : ''}
    </inbound>
    <backend>
        <base />
    </backend>
    <outbound>
        <base />
    </outbound>
</policies>
    `;
  });

  return policyTemplates; // Returns an object with separate XML for each operation

  // if (!policies) {
  //   console.warn("No policies found! Using default policy settings.");
  //   policies = {
  //     rateLimit: { calls: 10, renewalPeriod: 60 },
  //     cors: { allowedOrigins: ['*'], allowedMethods: ['GET', 'POST'], allowedHeaders: ['*'] },
  //     authentication: { jwtEnabled: false, apiKeyRequired: false, ipWhitelist: [] }
  //   };
  // }

  // let policiesXml = endpoints.map((ep) => `
  //   <inbound>
  //     <base />
      
  //     <!-- Rate Limiting -->
  //     <rate-limit-by-key calls="${policies.rateLimit.calls}" renewal-period="${policies.rateLimit.renewalPeriod}" counter-key="@(context.Request.IpAddress)" />

  //     <!-- CORS -->
  //     <cors allow-credentials="false">
  //       <allowed-origins>${policies.cors.allowedOrigins.map((o) => `<origin>${o}</origin>`).join('')}</allowed-origins>
  //       <allowed-methods>${policies.cors.allowedMethods.map((m) => `<method>${m}</method>`).join('')}</allowed-methods>
  //       <allowed-headers>${policies.cors.allowedHeaders.map((h) => `<header>${h}</header>`).join('')}</allowed-headers>
  //     </cors>

  //     ${policies.authentication.jwtEnabled ? `
  //     <!-- JWT Authentication -->
  //     <validate-jwt header-name="Authorization" failed-validation-httpcode="401" failed-validation-error-message="Invalid token">
  //       <openid-config url="https://login.microsoftonline.com/{tenant-id}/v2.0/.well-known/openid-configuration" />
  //       <require-claim name="aud" match="any">
  //         <value>your-api-client-id</value>
  //       </require-claim>
  //     </validate-jwt>` : ''}

  //     ${policies.authentication.apiKeyRequired ? `
  //     <!-- API Key Check -->
  //     <check-header name="Ocp-Apim-Subscription-Key" failed-check-httpcode="401" failed-check-error-message="API Key missing" />
  //     ` : ''}

  //     ${policies.authentication.ipWhitelist.length > 0 ? `
  //     <!-- IP Restriction -->
  //     <ip-filter action="allow">
  //       ${policies.authentication.ipWhitelist.map(ip => `<address>${ip}</address>`).join('')}
  //     </ip-filter>` : ''}

  //   </inbound>

  //   <backend>
  //     <base />
  //   </backend>

  //   <outbound>
  //     <base />
  //   </outbound>
  // `).join("\n");

  // return `<?xml version="1.0" encoding="utf-8"?>
  // <policies>
  //   ${policiesXml}
  // </policies>`;
};
