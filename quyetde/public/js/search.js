window.onload = () => {
  const searchForm = document.querySelector('.search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const keyword = document.querySelector('.search-input').value;
      fetch(`/search-quetions?keyword=${keyword}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((res) => res.json())
        .then((result) => {
          document.querySelector('.search-result').innerHTML = '';

          result.data.forEach((question) => {
            const questionElement = `
              <div>
                <div>${question.questionContent}</div>
                <div>Like: ${question.like}</div>
                <div>Dislike: ${question.dislike}</div>
              </div>
            `;

            document.querySelector('.search-result')
              .insertAdjacentHTML('beforeend', questionElement);
          });
        })
        .catch((error) => {
          console.log(error);
          window.alert(error.message);
        });
    });
  }
};