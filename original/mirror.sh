#!/bin/bash

LANGUAGE=$1
BASE=http://playgo.to/iwtg/$LANGUAGE/

wget --mirror --no-parent $BASE
pushd .
cd playgo.to/iwtg/$LANGUAGE
wget $BASE/Problem.swf
mkdir xml
cd xml
grep -h Problem\?xmlpath ../*.html | sed -e 's/.*xmlpath\=\(.*\)\' );/\1/' | wget --base=$BASE -i - -c
popd
