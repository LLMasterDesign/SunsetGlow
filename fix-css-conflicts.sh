#!/bin/bash

echo "🧹 Cleaning up CSS merge conflicts..."

# Create a backup
cp SGL.Website/styles.css SGL.Website/styles.css.backup

# Remove merge conflict markers and keep the HEAD version (current main)
sed -i '/^<<<<<<< HEAD$/,/^>>>>>>> origin\/main$/c\
' SGL.Website/styles.css

# Remove any remaining conflict markers
sed -i '/^=======$/d' SGL.Website/styles.css
sed -i '/^<<<<<<< HEAD$/d' SGL.Website/styles.css
sed -i '/^>>>>>>> origin\/main$/d' SGL.Website/styles.css

# Remove empty lines that might have been left behind
sed -i '/^[[:space:]]*$/N;/^\n$/d' SGL.Website/styles.css

echo "✅ CSS conflicts cleaned up"
echo "📁 Backup created at SGL.Website/styles.css.backup"