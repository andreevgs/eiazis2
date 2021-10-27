import './App.css';
import { useState } from "react";
import axios from "axios";

function App() {
  const [docContent, setDocContent] = useState('');

  const [lang, setLang] = useState('');
  const [isFounded, setIsFounded] = useState(false);

  const handleCheckAlphabet = (e) => {
    e.preventDefault();
    const docObject = {
      words: docContent,
    };
    axios.post('http://localhost:3000/analizator/words', docObject)
        .then(response => {
            if (!isFounded) {
                setIsFounded(true);
            }
            setLang(response.data);
            console.log(response);
        })
        .catch(error => {
          alert('Не найдено, произошла ошибка');
          console.log(error);
        });

  }

  const handleCheckWords = (e) => {
    e.preventDefault();
      const docObject = {
          words: docContent,
      };
    axios.post(`http://localhost:3000/analizator/words`, docObject)
        .then(response => {
          if (!isFounded) {
            setIsFounded(true);
          }
          setLang(response.data);
          console.log(response);
        })
        .catch(error => {
          setIsFounded(false);
          alert('Не найдено, произошла ошибка');
          console.log(error);
        });
  }

  return (
      <div className="App">
        <form method={'POST'}>
            <h1>Распознавание языка текста несколькими способами</h1>
          <h2>Введите текст</h2>
          <textarea
              name={'content'}
              value={docContent}
              placeholder={'содержимое'}
              rows="10"
              cols="45"
              onChange={(e) => setDocContent(e.target.value)}
          /><br />
          <button
              type={'submit'}
              onClick={handleCheckAlphabet}
          >
            Проверить по алфавиту
          </button>
          <button
              type={'submit'}
              onClick={handleCheckWords}
          >
            Проверить по словам
          </button>
        </form>
        {isFounded && (
            <div>
              <h2>Язык текста: {lang}</h2>
            </div>
        )}
      </div>
  );
}

export default App;
