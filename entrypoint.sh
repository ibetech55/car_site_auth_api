#!/bin/bash
set -ex

npm run migration:run

exec "$@"