// Selectors****
let searchinput = document.getElementById("searchinput");
let definition = document.getElementById("definition");
let synonym = document.getElementById("synonym");
let antonym = document.getElementById("antonym");
let speechpart = document.getElementById("speechpart");
let example = document.getElementById('example')
let synonym_header = document.getElementById("synonym-header");
let antonym_header = document.getElementById("antonym-header");
let speechpart_header = document.getElementById("speechpart-header");
let example_header = document.getElementById('example-header')
let audiosrc = document.getElementById("audio");
let searchresult = document.getElementById("searchresult");
let error = document.getElementById("error");

// Event Listener****
document.getElementById("searchbtn").addEventListener("click" , FetchData)
searchinput.addEventListener('input' , Nullinput)
searchinput.addEventListener('keyup' , Enterinput)

// Functions****

// Null input***
function Nullinput() {
  if (searchinput.value == '') {
      searchresult.style.display = "none";
  }
}

// Enter search result***
function Enterinput(e) {
  if (e.key === 'Enter' || e.keyCode === 13) {
      FetchData();
  }
}
// Fetching data***
    function FetchData() {
        let searchvalue = searchinput.value;
        let word = searchvalue;
        // Fetching****
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
          .then((response) => response.json())
          .then((data) => {
            searchresult.style.display = "block";
            error.style.display = "none";
            // Defining a word
            let word_definition =
              data[0].meanings[0].definitions[0].definition.replace(
                /(?:^|\s)\S/i,
                function (a) {
                  return a.toUpperCase();
                }
              );
            definition.innerText = word_definition;
             //   Example of a word****
             let word_example = data[0].meanings[0].definitions[0].example
             if (word_example == undefined) {
                 example.style.display = 'none';
                 example_header.style.display = 'none';
              } else {
                  example.style.display = 'block';
                  example_header.style.display = 'block';
                  example.innerText = word_example;
             }
      
            // Synonym of a word
            let word_synonym = data[0].meanings[0].definitions[0].synonyms[0]
            if (word_synonym == undefined) {
              synonym_header.style.display = "none";
              synonym.style.display = 'none';
          } else {
              synonym_header.style.display = "block";
              synonym.style.display = 'block';
              synonym.innerText = word_synonym;
          }
          // Antonym of a word
          let word_antonym = data[0].meanings[0].definitions[0].antonyms[0]
          if (word_antonym == undefined) {
              antonym_header.style.display = "none";
              antonym.style.display = "none";
            } else {
              antonym_header.style.display = "block";
              antonym.style.display = "block";
              antonym.innerText = word_antonym;
            }
            //Part of speech
            let partofSpeech = data[0].meanings[0].partOfSpeech.replace(
                /(?:^|\s)\S/i,
                function (a) {
                  return a.toUpperCase();
                }
              );
            if (partofSpeech == undefined) {
                speechpart_header.style.display = "none";
                speechpart.style.display = "none";
            } else {
              speechpart_header.style.display = "block";
              speechpart.style.display = "block";
              speechpart.innerText = partofSpeech;
            }
            // Audio of word
            let audiodata = data[0].phonetics[0].audio;
            audiosrc.src = `https:${audiodata}`;
          })
          .catch(() => {
            searchresult.style.display = "none";
            error.style.display = "block";
          });
    };
  