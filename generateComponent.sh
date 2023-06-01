#!/bin/bash
cd src
cd components
while [ true ];
do
  echo "Input component name:"
  read name
  mkdir $name; cd $name; touch $name.js $name.css;
  echo "You'v got $name!"
  echo "*** *** *** *** ***"
  cd ../
done
