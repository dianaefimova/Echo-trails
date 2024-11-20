import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase"; 
import { onAuthStateChanged } from "firebase/auth"; 

const Tests = () => {
  const [tests, setTests] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [user, setUser] = useState(null); 
  const [isTestVisible, setIsTestVisible] = useState(false);

  const [testsSw, setTestsSw] = useState([]);
  const [selectedAnswersSw, setSelectedAnswersSw] = useState({});
  const [isSubmittedSw, setIsSubmittedSw] = useState(false);
  const [scoreSw, setScoreSw] = useState(0);
  const [isTestVisibleSw, setIsTestVisibleSw] = useState(false);

  const [testsNor, setTestsNor] = useState([]);
  const [selectedAnswersNor, setSelectedAnswersNor] = useState({});
  const [isSubmittedNor, setIsSubmittedNor] = useState(false);
  const [scoreNor, setScoreNor] = useState(0);
  const [isTestVisibleNor, setIsTestVisibleNor] = useState(false);

  const [testsDen, setTestsDen] = useState([]);
  const [selectedAnswersDen, setSelectedAnswersDen] = useState({});
  const [isSubmittedDen, setIsSubmittedDen] = useState(false);
  const [scoreDen, setScoreDen] = useState(0);
  const [isTestVisibleDen, setIsTestVisibleDen] = useState(false);

  // Fetch Finland test from Firestore
  useEffect(() => {
    const fetchTests = async () => {
      const querySnapshot = await getDocs(collection(db, "Test2"));
      const testList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTests(testList);
    };
    fetchTests();
  }, []);

  // Fetch Sweden test from Firestore
  useEffect(() => {
    const fetchTestsSw = async () => {
      const querySnapshot = await getDocs(collection(db, "Sweden"));
      const testList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTestsSw(testList);
    };
    fetchTestsSw();
  }, []);

    // Fetch Norway test from Firestore
    useEffect(() => {
      const fetchTestsNor = async () => {
        const querySnapshot = await getDocs(collection(db, "Norway"));
        const testList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTestsNor(testList);
      };
      fetchTestsNor();
    }, []);

        // Fetch Denmark test from Firestore
    useEffect(() => {
      const fetchTestsDen = async () => {
        const querySnapshot = await getDocs(collection(db, "Denmark"));
        const testList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTestsDen(testList);
      };
      fetchTestsDen();
    }, []);

  // Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); 
      } else {
        setUser(null); 
      }
    });

    return unsubscribe; 
  }, []);

  const handleAnswerChange = (questionIndex, option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: option,
    });
  };

  const handleAnswerChangeSw = (questionIndex, option) => {
    setSelectedAnswersSw({
      ...selectedAnswersSw,
      [questionIndex]: option,
    });
  };

  const handleAnswerChangeNor = (questionIndex, option) => {
    setSelectedAnswersNor({
      ...selectedAnswersNor,
      [questionIndex]: option,
    });
  };

  const handleAnswerChangeDen = (questionIndex, option) => {
    setSelectedAnswersDen({
      ...selectedAnswersDen,
      [questionIndex]: option,
    });
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    tests.forEach((test) => {
      test.questions.forEach((q, index) => {
        if (selectedAnswers[index] === q.answer) {
          calculatedScore += 1; // Increment score for correct answers
        }
      });
    });
    setScore(calculatedScore);
    setIsSubmitted(true);
    saveScore(calculatedScore);
  };

  const handleSubmitSw = () => {
    let calculatedScoreSw = 0;
    testsSw.forEach((test) => {
      test.questions.forEach((q, index) => {
        if (selectedAnswersSw[index] === q.answer) {
          calculatedScoreSw += 1; // Increment score for correct answers
        }
      });
    });
    setScoreSw(calculatedScoreSw);
    setIsSubmittedSw(true);
    saveScoreSw(calculatedScoreSw);
  };

  const handleSubmitNor = () => {
    let calculatedScoreNor = 0;
    testsNor.forEach((test) => {
      test.questions.forEach((q, index) => {
        if (selectedAnswersNor[index] === q.answer) {
          calculatedScoreNor += 1; // Increment score for correct answers
        }
      });
    });
    setScoreNor(calculatedScoreNor);
    setIsSubmittedNor(true);
    saveScoreNor(calculatedScoreNor);
  };

  const handleSubmitDen = () => {
    let calculatedScoreDen = 0;
    testsDen.forEach((test) => {
      test.questions.forEach((q, index) => {
        if (selectedAnswersDen[index] === q.answer) {
          calculatedScoreDen += 1; // Increment score for correct answers
        }
      });
    });
    setScoreDen(calculatedScoreDen);
    setIsSubmittedDen(true);
    saveScoreDen(calculatedScoreDen);
  };


  // Save the score to Firestore in the 'scores' collection
  const saveScore = async (calculatedScore) => {
    if (user) {
      try {
        await setDoc(doc(db, "scores", user.uid), {
          testTitle: tests[0]?.title,  
          score: calculatedScore,
        });
        console.log("Score saved successfully!");
      } catch (error) {
        console.error("Error saving score:", error);
      }
    } else {
      console.log("User is not authenticated");
    }
  };

  const saveScoreSw = async (calculatedScoreSw) => {
    if (user) {
      try {
        await setDoc(doc(db, "scoresSw", user.uid), {
          testTitleSw: testsSw[0]?.title,  
          scoreSw: calculatedScoreSw,
        });
        console.log("Score saved successfully!");
      } catch (error) {
        console.error("Error saving score:", error);
      }
    } else {
      console.log("User is not authenticated");
    }
  };

  const saveScoreNor = async (calculatedScoreNor) => {
    if (user) {
      try {
        await setDoc(doc(db, "scoresNor", user.uid), {
          testTitleNor: testsNor[0]?.title,  
          scoreNor: calculatedScoreNor,
        });
        console.log("Score saved successfully!");
      } catch (error) {
        console.error("Error saving score:", error);
      }
    } else {
      console.log("User is not authenticated");
    }
  };


  const saveScoreDen = async (calculatedScoreDen) => {
    if (user) {
      try {
        await setDoc(doc(db, "scoresDen", user.uid), {
          testTitleDen: testsDen[0]?.title,  
          scoreDen: calculatedScoreDen,
        });
        console.log("Score saved successfully!");
      } catch (error) {
        console.error("Error saving score:", error);
      }
    } else {
      console.log("User is not authenticated");
    }
  };


  return (
    <div>
      <h1>Test Your Knowledge!</h1>
      <button style={{fontSize:'18px', alignItems: 'center', backgroundColor:'#4e91fd', color:'black', marginLeft:'10%'}} onClick={() => setIsTestVisible(!isTestVisible)}>
        {isTestVisible ? 'Close Test' : 'Test about Filand'}
      </button>

      {isTestVisible && (
        <div>
      {tests.map((test) => (
        <div key={test.id}>
          <h4>{test.title}</h4>
          {test.questions.map((q, index) => (
            <div key={index} className="options">
              <p>{q.question}</p>
              {q.option && Object.keys(q.option).map((key) => (
                <div key={key}>
                  <input
                    type="radio"
                    id={`${test.id}-q${index}-option${key}`}
                    name={`test-${test.id}-q${index}`}
                    value={key}
                    checked={selectedAnswers[index] === key}
                    onChange={() => handleAnswerChange(index, key)}
                    disabled={isSubmitted} 
                  />
                  <label htmlFor={`${test.id}-q${index}-option${key}`}>
                    {q.option[key]}
                  </label>
                </div>
              ))}
            </div>
          ))}
          {!isSubmitted && (
            <button onClick={handleSubmit}>Submit Test</button>
          )}
          {isSubmitted && (
            <div>
              <p>Your Score: {score}</p>
              <button onClick={() => setIsSubmitted(false)}>Retake Test</button>
              </div>
              )}
            </div>
          ))}
        </div>
      )}

    <button style={{fontSize:'18px', alignItems: 'center', backgroundColor:'#FFD700', color:'black'}} onClick={() => setIsTestVisibleSw(!isTestVisibleSw)}>
        {isTestVisibleSw ? 'Close Test' : 'Test about Sweden'}
    </button>
    {isTestVisibleSw && (
        <div>
{testsSw.map((test) => (
        <div key={test.id}>
          <h4>{test.title}</h4>
          {test.questions.map((q, index) => (
            <div key={index} className="options">
              <p>{q.question}</p>
              {q.option && Object.keys(q.option).map((key) => (
                <div key={key}>
                  <input
                    type="radio"
                    id={`${test.id}-q${index}-option${key}`}
                    name={`test-${test.id}-q${index}`}
                    value={key}
                    checked={selectedAnswersSw[index] === key}
                    onChange={() => handleAnswerChangeSw(index, key)}
                    disabled={isSubmittedSw} 
                  />
                  <label htmlFor={`${test.id}-q${index}-option${key}`}>
                    {q.option[key]}
                  </label>
                </div>
              ))}
            </div>
          ))}
          {!isSubmittedSw && (
            <button onClick={handleSubmitSw}>Submit Test</button>
          )}
          {isSubmittedSw && (
            <div>
              <p>Your Score: {scoreSw}</p>
              <button onClick={() => setIsSubmittedSw(false)}>Retake Test</button>
              </div>
              )}
            </div>
          ))}
        </div>
      )}

      <button style={{fontSize:'18px', alignItems: 'center', backgroundColor:'#F88379', color:'black'}} onClick={() => setIsTestVisibleNor(!isTestVisibleNor)}>
        {isTestVisibleNor ? 'Close Test' : 'Test about Norway'}
      </button>
      {isTestVisibleNor && (
        <div>
{testsNor.map((test) => (
        <div key={test.id}>
          <h4>{test.title}</h4>
          {test.questions.map((q, index) => (
            <div key={index} className="options">
              <p>{q.question}</p>
              {q.option && Object.keys(q.option).map((key) => (
                <div key={key}>
                  <input
                    type="radio"
                    id={`${test.id}-q${index}-option${key}`}
                    name={`test-${test.id}-q${index}`}
                    value={key}
                    checked={selectedAnswersNor[index] === key}
                    onChange={() => handleAnswerChangeNor(index, key)}
                    disabled={isSubmittedNor} 
                  />
                  <label htmlFor={`${test.id}-q${index}-option${key}`}>
                    {q.option[key]}
                  </label>
                </div>
              ))}
            </div>
          ))}
          {!isSubmittedNor && (
            <button onClick={handleSubmitNor}>Submit Test</button>
          )}
          {isSubmittedNor && (
            <div>
              <p>Your Score: {scoreNor}</p>
              <button onClick={() => setIsSubmittedNor(false)}>Retake Test</button>
              </div>
              )}
            </div>
          ))}
        </div>
      )}

      <button style={{fontSize:'18px', alignItems: 'center', backgroundColor:'white', color:'black'}} onClick={() => setIsTestVisibleDen(!isTestVisibleDen)}>
        {isTestVisibleDen ? 'Close Test' : 'Test about Denmark'}
      </button>
      {isTestVisibleDen && (
        <div>
{testsDen.map((test) => (
        <div key={test.id}>
          <h4>{test.title}</h4>
          {test.questions.map((q, index) => (
            <div key={index} className="options">
              <p>{q.question}</p>
              {q.option && Object.keys(q.option).map((key) => (
                <div key={key}>
                  <input
                    type="radio"
                    id={`${test.id}-q${index}-option${key}`}
                    name={`test-${test.id}-q${index}`}
                    value={key}
                    checked={selectedAnswersDen[index] === key}
                    onChange={() => handleAnswerChangeDen(index, key)}
                    disabled={isSubmittedDen} 
                  />
                  <label htmlFor={`${test.id}-q${index}-option${key}`}>
                    {q.option[key]}
                  </label>
                </div>
              ))}
            </div>
          ))}
          {!isSubmittedDen && (
            <button onClick={handleSubmitDen}>Submit Test</button>
          )}
          {isSubmittedDen && (
            <div>
              <p>Your Score: {scoreDen}</p>
              <button onClick={() => setIsSubmittedDen(false)}>Retake Test</button>
              </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tests;
