import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };

const thumbnailVariants = {
	initial: { scale: 0.9, opacity: 0 },
	enter: { scale: 1, opacity: 1, transition },
	exit: {
		scale: 0.5,
		opacity: 0,
		transition: { duration: 1.5 }
	}
};

type data = {
	title: string;
	path: string;
};

const cardData: data[] = [
	{ title: 'title1', path: '1' },
	{ title: 'title2', path: '2' },
	{ title: 'title3', path: '3' },
	{ title: 'title4', path: '4' }
];

type ICardProps = {
	title: string;
	path: string;
};

const Card: React.FC<ICardProps> = ({ title, path }) => (
	<motion.div className='rounded-3xl border border-gray-100 text-center'>
		<motion.div transition={transition} variants={thumbnailVariants}>
			<Link to={`/${path}`}>
				<motion.div transition={transition} variants={thumbnailVariants}>
					<h2>{title}</h2>
				</motion.div>
			</Link>
		</motion.div>
	</motion.div>
);

const CardList: React.FC = () => {
	return (
		<>
			<div className='px-8'>
				<motion.div initial='initial' animate='enter' exit='exit' variants={{ exit: { transition: { staggerChildren: 0.1 } } }}>
					{cardData.map((card, key) => (
						<Card title={card.title} path={card.path} key={key} />
					))}
				</motion.div>
			</div>
		</>
	);
};
export default CardList;
