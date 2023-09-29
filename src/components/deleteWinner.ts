export async function deleteWinner(id: string) {
    const url: string = `../netlify/functions/myFunctions/winners/${id}`;
  
    try {
        const response: Response = await fetch(url, {
            method: 'DELETE',
        });
  
        if (response.ok) {
            const data: object = await response.json();
            return data;
        }
        else {
            console.log(`Error: ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Request failed: ${error}`);    
    }
  }
  