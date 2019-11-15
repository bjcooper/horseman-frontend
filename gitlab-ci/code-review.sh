#!/bin/bash

# Bring config variables to the top for easy access.
module_dir="../web/sites/all/modules/custom"
theme_dir="../web/sites/all/themes/custom"

# Just some variables for prettier output.
COLOR="\e[36m"
NO_COLOR="\e[39m"

# Give an intro and some usage info.
echo -e "${COLOR}This utility uses PHP Code Sniffer to check code against Drupal coding standards."
echo "Options:"
echo "  -m to check custom modules"
echo "  -t to check custom themes"
echo "  -f to have PHP Beautifier and Code Formatter (phpbsf) attempt to automatically correct issues"
echo -e "${NO_COLOR}"

# Check our flags.
fix=false
modules=false
themes=false
while getopts fmt opt; do
  case $opt in
    f) fix=true; ;;
    m) modules=true; ;;
    t) themes=true; ;;
  esac
done

# Make sure everything is installed, up to date, and set.
#composer global require drupal/coder
if [ -d "$HOME/.config/composer" ]
then
  export PATH="$PATH:$HOME/.config/composer/vendor/bin"
  phpcs --config-set installed_paths ~/.config/composer/vendor/drupal/coder/coder_sniffer
elif [ -d "$HOME/.composer" ]
then
  export PATH="$PATH:$HOME/.composer/vendor/bin"
  phpcs --config-set installed_paths ~/.composer/vendor/drupal/coder/coder_sniffer
fi
echo ""

# We want to run all the checks so we can fix everything at once, so start with
# a 0 RESULT
RESULT=0

# Just check for issues, or also try to fix them?
if [ $fix = true ]
then
  # Process modules.
  if [ $modules = true ]
  then
    echo -e "${COLOR}Attempting to fix custom modules..."
    echo -e "--------------------------------------------------------------------------------${NO_COLOR}"
    phpcbf -n -p --colors --standard=Drupal --ignore=*/features/* --no-patch $module_dir
    RESULT=$(($RESULT+$?))
  fi
  # Process themes.
  if [ $themes = true ]
  then
    echo -e "${COLOR}Attempting to fix custom themes..."
    echo -e "---------------------------------------------------------------------------------${NO_COLOR}"
    phpcbf -n -p --colors --standard=Drupal --ignore=*/css/*,*/libraries/* --no-patch $theme_dir
    RESULT=$(($RESULT+$?))
  fi
else
  # Process modules.
  if [ $modules = true ]
  then
    echo -e "${COLOR}Checking custom modules..."
    echo -e "--------------------------------------------------------------------------------${NO_COLOR}"
    phpcs -n -p --colors --standard=Drupal --ignore=*/features/* $module_dir
    RESULT=$(($RESULT+$?))
  fi
  # Process themes.
  if [ $themes = true ]
  then
    echo -e "${COLOR}Checking custom themes..."
    echo -e "--------------------------------------------------------------------------------${NO_COLOR}"
    phpcs -n -p --colors --standard=Drupal --ignore=*/css/*,*/libraries/* $theme_dir
    RESULT=$(($RESULT+$?))
  fi
fi

if [ $RESULT != 0 ]
then
  exit 1;
fi
