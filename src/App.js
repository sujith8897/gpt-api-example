import { useState } from "react";
import "./App.css";
import axios from "axios";

const OPEN_AI_API_KEY = process.env.REACT_APP_OPEN_AI_API_KEY;
// const OPEN_AI_ORGANIZATION_KEY = "org-Mbc0pmN1KpHTgL4AwFzliVUV";

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePrompt = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async () => {
    setResult(null);
    setIsLoading(true);
    const data = {
      model: "text-davinci-003",
      prompt: `${prompt}`,
      max_tokens: 100,
    };

    try {
      const res = await axios.post(
        "https://api.openai.com/v1/completions",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPEN_AI_API_KEY}`,
          },
        }
      );
      setResult(res?.data?.choices?.[0]?.text);
    } catch (err) {
      setResult(err?.response?.data?.error?.message || "error");
    }

    setIsLoading(false);
  };

  return (
    <div>
      <label>Type you prompt</label>
      <br />
      <input type="text" value={prompt} onChange={handlePrompt} />
      <br />
      {isLoading && <p>Loading....</p>}
      {result && result?.split("\n")?.map?.((line) => <p>{line}</p>)}
      <br />
      <button onClick={handleSubmit} disabled={prompt.length === 0}>
        Submit
      </button>
    </div>
  );
}

export default App;
