#!/bin/bash
script_folder=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$script_folder"
cd ../Source/boilerplates
npm link
cd ../commands
npm link
cd ../common
npm link
cd ../configurations
npm link
cd ../dependencies
npm link
cd ../files
npm link
cd ../logging
npm link
cd ../packages
npm link
cd ../plugins 
npm link
cd ../utilities 
npm link