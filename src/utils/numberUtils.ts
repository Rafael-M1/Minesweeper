export const generateRandomCoordinates = (matrixSize: number, numberPoints: number)
    : number[][] => {
    validateMatrix(matrixSize, numberPoints);
    const matrix = initializeMatrix(matrixSize);
    
    while (numberPoints > 0) {
        const i = generateRandomNumber(0, matrixSize - 1);
        const j = generateRandomNumber(0, matrixSize - 1);
        if (matrix[i][j] == 1) {
            continue;
        }
        matrix[i][j] = matrix[i][j] + 1;
        numberPoints--;
    }
    return matrix;
};

export const generateNearbyBombMatrix = (bombMatrix: number[][]): number[][] => {
    if (bombMatrix.length <= 0) {
        throw new Error("bombMatrix length must be a positive number.");
    }
    const nearbyBombMatrix =  initializeMatrix(bombMatrix.length);
    bombMatrix.forEach((rowElement, i) => {
        rowElement.forEach((colElement, j) => {
            if (colElement == 1) {
                for (let a = -1; a <= 1; a++) {
                    for (let b = -1; b <= 1; b++) {
                        if (a == 0 && b == 0) {
                            continue;
                        }
                        if (validateArrayIndex(a,b,i,j,bombMatrix)) {
                            nearbyBombMatrix[i + a][j + b] = nearbyBombMatrix[i + a][j + b] + 1;
                        }
                    }
                }
            }
        });
    });
    return nearbyBombMatrix;
}

const validateArrayIndex = (a: number, b: number, i: number, j: number, bombMatrix: number[][]): boolean => {
    if (i + a < 0 || j + b < 0 || i + a > bombMatrix.length - 1 || j + b> bombMatrix.length - 1 || bombMatrix[i + a][j + b] == 1) {
        return false;
    }
    return true;
}

const generateRandomNumber = (startInterval: number, endInterval: number): number => {
    return Math.floor(Math.random() * (endInterval - startInterval + 1)) + startInterval;
}

export const initializeMatrix = (matrixSize: number): number[][] => {
    return Array.from({ length: matrixSize }, () => Array(matrixSize).fill(0));
}

const validateMatrix = (matrixSize: number, numberPoints: number) : void => {
    if (matrixSize <= 0) {
        throw new Error("matrixSize must be a positive number.");
    }
    if (numberPoints <= 0) {
        throw new Error("numberPoints must be a positive number.");
    }
    if ((matrixSize * matrixSize - numberPoints) < 0) {
        throw new Error("numberPoints must be less than the square of matrixSize");
    }
}