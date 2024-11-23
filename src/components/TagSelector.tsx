import { FC, useState, useEffect } from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { useTags } from '@/hooks/tags/useTags';
import { dropdownStyles } from './ui/custom/CustomDropdown';

interface TagOption {
	label: string;
	value: string;
}
interface TagSelectorProps {
	label: string;
}

const TagSelector: FC<TagSelectorProps> = ({ label }) => {
	const { tags, isTagsLoading, createTag, creatingTag } = useTags();
	const [selectedTags, setSelectedTags] = useState<TagOption[]>([]);


	const filterTags = (inputValue: string) => {
		return tags!.filter((i) =>
			i.label.toLowerCase().includes(inputValue.toLowerCase())
		);
	};

	// Dynamically filter options on input
	const promiseOptions = (inputValue: string) =>
		new Promise<TagOption[]>((resolve) => {
			setTimeout(() => {
				resolve(filterTags(inputValue));
			}, 1000);
		});

	// Handle creation of a new tag
	const handleCreateTag = async (inputValue: string) => {
		try {
			await createTag({ title: inputValue });
		} catch (error) {
			console.error('Error creating tag:', error);
		}
	};

	// Update selected tags
	const handleChange = (newValue: any) => {
		setSelectedTags(newValue || []);
	};

	return (
		<div>
			{isTagsLoading && <p>Loading tags...</p>}
			<p>{label}</p>
			<AsyncCreatableSelect
				blurInputOnSelect
				defaultOptions={tags} 
				loadOptions={promiseOptions} 
				isSearchable
				isMulti
				onChange={handleChange}
				onCreateOption={handleCreateTag}
				isLoading={creatingTag}
				isClearable
				styles={dropdownStyles}
			/>
			{/* Render selected tags */}
			<div className='mt-4'>
				{selectedTags.length > 0 && (
					<div className='flex flex-wrap gap-2'>
						{selectedTags.map((tag) => (
							<span
								key={tag.value}
								className='px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm'>
								{tag.label}
							</span>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default TagSelector;
