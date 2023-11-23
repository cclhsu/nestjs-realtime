#!/usr/bin/env bash
# ******************************************************************************
# Copyright 2020 Clark Hsu
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# ******************************************************************************
# How To
# - [Company/Project](<https://{{ GITHUB_PROJECT }}.io/>)
# - [Documentation](<https://{{ GITHUB_PROJECT }}.io/doc>)
# - [Github](<https://github.com/{{ GITHUB_USER }}/{{ GITHUB_PROJECT }}>)
# - [Wikipedia](<https://en.wikipedia.org/wiki/{{ TOPIC }}>)
# ******************************************************************************
# Mark Off this section if use as lib
PROGRAM_NAME=$(basename "${0}")
AUTHOR=clark_hsu
VERSION=0.0.1
# ******************************************************************************
echo -e "\n================================================================================\n"
#echo "Begin: $(basename "${0}")"
#set -e # Exit on error On
#set -x # Trace On
# ******************************************************************************
# Load Configuration

echo -e "\n>>> Load Configuration ...\n"
TOP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "${TOP_DIR}/_log.sh"
source "${TOP_DIR}/_common_lib.sh"

PROJECT_DIR=$(dirname $(dirname $(dirname "${0}")))
cd "${PROJECT_DIR}" || exit
PROJECT_DIR="$(pwd)"
log_info "Using current directory: ${PROJECT_DIR}"

# # Load environment variables from _config.sh file
# if [ -f "${TOP_DIR}/_config.sh" ]; then
#     log_info "Loading environment variables from _config.sh file"
#     source "${TOP_DIR}/_config.sh"
# fi

# # Load environment variables from .env file
# if [ -f "${PROJECT_DIR}/.env" ]; then
#     log_info "Loading environment variables from .env file"
#     source "${PROJECT_DIR}/.env"
# fi

# ******************************************************************************
# Parameters

# # Check if the file or directory in the argument exists
# if [ $# -eq 0 ]; then
#     log_error "Usage: ${0} <FILE.ext> or ${0} <DIRECTORY>"
#     exit 1
# fi

# ******************************************************************************
# Functions

# ******************************************************************************
# Main Program

# Purpose: remove comments and decorators from TypeScript FILES
# Keep for reference:
# sed -e '/@.*(.*)/d' -e '/@.*({/,/})/d' -e '/@.*(/{:a;N;/})/!ba;d;}' "${1}"
# sed -e '/\/\/ .*/d' -e '/\/\*/,/\*\//d' "${1}"
# sed -e '/'\''use strict'\'';/d' "${1}"
# sed -e '/import .*;/d' -e '/import {/,/} from .*;/d' "${1}"
# sed -e '/const ERR_MSGS = {/,/};/d' "${1}"
# sed -e '/constructor(/{:start /}/!{N;b start};d}' "${1}"
# see -e '/^export default .*;$/d' "${1}"
# sed -e '/^function .*(/{:start /}/!{N;b start};d}' "${1}"
# sed -e '/^[[:space:]]*$/d' "${1}"

# sed -e '/^function .*(/{:start /}/!{N;b start};d}' "${1}"

# Check if a FILE name is provided as an argument
if [ $# -eq 0 ]; then
    log_error "Usage: ${0} <FILE.ts> or ${0} <directory>"
    exit 1
fi

# Check if the argument is a FILE or directory
if [ -f "${1}" ]; then
    # It's a FILE
    TARGET="${1}"
elif [ -d "${1}" ]; then
    # It's a directory
    TARGET="${1}"
else
    log_error "Invalid argument: ${1} is neither a FILE nor a directory"
    exit 1
fi

# Define a function to process a single TypeScript FILE
function process_file() {
    local FILE="${1}"
    # log_info "Cleaning FILE: ${FILE}"
    # divider
    # Remove comments, decorators, constructor, empty lines, and print only class content
    # sed -e '/\/\/ .*/d' -e '/\/\*/,/\*\//d' -e '/import .*;/d' -e '/import {/,/} from .*;/d' -e '/const ERR_MSGS = {/,/};/d' -e '/@.*(.*)/d' -e '/@.*({/,/})/d' -e '/@.*(/{:a;N;/})/!ba;d;}' -e '/constructor(/{:start /}/!{N;b start};d}' -e '/^[[:space:]]*$/d' "${FILE}"
    sed -e '/@.*(.*)/d' -e '/@.*({/,/})/d' -e '/@.*(/{:a;N;/})/!ba;d;}' -e '/\/\/ .*/d' -e '/\/\*/,/\*\//d' -e '/'\''use strict'\'';/d' -e '/import .*;/d' -e '/import {/,/} from .*;/d' -e '/const ERR_MSGS = {/,/};/d' -e '/constructor(/{:start /}/!{N;b start};d}' -e '/^export default .*;$/d' -e '/^[[:space:]]*$/d' "${FILE}"
}

# Directory to search for .entity.ts FILES
PATTERN="*.dto.ts" # "*.entity.ts" or "*.dto.ts"
# DIR="/Users/clark.hsu/src/myProject/project-suite/project-suite-cli/src/"
# DIR="/Users/clark.hsu/src/myProject/project-suite/project-suite-service/src/"
# DIR="/Users/clark.hsu/src/myProject/project-suite/project-suite-web/src/"
# DIR="/Users/clark.hsu/src/myProject/project-suite/project-suite-service/src/common/entity"
# DIR="/Users/clark.hsu/src/myProject/project-suite/project-suite-service/src/project-communication"
# DIR="/Users/clark.hsu/src/myProject/project-suite/project-suite-service/src/project-management"
# DIR="/Users/clark.hsu/src/myProject/project-suite/project-suite-service/src/stakeholders"

# Check if the TARGET is a directory
if [ -d "${TARGET}" ]; then
    log_info "Cleaning directory: ${TARGET}"
    divider
    # Use find to locate .entity.ts FILES and apply sed to each of them
    # FILES=$(find "${TARGET}" -maxdepth 1 -type f -name ${PATTERN} | sort)
    FILES=$(find "${TARGET}" -type f -name ${PATTERN} | sort)
    log_info "${FILES}"
    for FILE in ${FILES}; do
        if [ -f "${FILE}" ]; then
            # Replace the echo command with your desired command
            process_file "${FILE}"
        fi
    done
else
    # It's a single FILE
    process_file "${TARGET}"
fi

# ******************************************************************************
#set +e # Exit on error Off
#set +x # Trace Off
#echo "End: $(basename "${0}")"
echo -e "\n================================================================================\n"
exit 0
# ******************************************************************************
