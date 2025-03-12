#!/bin/bash

# Script to optimize Cursor IDE resources
# Usage: ./optimize-cursor.sh

echo "🧹 Optimizing Cursor resources..."

# Make sure Cursor is closed
echo "⚠️ Please close Cursor before continuing"
read -p "Press Enter to continue..."

# Clear caches
echo "🗑️ Clearing Cursor caches..."
rm -rf ~/Library/Application\ Support/Cursor/Cache/* 2>/dev/null
rm -rf ~/Library/Application\ Support/Cursor/CachedData/* 2>/dev/null
rm -rf ~/Library/Application\ Support/Cursor/Code\ Cache/* 2>/dev/null
rm -rf ~/Library/Application\ Support/Cursor/GPUCache/* 2>/dev/null

# Clean up logs
echo "📝 Cleaning up logs..."
find ~/Library/Application\ Support/Cursor -name "*.log" -exec rm {} \; 2>/dev/null

# Clear crash reports
echo "💥 Removing crash reports..."
rm -rf ~/Library/Application\ Support/Cursor/Crashpad/* 2>/dev/null

# Clean up unused extensions data
echo "🧩 Optimizing extensions..."
rm -rf ~/.cursor/extensions/*/node_modules/.cache 2>/dev/null

# Reset Electron state
echo "⚡ Resetting Electron state..."
rm ~/Library/Application\ Support/Cursor/Preferences 2>/dev/null
rm ~/Library/Application\ Support/Cursor/storage.json 2>/dev/null

# Compact workspaces storage
echo "💼 Compacting workspaces storage..."
[ -f ~/Library/Application\ Support/Cursor/User/workspaceStorage/*/state.vscdb ] && \
find ~/Library/Application\ Support/Cursor/User/workspaceStorage -name "state.vscdb" -exec sqlite3 {} "VACUUM;" \; 2>/dev/null

echo "✅ Optimization complete! Cursor should run faster now."
echo "🚀 Start Cursor again and enjoy improved performance."

# Make script executable
chmod +x optimize-cursor.sh 