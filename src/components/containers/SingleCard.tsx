import * as React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const transition = {
	duration: 1,
	ease: [0.43, 0.13, 0.23, 0.96]
};

const imageVariants = {
	exit: { y: '50%', opacity: 0, transition },
	enter: {
		y: '0%',
		opacity: 1,
		transition
	}
};

const backVariants = {
	exit: { x: 100, opacity: 0, transition },
	enter: { x: 0, opacity: 1, transition: { delay: 1, ...transition } }
};

export const SingleCard: React.FC = () => (
	<motion.div initial='exit' animate='enter' exit='exit'>
		<h2>Hello world!</h2>
		<motion.div variants={backVariants}>
			<Link to='/'>← Back</Link>
		</motion.div>
	</motion.div>
);
