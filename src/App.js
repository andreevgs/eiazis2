import './App.css';
import { useState } from "react";
import axios from "axios";

function App() {

  const [result, setResult] = useState('');
  const [isFounded, setIsFounded] = useState(false);
  const [file, setFile] = useState();

    const uploadClickHandler = event => {
        setFile(event.target.files[0])
    }

  const handleSentenceExtraction = (e) => {
      e.preventDefault();
      let formData = new FormData()
      formData.append("file", file)

      axios.post('http://localhost:3000/referat', formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      })
          .then(response => {
              setResult(response.data)
              setIsFounded(true)
              console.log('result: ', response.data)
          })
          .catch(error => {
              console.log('error: ', error)
              setIsFounded(false);
              alert('Произошла ошибка')
          })
  }

  const handleCheckNeural = (e) => {
      e.preventDefault();
      let formData = new FormData()
      formData.append("file", file)

      axios.post(`https://www.cs.cmu.edu/language/recognize&api_key=WNyyGDK5Ds4AP34hmjDb6FK1`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      })
          .then(response => {
              setResult(response.data)
              setIsFounded(true)
              console.log('result: ', response.data)
          })
          .catch(error => {
              console.log('error: ', error)
              setIsFounded(false);
              alert('Произошла ошибка')
          })
  }

  return (
      <div className="App">
        <form method={'POST'}>
            <h1>Автоматическое реферирование документа</h1>
          <h2>Прикрепите файл в формате txt и выберите методику реферирования</h2>
          <input
              type={'file'}
              multiple
              onChange={uploadClickHandler}
          />
            <br />
          <button
              type={'submit'}
              onClick={handleSentenceExtraction}
          >
              Sentence Extraction
          </button>
            <button
              type={'submit'}
              onClick={handleCheckNeural}
              style={{display: 'none'}}
          >
            ML
          </button>
        </form>
        {isFounded && (
            <textarea
                rows="10"
                cols="45"
            >
                {result}
            </textarea>
        )}
      </div>
  );
}

export default App;
