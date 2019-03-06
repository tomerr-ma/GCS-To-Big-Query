#!/bin/sh

BUCKET_NAME="cloudflare-ma"
DATASET="cloudflare_logs"
TABLE="cloudflare_moonactive_net"

gcloud functions deploy gcsbq \
    --runtime nodejs8 \
    --timeout 540 \
    --trigger-http \
    --memory=1024MB \
    --set-env-vars DATASET=$DATASET,TABLE=$TABLE,BUCKET_NAME=$BUCKET_NAME,SCHEMA="./schema.json"
