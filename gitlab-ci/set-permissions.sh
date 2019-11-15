#!/bin/bash

# In order to ensure proper file system security on your installation, this
# script can be used to make sure file owner, group, and other permission are
# set during deployment.
#
# Most sites won't want to run this as part of every deploy because it can take
# a really really long time to run (and isn't really necessary). The recommended
# use would be to copy and rename it to the root user's home directory once for
# each site (production, staging, etc.) and run it manually from there as
# needed.
#
# Only root can change file ownership, so if you do want to run this as part of
# your automatic deployment, it's recommended to copy this file, secure it so
# that only root can write to it, then give the devops user sudo access to this
# file only. It will then run your copy of this script as sudo during the deploy
# process.
#
# For example:
#
# 1. Copy this file to the devops home directory and rename it:
#
#    cp /path/to/mysite/gitlab-ci/set-permissions.sh.example /home/devops/gitlab-ci/set-permissions-mysite.sh
#
# 2. Make sure root owns it and only root can write to it:
#
#    chown root:devops /home/devops/gitlab-ci/set-permissions-mysite.sh
#    chmod u=rwx,g=rx,o= /home/devops/gitlab-ci/set-permissions-mysite.sh
#
# 3. Add a sudoer entry:
#
#    visudo -f /etc/sudoers.d/gitlab-ci
#
# 4. In the new sudoer file, allow the devops user to run this one script as
#    root:
#
#    devops ALL=(ALL) NOPASSWD: /home/devops/gitlab-ci/set-permissions-mysite.sh
#
site_dir=$1

if [ -d $site_dir ]; then
  public_uploads_dir="${site_dir}/web/sites/default/files"
  private_uploads_dir="${site_dir}/private"
  settings_file="${site_dir}/web/sites/default/settings.php"

  project_owner="devops"
  project_group="devops"

  # 1. Make sure the project has the correct owner and group.
  echo "Setting owner and group (${project_owner}:${project_group}) recursively on project (${site_dir})..."
  chown $project_owner:$project_group -R $site_dir
  echo "DONE"

  # 2. Set directory permissions on the entire project.
  echo "Setting restrictive directory (u=rwx,g=rx,o=) and file (u=rw,g=r,o=) permissions recursively on project..."
  find $site_dir -type d -exec chmod u=rwx,g=rx,o= '{}' \;
  find $site_dir -type f -exec chmod u=rw,g=r,o= '{}' \;
  echo "DONE"

  # 3. Allow the webserver to write to the uploads directories.
  echo "Allowing webserver write access to uploads directory (${public_uploads_dir} and ${private_uploads_dir})..."
  find $public_uploads_dir -type d -exec chmod ug=rwx,o= '{}' \;
  find $public_uploads_dir -type f -exec chmod ug=rw,o= '{}' \;
  find $private_uploads_dir -type d -exec chmod ug=rwx,o= '{}' \;
  find $private_uploads_dir -type f -exec chmod ug=rw,o= '{}' \;
  echo "DONE"

  # 4. Set extra restrictive permission on settings.php.
  echo "Settings extra restrictive access to settings.php (${settings_file})..."
  chmod u=rw,g=r,o= $settings_file
  echo "DONE"
else
  echo "Directory does not exist, exiting."
  exit 1
fi

