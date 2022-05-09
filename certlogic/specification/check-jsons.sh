yarn add --dev ajv
yarn add --dev ajv-cli
yarn add --dev ajv-formats

echo "Checking JSON Schema for: CertLogic expression..."
npx ajv-cli compile --strict=true --all-errors -s schemas/CertLogic-expression.json

echo "Checking JSON Schema for: CertLogic test suite..."
npx ajv-cli compile --strict=true --all-errors -s schemas/CertLogic-testSuite.json -r schemas/CertLogic-expression.json

echo "Checking JSON Schema for: CertLogic validation test suite..."
npx ajv-cli compile --strict=true --all-errors -s schemas/CertLogic-validation-testSuite.json

echo "Checking test cases against JSON Schema..."
npx ajv-cli validate --strict=true --all-errors -s schemas/CertLogic-testSuite.json -r schemas/CertLogic-expression.json -d "testSuite/*.json"

echo "Checking validation test cases against JSON Schema..."
npx ajv-cli validate --strict=true --all-errors -s schemas/CertLogic-validation-testSuite.json -d "validation-testSuite/*.json"

