import { useState } from 'react';

const useTags = (initialTags: string[]) => {
    const [tags, setTags] = useState<string[]>(initialTags);

    const addTag = (tag: string) => {
        setTags(prev => (prev.includes(tag) ? prev : [...prev, tag]));
    };

    const removeTag = (tag: string) => {
        setTags(prev => prev.filter(t => t !== tag));
    };

    return { tags, addTag, removeTag };
};

export default useTags;

