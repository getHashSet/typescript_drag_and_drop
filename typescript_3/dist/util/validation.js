export function validate(validInput) {
    let isValid = true;
    // check if string or number is both required and if there is a present value
    if (validInput.required) {
        isValid = isValid && validInput.value.toString().trim().length !== 0;
    }
    if (validInput.minLength != null && typeof validInput.value == "string") {
        isValid = isValid && validInput.value.length > validInput.minLength;
    }
    if (validInput.maxLength != null && typeof validInput.value == "string") {
        isValid = isValid && validInput.value.length <= validInput.maxLength;
    }
    if (validInput.min != null && typeof validInput.value === "number") {
        isValid = isValid && validInput.value > validInput.min;
    }
    if (validInput.max != null && typeof validInput.value === "number") {
        isValid = isValid && validInput.value < validInput.max;
    }
    return isValid;
}
//# sourceMappingURL=validation.js.map