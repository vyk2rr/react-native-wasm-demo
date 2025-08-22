// Password Generator and Security Utils in WASM
// Since WASM works better with numbers, we'll use numeric approaches

// Simple pseudo-random number generator (Linear Congruential Generator)
static unsigned int seed = 123456789;

unsigned int simple_random() {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed;
}

// Generate a "password number" - a large random number that represents a password
unsigned int generate_password_number() {
    return simple_random();
}

// Calculate password strength (0-100)
// Based on number of digits and patterns
int calculate_strength(unsigned int password_num) {
    int strength = 0;
    unsigned int temp = password_num;
    int digit_count = 0;
    
    // Count digits
    while (temp > 0) {
        digit_count++;
        temp /= 10;
    }
    
    // Base strength from digit count
    strength = (digit_count * 10);
    if (strength > 70) strength = 70;
    
    // Bonus for larger numbers (more "complexity")
    if (password_num > 1000000) strength += 15;
    if (password_num > 100000000) strength += 15;
    
    // Cap at 100
    if (strength > 100) strength = 100;
    
    return strength;
}

// Simple hash function (like a basic checksum)
unsigned int simple_hash(unsigned int input) {
    unsigned int hash = input;
    hash = ((hash >> 16) ^ hash) * 0x45d9f3b;
    hash = ((hash >> 16) ^ hash) * 0x45d9f3b;
    hash = (hash >> 16) ^ hash;
    return hash;
}

// "Encrypt" a number with a simple XOR cipher
unsigned int simple_encrypt(unsigned int data, unsigned int key) {
    return data ^ key;
}

// Decrypt (same as encrypt with XOR)
unsigned int simple_decrypt(unsigned int encrypted_data, unsigned int key) {
    return encrypted_data ^ key;
}

// Generate a seed based on input (to make it deterministic if needed)
void set_seed(unsigned int new_seed) {
    seed = new_seed;
}