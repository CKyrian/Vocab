import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [modInput, setMod] = useState("");
  const [vocList, setList] = useState(
    JSON.parse(localStorage.getItem("words")) || []
  );

  useEffect(() => {
    localStorage.setItem("words", JSON.stringify(vocList));
  }, [vocList]);

  function addWord(e) {
    e.preventDefault();
    if (vocList.indexOf(input) >= 0) {
      return alert(`"${input}" is already in the vocabulary list`);
    } else {
      setList(prevList =>
        [...prevList, input].sort((a, b) =>
          a.localeCompare(b, "en", { sensitivity: "base" })
        )
      );
    }
    setInput("");
  }

  function deleteWord(index) {
    setList(prevList => prevList.filter((_, i) => i != index));
  }

  function modifyWord(e, index) {
    e.preventDefault();
    setMod("");
    if (vocList.indexOf(modInput) >= 0) {
      return alert(`"${modInput}" is already in the vocabulary list`);
    } else {
      deleteWord(index);
      setList(prevList =>
        [...prevList, modInput].sort((a, b) =>
          a.localeCompare(b, "en", { sensitivity: "base" })
        )
      );
      toggle(index);
    }
  }

  function toggle(index) {
    let display = document.getElementById("modify" + String(index)).style
      .display;
    if (display == "none") {
      document.getElementById("modify" + String(index)).style.display = "block";
    } else if (display == "block") {
      document.getElementById("modify" + String(index)).style.display = "none";
    }
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>Aurore English Vocabulary App</h1>
      </header>
      <form onSubmit={addWord} className="add-form">
        <input
          className="add-btn"
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type word here"
          required
        />
        <button>Add Word</button>
      </form>
      <div className="list">
        {vocList.length
          ? vocList.map((word, i) => {
              return (
                <>
                  <div key={i} className="list-item">
                    <h2>- {word}</h2>
                    <button
                      onClick={() => toggle(i)}
                      className="toggle-mod-btn"
                    >
                      Modify
                    </button>

                    <button onClick={() => deleteWord(i)} className="del-btn">
                      Delete
                    </button>
                  </div>
                  <div>
                    <form
                      onSubmit={e => modifyWord(e, i)}
                      style={{ display: "none" }}
                      id={"modify" + String(i)}
                    >
                      <input
                        className="toggle-mod-input"
                        type="text"
                        value={modInput}
                        onChange={e => setMod(e.target.value)}
                        placeholder="Modify vocab"
                      />
                      <button className="mod-btn">Submit</button>
                    </form>
                  </div>
                </>
              );
            })
          : "no vocab yet"}
      </div>
    </div>
  );
}

export default App;
