/**
 * 
 * @param {Object} fields - object of all fields being passed from end user 
 * @returns {Object} - object with error switch and message
 */
export default function fieldValidator(fields){
    for(const key in fields){
        if(fields.hasOwnProperty(key)){
            if(fields[key] === undefined){
                return {error: true, message: 'Bad Request: Request error.'}
            }
            if(typeof fields[key] === 'string' && fields[key] === ''){
                return {error: true, message: 'Bad Request: Request error.'}
            }
        }
    }
    return {error: false, message: 'OK'}
}