document.getElementById('submitButton').addEventListener('click', async () => {
    const url = 'http://localhost:3000/api/email';
    const data = String(document.getElementById('email').value);

    try {
        console.log(data);
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: data })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log('Response:', responseData);
    } catch (error) {
        console.error('Error:', error);
    }
});
