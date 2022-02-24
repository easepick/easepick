#!/usr/bin/env bash

PATH=$(pwd)
TEXT="npm"
COLOR="blue"
V=$1
VERSION=${V//-/--}

if [ "$1" == "" ]; then
	echo >&2 "No version. Aborting."
	exit 1
fi

/usr/bin/curl -s https://img.shields.io/badge/$TEXT-$VERSION-$COLOR -o $PATH/assets/images/badge.svg