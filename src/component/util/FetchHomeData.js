const FetchHomeData = async () => {
    try {
        const response = await fetch(
            'https://jsonplaceholder.typicode.com/users'
        );
        const data = await response.json();
        return data;
    } catch (err) {
        return null;
    }
};

export default FetchHomeData;