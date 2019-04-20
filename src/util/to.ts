type ToResult<T> = {
    result?: T;
    error: string | null; 
};

const to = <T>(promise: Promise<T>): Promise<ToResult<T>> => {
    return promise
        .then((result) => {
            return { 
                result, 
                error: null,
            };
        })
        .catch((error) => ({ error }));
}

export default to;
