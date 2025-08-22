#!/bin/bash

# Build script for our custom WASM module
echo "Building password generator WASM module..."

# Compile C to WASM using Emscripten (output to root directory)
emcc wasm-src/password_gen.c \
  -o password_gen.wasm \
  -s EXPORTED_FUNCTIONS='["_generate_password_number", "_calculate_strength", "_simple_hash", "_simple_encrypt", "_simple_decrypt", "_set_seed"]' \
  -s EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]' \
  -s ENVIRONMENT='web' \
  -s MODULARIZE=1 \
  -s SINGLE_FILE=1 \
  --no-entry

echo "WASM module built successfully at: password_gen.wasm"