#!/bin/bash

PROJECT_NAME='ayneh'
SERVER_NAME='tika11'
SERVER_PATH='/var/www/ayneh/'

CONTAINER_NAME=${PROJECT_NAME}'_web'

COMPOSE_FILE='docker-compose-ayneh-web.yml'
NGINX_FILE='ayneh_web_nginx.conf'


function log() {
    docker logs -f ${CONTAINER_NAME}
}

function bash() {
    docker exec -it -w /app/${PROJECT_NAME} ${CONTAINER_NAME} sh
}

function pull() {
    echo -e "\n ... pull images ... \n"
    docker-compose -f ${COMPOSE_FILE} pull ${CONTAINER_NAME}
}

function up() {
    echo -e "\n ... up containers ... \n"
    docker-compose -f ${COMPOSE_FILE} up -d
}

function remove_unused_image() {
    echo -e "\n ... remove unused images ... \n"
    docker image prune -af
}

function scp_conf() {
    echo -e "\n ... copy conf files to server ... \n"
    scp ${COMPOSE_FILE} ${NGINX_FILE} mng-web.sh ${SERVER_NAME}:${SERVER_PATH}
}

function issue_https_certificate() {
    sudo certbot --nginx certonly -d ayneh.tika-team.ir
    sudo ln -s ${SERVER_PATH}/${NGINX_FILE} /etc/nginx/sites-enabled/${NGINX_FILE}
    sudo service nginx restart
}

case $1 in
scp_conf)
    scp_conf
;;
up)
    pull
    up
    remove_unused_image
;;
log)
    log
;;
bash)
    bash
;;
https)
    issue_https_certificate
;;
*)
    echo don\'t know
;;
esac