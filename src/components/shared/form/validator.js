const minLength = min => value => value && value.length < min ? `Must be ${min} characters or more`: undefined

export const minLength8 = minLength(8)

export const required = (value) => {
    return value ? undefined: 'You must enter something !';
}