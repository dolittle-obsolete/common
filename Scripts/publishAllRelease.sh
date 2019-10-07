#!/bin/bash
script_folder=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$script_folder"
cd ../Source/boilerplates
npm publish
cd ../commands
npm publish
cd ../common
npm publish
cd ../configurations
npm publish
cd ../dependencies
npm publish
cd ../files
npm publish
cd ../host
npm publish
cd ../logging
npm publish
cd ../packages
npm publish
cd ../plugins 
npm publish
cd ../utilities 
npm publish