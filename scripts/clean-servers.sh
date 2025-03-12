#!/bin/bash

# Script to find and terminate all running Docusaurus servers
# before starting a new one

echo "Checking for running Docusaurus servers..."

# Find all processes matching 'docusaurus serve' or 'docusaurus start'
SERVER_PIDS=$(ps aux | grep "docusaurus" | grep -E 'serve|start' | grep -v grep | awk '{print $2}')

if [ -z "$SERVER_PIDS" ]; then
  echo "No running Docusaurus servers found."
else
  echo "Found running Docusaurus servers with PIDs: $SERVER_PIDS"
  echo "Terminating servers..."
  
  # Kill each server process
  for PID in $SERVER_PIDS; do
    echo "Terminating server with PID: $PID"
    kill $PID
  done
  
  # Give processes a moment to terminate
  sleep 1
  
  # Check if any processes are still running
  REMAINING=$(ps aux | grep "docusaurus" | grep -E 'serve|start' | grep -v grep | awk '{print $2}')
  if [ -n "$REMAINING" ]; then
    echo "Some servers are still running. Forcing termination..."
    for PID in $REMAINING; do
      echo "Force terminating server with PID: $PID"
      kill -9 $PID
    done
  fi
  
  echo "All Docusaurus servers have been terminated."
fi

echo "Ready to start a new server." 