import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';

import { cn } from '@/lib/utils';

const Switch = React.forwardRef<
	React.ElementRef<typeof SwitchPrimitives.Root>,
	React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
	<SwitchPrimitives.Root
		className={cn(
			'peer inline-flex h-9 w-20 shrink-0 cursor-pointer items-center rounded-full border-2 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
		
			'data-[state=checked]:bg-app_bg_secondary data-[state=unchecked]:bg-app_bg_secondary',
		
			'data-[state=unchecked]:border-black dark:data-[state=unchecked]:border-app_border_color',
			className
		)}
		{...props}
		ref={ref}>
		<SwitchPrimitives.Thumb
			className={cn(
				'pointer-events-none block h-6 w-6 rounded-full shadow-lg ring-0 transition-transform',
				// Dynamic thumb positioning and color
				'bg-app_btn_primary_hover_bg data-[state=checked]:translate-x-12 data-[state=unchecked]:translate-x-1'
			)}
		/>
	</SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
