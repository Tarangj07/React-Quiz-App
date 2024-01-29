import React, { useEffect, useState } from 'react';
import QuizDisplay from './components/QuizDisplay';
import NavBar from './components/NavBar';
import { auth } from './firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {

	const [retry, setRetry] = useState(false);

	const updateRetry = (ret) => {
		setRetry(ret);
	}

	const [user] = useAuthState(auth);

	return (
		<>
			<div className='app'>
				<NavBar />
				{!user ? <div>Waiting for user login...</div> : (<QuizDisplay retry={retry} setRetry={updateRetry} />)}
			</div>
		</>
	);
}
