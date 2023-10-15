## Random number
The random number can be generated in a step using the placeholder `${RANDOM.NUMBER}`

**Usage:** `${RANDOM.NUMBER}` will be replaced with the current millisecond. 

**Limits:** Multiple occurrences of the `${RANDOM.NUMBER}` in the same step will be replaced with the same value.

## Random number of a specific length
**Usage:** `${RANDOM.NUMBER:length}` will be replaced with the random number of a specified length. 

`length` should be a number between 1-18

**Limits:** Every occurrence of the `${RANDOM.NUMBER:length}` will be replaced with a unique value.

## Environment variable
**Usage:** `${SYSTEM.ENV:USER}` will be replaced with the environment variable `$USER`

**Note:** If the variable is not present, then the placeholder will not be replaced.



