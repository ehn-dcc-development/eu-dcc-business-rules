mkdir -p tmp
curl https://jsonlogic.com/tests.json > tmp/tests.json 2> /dev/null
npm start > tmp/results.txt 2> tmp/errors.txt
echo "JsonLogic test suite filtered to a CertLogic test suite"

