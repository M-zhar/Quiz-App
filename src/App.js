// App.js
import React, { useState } from 'react';
import McqDesign from './setQuestion/mcqDesign';
import TestInterface from './Interface/TestInterface';
import './App.css'; // Import the CSS file for additional styling if needed

const App = () => {
    const [questions, setQuestions] = useState([]);
    const [startTest, setStartTest] = useState(false);
    const [timerInput, setTimerInput] = useState(0);

    const handleSaveQuestion = (question) => {
        setQuestions([...questions, question]);
    };

    const handleStartTest = (timer) => {
        setTimerInput(timer);
        setStartTest(true);
    };

    return (
        <div>
            <h1>MCQ Test App</h1>
            {!startTest ? (
                <>
                    <McqDesign onSave={handleSaveQuestion} questions={questions} onStartTest={handleStartTest} />
                </>
            ) : (
                <TestInterface questions={questions} timer={timerInput} />
            )}
        </div>
    );
};

export default App;
