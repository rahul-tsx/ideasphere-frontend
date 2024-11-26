import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export function CustomSwitch({
	label,
	className,
	onCheck,
	...rest
}: {
	label: string;
	className: string;
	onCheck: (checked: boolean) => void;
}) {
	return (
		<div className='flex items-center space-x-4 justify-center'>
			<Label htmlFor={label} className='text-lg'>{label}</Label>
			<Switch
				id={label}
				className={className}
				onCheckedChange={onCheck}
				{...rest}
			/>
		</div>
	);
}
