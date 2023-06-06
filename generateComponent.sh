#!/bin/bash
# 06.2023
# developed by Elisey Esaulkov

echo "This script genegates js and css files of component in folder by inputed Name"
echo "It creates js and css files by path './src/components/NewComponent'"
echo "Info: For cancel press ctrl-C. It should be located in root of project"

cd src
cd components
while [ true ];
do
  echo ""
  echo "Input component name:"
  read name
  mkdir $name; cd $name; touch $name.js $name.css;
  className=${name,,}

cat << EOF > $name.js
import React from 'react';
import './$name.css';

function $name() {

  return(
    <div className='$className'>

    </div>
  );
}
export default $name;
EOF

cat << EOF > $name.css
.$className {

}
EOF

  echo "You'v got $name!"
  echo "*** *** *** *** ***"
  cd ../
done
