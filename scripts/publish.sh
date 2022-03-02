#!/usr/bin/env bash

# Usage: ./publish.sh <major|minor|patch> - Increments the relevant version part by one.
#
# Usage 2: ./publish.sh <version-from> <version-to>
# 	e.g: ./publish.sh 1.1.1 2.0
#
# 	e.g: sh publish.sh patch

set -e

function bump() {
	echo -n "Updating $1..."
	tmp_file=$(mktemp)
	rm -f "$tmp_file"
  echo $2
  echo $3
  echo $1
  echo $tmp_file
	sed -i '' "s/$2/$3/1w $tmp_file" $1
	if [ -s "$tmp_file" ]; then
		echo "Done"
	else
		echo "Nothing to change"
	fi
	rm -f "$tmp_file"
}

function confirm() {
	read -r -p "$@ [Y/n]: " confirm

	case "$confirm" in
		[Nn][Oo]|[Nn])
			echo "Aborting."
			exit
			;;
	esac
}

if [ "$1" == "" ]; then
	echo >&2 "No 'from' version set. Aborting."
	exit 1
fi

if [ "$1" == "major" ] || [ "$1" == "minor" ] || [ "$1" == "patch" ]; then
	# current_version=$(grep -Po '(?<="version": ")[^"]*' package.json)
  current_version=$(perl -nle'print $& while m{(?<="version": ")[^"]*}g' package.json)

	IFS='.' read -a version_parts <<< "$current_version"

	major=${version_parts[0]}
	minor=${version_parts[1]}
	patch=${version_parts[2]}

	case "$1" in
		"major")
			major=$((major + 1))
			minor=0
			patch=0
			;;
		"minor")
			minor=$((minor + 1))
			patch=0
			;;
		"patch")
			patch=$((patch + 1))
			;;
	esac
	new_version="$major.$minor.$patch"
else
	if [ "$2" == "" ]; then
		echo >&2 "No 'to' version set. Aborting."
		exit 1
	fi
	current_version="$1"
	new_version="$2"
fi

if ! [[ "$new_version" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
	echo >&2 "'to' version doesn't look like a valid semver version tag (e.g: 1.2.3). Aborting."
	exit 1
fi

npm test

confirm "Bump version number from $current_version to $new_version?"

bump package.json "\"version\": \"$current_version\"" "\"version\": \"$new_version\""

npm run prod

new_tag="$new_version"

confirm "Publish $new_tag?"

echo "Committing changed files..."

git add .
git commit -m "$new_tag"
git tag -a $new_tag -m "$new_tag"
git push --follow-tags

npm publish --workspaces