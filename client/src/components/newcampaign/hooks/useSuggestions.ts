import { useState } from 'react';

const useSuggestions = (formData: any, setFormData: any) => {
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setFormData((prev: any) => ({
            ...prev,
            keywords: value
        }));

        const allKeywords = ['outdoor', 'hiking', 'camping', 'adventure', 'travel'];
        const inputKeywords = value.split(',').map((k: string) => k.trim()).filter((k: string) => k);
        const lastKeyword = inputKeywords[inputKeywords.length - 1];

        if (lastKeyword) {
            const newSuggestions = allKeywords.filter(
                keyword => keyword.toLowerCase().startsWith(lastKeyword.toLowerCase()) && !inputKeywords.includes(keyword)
            );
            setSuggestions(newSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleKeywordFocus = () => {
        if (formData.keywords.trim() === '') {
            const allKeywords = ['outdoor', 'hiking', 'camping', 'adventure', 'travel'];
            setSuggestions(allKeywords);
        }
    };

    const handleKeywordBlur = () => {
        setTimeout(() => setSuggestions([]), 200);
    };

    const handleKeywordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const inputKeywords = formData.keywords.split(',').map((k: string) => k.trim()).filter((k: string) => k);
            const lastKeyword = inputKeywords[inputKeywords.length - 1];

            if (lastKeyword && !inputKeywords.includes(lastKeyword)) {
                const updatedKeywords = [...inputKeywords, lastKeyword].join(', ');
                setFormData((prev: any) => ({
                    ...prev,
                    keywords: updatedKeywords
                }));
            }
            setSuggestions([]);
        }
    };

    return { suggestions, handleKeywordChange, handleKeywordFocus, handleKeywordBlur, handleKeywordKeyDown };
};

export default useSuggestions;
