document.getElementById('submitButton').addEventListener('click', async () => {
    /* STRIPE


    const url = 'http://localhost:3000/api/create-stripe-payment';
    const data = String(document.getElementById('email').value);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: data })
        }).then(response => response.json())
        .then(data => {
            const url = data.message; // Adjust according to your API response structure
            if (url && url !== 'undefined') {
                window.location.assign(url);
            } else {
                console.error('Invalid payment URL:', url);
            }
        })
        .catch(error => console.error('Error fetching payment URL:', error));
    } catch (error) {
        console.error('Error:', error);
    }*/
    const url = 'http://localhost:3000/api/add-user';
    const data = {
        email: String(document.getElementById('email').value),
        plaza: 'Hague'
    };
    console.log(JSON.stringify(data));
    try{
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const result = await response.json();
        console.log(result.message);
    }
    catch(error){
        console.log('Error: ', error);
    }
});
