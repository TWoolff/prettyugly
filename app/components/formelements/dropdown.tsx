import type { ChangeEventHandler } from "react";

type DropdownProps = {
	onChange: ChangeEventHandler<HTMLSelectElement>;
	options: string[];
	label?: string;
	defaultValue?: string;
	value?: string;
	name: string;
	className: string;
};

const Dropdown: React.FC<DropdownProps> = ({
	onChange,
	options,
	name,
	defaultValue,
	value = "",
	label,
	className,
}) => {
	return (
		<label>
			{label && <span>{label}</span>}
			<select
				name={name}
				onChange={onChange}
				className={className}
				value={value}
			>
				{defaultValue && <option value="">{defaultValue}</option>}
				{options.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		</label>
	);
};

export default Dropdown;
