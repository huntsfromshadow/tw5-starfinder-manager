#!/bin/bash

TIDDLER_ROOT='/home/huntsfromshadow/code/tw5-starfinder-manager/src/tiddlers'
PLUGIN_FILE="./editions/release/output/SF_RPG_Manager.tid"
tiddlers=(
    "README.tid"
    "Pit Trap.tid"
    "Elder Air Elemental.tid"
    "Living Hologram.tid"        
    "system/SiteTitle.tid"
    "system/SiteSubtitle.tid"
    "system/DefaultTiddlers.tid" )

if [ -d "./tmp" ]
then
    echo "Tmp output direc exists. Stopping."
    exit 9999
fi

# Generate Latest version of the plugin
npm run release

# Grab version #
VERSION=`grep -oP '^version: (.*)' ${PLUGIN_FILE} | cut -d" " -f2`

#Make a copy here
cp "${PLUGIN_FILE}" "./SF_RPG_Manager_v${VERSION}.tid"

# Setup the new empty wiki
tiddlywiki tmp --init server
for t in "${tiddlers[@]}"
do
    fp="${TIDDLER_ROOT}/${t}"
    tiddlywiki tmp --import "${fp}" "application/x-tiddler"
done
tiddlywiki tmp --import "${PLUGIN_FILE}" "application/x-tiddler"

# Do final build
tiddlywiki tmp --build index

cp tmp/output/index.html ./
