import { useState } from "react";
import css from "./formelements.module.css";

type ToggleProps = {
	onChange: (checked: boolean) => void;
	labelLeft?: string;
	labelRight?: string;
	className?: string;
	initialChecked?: boolean;
};

const Toggle: React.FC<ToggleProps> = ({
	onChange,
	labelLeft,
	labelRight,
	className,
	initialChecked = false,
}) => {
	const [checked, setChecked] = useState(initialChecked);

	const handleToggle = (newChecked: boolean) => {
		setChecked(newChecked);
		onChange(newChecked);
	};

	return (
		<div className={`${css.toggle} ${className}`}>
			<span
				onClick={() => handleToggle(false)}
				onKeyDown={(e) => e.key === "Enter" && handleToggle(false)}
				style={{
					cursor: "pointer",
					textDecoration: !checked ? "underline" : "none",
				}}
			>
				{labelLeft}
			</span>
			<label className={css.switch}>
				/
				<input
					type="checkbox"
					checked={checked}
					onChange={(e) => handleToggle(e.target.checked)}
				/>
			</label>
			<span
				onClick={() => handleToggle(true)}
				onKeyDown={(e) => e.key === "Enter" && handleToggle(true)}
				style={{
					cursor: "pointer",
					textDecoration: !checked ? "none" : "underline",
				}}
			>
				{labelRight}
			</span>
		</div>
	);
};

export default Toggle;
