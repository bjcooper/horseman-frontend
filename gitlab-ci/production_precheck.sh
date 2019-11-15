#!/usr/bin/bash

# Bring config variables to the top for easy access.
module_dir="../sites/all/modules/custom"
theme_dir="../sites/all/themes/custom"
extensions="php,inc,module"

# Just some variables for prettier output.
COLOR="\e[36m"
NO_COLOR="\e[39m"

# Give an intro and some usage info.
echo -e "${COLOR}This utility uses PHP Code Sniffer to check code against debug calls on production."
echo "Options:"
echo "  -m to check custom modules"
echo "  -t to check custom themes"
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

# Process modules.
if [ $modules = true ]
then
  echo -e "${COLOR}Checking custom modules..."
  echo -e "--------------------------------------------------------------------------------${NO_COLOR}"
  phpcs -n -p --colors --extensions=$extensions --standard=custom_ruleset.xml --ignore=*/features/* $module_dir
  if [ $? != 0 ]
  then
    exit 1;
  fi
fi
# Process themes.
if [ $themes = true ]
then
  echo -e "${COLOR}Checking custom themes..."
  echo -e "--------------------------------------------------------------------------------${NO_COLOR}"
  phpcs -n -p --colors --extensions=$extensions --standard=custom_ruleset.xml --ignore=*/css/*,*/libraries/* $theme_dir
  if [ $? != 0 ]
  then
    exit 1;
  fi
fi

