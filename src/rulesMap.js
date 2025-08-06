export const rules = {
    email : {
        validate : (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
        onError : "الرجاء ادخال ايميل example@email.com"
    },
    min : {
        validate : (value,parm) => {
                if (typeof value === 'string') return value.length >= parm;
                else if (typeof value === 'number') return value >= parm;
                else return false 
        },
        onError : "الرقم ادنى من المطلوب"
    },
    max : {
        validate : (value,parm) => {
            if (typeof value === 'string') return value.length <= parm;
            else if (typeof value === 'number') return value <= parm;
            else return false 
        },
        onError : "الرقم اعلى من المطلوب"
    },
    string : {
        validate : (value) => typeof value === 'string' && /^[a-zA-Z]+$/.test(value),
        onError : "الرجاء ادخال نص"
    },
    number : {
         validate : (value) => typeof value === 'number' && /[0-9]+/.test(value),
         onError : "الرجاء ادخال رقم صحيح"
    },
        required: {
            validate:  (value) => value !== ''  && value !== undefined && value !== null,
            onError: 'هذا الحقل مطلوب'
        },
}