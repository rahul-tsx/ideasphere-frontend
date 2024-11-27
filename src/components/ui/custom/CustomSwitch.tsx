import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export function CustomSwitch({
	label,
	className,
	defaultValue,

	onCheck,
	...rest
}: {
	label: string;
	defaultValue: boolean;
	className: string;

	onCheck: (checked: boolean) => void;
}) {
	console.log('my defualtValue', defaultValue);
	return (
		<div className='flex items-center space-x-4 justify-center'>
			<Label
				htmlFor={label}
				className='text-lg block md:hidden lg:block'>
				{label}
			</Label>

			<Switch
				id={label}
				defaultChecked={defaultValue}
				className={className}
				onCheckedChange={onCheck}
				{...rest}
			/>
		</div>
	);
}
