async function fetchData() {
  const url = `https://api.themoviedb.org/3/collection/10?language=en-US`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    }
  };

  const response = await fetch(url, options);
  const result = await response.json();
  return result;
}

 function getData() {
  return fetchData().then(response => {
    const data = response.parts
    return data
  })
}

const data = await getData();

export default data






