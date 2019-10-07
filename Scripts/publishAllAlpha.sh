#!/bin/bash
script_folder=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$script_folder"
cd ../Source/boilerplates
npm publish --tag alpha
cd ../commands
npm publish --tag alpha
cd ../common
npm publish --tag alpha
cd ../configurations
npm publish --tag alpha
cd ../dependencies
npm publish --tag alpha
cd ../files
npm publish --tag alpha
cd ../host
npm publish --tag alpha
cd ../logging
npm publish --tag alpha
cd ../packages
npm publish --tag alpha
cd ../plugins 
npm publish --tag alpha
cd ../utilities 
npm publish --tag alpha