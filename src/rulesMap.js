export const rules = {
    email : {
        validate : (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
        onError : "Please enter valid Email (ex. example@email.com)"
    },
    min : {
        validate : (value,parm) => {
                if (typeof value === 'string') return value.length >= parm;
                else if (typeof value === 'number') return value >= parm;
                else return false 
        },
        onError : `Minimum length is`
    },
    max : {
        validate : (value,parm) => {
            if (typeof value === 'string') return value.length <= parm;
            else if (typeof value === 'number') return value <= parm;
            else return false 
        },
        onError : `Maximum length is reached`
    },
    string : {
        validate : (value) => typeof value === 'string' && /^[a-zA-Z]+$/.test(value),
        onError : "Only alphabit characters are allowed"
    },
    number : {
         validate : (value) => typeof value === 'number' && /[0-9]+/.test(value),
         onError : "only Integer numbers are allowed"
    },
        required: {
            validate:  (value) => value !== ''  && value !== undefined && value !== null,
            onError: 'You cannot leave this filed empty'
        },
}