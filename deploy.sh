#!/bin/sh

BUCKET_NAME="MYBAUCKET"
DATASET="MYDATASET"
TABLE="cloudflare_logs"

gcloud functions deploy gcsbq --project aviv-playground\
    --runtime nodejs8 \
    --timeout 540 \
    --trigger-http \
    --memory=1024MB \
    --set-env-vars DATASET=$DATASET,TABLE=$TABLE,BUCKET_NAME=$BUCKET_NAME,SCHEMA="./schema.json"
