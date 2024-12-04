function generatePolynomial(t, constantTerm, order) {
    /**
     * Generate a polynomial of degree t-1 with a constant term and random coefficients.
     * 
     * @param {number} t - The degree of the polynomial + 1.
     * @param {number} constantTerm - The constant term of the polynomial.
     * @param {number} order - The modulo for coefficients.
     * @returns {Array<number>} - Array of coefficients of the polynomial.
     */
    const coefficients = [constantTerm];
    for (let i = 1; i < t; i++) {
        coefficients.push(Math.floor(Math.random() * order));
    }
    return coefficients;
}


function evaluatePolynomial(coefficients, x, order) {
    /**
     * Evaluate a polynomial at a given x modulo the order.
     * 
     * @param {Array<number>} coefficients - Array of coefficients of the polynomial.
     * @param {number} x - The value at which to evaluate the polynomial.
     * @param {number} order - The modulo for the result.
     * @returns {number} - The result of the polynomial evaluation modulo order.
     */
    return coefficients.reduce((sum, coefficient, index) => {
        return (sum + coefficient * Math.pow(x, index)) % order;
    }, 0);
}
