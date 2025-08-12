function countConsecutiveSums(n: number): number {
    let count = 0;
    
    // Probamos con diferentes longitudes de secuencias consecutivas
    for (let length = 1; length <= Math.sqrt(2 * n); length++) {
        // Para una secuencia de 'length' números consecutivos empezando en 'start':
        // sum = start + (start+1) + ... + (start+length-1)
        // sum = length * start + length*(length-1)/2 = n
        // start = (n - length*(length-1)/2) / length
        
        const numerator = n - (length * (length - 1)) / 2;
        
        // El número inicial debe ser un entero positivo
        if (numerator > 0 && numerator % length === 0) {
            count++;
        }
    }
    
    return count;
}

// Ejemplos de uso
console.log(countConsecutiveSums(21)); // 3
console.log(countConsecutiveSums(15)); // 4 (15, 7+8, 4+5+6, 1+2+3+4+5)
console.log(countConsecutiveSums(9));  // 3 (9, 4+5, 2+3+4)

export { countConsecutiveSums };