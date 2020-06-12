const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// capturing emails that fail the test 

export default (emails) => {
    const invalidEmails = emails
        .split(',')
        .map(email => email.trim())
        .filter(email => re.test(email) === false);

    if (invalidEmails) {
        return `These emails are invalid: ${invalidEmails}`;
    }
    return;
};