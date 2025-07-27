#!/usr/bin/env bash

set -ex

THEME_NAME=$1
if [ -z "$THEME_NAME" ]; then
  echo "Please set the THEME_NAME environment variable"
  exit 1
fi

# Create the build directory
mkdir -p build

# Create a temporary directory for JAR packaging
temp_dir=$(mktemp -d --tmpdir=build)

# Cleanup function to remove the temporary directory
cleanup() {
  echo "Cleaning up..."
  rm -rf "$temp_dir"
}

# Cleanup the temporary directory on exit
trap cleanup EXIT

# Create META-INF directory
mkdir -p {"$temp_dir/META-INF","$temp_dir/theme"}

# Copy the contents of the folder to the temporary directory
cat <<EOF > "$temp_dir/META-INF/keycloak-themes.json"
{
  "themes": [
    {
      "name": "$THEME_NAME",
      "types": [
        "login", "common"
      ]
    }
  ]
}
EOF

# Copy the theme data to the temporary directory
cp -r "data" "$temp_dir/theme/$THEME_NAME"

# Create the JAR file inside the providers directory
jar cf "build/theme-$THEME_NAME.jar" -C "$temp_dir" .

# Remove the temporary directory
echo "Theme created: build/theme-$THEME_NAME.jar"
