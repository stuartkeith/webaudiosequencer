require="require-2.0.2.js"

echo "Removing old build..."
rm output -rf

echo "Creating build directory..."
mkdir -p output/css

echo "Building and compressing JS..."
r.js -o build.js

echo "Copying images..."
cp -r ../source/css/images output/css/images

echo "Building CSS..."
pushd .
cd ../source/scss
./build.sh
popd

echo "Copying CSS..."
r.js -o cssIn=../source/css/main.css out=output/css/main.css

echo "Copying HTML..."
cp ../source/index.html output

echo "Creating directory for require.js..."
mkdir -p output/javascript/libraries/require

echo "Uglifying require.js..."
uglifyjs -nc -o output/javascript/libraries/require/$require ../source/javascript/libraries/require/$require

echo "Done."
