#!/usr/bin/env bash
# Replaces the ${VITE_FIREBASE_*} placeholders in public/firebase-init.js
# with values from the environment (GitHub secrets in CI, or .env locally).
set -euo pipefail

VARS=(
  VITE_FIREBASE_API_KEY
  VITE_FIREBASE_AUTH_DOMAIN
  VITE_FIREBASE_PROJECT_ID
  VITE_FIREBASE_STORAGE_BUCKET
  VITE_FIREBASE_MESSAGING_SENDER_ID
  VITE_FIREBASE_APP_ID
  VITE_FIREBASE_MEASUREMENT_ID
)

missing=()
for var in "${VARS[@]}"; do
  [[ -n "${!var:-}" ]] || missing+=("$var")
done
if (( ${#missing[@]} )); then
  echo "Variáveis ausentes: ${missing[*]}" >&2
  echo "Configure-as em Settings → Secrets and variables → Actions." >&2
  exit 1
fi

file="$(dirname "$0")/../public/firebase-init.js"
shell_format="$(printf '${%s} ' "${VARS[@]}")"
envsubst "$shell_format" < "$file" > "$file.tmp"
mv "$file.tmp" "$file"

if grep -q '\${VITE_FIREBASE_' "$file"; then
  echo "Placeholders não substituídos em $file" >&2
  exit 1
fi
echo "Configuração do Firebase injetada em $file"
