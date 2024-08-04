#!/bin/bash

# Get the list of IP addresses
IP_ADDRESSES=$(hostname -I)

# Determine the correct IP address
# Assuming WiFi IP starts with 192 and mobile network IP is the second address
CORRECT_IP=""
for IP in $IP_ADDRESSES; do
  if [[ $IP == 192.* ]]; then
    CORRECT_IP=$IP
    break
  fi
done

# If no WiFi IP found, use the second IP address
if [ -z "$CORRECT_IP" ]; then
  CORRECT_IP=$(echo $IP_ADDRESSES | awk '{print $2}')
fi

# Update the GLOBAL_API_URL.ts file in both frontend and backend
sed -i "s|export const GLOBAL_API_URL = .*|export const GLOBAL_API_URL = \"http://$CORRECT_IP:3000/api\";|" frontend/GLOBAL_API_URL.ts
sed -i "s|export const GLOBAL_API_URL = .*|export const GLOBAL_API_URL = \"http://$CORRECT_IP:3000/api\";|" backend/GLOBAL_API_URL.ts

echo "Updated GLOBAL_API_URL.ts in both frontend and backend with IP: $CORRECT_IP"