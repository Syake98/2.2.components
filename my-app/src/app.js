import styles from './app.module.css';
import data from './data.json';
import { useState } from 'react';

export const App = () => {
	const [steps, setSteps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);
	const nextStep = () => {
		setActiveIndex((prev) => (prev + 1));
	};
	const prevStep = () => {
		if (activeIndex > 0) {
			setActiveIndex((prev) => (prev - 1));
		}
	};
	const startStep = () => {
		setActiveIndex(0);
	};
	const isFirstStep = activeIndex === 0;
	const isLastStep = activeIndex === steps.length - 1;

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{steps[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>
						{steps.map(({ id, title }, index) => (
							<li
								key={id}
								className={
									`${styles['steps-item']}
									${(index === activeIndex ? ` ${styles.active}` : '')}
									${(index < activeIndex ? ` ${styles.done}` : '')}
								`}
							>
								<button
									className={styles['steps-item-button']}
									onClick={() => nextStep(index)}
								>
									{index + 1}
								</button>
								{title}
							</li>
						))}
					</ul>
					<div className={styles['buttons-container']}>
						<button
							className={styles.button}
							onClick={prevStep}
							disabled={isFirstStep}
						>
							Назад
						</button>
						<button
							className={styles.button}
							onClick={() => (isLastStep ? startStep() : nextStep())}
						>
							{isLastStep ? 'Начать сначала' : 'Далее'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
