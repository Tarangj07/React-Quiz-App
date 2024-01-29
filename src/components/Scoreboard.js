import React, { useEffect, useState } from 'react';
import {
    query,
    collection,
    orderBy,
    onSnapshot,
    limit,
} from 'firebase/firestore';
import { db } from '../firebase';
import QuizDisplay from './QuizDisplay';
import Scrollbars from 'react-scrollbars-custom';
import { Timestamp } from 'firebase/firestore';

function Scoreboard(props) {
    const [scoresDB, setScoresDB] = useState([]);
    const [scoreDates, setScoreDates] = useState([]);

    useEffect(() => {
        let isMounted = true;
        // const q = query(
        //     collection(db, 'scores'),
        //     orderBy('attemptedAt', "asc"),
        //     limit(50)
        // );
        // const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
        //     const fetchedScores = [];
        //     QuerySnapshot.forEach((doc) => {
        //         fetchedScores.push({ ...doc.data(), id: doc.id });
        //     });
        //     const sortedScores = fetchedScores.sort(
        //         (a, b) => b.name - a.name
        //     );
        //     // const sortedScores = fetchedScores.sort(
        //     //     (a, b) => b.score - a.score
        //     // );
        //     if (isMounted) {
        //         setScoresDB(sortedScores);
        //     }
        // });
        const q = query(
            collection(db, 'scores'),
            orderBy('attemptedAt', "asc"),
            limit(50)
        );
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            const fetchedScores = [];
            QuerySnapshot.forEach((doc) => {
                fetchedScores.push({ ...doc.data(), id: doc.id });

                // const data = doc.data();
                // // Assuming timestampField is the field storing the timestamp
                // const timestamp = data.timestampField;

                // // Convert Firestore Timestamp to JavaScript Date object
                // let dateObject = timestamp.toDate();

                // // Now you can extract the time and date components
                // const hours = dateObject.getHours();
                // const minutes = dateObject.getMinutes();
                // const seconds = dateObject.getSeconds();

                // const year = dateObject.getFullYear();
                // const month = dateObject.getMonth() + 1; // Months are zero-indexed
                // const day = dateObject.getDate();

                // const Time = `Time: ${hours}:${minutes}:${seconds}`;
                // const Date = `Date: ${year}-${month}-${day}`;

                // scoreDates.push({ Time, Date });
                // Timestamp.apply
            });
            // const sortedScores = fetchedScores.sort(
            //     (a, b) => b.name - a.name
            // );
            const sortedScores = fetchedScores.sort(
                (a, b) => b.score - a.score
            );
            if (isMounted) {
                setScoresDB(sortedScores);
            }
        });

        return () => {
            isMounted = false;
            unsubscribe();
        }
    }, [])

    return (
        <>
            {props.retry ? <QuizDisplay retry={props.retry} setRetry={props.setRetry} /> : (
                <>
                    <Scrollbars style={{ width: 400, height: 300 }}>
                        <div>
                            <table className='table myTab table-stripped'>
                                <thead>
                                    <tr>
                                        <th>
                                            Name
                                        </th>
                                        <th>
                                            Score
                                        </th>
                                        <th>
                                            Attempted on
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {console.log(scoresDB)} */}
                                    {scoresDB?.map((sepScores) => (
                                        <tr key={sepScores.id}>
                                            <td key={sepScores.id}>{sepScores.name}</td>
                                            <td key={sepScores.id + 1}>{sepScores.score}</td>
                                            <td key={sepScores.id + 2}>
                                                {/* {sepScores.name} */}
                                                {(() => {
                                                    const date = new Date(sepScores.attemptedAt.seconds * 1000);

                                                    return (
                                                        <>
                                                            {date.toLocaleString()}
                                                        </>
                                                    );
                                                })()}

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Scrollbars>
                    <span style={{ bottom: 0, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60vw' }}>
                        <button onClick={() => {
                            props.setRetry(true);
                            props.resetScore();
                        }}
                            style={{ borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '8vw', textAlign: 'center', lineHeight: 'normal' }}>Try again?</button>
                    </span>
                </>
            )}
        </>
    )
}

export default Scoreboard