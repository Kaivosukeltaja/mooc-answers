#!/bin/sh
npm run build
rm -rf ../../../mooc-express/build
cp -r build ../../../mooc-express/
