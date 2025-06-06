#!/bin/bash

# Script to launch the activity monitor in a new iTerm window

# Get the full path to the monitor script
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
MONITOR_SCRIPT="$SCRIPT_DIR/monitor-build-activity.sh"

# Launch in new iTerm window
osascript -e "
tell application \"iTerm\"
    create window with default profile
    tell current session of current window
        write text \"cd \\\"$(dirname "$SCRIPT_DIR")\\\" && ./scripts/monitor-build-activity.sh\"
    end tell
end tell
"

echo "✅ Activity monitor launched in new iTerm window"