const validateAge = function (value) {
    const currentDate = new Date()
    const birthdate = new Date(value)
    const age = currentDate.getFullYear() - birthdate.getFullYear()
    if (age < 18) {
        return new Error('Age must be at least 18 years old.')
    }
}
module.exports = validateAge