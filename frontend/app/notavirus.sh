#!/bin/bash

# Prompt the user to enter a base64 encoded string
read -p "Enter a base64 encoded string: " base64_string

# Decode the base64 string and store the result in a variable
decoded_string=$(echo "$base64_string" | base64 --decode)

# Split the decoded string into an array based on newlines
IFS=$'\n' read -d '' -r -a lines <<< "$decoded_string"

# Verify that the array contains exactly 20 strings
if [ ${#lines[@]} -ne 20 ]; then
    echo "Error: The decoded string must contain exactly 20 lines."
    exit 1
fi

# Randomly select the first 16 strings and store them in a new array
selected_lines=()
while [ ${#selected_lines[@]} -lt 16 ]; do
    index=$((RANDOM % 16))
    if [[ ! " ${selected_lines[@]} " =~ " ${lines[$index]} " ]]; then
        selected_lines+=("${lines[$index]}")
    fi
done

# Print the selected strings in a 4x4 grid
for ((i=0; i<16; i+=4)); do
    echo "${selected_lines[$i]}  ${selected_lines[$i+1]}  ${selected_lines[$i+2]}  ${selected_lines[$i+3]}"
done

# Define the subsets of related words
subset1=("${lines[@]:0:4}")
subset2=("${lines[@]:4:4}")
subset3=("${lines[@]:8:4}")
subset4=("${lines[@]:12:4}")

# Define the solutions corresponding to each subset
solution1="${lines[16]}"
solution2="${lines[17]}"
solution3="${lines[18]}"
solution4="${lines[19]}"

# ... (previous code remains the same)

# Function to print colored text
print_colored() {
    local color="$1"
    local text="$2"
    case "$color" in
        yellow) echo -en "\033[33m$text\033[0m" ;;
        green)  echo -en "\033[32m$text\033[0m" ;;
        blue)   echo -en "\033[36m$text\033[0m" ;;
        purple) echo -en "\033[35m$text\033[0m" ;;
        *)      echo -en "$text" ;;
    esac
}

# Initialize variables for the game loop
discovered_solutions=()
discovered_colors=()
lives=4

# Game loop
while [ ${#discovered_solutions[@]} -lt 4 ] && [ $lives -gt 0 ]; do
    # Prompt the user to enter 4 words
    echo "Please enter 4 words (press enter after each one):"
    
    # Initialize an array to store the user's words
    user_words=()
    
    # Loop until the user enters 4 valid words
    while [ ${#user_words[@]} -lt 4 ]; do
        read -p "Enter a word: " word
        
        # Check if the entered word is present in the selected_lines array
        if [[ " ${selected_lines[@]} " =~ " $word " ]]; then
            user_words+=("$word")
        else
            echo "Please use words actually on the board."
        fi
    done
    
    # Check if the user's words match any of the subsets
    if [ "${#user_words[@]}" -eq 4 ]; then
        # Sort the arrays for comparison
        IFS=$'\n' sorted_user_words=($(sort <<< "${user_words[*]}"))
        IFS=$'\n' sorted_subset1=($(sort <<< "${subset1[*]}"))
        IFS=$'\n' sorted_subset2=($(sort <<< "${subset2[*]}"))
        IFS=$'\n' sorted_subset3=($(sort <<< "${subset3[*]}"))
        IFS=$'\n' sorted_subset4=($(sort <<< "${subset4[*]}"))
        
        if [[ "${sorted_user_words[*]}" == "${sorted_subset1[*]}" ]] && [[ ! " ${discovered_solutions[@]} " =~ " $solution1 " ]]; then
            echo "Solution discovered: $solution1"
            discovered_solutions+=("$solution1")
        elif [[ "${sorted_user_words[*]}" == "${sorted_subset2[*]}" ]] && [[ ! " ${discovered_solutions[@]} " =~ " $solution2 " ]]; then
            echo "Solution discovered: $solution2"
            discovered_solutions+=("$solution2")
        elif [[ "${sorted_user_words[*]}" == "${sorted_subset3[*]}" ]] && [[ ! " ${discovered_solutions[@]} " =~ " $solution3 " ]]; then
            echo "Solution discovered: $solution3"
            discovered_solutions+=("$solution3")
        elif [[ "${sorted_user_words[*]}" == "${sorted_subset4[*]}" ]] && [[ ! " ${discovered_solutions[@]} " =~ " $solution4 " ]]; then
            echo "Solution discovered: $solution4"
            discovered_solutions+=("$solution4")
        else
            echo "No matching solution found."
            lives=$((lives - 1))
        fi
    else
        echo "Error: Exactly 4 words must be entered."
    fi
    
    # Print the randomized array with colored text for discovered solutions
    for ((i=0; i<16; i+=4)); do
        for ((j=0; j<4; j++)); do
            word="${selected_lines[$((i+j))]}"
            if [[ " ${discovered_solutions[@]} " =~ " $solution1 " ]] && [[ " ${subset1[@]} " =~ " $word " ]]; then
                print_colored "yellow" "$word"
            elif [[ " ${discovered_solutions[@]} " =~ " $solution2 " ]] && [[ " ${subset2[@]} " =~ " $word " ]]; then
                print_colored "green" "$word"
            elif [[ " ${discovered_solutions[@]} " =~ " $solution3 " ]] && [[ " ${subset3[@]} " =~ " $word " ]]; then
                print_colored "blue" "$word"
            elif [[ " ${discovered_solutions[@]} " =~ " $solution4 " ]] && [[ " ${subset4[@]} " =~ " $word " ]]; then
                print_colored "purple" "$word"
            else
                echo -n "$word"
            fi
            echo -n "  "
        done
        echo
    done
    
    echo "Lives remaining: $lives"
    echo
done


# Print the game result
if [ ${#discovered_solutions[@]} -eq 4 ]; then
    echo "Congratulations! You discovered all 4 solutions!"
else
    echo "Game over. You ran out of lives."
fi
