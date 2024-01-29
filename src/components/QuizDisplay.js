import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { addDoc, collection, serverTimestamp, Timestamp } from 'firebase/firestore';
import Scoreboard from './Scoreboard';

function QuizDisplay(props) {

    const questions = [
        {
            questionText: 'What is the capital of France?',
            answerOptions: [
                { answerText: 'New York', isCorrect: false },
                { answerText: 'London', isCorrect: false },
                { answerText: 'Paris', isCorrect: true },
                { answerText: 'Dublin', isCorrect: false },
            ],
        },
        {
            questionText: 'Who is CEO of Tesla?',
            answerOptions: [
                { answerText: 'Jeff Bezos', isCorrect: false },
                { answerText: 'Elon Musk', isCorrect: true },
                { answerText: 'Bill Gates', isCorrect: false },
                { answerText: 'Tony Stark', isCorrect: false },
            ],
        },
        {
            questionText: 'The iPhone was created by which company?',
            answerOptions: [
                { answerText: 'Apple', isCorrect: true },
                { answerText: 'Intel', isCorrect: false },
                { answerText: 'Amazon', isCorrect: false },
                { answerText: 'Microsoft', isCorrect: false },
            ],
        },
        {
            questionText: 'How many Harry Potter books are there?',
            answerOptions: [
                { answerText: '1', isCorrect: false },
                { answerText: '4', isCorrect: false },
                { answerText: '6', isCorrect: false },
                { answerText: '7', isCorrect: true },
            ],
        },
    ];


    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);

    const resetScore = () => {
        setScore(0);
    }

    const handleAnswerButtonClick = async (isCorrect) => {
        if (isCorrect) {
            // let newScore = score + 1;
            // if (currentQuestion === 0)
            //     setScore(1);
            // else
            setScore(score + 1)
            // setScore(prevScore => prevScore + 1);
            // console.log('score: ', newScore, score);
        }
        // await setScore(prevScore => prevScore + (isCorrect ? 1 : 0));
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            props.setRetry(false);
            // if (props.retry === true) {
            //     setShowScore(false);
            // }
            // else {
            setShowScore(true);
            const { uid, displayName, photoURL } = auth.currentUser;
            await addDoc(collection(db, 'scores'), {
                score: score + (isCorrect ? 1 : 0),
                name: displayName,
                avatar: photoURL,
                // attemptedAt: serverTimestamp(),
                attemptedAt: Timestamp.now(),
                uid,
            });
            // setScore(0);
            setCurrentQuestion(0);
            // setScore(0);
            // }
        }
    };

    useEffect(() => {
        if (props.retry === true) {
            setShowScore(false);
        }
        // return () => {
        //     setScore(0);
        // }
        // console.log("Score updated:", score);
    }, [props.retry, showScore])

    return (
        <>
            {props.retry ? (
                <>
                    {/* {setScore(0)} */}
                    <div className='question-section'>
                        <div className='question-count'>
                            <span>Question {currentQuestion + 1}</span>/{questions.length}
                        </div>
                        <div className='question-text'>{questions[currentQuestion].questionText}</div>
                    </div>
                    <div className='answer-section'>
                        {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                            <button onClick={() => handleAnswerButtonClick(answerOption.isCorrect)} key={index}>{answerOption.answerText}</button>
                        ))}
                    </div>
                </>
            ) :
                showScore ? (
                    <>
                        <div className='score-section'>You scored {score} out of {questions.length}</div>
                        <Scoreboard retry={props.retry} setRetry={props.setRetry} resetScore={resetScore} />
                    </>

                ) : (
                    <>
                        <div className='question-section'>
                            <div className='question-count'>
                                <span>Question {currentQuestion + 1}</span>/{questions.length}
                            </div>
                            <div className='question-text'>{questions[currentQuestion].questionText}</div>
                        </div>
                        <div className='answer-section'>
                            {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                                <button onClick={() => handleAnswerButtonClick(answerOption.isCorrect)}
                                    key={index}>{answerOption.answerText}</button>
                            ))}
                        </div>
                    </>
                )
            }
        </>
    )
}

export default QuizDisplay