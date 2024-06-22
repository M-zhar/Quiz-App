// mcqDesign.js
import React, { useState } from 'react';
import './McqDesign.css'; // Import the CSS file

const McqDesign = ({ onSave, questions, onStartTest }) => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [timerInput, setTimerInput] = useState(0);

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleSave = () => {
        onSave({ question, options, correctAnswer });
        setQuestion('');
        setOptions(['', '', '', '']);
        setCorrectAnswer('');
    };

    const handleTimerChange = (event) => {
        setTimerInput(event.target.value);
    };

    const handleStartTest = () => {
        onStartTest(timerInput);
    };

    return (
        <div className="mcq-design">
            <h2>Design MCQ</h2>
            <div className="input-group">
                <label>Question:</label>
                <input 
                    type="text" 
                    value={question} 
                    onChange={(e) => setQuestion(e.target.value)} 
                />
            </div>
            <div className="input-group">
                {options.map((option, index) => (
                    <div key={index}>
                        <label>Option {index + 1}:</label>
                        <input 
                            type="text" 
                            value={option} 
                            onChange={(e) => handleOptionChange(index, e.target.value)} 
                        />
                    </div>
                ))}
            </div>
            <div className="input-group">
                <label>Correct Answer (Option Number):</label>
                <input 
                    type="number" 
                    value={correctAnswer} 
                    onChange={(e) => setCorrectAnswer(e.target.value)} 
                />
            </div>
            <button className="save-btn" onClick={handleSave}>Save Your Question</button>

            <h3>Saved Questions</h3>
            {questions.map((q, index) => (
                <div key={index} className="saved-question">
                    <p>Q: {q.question}</p>
                    <ul>
                        {q.options.map((option, i) => (
                            <li key={i}>
                                {option} {i == q.correctAnswer ? '(Correct Answer)' : ''}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

            {questions.length > 0 && (
                <div className="test-setup">
                    <label>Set Timer (seconds): </label>
                    <input 
                        type="number" 
                        value={timerInput} 
                        onChange={handleTimerChange} 
                    />
                    <button className="start-btn" onClick={handleStartTest}>Give Test</button>
                </div>
            )}
        </div>
    );
};

export default McqDesign;
