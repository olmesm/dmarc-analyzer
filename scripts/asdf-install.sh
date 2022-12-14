#!/usr/bin/env sh

# Installs ASDF dependencies as per order of listing in .tool-versions.
# Prevents race conditions eg where python is required by another package.

TOOL_FILE=".tool-versions"
TOOLS=$(awk '{print $1}' $TOOL_FILE)

echo ">> Install all tools as per $TOOL_FILE\n"

for tool in $TOOLS; do
  asdf plugin add $tool
  echo "---"
done

echo ">> Completed\n"

echo ">> Install all tool versions as per $TOOL_FILE"

for tool in $(cat $TOOL_FILE); do
  asdf install $tool
  echo "---"
done

echo ">> Completed\n"
