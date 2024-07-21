#!/bin/bash

# Prompt the user for input
read -p "Please enter a string containing only 'a' and 'b': " input_string

# Check if the input string contains only 'a' and 'b'
if [[ $input_string =~ ^[ab]+$ ]]; then
    echo "Valid input received."
else
    echo "The string must contain only 'a' and 'b'."
    exit 1
fi

# Define the reference string
ref_string="test"

# Get the length of the input string
input_length=${#input_string}

# Calculate midpoint of the string
midpoint=$((input_length / 2))

# Iterate up to the midpoint of the input string
for ((i=0; i<midpoint; i++)); do
    char=${input_string:$i:1}

    if [[ $char == "a" ]]; then
        # Apply base32 encoding and overwrite ref_string
        ref_string=$(echo -n "$ref_string" | base32)
    elif [[ $char == "b" ]]; then
        # Apply base64 encoding and overwrite ref_string
        ref_string=$(echo -n "$ref_string" | base64)
    fi
done

# Iterate from just after the midpoint to the end of the string
for ((i=midpoint+1; i<input_length; i++)); do
    char=${input_string:$i:1}

    if [[ $char == "a" ]]; then
        # Attempt base32 decoding and overwrite ref_string
        if ! decoded=$(echo -n "$ref_string" | base32 --decode 2>/dev/null); then
            echo "not a palindrome!"
            exit 1
        fi
        ref_string=$decoded
    elif [[ $char == "b" ]]; then
        # Attempt base64 decoding and overwrite ref_string
        if ! decoded=$(echo -n "$ref_string" | base64 --decode 2>/dev/null); then
            echo "not a palindrome!"
            exit 1
        fi
        ref_string=$decoded
    fi
done

# Output the final modified ref_string
echo "Final modified ref_string: $ref_string"

