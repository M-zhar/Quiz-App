// TestInterface.js
import React, { useState, useEffect } from 'react';
import './TestInterface.css'; // Import the CSS file

const TestInterface = ({ questions, timer }) => {
    const [startTest, setStartTest] = useState(true);
    const [timeLeft, setTimeLeft] = useState(timer);
    const [showResults, setShowResults] = useState(false);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        let timerInterval;
        if (startTest && timeLeft > 0) {
            timerInterval = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0 && startTest) {
            setShowResults(true);
            setStartTest(false);
        }

        return () => clearInterval(timerInterval);
    }, [startTest, timeLeft]);

    const handleAnswerChange = (questionIndex, optionIndex) => {
        setAnswers({
            ...answers,
            [questionIndex]: optionIndex,
        });
    };

    const calculateResults = () => {
        let correctCount = 0;
        questions.forEach((question, index) => {
            if (answers[index] === parseInt(question.correctAnswer)) {
                correctCount += 1;
            }
        });
        return correctCount;
    };

    return (
        <div className="test-interface">
            <h2>Test Interface</h2>
            {startTest && !showResults && (
                <div className="test-content">
                    <h3>Time Left: {timeLeft} seconds</h3>
                    {questions.map((question, index) => (
                        <div key={index} className="question-block">
                            <p>{question.question}</p>
                            {question.options.map((option, i) => (
                                <div key={i}>
                                    <input
                                        type="radio"
                                        id={`${index}-${i}`}
                                        name={`question-${index}`}
                                        onChange={() => handleAnswerChange(index, i)}
                                    />
                                    <label htmlFor={`${index}-${i}`}>{option}</label>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
            {showResults && (
                <div className="results">
                    <h3>Results</h3>
                    <p>You got {calculateResults()} out of {questions.length} correct.</p>
                    <button className="toggle-btn" onClick={() => setShowResults(false)}>Toggle Results</button>
                </div>
            )}
        </div>
    );
};

export default TestInterface;
