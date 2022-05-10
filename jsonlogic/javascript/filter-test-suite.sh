mkdir -p tmp
rm -f tmp/*

curl https://jsonlogic.com/tests.json > tmp/tests.json 2> /dev/null

npm start > tmp/results.txt 2> tmp/errors.txt
echo "JsonLogic test suite filtered to a CertLogic test suite"

# Inspect tmp/results.txt to see how many test case weren't rejected.
# Inspect tmp/errors.txt to see which test cases failed (and therefore were rejected), and why.

