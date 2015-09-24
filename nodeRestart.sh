#!/bin/bash
#

# Step into app container
docker exec -it quiz-team bash

# Kill running server process
kill `pgrep node`

# Start server
node server/server.js

# Exit container
exit