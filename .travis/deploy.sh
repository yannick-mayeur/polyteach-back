#!/usr/bin/env bash

eval "$(ssh-agent -s)"
chmod 600 .travis/travis
ssh-add .travis/travis
ssh-keyscan igpolytech.fr >> ~/.ssh/known_hosts
if [ "$1" = "production" ]; then
        git remote add deploy dokku@igpolytech.fr:polyteach-back
        git config --global push.default simple
        git push deploy master --force
elif [ "$1" = "staging" ]; then
        git remote add deploy dokku@igpolytech.fr:polyteach-back-staging
        git config --global push.default simple
        git push deploy dev:master --force
else 
        echo "Bad environment"
fi
