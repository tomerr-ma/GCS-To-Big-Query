#!/bin/sh

BUCKET_NAME="cloudflare-ma"
DATASET="cloudflare_logs"
TABLE="cloudflare_moonactive_net_"

gcloud functions deploy gcsbq \
    --runtime nodejs8 \
    --trigger-resource $BUCKET_NAME \
    --trigger-event google.storage.object.finalize \
    --memory=1024MB \
    --set-env-vars DATASET=$DATASET,TABLE=$TABLE,SCHEMA="./schema.json"
